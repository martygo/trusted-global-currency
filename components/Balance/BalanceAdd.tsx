"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";

import supabaseClient from "@/config/supabase";
import { currencies } from "@/data/currencies.data";

import Combobox from "components/common/Combobox";
import Icon from "components/common/Icon";
import Input from "components/common/Input";

type CurrenciesType = {
	eur: {
		value: number;
		label: string;
	};
	dollar: {
		value: number;
		label: string;
	};
	kwanza: {
		value: number;
		label: string;
	};
};

interface BalanceAddProps {
	balances: CurrenciesType;
}

export default function BalanceAdd({ balances }: BalanceAddProps) {
	const [inputCurrency, setInputCurrency] = useState<number>(0);
	const [currencySource, setCurrencySource] = useState<string>("");

	const router = useRouter();

	const { eur, dollar, kwanza } = balances;

	function getInput(event: React.ChangeEvent<HTMLInputElement>) {
		const inputCurrency = event.target.value;

		if (inputCurrency === "") {
			console.log("vazio");
			return;
		}

		if (inputCurrency.length >= 1) {
			setInputCurrency(Number(inputCurrency));
		}
	}

	async function postData(value: number, wallet_currency: string) {
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

	async function handleAddBalance() {
		if (currencySource === "eur") {
			const value = eur.value + inputCurrency;
			const label = eur.label;

			await postData(value, label);
		}

		if (currencySource === "usd") {
			const value = dollar.value + inputCurrency;
			const label = dollar.label;

			await postData(value, label);
		}

		if (currencySource === "aoa") {
			const value = kwanza.value + inputCurrency;
			const label = kwanza.label;

			await postData(value, label);
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
						Adicionar Saldo
					</button>
				</Dialog.Trigger>

				<Dialog.Portal>
					<Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
					<Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
						<Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
							Adicionar Saldo
						</Dialog.Title>

						<Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
							Adicione saldo a sua conta. Selecione a moeda e o valor
							onde será adicionado.
						</Dialog.Description>

						<div className="flex gap-4 mb-[15px]">
							<fieldset>
								<Input type="number" onChange={getInput} />
							</fieldset>
							<fieldset>
								<Combobox
									data={currencies}
									state={currencySource}
									onValueChange={(value) => setCurrencySource(value)}
								/>
							</fieldset>
						</div>

						<div className="mt-[25px] flex justify-end">
							<Dialog.Close asChild>
								<button
									className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 
                                inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] 
                                font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
									onClick={handleAddBalance}
								>
									Adicionar
								</button>
							</Dialog.Close>
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
