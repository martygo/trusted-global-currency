import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

async function supabaseInit() {
	const supabase = createClientComponentClient();

	return supabase;
}

export default supabaseInit;
