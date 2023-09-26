import React from "react";

import * as Select from "@radix-ui/react-select";
import classnames from "classnames";

import {
	CheckIcon,
	ChevronDownIcon,
	ChevronUpIcon,
} from "@radix-ui/react-icons";

export interface ComboboxDataProps {
	label: string;
	value: string;
}

interface ComboboxProps {
	data: ComboboxDataProps[];
	state: string;
	onValueChange?: (value: string) => void;
}

const Combobox = ({ data, state, onValueChange }: ComboboxProps) => (
	<Select.Root value={state} onValueChange={onValueChange}>
		<Select.Trigger
			className="inline-flex items-center justify-center rounded px-[15px] text-[13px] 
            leading-none h-[35px] gap-[5px] bg-white text-orange-700 shadow-[0_2px_10px] 
            shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black 
            data-[placeholder]:text-orange-700 outline-none"
			aria-label="Food"
		>
			<Select.Value placeholder="Pick a currency..." />
			<Select.Icon className="text-orange-700">
				<ChevronDownIcon />
			</Select.Icon>
		</Select.Trigger>

		<Select.Portal>
			<Select.Content
				className="overflow-hidden bg-white rounded-md 
                shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
			>
				<Select.ScrollUpButton
					className="flex items-center justify-center h-[25px] 
                    bg-white text-orange-700 cursor-default"
				>
					<ChevronUpIcon />
				</Select.ScrollUpButton>

				<Select.Viewport>
					<Select.Group>
						{data.map((item) => {
							return (
								<SelectItem key={item.value} value={item.value}>
									{item.label}
								</SelectItem>
							);
						})}
					</Select.Group>
				</Select.Viewport>

				<Select.ScrollDownButton
					className="flex items-center justify-center h-[25px]
                    bg-white text-orange-600 cursor-default"
				>
					<ChevronDownIcon />
				</Select.ScrollDownButton>
			</Select.Content>
		</Select.Portal>
	</Select.Root>
);

// eslint-disable-next-line react/display-name
const SelectItem = React.forwardRef(
	({ children, className, ...props }: any, forwardedRef: any) => {
		return (
			<Select.Item
				className={classnames(
					`text-[13px] leading-none text-orange-700 rounded-[3px] flex items-center h-[25px] 
                    pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 
                    data-[disabled]:pointer-events-none data-[highlighted]:outline-none 
                    data-[highlighted]:bg-orange-600 data-[highlighted]:text-violet1`,
					className,
				)}
				{...props}
				ref={forwardedRef}
			>
				<Select.ItemText>{children}</Select.ItemText>
				<Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
					<CheckIcon />
				</Select.ItemIndicator>
			</Select.Item>
		);
	},
);

export default Combobox;
