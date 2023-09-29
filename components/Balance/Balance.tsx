import ConverterCurrency from "components/ConverterCurrency/ConverterCurrency";

import {
	formatCurrencyToDollar,
	formatCurrencyToEur,
	formatCurrencyToKwanza,
} from "@/utils/CurrencyFormat";

import BalanceAdd from "./BalanceAdd";
import BalanceCard from "./BalanceCard";

type balanceSupabase = {
	id: number;
	value: number;
	wallet_currency: string;
};
interface BalanceProps {
	balance: balanceSupabase[];
}

export default function Balance({ balance }: BalanceProps) {
	const eurBalance = filterBalance("eur");
	const dollarBalance = filterBalance("usd");
	const kwanzaBalance = filterBalance("aoa");

	function filterBalance(currency: string) {
		return balance.filter((item) => {
			return item.wallet_currency === currency;
		});
	}

	return (
		<div>
			<h3 className="text-center py-[4rem] px-2 lg:px-0 text-white font-sans font-bold text-3xl">
				Trusted Global Currency Converter
			</h3>

			<div className="w-full flex justify-center items-center gap-6 mb-4">
				<BalanceAdd />
				<ConverterCurrency />
			</div>

			<div className="flex justify-center items-center">
				<div className="flex flex-col lg:flex-row gap-6">
					<BalanceCard
						label="EUR"
						value={formatCurrencyToEur(eurBalance[0].value)}
						icon={{
							name: "Euro",
							color: "red",
							size: 40,
						}}
					/>
					<BalanceCard
						label="DOLLAR"
						value={formatCurrencyToDollar(dollarBalance[0].value)}
						icon={{
							name: "DollarSign",
							color: "red",
							size: 40,
						}}
					/>
					<BalanceCard
						label="AOA"
						value={formatCurrencyToKwanza(kwanzaBalance[0].value)}
						icon={{
							name: "Banknote",
							color: "red",
							size: 40,
						}}
					/>
				</div>
			</div>
		</div>
	);
}
