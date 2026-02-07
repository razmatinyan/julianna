<script setup lang="ts">
interface Props {
	as?: string
	type?: 'chars' | 'words' | 'lines'
	innerClass?: string
}

const {
	as = 'div',
	type = 'chars',
	innerClass = 'split-item',
} = defineProps<Props>()

const { SplitText } = useGSAP()
const textRef = ref<HTMLElement | null>(null)
let splitInstance: any = null

onMounted(() => {
	if (!textRef.value) return

	splitInstance = new SplitText(textRef.value, {
		type,
		[`${type}Class`]: innerClass,
	})
})

defineExpose({
	getElements: () => splitInstance?.[type] || [],
})
</script>

<template>
	<component :is="as" ref="textRef">
		<slot />
	</component>
</template>
