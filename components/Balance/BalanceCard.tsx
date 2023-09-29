import Icon, { IconProps } from "../common/Icon";

interface BalanceCardProps {
	label: string;
	value: string;
	icon: IconProps;
}

export default function BalanceCard({
	label,
	icon,
	value,
}: BalanceCardProps) {
	return (
		<div className="flex flex-col w-[310px] bg-slate-100 px-4 py-6 border rounded">
			<div className="flex justify-between items-center content-center w-full">
				<h3 className="text-base text-black font-semibold">
					{label}
				</h3>
				<p>
					<Icon
						name={icon.name}
						color={icon.color}
						size={icon.size}
					/>
				</p>
			</div>
			<h4 className="text-[2rem] leading-7 mt-4">{value}</h4>
		</div>
	);
}
