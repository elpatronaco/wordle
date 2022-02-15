export const deepCopyArray = (arr) => {
	return arr.map((x) => x.slice())
}
