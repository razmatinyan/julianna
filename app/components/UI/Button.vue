<template>
	<component
		:is="as"
		class="group"
		@mouseenter="isHovered = true"
		@mouseleave="isHovered = false"
	>
		<span class="dot"></span>
		<span class="button-text font-medium text-sm">
			<UIRollText ref="rollingText" :is-hovered="isHovered">
				<slot></slot>
			</UIRollText>
		</span>
		<span v-if="icon" class="icon">
			<Icon :name="icon" class="block w-4 h-4"></Icon>
		</span>
	</component>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

interface Props {
	as?: Component | string
	icon?: string
}

const { as = 'button', icon = 'lucide:arrow-right' } = defineProps<Props>()
const rollingText = ref()
const isHovered = ref(false)
</script>

<style scoped>
button {
	padding: 1em 1.5em 1em 1.625em;

	@apply relative flex items-center h-[3rem] w-fit gap-4;
	@apply font-medium text-white shadow-lg shadow-brand-500/20 bg-brand-600;
	@apply rounded-full overflow-hidden will-change-transform;
	@apply transition-colors duration-200 ease-button;
}

button:hover {
	@apply text-dark-500;
}

.button-text {
	transition:
		color 0.5s cubic-bezier(0.35, 0, 0, 1),
		transform 0.4s cubic-bezier(0.35, 0, 0, 1);

	@apply relative z-[1];
}

button:hover .button-text {
	transform: translate3d(-1.5em, 0px, 0px);
}

.dot {
	@apply relative inline-block w-2 h-2 rounded-full bg-white;
	@apply [transition:background_0.5s,transform_0.4s] ease-button z-[1];
}
button:hover .dot {
	transform: translate3d(4em, 0px, 0px) scale(32);
}

.icon {
	transform: translate3d(3em, 0px, 0px);
	transition: transform 0.4s cubic-bezier(0.4, 0, 0, 1);

	@apply absolute right-4 flex justify-center items-center w-5 h-5 z-[1];
	@apply rounded-full;
}

button:hover .icon {
	transform: translateZ(0px);
}
</style>
