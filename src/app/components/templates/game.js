import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit-element'
import { WordsService } from '../../services/wordsService'
import { CONSTANTS, CommonUtils } from '../../utils'
import '../molecules/keyboard'
import '../molecules/cellgrid'

@customElement('app-game')
export class GameElement extends LitElement {
	@state() guesses = []

	KeyboardKeys = [
		['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
		['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
		['ENVIAR', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL'],
	]

	static styles = css`
		section {
			height: 100%;
			padding: 0.8rem;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			gap: 0.8rem;
		}

		section:nth-child(1) {
			flex-grow: 3;
		}

		section:nth-child(2) {
			flex-grow: 1;
		}

		section div {
			display: flex;
			justify-content: center;
		}
	`

	constructor() {
		super()
		this.init()
	}

	async init() {
		this.wordsService = new WordsService(
			new Date().toISOString().split('T')[0]
		) // TODO: cambiar por el dia de inicio

		await this.wordsService.getWords()
		this.guesses =
			this.wordsService.getSavedGuesses() ||
			new Array(CONSTANTS.ROWS).fill(
				new Array(CONSTANTS.COLUMNS).fill({ char: '' })
			)
		this.todayWord = this.wordsService.getTodaysWord()?.toUpperCase()
	}

	getNextPosition() {
		const rowIndex = this.guesses.findIndex(
			(guesses) =>
				guesses.some(({ char }) => char === '') ||
				guesses.every(({ status }) => status === undefined)
		)
		const columnIndex = this.guesses[rowIndex].findIndex(
			({ char }) => char === ''
		)

		return { rowIndex, columnIndex }
	}

	addChar(char) {
		const { rowIndex, columnIndex } = this.getNextPosition()

		if (rowIndex !== -1 && columnIndex !== -1) {
			const copy = CommonUtils.deepCopyArray(this.guesses)
			copy[rowIndex][columnIndex] = { char }

			this.guesses = copy
		} else {
			console.log('Validar primero')
		}
	}

	deleteChar() {
		const { rowIndex } = this.getNextPosition()

		if (rowIndex === -1) return

		const copy = CommonUtils.deepCopyArray(this.guesses)

		const columnIndex = copy[rowIndex]
			.reverse()
			.findIndex(({ char }) => char !== '')

		if (columnIndex === -1) return

		const column = copy[rowIndex].length - columnIndex - 1

		copy[rowIndex][column] = { char: '' }

		this.guesses = copy
	}

	checkGuess() {
		const { rowIndex } = this.getNextPosition()

		const wordChars = this.guesses[rowIndex].map((x) => x.char)
		const todayWordChars = this.todayWord.split('')

		const copy = CommonUtils.deepCopyArray(this.guesses)

		copy[rowIndex] = wordChars.map((char, index) => ({
			char,
			status:
				char === todayWordChars[index]
					? CONSTANTS.STATUSES.SUCCESS
					: char !== todayWordChars[index] &&
					  todayWordChars.includes(char)
					? CONSTANTS.STATUSES.WARN
					: CONSTANTS.STATUSES.NOTFOUND,
		}))

		this.guesses = copy
	}

	handleKey(key) {
		if (key.length === 1) {
			this.addChar(key)
		} else {
			switch (key) {
				case 'DEL':
					this.deleteChar()
					break
				case 'ENVIAR':
					this.checkGuess()
			}
		}
	}

	render() {
		return html`
			<section>
				<div>
					<molecule-cellgrid
						.guesses=${this.guesses}
						columns=${CONSTANTS.COLUMNS}
						rows=${CONSTANTS.ROWS}
					></molecule-cellgrid>
				</div>
				<molecule-keyboard
					.keyPlacements=${this.KeyboardKeys}
					.onKeyClick=${this.handleKey.bind(this)}
				></molecule-keyboard>
			</section>
		`
	}
}
