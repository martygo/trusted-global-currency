"use client";

import TransactionCard from "./TransactionCard";

type HistoryData = {
	title: string;
	date: string;
	content: string;
};

interface TransactionProps {
	history: HistoryData[];
}

export default function Transactions({ history }: TransactionProps) {
	console.log(history);

	return (
		<section className="flex flex-col">
			<h2 className="text-mauve12 flex justify-center mt-10 font-semibold text-3xl">
				Histórico de Transações
			</h2>

			<div className="container mx-auto flex flex-wrap justify-center items-center gap-6 mt-10">
				<TransactionCard title="Tuesday, October 3, 2023 at 8:09 PM">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit.
					Dolorem, doloribus.
				</TransactionCard>
				<TransactionCard title="Tuesday, October 3, 2023 at 8:09 PM">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit.
					Dolorem, doloribus.
				</TransactionCard>
				<TransactionCard title="Tuesday, October 3, 2023 at 8:09 PM">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit.
					Dolorem, doloribus.
				</TransactionCard>
			</div>
		</section>
	);
}
