import { LitElement, html, css } from 'lit'
import { customElement } from 'lit-element'
import { lsService, LocalStorageService } from '../../services/localService'
import '../_layout/header'
import '../templates/game'
import '../atoms/button'

@customElement('app-root')
export class AppRoot extends LitElement {
	static properties = {
		_darkMode: { type: Boolean, state: true },
		_lang: { type: String, state: true },
	}

	static styles = css`
		:host {
			display: flex;
			justify-content: center;
			width: 100%;
		}

		main {
			width: 100%;
			max-width: 512px;
			margin: 0 auto;
			height: 100vh;

			background-color: var(--main-bg);

			display: flex;
			flex-direction: column;
		}

		main:nth-child(1) {
			flex: 1 1 auto;
		}

		main:nth-child(2) {
			flex-grow: 1;
		}
	`

	connectedCallback() {
		super.connectedCallback()
		this.initState()
	}

	initState() {
		this.updateDarkMode()
		this._lang = lsService.get(LocalStorageService.KEYS.LANG || 'en')
	}

	updateDarkMode() {
		this._darkMode =
			lsService.get(LocalStorageService.KEYS.DARKMODE) === true
		this.setDarkMode(this._darkMode)
	}

	setDarkMode(value) {
		document
			.querySelector('body')
			?.classList[value ? 'add' : 'remove']('dark')
	}

	render() {
		return html`
			<main>
				<app-header></app-header>
				<app-game></app-game>
			</main>
		`
	}
}
