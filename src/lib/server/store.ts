import { existsSync, readFileSync, renameSync } from "node:fs";
import { resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";
import type {
  ActionDomain,
  ActionEvent,
  MockStoreState,
  PackSetupResponse,
} from "@/lib/api/types";

const DB_PATH = resolve(process.cwd(), ".flowhr-v2.sqlite");
const LEGACY_STORE_PATH = resolve(process.cwd(), ".flowhr-mock-state.json");

let db: DatabaseSync | undefined;

function getDb() {
  db ??= new DatabaseSync(DB_PATH);
  db.exec(`
    CREATE TABLE IF NOT EXISTS app_state (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS action_events (
      id TEXT PRIMARY KEY,
      domain TEXT NOT NULL,
      action_type TEXT NOT NULL,
      actor TEXT NOT NULL,
      pack TEXT,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);

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

export function ensureStore(defaultSelection: PackSetupResponse["selection"]) {
  const database = getDb();
  const stateRow = database
    .prepare("SELECT value FROM app_state WHERE key = ?")
    .get("pack_selection") as { value: string } | undefined;

  if (stateRow) return;

  const legacyState = readLegacyState();
  const selection = legacyState?.selection ?? defaultSelection;
  const actionEvents = legacyState?.actionEvents ?? [];

  database
    .prepare("INSERT INTO app_state (key, value) VALUES (?, ?)")
    .run("pack_selection", JSON.stringify(selection));

  const insertEvent = database.prepare(`
    INSERT OR IGNORE INTO action_events (id, domain, action_type, actor, pack, message, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  for (const event of actionEvents) {
    insertEvent.run(
      event.id,
      event.domain,
      event.actionType,
      event.actor,
      event.pack ?? null,
      event.message,
      event.createdAt,
    );
  }

  if (legacyState && existsSync(LEGACY_STORE_PATH)) {
    renameSync(LEGACY_STORE_PATH, `${LEGACY_STORE_PATH}.migrated`);
  }
}

export function getPackSelection(defaultSelection: PackSetupResponse["selection"]) {
  ensureStore(defaultSelection);
  const database = getDb();
  const row = database
    .prepare("SELECT value FROM app_state WHERE key = ?")
    .get("pack_selection") as { value: string };

  return JSON.parse(row.value) as PackSetupResponse["selection"];
}

export function savePackSelection(selection: PackSetupResponse["selection"]) {
  ensureStore(selection);
  const database = getDb();
  database
    .prepare("INSERT OR REPLACE INTO app_state (key, value) VALUES (?, ?)")
    .run("pack_selection", JSON.stringify(selection));
}

export function appendActionEvent(event: ActionEvent, defaultSelection: PackSetupResponse["selection"]) {
  ensureStore(defaultSelection);
  const database = getDb();
  database
    .prepare(`
      INSERT OR REPLACE INTO action_events (id, domain, action_type, actor, pack, message, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
    .run(
      event.id,
      event.domain,
      event.actionType,
      event.actor,
      event.pack ?? null,
      event.message,
      event.createdAt,
    );

  database.exec(`
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
  pack: ActionEvent["pack"],
  limit = 3,
  defaultSelection: PackSetupResponse["selection"],
) {
  ensureStore(defaultSelection);
  const database = getDb();
  const rows = database
    .prepare(`
      SELECT id, domain, action_type as actionType, actor, pack, message, created_at as createdAt
      FROM action_events
      WHERE domain = ? AND (? IS NULL OR pack = ?)
      ORDER BY created_at DESC
      LIMIT ?
    `)
    .all(domain, pack ?? null, pack ?? null, limit) as ActionEvent[];

  return rows;
}
