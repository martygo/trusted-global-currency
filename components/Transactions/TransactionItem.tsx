import { icons } from "lucide-react";

import { formatCurrencyToKwanza } from "@/utils/CurrencyFormat";

import Icon from "components/common/Icon";

export const TransactionItem = ({
	title,
	amount,
	titleColor,
	iconName,
	iconColor,
}: {
	title: string;
	amount: number;
	titleColor: string;
	iconName: keyof typeof icons;
	iconColor: string;
}) => {
	return (
		<li className="flex items-center">
			<span className="font-semibold text-base">{title}</span>
			<Icon name={iconName} color={iconColor} size={22} />{" "}
			<span className={titleColor}>
				{formatCurrencyToKwanza(amount)}
			</span>
		</li>
	);
};
