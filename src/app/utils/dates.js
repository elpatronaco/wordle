export function daysBetween(date1, date2) {
	const ms =
		(typeof date2 === 'string' ? new Date(date2) : date2).getTime() -
		(typeof date1 === 'string' ? new Date(date1) : date1).getTime()
	return ms / 1000 / 60 / 60 / 24
}
