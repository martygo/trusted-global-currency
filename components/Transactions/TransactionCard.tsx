import React from "react";

import * as AlertDialog from "@radix-ui/react-alert-dialog";

interface TransactionCardProps {
	title: string;
	children: React.ReactNode;
}

export default function TransactionCard({
	title,
	children,
}: TransactionCardProps) {
	return (
		<>
			<AlertDialog.Root>
				<AlertDialog.Trigger asChild>
					<button
						className="text-violet11 hover:bg-mauve3 shadow-blackA7 inline-flex 
						h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] focus:shadow-black
						font-medium leading-none shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px]"
					>
						{title}
					</button>
				</AlertDialog.Trigger>

				<AlertDialog.Portal>
					<AlertDialog.Overlay
						className="bg-blackA9 data-[state=open]:animate-overlayShow 
						fixed inset-0"
					/>
					<AlertDialog.Content
						className="data-[state=open]:animate-contentShow 
						fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] 
						translate-y-[-50%] rounded-[6px] bg-white p-[25px] focus:outline-none
						shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]"
					>
						<div className="bg-white rounded my-[10px] p-[10px]">
							{children}
						</div>

						<div className="flex justify-end gap-[25px]">
							<AlertDialog.Cancel asChild>
								<button
									className="text-mauve11 bg-mauve4 hover:bg-mauve5 
								  focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center 
									rounded-[4px] px-[15px] font-medium leading-none outline-none 
									focus:shadow-[0_0_0_2px]"
								>
									Fechar
								</button>
							</AlertDialog.Cancel>
						</div>
					</AlertDialog.Content>
				</AlertDialog.Portal>
			</AlertDialog.Root>
		</>
	);
}
