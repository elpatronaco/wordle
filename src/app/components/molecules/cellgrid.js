import { html, css } from 'lit'
import { customElement, property, LitElement } from 'lit-element'
import '../atoms/cell'

@customElement('molecule-cellgrid')
export class CellGridElement extends LitElement {
	@property({ type: Array }) guesses = []
	@property({ type: Number }) columns = 0
	@property({ type: Number }) rows = 0

	static styles = css`
		:host {
			width: fit-content;
			height: fit-content;
		}

		div {
			display: grid;
			gap: 8px;
		}
	`

	render() {
		return html`
			<style>
				div {
					grid-template-columns: repeat(${this.columns}, 1fr);
					grid-template-rows: repeat(${this.rows}, 1fr);
				}
			</style>
			<div>
				${this.guesses.map((row) =>
					row.map(
						({ char, status }, index) =>
							html`<atom-cell
								char="${char}"
								status="${status}"
								position="${index}"
							></atom-cell>`
					)
				)}
			</div>
		`
	}
}
