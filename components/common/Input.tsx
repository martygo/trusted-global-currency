interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ type, onChange }: InputProps) {
	return (
		<input
			className="text-orange-700 shadow-blackA5 focus:shadow-blackA5 inline-flex 
            h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] 
            text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
			id="value"
			type={type}
			onChange={onChange}
			defaultValue={0}
		/>
	);
}
