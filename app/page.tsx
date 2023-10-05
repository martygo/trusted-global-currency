"use client";

import axios from "axios";
import useSWR from "swr";

import Balance from "@/components/Balance/Balance";
import Transactions from "@/components/Transactions/Transactions";

const fetcher = (url: string) =>
	axios
		.get(url, {
			headers: {
				apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
			},
		})
		.then((res) => res.data);

export default function HomePage() {
	const { data: balance, error: balanceError } = useSWR(
		`https://dpysxuqiiporgeifdprm.supabase.co/rest/v1/balance?select=*`,
		fetcher,
		{ refreshInterval: 2000 },
	);

	const { data: transactions } = useSWR(
		`https://dpysxuqiiporgeifdprm.supabase.co/rest/v1/transactions?select=*`,
		fetcher,
		{ refreshInterval: 1000 },
	);

	if (balanceError) return "Failed to load";
	if (!balance) return "Loading...balance";
	if (!transactions) return "Loading...balance";

	return (
		<main className="w-full h-[330px] bg-[#F06418]">
			<Balance balance={balance} />
			<Transactions history={transactions} />
		</main>
	);
}
