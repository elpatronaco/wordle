import { html, css, unsafeCSS } from 'lit'
import { customElement, property, LitElement, query } from 'lit-element'
import { Animations } from '../../styles'
import { CONSTANTS } from '../../utils'

@customElement('atom-cell')
export class CellElement extends LitElement {
	@property('char') char = ''
	@property('status') status = undefined
	@property('position') position = 0

	@query('#cell') cell

	static styles = [
		css`
			:host {
				display: block;
				height: 3rem;
				width: 3rem;
			}

			div {
				border: 2px solid var(--cell-outline);
				display: inline-flex;
				justify-content: center;
				align-items: center;
				height: 100%;
				width: 100%;
				font-size: 1.2em;
				font-weight: bold;
			}

			.pop {
				animation: pop 0.3s ease-in-out;
			}

			.status-change {
				animation: status-change 0.4s ease;
			}
		`,
		Object.values(CONSTANTS.STATUSES).map(
			(status) => css`
				div[status='${unsafeCSS(status)}'] {
					border: 2px solid var(--cell-${unsafeCSS(status)}-bg);
					background-color: var(--cell-${unsafeCSS(status)}-bg);
					color: var(--text-secondary);
				}
			`
		),
	]

	render() {
		return html` <div id="cell">${this.char}</div> `
	}

	updated(changed) {
		if (changed.has('char') && this.char !== '') {
			this.cell.animate(Animations.pop, 200)
		}

		if (changed.has('status') && !!this.status) {
			setTimeout(() => {
				this.cell.animate(
					Animations.statusChange(
						'var(--cell-bg)',
						`var(--cell-${this.status}-bg)`
					),
					200
				)
				this.cell.setAttribute('status', this.status)
			}, 200 * this.position)
		}
	}
}
