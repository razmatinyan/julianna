<script lang="ts" setup>
interface Props {
	title: string
	description: string
}

const props = defineProps<Props>()
</script>

<template>
	<div class="feature space-y-2">
		<div class="feature-line h-px w-full bg-white/10 mb-4"></div>
		<h3 class="feature-title text-white font-medium text-lg">
			{{ title }}
		</h3>
		<p class="feature-description text-neutral-500 text-sm">
			{{ description }}
		</p>
	</div>
</template>

<style scoped>
.feature-line {
	will-change: transform;
}
</style>
