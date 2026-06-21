import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://mdfadntlhuzrmtmviqek.supabase.co";

const supabaseKey =
  "sb_publishable_TxRKXHH28wPoT9_yi_m0dg_X9tTjDci";

export const supabase =
  createClient(
    supabaseUrl,
    supabaseKey
  );