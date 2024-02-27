interface IObserver {
	update(...args: unknown[]): void;
}

export { IObserver };
