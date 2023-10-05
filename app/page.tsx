export const dynamic = "force-static";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import Balance from "@/components/Balance/Balance";
import Transactions from "@/components/Transactions/Transactions";

export default async function HomePage() {
	const supabase = createServerComponentClient({ cookies });

	const { data: balance }: any = await supabase
		.from("balance")
		.select(`value, wallet_currency`);

	const { data: transactions }: any = await supabase
		.from("transactions")
		.select("value_aoa, value_eur, value_dollar, updated_at");

	return (
		<main className="w-full h-[330px] bg-[#F06418]">
			<Balance balance={balance} />
			<Transactions history={transactions} />
		</main>
	);
}
