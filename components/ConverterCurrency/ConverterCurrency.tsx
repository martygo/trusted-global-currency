"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Combobox from "../common/Combobox";
import Icon from "../common/Icon";

export default function ConverterCurrency() {
	return (
		<div className="w-full flex justify-center items-center mb-4">
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
					<Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
						<Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
							Converter Currency
						</Dialog.Title>

						<Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
							Convert your currency to another currency. All
							Transactions are based on the current exchange rate.
						</Dialog.Description>

						<div className="flex gap-4 mb-[15px]">
							<fieldset>
								<input
									className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
									id="name"
									defaultValue="Pedro Duarte"
								/>
							</fieldset>
							<fieldset>
								<Combobox />
							</fieldset>
							<fieldset>
								<Combobox />
							</fieldset>
						</div>

						<div className="mt-[25px] flex justify-end">
							<button className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
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
