import { type Slots, type VNode } from 'vue'

export const getSlotText = (slots: Slots): string => {
	const children = slots.default?.()
	if (!children) return ''

	const extract = (nodes: VNode[]): string => {
		return nodes
			.map(node => {
				if (typeof node.children === 'string') return node.children
				if (Array.isArray(node.children)) {
					return extract(node.children as VNode[])
				}
				return ''
			})
			.join('')
	}

	return extract(children).trim()
}
