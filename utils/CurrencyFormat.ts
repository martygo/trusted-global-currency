export const formatCurrencyToEur = (value: number): string => {
	return new Intl.NumberFormat("fr-FR", {
		style: "currency",
		currency: "EUR",
	}).format(value);
};

export const formatCurrencyToDollar = (value: number): string => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(value);
};

export const formatCurrencyToKwanza = (value: number): string => {
	return new Intl.NumberFormat("de-DE", {
		style: "currency",
		currency: "AOA",
	}).format(value);
};
