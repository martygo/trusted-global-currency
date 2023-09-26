import ConverterCurrency from "../ConverterCurrency/ConverterCurrency";
import BalanceAdd from "./BalanceAdd";
import BalanceCard from "./BalanceCard";

export default function Balance() {
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
						currency="$"
						value="80,00"
						icon={{
							name: "Euro",
							color: "red",
							size: 40,
						}}
					/>
					<BalanceCard
						label="DOLLAR"
						currency="$"
						value="100,00"
						icon={{
							name: "DollarSign",
							color: "red",
							size: 40,
						}}
					/>
					<BalanceCard
						label="AOA"
						currency="$"
						value="6.000,00"
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
