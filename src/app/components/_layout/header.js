import { LitElement, html, css } from 'lit'
import { customElement } from 'lit-element'

@customElement('app-header')
export class HeaderElement extends LitElement {
	static styles = css`
		header {
			padding: 0.3rem 0;
			display: flex;
			justify-content: center;

			border-bottom: 1px solid #ccc;
		}

		h1 {
			margin: 0;
			letter-spacing: 0.1em;
			font-size: 1.8em;
		}

		hr {
			width: 100%;
		}
	`

	render() {
		return html` <header><h1>WORDLE (ES)</h1></header> `
	}
}
