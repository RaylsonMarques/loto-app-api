export default class CurrencyHelper {
	public convertToCents(value: number): number {
		return value * 100;
	}

	public convertFromCents(value: number): number {
		return value / 100;
	}
}
