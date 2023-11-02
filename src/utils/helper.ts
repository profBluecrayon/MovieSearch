import { NestedObject } from 'helpers/types'

export const flattenObject = (obj: NestedObject) => {
	const flattened: Record<string, string> = {}

	Object.keys(obj).forEach((key) => {
		if (typeof obj[key] === 'object' && obj[key] !== null) {
			Object.assign(flattened, flattenObject(obj[key]))
		} else {
			flattened[key] = obj[key]
		}
	})

	return flattened
}
