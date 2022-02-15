import { DateUtils } from '../utils/index'
import { LocalStorageService, lsService } from './localService'

export class WordsService {
	#words = []

	constructor(startOfGame) {
		this.startOfGame = startOfGame
	}

	async getWords() {
		this.#words = await fetch('http://localhost:8080/mocks/words.json')
			.then((res) => res.json())
			.then((data) => data.words || [])
	}

	isThereWord() {
		const wordsNum = this.#words.length
		const wordPosition = this.#getWordPosition()

		return wordPosition < wordsNum
	}

	getTodaysWord() {
		const wordPosition = this.#getWordPosition()

		return this.#words[wordPosition]
	}

	getSavedGuesses() {
		return lsService.get(LocalStorageService.KEYS.GUESSES)
	}

	#getWordPosition() {
		const today = new Date().toISOString().split('T')[0]

		return DateUtils.daysBetween(this.startOfGame, today)
	}
}
