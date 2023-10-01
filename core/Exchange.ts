export namespace Exchange {
	export function discountRecharge(amount: number) {
		return amount * 0.02;
	}

	export function discountIVA(amount: number) {
		return amount * 0.0028;
	}

	export function discountTotal(amount: number) {
		return discountRecharge(amount) + discountIVA(amount);
	}

	export function convertFromKwanzaTo(amount: number, rate: number) {
		return amount / rate;
	}
}
