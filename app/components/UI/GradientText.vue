<template>
	<component
		:is="as"
		ref="gradientTitle"
		class="gradient-wrapper text-5xl lg:text-7xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-brand-500 to-white"
	>
		<slot></slot>
	</component>
</template>

<script setup lang="ts">
interface Props {
	as?: string
}

const { as = 'div' } = defineProps<Props>()
</script>
