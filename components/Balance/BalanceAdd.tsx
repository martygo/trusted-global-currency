"use client";

import { useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";

import { currencies } from "data/currencies.data";

import Combobox from "components/common/Combobox";
import Icon from "components/common/Icon";
import Input from "components/common/Input";

export default function BalanceAdd() {
	const [inputCurrency, setInputCurrency] = useState<number>(0);
	const [currencySource, setCurrencySource] = useState<string>("");

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

	function handleAddBalance() {
		console.log(inputCurrency, currencySource);
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
							<button
								className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 
                                inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] 
                                font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
								onClick={handleAddBalance}
							>
								Adicionar
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
