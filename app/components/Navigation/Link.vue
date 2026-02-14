<script setup lang="ts">
import { useElementHover } from '@vueuse/core'

interface LinkProps {
	link: {
		name: string
		href: string
	}
}

const props = defineProps<LinkProps>()

const el = useTemplateRef<HTMLElement>('linkRef')
const isHovered = useElementHover(el)
</script>

<template>
	<NuxtLink
		ref="linkRef"
		:to="link.href"
		class="text-sm font-medium text-neutral-400 hover:text-white transition-colors mr-6 last:mr-0"
	>
		<UIRollText :is-hovered="isHovered">
			{{ link.name }}
		</UIRollText>
	</NuxtLink>
</template>

<style scoped>
.router-link-active {
	@apply text-white;
}
</style>
