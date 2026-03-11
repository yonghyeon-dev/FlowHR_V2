import { existsSync, readFileSync, renameSync } from "node:fs";
import { resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";
import type {
  ActionDomain,
  ActionEvent,
  MockStoreState,
  PackSetupResponse,
  SupportedPack,
  TenantOption,
  TenantRecord,
} from "@/lib/api/types";

const DB_PATH = resolve(process.cwd(), ".flowhr-v2.sqlite");
const LEGACY_STORE_PATH = resolve(process.cwd(), ".flowhr-mock-state.json");

const DEFAULT_TENANTS: Array<Omit<TenantRecord, "featureSelections"> & { featureSelections?: string[] }> = [
  {
    id: "acme-corp",
    name: "Acme Corp",
    pack: "office",
    status: "active",
    industry: "office",
    seatCount: 180,
    createdAt: "2026-02-10T09:00:00.000Z",
    updatedAt: "2026-03-11T10:00:00.000Z",
  },
  {
    id: "nova-team",
    name: "Nova Team",
    pack: "retail",
    status: "grace",
    industry: "retail",
    seatCount: 96,
    createdAt: "2026-02-18T09:00:00.000Z",
    updatedAt: "2026-03-11T14:20:00.000Z",
  },
  {
    id: "deepfield",
    name: "DeepField",
    pack: "office",
    status: "trial",
    industry: "office",
    seatCount: 44,
    createdAt: "2026-03-02T09:00:00.000Z",
    updatedAt: "2026-03-11T16:10:00.000Z",
  },
];

let db: DatabaseSync | undefined;

function hasColumn(database: DatabaseSync, table: string, column: string) {
  const rows = database
    .prepare(`PRAGMA table_info(${table})`)
    .all() as Array<{ name: string }>;

  return rows.some((row) => row.name === column);
}

function getDb() {
  db ??= new DatabaseSync(DB_PATH);
  db.exec(`
    CREATE TABLE IF NOT EXISTS tenants (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      pack TEXT NOT NULL,
      status TEXT NOT NULL,
      industry TEXT NOT NULL,
      seat_count INTEGER NOT NULL,
      feature_selection TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS action_events (
      id TEXT PRIMARY KEY,
      domain TEXT NOT NULL,
      action_type TEXT NOT NULL,
      actor TEXT NOT NULL,
      tenant_id TEXT,
      pack TEXT,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);

  if (!hasColumn(db, "action_events", "tenant_id")) {
    db.exec("ALTER TABLE action_events ADD COLUMN tenant_id TEXT");
  }

  return db;
}

function readLegacyState(): MockStoreState | null {
  if (!existsSync(LEGACY_STORE_PATH)) return null;

  try {
    return JSON.parse(readFileSync(LEGACY_STORE_PATH, "utf8")) as MockStoreState;
  } catch {
    return null;
  }
}

function selectionForPack(
  pack: SupportedPack,
  defaultSelection: PackSetupResponse["selection"],
  override?: string[],
) {
  return override ?? defaultSelection.featureSelections[pack] ?? [];
}

function insertTenant(record: TenantRecord) {
  getDb()
    .prepare(`
      INSERT OR IGNORE INTO tenants (
        id, name, pack, status, industry, seat_count, feature_selection, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .run(
      record.id,
      record.name,
      record.pack,
      record.status,
      record.industry,
      record.seatCount,
      JSON.stringify(record.featureSelections),
      record.createdAt,
      record.updatedAt,
    );
}

function seedTenants(defaultSelection: PackSetupResponse["selection"]) {
  const tenantCount = getDb()
    .prepare("SELECT COUNT(*) as count FROM tenants")
    .get() as { count: number };

  if (tenantCount.count > 0) return;

  const legacyState = readLegacyState();
  const legacySelection = legacyState?.selection;
  const legacyPack = legacySelection?.selectedPack;
  const officeSeed = legacyPack === "office" ? legacySelection?.featureSelections.office : undefined;
  const retailSeed = legacyPack === "retail" ? legacySelection?.featureSelections.retail : undefined;

  for (const tenant of DEFAULT_TENANTS) {
    insertTenant({
      ...tenant,
      featureSelections: selectionForPack(
        tenant.pack,
        defaultSelection,
        tenant.pack === "office" ? officeSeed : retailSeed,
      ),
    });
  }

  if (legacyState?.actionEvents?.length) {
    const insertEvent = getDb().prepare(`
      INSERT OR IGNORE INTO action_events (id, domain, action_type, actor, tenant_id, pack, message, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const event of legacyState.actionEvents) {
      const fallbackTenantId = event.pack === "retail" ? "nova-team" : "acme-corp";
      insertEvent.run(
        event.id,
        event.domain,
        event.actionType,
        event.actor,
        event.tenantId ?? fallbackTenantId,
        event.pack ?? null,
        event.message,
        event.createdAt,
      );
    }
  }

  if (legacyState && existsSync(LEGACY_STORE_PATH)) {
    renameSync(LEGACY_STORE_PATH, `${LEGACY_STORE_PATH}.migrated`);
  }
}

export function ensureStore(defaultSelection: PackSetupResponse["selection"]) {
  getDb();
  seedTenants(defaultSelection);
}

function mapTenantRow(row: {
  id: string;
  name: string;
  pack: SupportedPack;
  status: TenantRecord["status"];
  industry: string;
  seatCount: number;
  featureSelection: string;
  createdAt: string;
  updatedAt: string;
}): TenantRecord {
  return {
    id: row.id,
    name: row.name,
    pack: row.pack,
    status: row.status,
    industry: row.industry,
    seatCount: row.seatCount,
    featureSelections: JSON.parse(row.featureSelection) as string[],
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export function listTenants(defaultSelection: PackSetupResponse["selection"]): TenantRecord[] {
  ensureStore(defaultSelection);
  const rows = getDb()
    .prepare(`
      SELECT
        id,
        name,
        pack,
        status,
        industry,
        seat_count as seatCount,
        feature_selection as featureSelection,
        created_at as createdAt,
        updated_at as updatedAt
      FROM tenants
      ORDER BY name ASC
    `)
    .all() as Array<{
      id: string;
      name: string;
      pack: SupportedPack;
      status: TenantRecord["status"];
      industry: string;
      seatCount: number;
      featureSelection: string;
      createdAt: string;
      updatedAt: string;
    }>;

  return rows.map(mapTenantRow);
}

export function listTenantOptions(defaultSelection: PackSetupResponse["selection"]): TenantOption[] {
  return listTenants(defaultSelection).map(({ id, name, pack, status }) => ({
    id,
    name,
    pack,
    status,
  }));
}

export function getTenantById(
  tenantId: string | undefined,
  defaultSelection: PackSetupResponse["selection"],
): TenantRecord {
  const tenants = listTenants(defaultSelection);
  return tenants.find((tenant) => tenant.id === tenantId) ?? tenants[0];
}

export function updateTenantConfig(
  tenantId: string,
  updates: Pick<TenantRecord, "pack" | "status">,
  defaultSelection: PackSetupResponse["selection"],
) {
  const tenant = getTenantById(tenantId, defaultSelection);
  const nextUpdatedAt = new Date().toISOString();
  const nextFeatures =
    updates.pack === tenant.pack
      ? tenant.featureSelections
      : defaultSelection.featureSelections[updates.pack] ?? [];

  getDb()
    .prepare(`
      UPDATE tenants
      SET pack = ?, status = ?, feature_selection = ?, updated_at = ?
      WHERE id = ?
    `)
    .run(
      updates.pack,
      updates.status,
      JSON.stringify(nextFeatures),
      nextUpdatedAt,
      tenant.id,
    );

  return getTenantById(tenant.id, defaultSelection);
}

export function getPackSelection(
  defaultSelection: PackSetupResponse["selection"],
  tenantId: string,
) {
  const tenant = getTenantById(tenantId, defaultSelection);
  return {
    selectedPack: tenant.pack,
    featureSelections: {
      office:
        tenant.pack === "office"
          ? tenant.featureSelections
          : defaultSelection.featureSelections.office,
      retail:
        tenant.pack === "retail"
          ? tenant.featureSelections
          : defaultSelection.featureSelections.retail,
    },
    savedAt: tenant.updatedAt,
  } satisfies PackSetupResponse["selection"];
}

export function savePackSelection(
  selection: PackSetupResponse["selection"],
  tenantId: string,
) {
  const tenant = getTenantById(tenantId, selection);
  const now = new Date().toISOString();
  const nextPack = selection.selectedPack;
  const nextFeatures = selection.featureSelections[nextPack] ?? [];

  getDb()
    .prepare(`
      UPDATE tenants
      SET pack = ?, feature_selection = ?, updated_at = ?
      WHERE id = ?
    `)
    .run(nextPack, JSON.stringify(nextFeatures), selection.savedAt ?? now, tenant.id);
}

export function appendActionEvent(
  event: ActionEvent,
  defaultSelection: PackSetupResponse["selection"],
  tenantId: string,
) {
  const tenant = getTenantById(tenantId, defaultSelection);
  getDb()
    .prepare(`
      INSERT OR REPLACE INTO action_events (id, domain, action_type, actor, tenant_id, pack, message, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .run(
      event.id,
      event.domain,
      event.actionType,
      event.actor,
      tenant.id,
      event.pack ?? tenant.pack,
      event.message,
      event.createdAt,
    );

  getDb().exec(`
    DELETE FROM action_events
    WHERE id NOT IN (
      SELECT id
      FROM action_events
      ORDER BY created_at DESC
      LIMIT 100
    )
  `);
}

export function listActionEvents(
  domain: ActionDomain,
  pack: SupportedPack | undefined,
  limit: number,
  defaultSelection: PackSetupResponse["selection"],
  tenantId?: string,
) {
  ensureStore(defaultSelection);

  const rows = getDb()
    .prepare(`
      SELECT
        id,
        domain,
        action_type as actionType,
        actor,
        tenant_id as tenantId,
        pack,
        message,
        created_at as createdAt
      FROM action_events
      WHERE domain = ?
        AND (? IS NULL OR pack = ?)
        AND (? IS NULL OR tenant_id = ?)
      ORDER BY created_at DESC
      LIMIT ?
    `)
    .all(domain, pack ?? null, pack ?? null, tenantId ?? null, tenantId ?? null, limit) as ActionEvent[];

  return rows;
}
