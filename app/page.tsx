import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import Balance from "@/components/Balance/Balance";
import Transactions from "@/components/Transactions/Transactions";

export default async function HomePage() {
	const supabase = createServerComponentClient({ cookies });

	const { data: balance }: any = await supabase
		.from("balance")
		.select(`value, wallet_currency`);

	return (
		<main className="w-full h-[330px] bg-[#F06418]">
			<Balance balance={balance} />
			<Transactions />
		</main>
	);
}
