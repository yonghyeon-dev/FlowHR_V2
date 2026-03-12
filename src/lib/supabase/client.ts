"use client";

import { createBrowserClient } from "@supabase/ssr";

function getSupabaseUrl() {
  const value = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!value) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is missing.");
  }
  return value;
}

function getSupabasePublishableKey() {
  const value =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!value) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing.",
    );
  }

  return value;
}

export function createBrowserSupabaseClient() {
  return createBrowserClient(getSupabaseUrl(), getSupabasePublishableKey());
}
