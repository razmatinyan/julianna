<script setup lang="ts">
import { useElementHover } from '@vueuse/core'

interface FooterLinkProps {
	link: {
		name: string
		url: string
	}
}

const props = defineProps<FooterLinkProps>()

const el = useTemplateRef<HTMLElement>('linkRef')
const isHovered = useElementHover(el)
</script>

<template>
	<NuxtLink
		ref="linkRef"
		:to="link.url"
		:aria-label="link.name"
		class="relative flex items-center gap-1 group text-neutral-400 hover:text-white transition-colors duration-300 z-10 whitespace-nowrap"
	>
		<UIRollText :is-hovered="isHovered">
			{{ link.name }}
		</UIRollText>
		<Icon
			name="lucide:arrow-up-right"
			class="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity"
		/>
		<span
			class="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-white transition-all duration-300 ease-out group-hover:w-full"
		></span>
	</NuxtLink>
</template>
