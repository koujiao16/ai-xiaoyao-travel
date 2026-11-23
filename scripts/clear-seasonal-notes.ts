import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { writeFileSync } from "node:fs";
config({ path: ".env.local", quiet: true });
async function main() {
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!, { auth: { persistSession: false } });
  const old = await client.from("attractions").select("id,name,seasonal_note").neq("seasonal_note", "");
  if (old.error) throw old.error;
  const backup = "/private/tmp/xiaoyao-seasonal-backup-" + Date.now() + ".json";
  writeFileSync(backup, JSON.stringify(old.data, null, 2), { mode: 0o600 });
  if (old.data.length) {
    const result = await client.from("attractions").update({ seasonal_note: "" }).in("id", old.data.map(x => x.id));
    if (result.error) throw result.error;
  }
  console.log("已清除季节标签：" + old.data.length + "；备份：" + backup);
}
main().catch(e => { console.error(e.message); process.exitCode = 1; });
