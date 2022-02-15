export class LocalStorageService {
	#useLocalStorage
	#mockLocalStorage

	static KEYS = {
		DARKMODE: 'darkmode',
		GUESSES: 'guesses',
	}

	constructor() {
		this.#useLocalStorage = this.#isLocalStorageSupported()

		if (!this.#useLocalStorage) {
			this.#mockLocalStorage = new Map()
		}
	}

	#isLocalStorageSupported() {
		return 'localStorage' in window && window.localStorage !== null
	}

	get(key) {
		return this.#useLocalStorage
			? this.#parseItem(localStorage.getItem(key))
			: this.#mockLocalStorage.get(key)
	}

	set(key, value) {
		if (this.#useLocalStorage) {
			localStorage.setItem(
				key,
				typeof value === 'object' ? JSON.stringify(value) : value
			)
		} else {
			this.#mockLocalStorage.set(key, value)
		}
	}

	remove(key) {
		if (this.#useLocalStorage) {
			localStorage.removeItem(key)
		} else {
			this.#mockLocalStorage.delete(key)
		}
	}

	#parseItem(item) {
		try {
			return JSON.parse(item)
		} catch {
			return item
		}
	}
}

export const lsService = new LocalStorageService()
