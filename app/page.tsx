import Balance from "../components/Balance/Balance";
import Transactions from "../components/Transactions/Transactions";

export default function HomePage() {
	return (
		<main className="w-full h-[330px] bg-[#F06418]">
			<Balance />
			<Transactions />
		</main>
	);
}
