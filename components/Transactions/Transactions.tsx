"use client";

import TransactionCard from "./TransactionCard";
import { TransactionItem } from "./TransactionItem";

export type HistoryData = {
	updated_at: string;
	value_aoa: number;
	value_dollar: number;
	value_eur: number;
};

interface TransactionProps {
	history: HistoryData[];
}

export default function Transactions({ history }: TransactionProps) {
	function formatDate(date: string) {
		return new Date(date).toString().slice(0, 24);
	}

	const transactions = history.map((transaction) => {
		return (
			<TransactionCard
				title={formatDate(transaction.updated_at)}
				key={transaction.updated_at}
			>
				<ul>
					<TransactionItem
						title="Conta Kwanza:"
						amount={transaction.value_aoa}
						titleColor="text-red-700"
						iconName="Minus"
						iconColor="red"
					/>
					<TransactionItem
						title="Conta Dolár:"
						amount={transaction.value_dollar}
						titleColor="text-green-800"
						iconName="Plus"
						iconColor="green"
					/>
					<TransactionItem
						title="Conta Euro:"
						amount={transaction.value_eur}
						titleColor="text-green-800"
						iconName="Plus"
						iconColor="green"
					/>
				</ul>
			</TransactionCard>
		);
	});

	return (
		<section className="flex flex-col">
			<h2 className="text-mauve12 flex justify-center mt-10 font-semibold text-3xl">
				Histórico de Transações
			</h2>

			<div className="container mx-auto flex flex-wrap justify-center items-center gap-6 mt-10">
				{history.length > 0 ? transactions : <p>Não há transações</p>}
			</div>
		</section>
	);
}
