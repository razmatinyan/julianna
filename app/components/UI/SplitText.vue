<script setup lang="ts">
import type { Component } from 'vue'

interface Props {
	as?: Component | string
	type?: 'chars' | 'words' | 'lines'
	innerClass?: string
}

const {
	as = 'div',
	type = 'chars',
	innerClass = 'split-item',
} = defineProps<Props>()

const { SplitText } = useGSAP()
const textRef = useTemplateRef<HTMLElement | null>('textRef')
let splitInstance: SplitText | null = null

onMounted(() => {
	if (!textRef.value) return

	splitInstance = new SplitText(textRef.value, {
		type,
		[`${type}Class`]: innerClass,
	})
})

defineExpose({
	getElements: (): HTMLElement[] => {
		if (!splitInstance) return []

		const elements = splitInstance[type as keyof SplitText]
		return Array.isArray(elements) ? (elements as HTMLElement[]) : []
	},
})
</script>

<template>
	<component :is="as" ref="textRef">
		<slot />
	</component>
</template>
