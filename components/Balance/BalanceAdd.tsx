"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";

import { Queries } from "@/core/Queries";

import Button from "components/common/Button";
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

export interface BalanceAddProps {
	balances: CurrenciesType;
}

export default function BalanceAdd({ balances }: BalanceAddProps) {
	const [inputAmount, setInputAmount] = useState<number>(0);

	const router = useRouter();

	const { kwanza } = balances;

	function getAmountInput(
		event: React.ChangeEvent<HTMLInputElement>,
	) {
		const inputAmount = event.target.value;

		if (inputAmount === "") {
			console.log("vazio");
			return;
		}

		if (inputAmount.length >= 1) {
			setInputAmount(Number(inputAmount));
		}
	}

	async function postData(
		balance: string,
		value: number,
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

	async function handleAddBalance() {
		const TB_BALANCE = "balance";

		const value = kwanza.value + inputAmount;
		const label = "aoa";

		await postData(TB_BALANCE, value, label);
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
					<Dialog.Content
						className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] 
					max-h-[85vh] w-[100vw] max-w-[350px] translate-x-[-50%] translate-y-[-50%]
					bg-white p-[25px] focus:outline-none rounded-[6px]
					shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]"
					>
						<Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
							Adicionar Saldo
						</Dialog.Title>

						<Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
							Adicione saldo a sua conta. Valor será adicionado na sua
							conta Kwanza.
						</Dialog.Description>

						<div className="flex gap-4 mb-[15px]">
							<fieldset>
								<Input type="number" onChange={getAmountInput} />
							</fieldset>

							<Dialog.Close asChild>
								<Button onClick={handleAddBalance} aria-label="Add">
									Adicionar
								</Button>
							</Dialog.Close>
						</div>

						<Dialog.Close asChild>
							<Button
								className="hover:bg-violet4 focus:shadow-violet7 absolute  
                                inline-flex h-[25px] w-[25px] px-0 top-[10px] right-[10px]
								appearance-none rounded-full bg-inherit text-inherit"
								aria-label="Close"
							>
								<Icon name="XCircle" size={40} color="red" />
							</Button>
						</Dialog.Close>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</div>
	);
}
