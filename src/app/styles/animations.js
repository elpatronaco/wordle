import { css, unsafeCSS } from 'lit'

export const pop = [
	{
		transform: 'scale(1)',
	},
	{
		transform: 'scale(1.05)',
	},
	{
		transform: 'scale(1)',
	},
]

export const statusChange = (from, to) => [
	{
		backgroundColor: from,
		transform: 'scaleY(1)',
	},
	{
		transform: 'scaleY(0)',
	},
	{
		backgroundColor: to,
		transform: 'scaleY(1)',
	},
]
