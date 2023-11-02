export interface NestedObject {
	[key: string]: NestedObject & string
}
