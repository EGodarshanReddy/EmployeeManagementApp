// import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";


const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_URL')!; // or SUPABASE_ANON_KEY if preferred

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;