"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";

import { Exchange } from "@/core/Exchange";
import { Queries } from "@/core/Queries";

import {
	formatCurrencyToDollar,
	formatCurrencyToEur,
	formatCurrencyToKwanza,
} from "@/utils/CurrencyFormat";

import { BalanceAddProps } from "components/Balance/BalanceAdd";
import Button from "components/common/Button";
import Icon from "components/common/Icon";
import Input from "components/common/Input";

type InfoOperationalCharges = {
	recharge: string;
	iva: string;
	total: string;
};

type CurrenciesConverterType = {
	eur: string;
	dollar: string;
};

export default function ConverterCurrency({
	balances,
}: BalanceAddProps) {
	const [amount, setAmount] = useState<number>(0);
	const [exchangeRateUSD, setExchangeRateUSD] = useState<number>(0);
	const [exchangeRateEUR, setExchangeRateEUR] = useState<number>(0);

	const [amountConverted, setAmountConverted] =
		useState<CurrenciesConverterType>({
			eur: "0,00",
			dollar: "0,00",
		} as CurrenciesConverterType);

	const [infoOperationalCharges, setInfoOperationalCharges] =
		useState<InfoOperationalCharges>({
			recharge: "0,00",
			iva: "0,00",
			total: "0,00",
		} as InfoOperationalCharges);

	const router = useRouter();

	const { eur, dollar, kwanza } = balances;

	async function updateData(
		balance: string,
		value: number | string,
		wallet_currency: string,
	) {
		const data = await Queries.update(balance, value, {
			key: "wallet_currency",
			value: wallet_currency,
		});

		if (data) {
			router.refresh();
		}
	}

	async function handleAddBalanceToWallet() {
		const TB_BALANCE = "balance";

		const convertedToUSD = Exchange.convertFromKwanzaTo(
			amount,
			exchangeRateUSD,
		);

		const convertedToEUR = Exchange.convertFromKwanzaTo(
			amount,
			exchangeRateEUR,
		);

		setAmountConverted({
			eur: formatCurrencyToEur(convertedToEUR),
			dollar: formatCurrencyToDollar(convertedToUSD),
		});

		setInfoOperationalCharges({
			recharge: formatCurrencyToKwanza(
				Exchange.discountRecharge(amount),
			),
			iva: formatCurrencyToKwanza(Exchange.discountIVA(amount)),
			total: formatCurrencyToKwanza(Exchange.discountTotal(amount)),
		});

		const { value: valueKwanza, label: labelKwanza } = kwanza;
		const { value: valueEur, label: labelEur } = eur;
		const { value: valueDollar, label: labelDollar } = dollar;

		const updateWallets: any = {
			kwanza: valueKwanza - amount,
			eur: valueEur + convertedToEUR,
			dollar: valueDollar + convertedToUSD,
		};

		const historyData: any = [
			{
				value_aoa: amount,
				value_eur: updateWallets.eur,
				value_dollar: updateWallets.dollar,
			},
		];

		await updateData(TB_BALANCE, updateWallets.kwanza, labelKwanza);
		await updateData(
			TB_BALANCE,
			updateWallets.eur.toFixed(2),
			labelEur,
		);
		await updateData(
			TB_BALANCE,
			updateWallets.dollar.toFixed(2),
			labelDollar,
		);

		await Queries.insert("transactions", historyData);
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
						Carregar Conta
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
							Carregar conta
						</Dialog.Title>

						<Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
							Insira o valor que deseja carregar na sua conta dolár e
							euro. O valor da recarga e o IVA serão deduzidos da sua
							conta em kwanza.
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
								<label htmlFor="exchangeRateUSD">Câmbio USD</label>
								<Input
									type="number"
									id="exchangeRateUSD"
									name="exchangeRateUSD"
									onChange={(
										e: React.ChangeEvent<HTMLInputElement>,
									) => setExchangeRateUSD(Number(e.target.value))}
								/>
							</fieldset>

							<fieldset>
								<label htmlFor="exchangeRateEUR">Câmbio EUR</label>
								<Input
									type="number"
									id="exchangeRateEUR"
									name="exchangeRateEUR"
									onChange={(
										e: React.ChangeEvent<HTMLInputElement>,
									) => setExchangeRateEUR(Number(e.target.value))}
								/>
							</fieldset>
						</div>

						<div className="mt-[25px] w-full flex flex-col gap-4 justify-between">
							<div className="w-full flex justify-between items-center">
								<ul className="text-sm font-medium">
									<li>Valor USD:</li>
									<li className="mb-4">Valor EUR:</li>
									<li>Desconto de Carregamento:</li>
									<li>Desconto IVA:</li>
									<li>Desconto Total:</li>
								</ul>

								<ul className="font-normal text-sm">
									<li>{amountConverted.dollar}</li>
									<li className="mb-4">{amountConverted.eur}</li>

									<li>{infoOperationalCharges.recharge}</li>
									<li>{infoOperationalCharges.iva}</li>
									<li>{infoOperationalCharges.total}</li>
								</ul>
							</div>

							<Button
								onClick={handleAddBalanceToWallet}
								aria-label="Add"
							>
								Carregar
							</Button>
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
