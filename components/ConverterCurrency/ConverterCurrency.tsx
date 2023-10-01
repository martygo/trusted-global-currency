"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";

import { Exchange } from "@/core/Exchange";
import { formatCurrencyToKwanza } from "@/utils/CurrencyFormat";
import { BalanceAddProps } from "components/Balance/BalanceAdd";
import { currencies } from "data/currencies.data";

import supabaseClient from "@/config/supabase";
import Combobox from "components/common/Combobox";
import Icon from "components/common/Icon";
import Input from "components/common/Input";

type InfoOperationalCharges = {
	recharge: string;
	iva: string;
	total: string;
};

export default function ConverterCurrency({
	balances,
}: BalanceAddProps) {
	const [amount, setAmount] = useState<number>(0);
	const [exchangeRate, setExchangeRate] = useState<number>(0);
	const [currencySource, setCurrencySource] = useState<string>("");
	const [currencyTarget, setCurrencyTarget] = useState<string>("");

	const [amountConverted, setAmountConverted] =
		useState<string>("0,00");

	const [infoOperationalCharges, setInfoOperationalCharges] =
		useState<InfoOperationalCharges>({
			recharge: "0,00",
			iva: "0,00",
			total: "0,00",
		} as InfoOperationalCharges);

	const router = useRouter();

	const { eur, dollar, kwanza } = balances;

	async function updateData(value: number, wallet_currency: string) {
		const supabase = supabaseClient();

		const { data, error } = await supabase
			.from("balance")
			.update({ value })
			.eq("wallet_currency", wallet_currency)
			.select();

		if (data) {
			router.refresh();
		}

		if (error) {
			console.log("error: ", error);
		}
	}

	async function handleConvert() {
		const converted = Exchange.convertFromKwanzaTo(
			amount,
			exchangeRate,
		);

		setAmountConverted(formatCurrencyToKwanza(converted));

		setInfoOperationalCharges({
			recharge: formatCurrencyToKwanza(
				Exchange.discountRecharge(amount),
			),
			iva: formatCurrencyToKwanza(Exchange.discountIVA(amount)),
			total: formatCurrencyToKwanza(Exchange.discountTotal(amount)),
		});

		if (currencySource === "aoa") {
			const { value, label } = kwanza;

			const newValue = value - amount;
			const labelSelect = label;

			await updateData(newValue, labelSelect);
		}
	}

	return (
		<div>
			<Dialog.Root>
				<Dialog.Trigger asChild>
					<button
						className="text-black shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] 
                        items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none 
                        shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
					>
						Converter
					</button>
				</Dialog.Trigger>

				<Dialog.Portal>
					<Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
					<Dialog.Content
						className="data-[state=open]:animate-contentShow fixed top-[50%] 
						left-[50%] max-h-[85vh] w-[33rem] translate-x-[-50%] rounded-[6px] bg-white p-[25px]
						focus:outline-none translate-y-[-50%] 
						shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]
						"
					>
						<Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
							Converter Currency
						</Dialog.Title>

						<Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
							Convert your currency to another currency. All
							Transactions are based on the current exchange rate.
						</Dialog.Description>

						<div className="flex flex-col lg:flex-row gap-4 mb-[15px]">
							<fieldset>
								<label htmlFor="amount">Valor</label>
								<Input
									type="number"
									id="amount"
									name="amount"
									onChange={(
										e: React.ChangeEvent<HTMLInputElement>,
									) => setAmount(Number(e.target.value))}
								/>
							</fieldset>

							<fieldset>
								<label htmlFor="exchangeRate">Câmbio</label>
								<Input
									type="number"
									id="exchangeRate"
									name="exchangeRate"
									onChange={(
										e: React.ChangeEvent<HTMLInputElement>,
									) => setExchangeRate(Number(e.target.value))}
								/>
							</fieldset>

							<fieldset>
								<label htmlFor="from">De</label>
								<Combobox
									id="from"
									data={[
										{
											label: "🇦🇴 AOA",
											value: "aoa",
										},
									]}
									state={currencySource}
									onValueChange={(value) => setCurrencySource(value)}
								/>
							</fieldset>

							<fieldset>
								<label htmlFor="to">Para</label>
								<Combobox
									id="to"
									data={currencies}
									state={currencyTarget}
									onValueChange={(value) => setCurrencyTarget(value)}
								/>
							</fieldset>
						</div>

						<div className="mt-[25px] w-full flex flex-col gap-4 justify-between">
							<div className="w-full flex justify-between items-center">
								<ul className="text-sm font-medium">
									<li className="mb-4">Valor convertido:</li>
									<li>Desconto de Carregamento:</li>
									<li>Desconto IVA:</li>
									<li>Desconto Total:</li>
								</ul>

								<ul className="font-normal text-sm">
									<li className="mb-4">{amountConverted}</li>
									<li>{infoOperationalCharges.recharge}</li>
									<li>{infoOperationalCharges.iva}</li>
									<li>{infoOperationalCharges.total}</li>
								</ul>
							</div>

							<button
								className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 
                                inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] 
                                font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
								onClick={handleConvert}
							>
								Converter
							</button>
						</div>

						<Dialog.Close asChild>
							<button
								className="hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] 
                                inline-flex h-[25px] w-[25px] appearance-none items-center justify-center 
                                rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
								aria-label="Close"
							>
								<Icon name="XCircle" size={40} color="red" />
							</button>
						</Dialog.Close>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</div>
	);
}
