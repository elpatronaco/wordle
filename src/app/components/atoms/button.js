import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit-element'
import { CONSTANTS } from '../../utils'

@customElement('atom-button')
export class ButtonElement extends LitElement {
	@property('string') text = ''
	@property('string') status = ''

	static styles = [
		css`
			:host {
				display: inline-block;
				height: 3.5rem;
				flex: 1 1 0%;
			}
			button {
				color: inherit;
				border: none;
				font: inherit;
				cursor: pointer;
				outline: inherit;

				width: 100%;
				height: 100%;
				padding: 0.3rem;

				font-size: 1em;
				font-weight: bold;
				text-transform: uppercase;

				display: inline-block;
				border-radius: 4px;
				background-color: var(--btn-bg);

				transition: background-color 150ms ease-in-out;
			}

			button:hover {
				cursor: pointer;
				background-color: var(--btn-bg-hover);
			}
		`,
		Object.values(CONSTANTS.STATUSES).map(
			(status) => css`
				button[status='${unsafeCSS(status)}'] {
					background-color: var(--btn-${unsafeCSS(status)}-bg);
				}
				button[status='${unsafeCSS(status)}']:hover {
					background-color: var(--btn-${unsafeCSS(status)}-bg-hover);
				}
			`
		),
	]

	render() {
		return html` <button status="${this.status}">${this.text}</button> `
	}
}
