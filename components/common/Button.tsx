import { twMerge } from "tailwind-merge";

interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({
	children,
	onClick,
	className,
	...rest
}: ButtonProps) {
	return (
		<button
			className={twMerge(
				`bg-green4 text-green11 hover:bg-green5 items-center justify-center rounded-[4px] 
				focus:shadow-[0_0_0_2px] focus:outline-none font-medium leading-none h-[35px] px-[15px]`,
				className,
			)}
			{...rest}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
