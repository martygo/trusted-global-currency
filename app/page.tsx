import Balance from "@/components/Balance/Balance";

export default async function HomePage() {
	const data = await getData();
	return (
		<main className="w-full h-[330px] bg-[#F06418]">
			<Balance balance={data} />
			{/* <Transactions history={transactions} /> */}
		</main>
	);
}

async function getData() {
	const res = await fetch(
		`https://dpysxuqiiporgeifdprm.supabase.co/rest/v1/balance?select=*`,
		{
			method: "GET",
			headers: {
				apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
			},
			next: {
				revalidate: 0,
			},
		},
	);

	const balance = await res.json();

	return balance;
}
