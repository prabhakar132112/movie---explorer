import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabasePublishableKey = process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  console.warn("Set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_PUBLISHABLE_KEY in .env.");
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabasePublishableKey || "placeholder-key"
);
