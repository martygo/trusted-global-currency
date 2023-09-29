import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

function supabaseClient() {
	const supabase = createClientComponentClient();

	return supabase;
}

export default supabaseClient;
