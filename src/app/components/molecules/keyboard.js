import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit-element'
import '../atoms/button'

@customElement('molecule-keyboard')
export class KeyboardElement extends LitElement {
	@property('keyPlacements') keyPlacements
	@property('onKeyClick') onKeyClick

	static styles = css`
		.col {
			display: flex;
			flex-direction: column;
			gap: 5px;
		}

		.row {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			gap: 5px;
		}
	`

	handleClick(e, key) {
		e.stopPropagation()

		this.onKeyClick(key)
	}

	render() {
		return html`
			<div class="col">
				${this.keyPlacements.map(
					(keys) =>
						html`<div class="row">
							${keys.map(
								(key) => html`<atom-button
									text="${key}"
									@click=${(e) => this.handleClick(e, key)}
								></atom-button>`
							)}
						</div>`
				)}
			</div>
		`
	}
}
