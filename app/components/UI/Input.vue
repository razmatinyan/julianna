<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
	id: string
	label: string
	type?: string
	error?: string
}>()

const model = defineModel<string>()

const isFocused = ref(false)

const isActive = computed(() => {
	return (
		isFocused.value ||
		(model.value && model.value.toString().trim().length > 0)
	)
})
</script>

<template>
	<div class="relative w-full pb-6 group">
		<input
			:id="id"
			:type="type || 'text'"
			v-model="model"
			@focus="isFocused = true"
			@blur="isFocused = false"
			class="peer w-full bg-white/5 border border-white/10 rounded-sm px-4 py-4 text-neutral-200 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-500 placeholder-transparent"
			:class="{ '!border-red-500/50 focus:!border-red-500': error }"
		/>

		<label
			:for="id"
			class="absolute left-4 top-4 text-neutral-500 transition-all duration-500 pointer-events-none transform origin-left px-1 backdrop-blur-md bg-neutral-950/80 rounded"
			:class="[
				isActive
					? '-translate-y-7 scale-75 text-neutral-300'
					: 'translate-y-0 scale-100',
				error ? '!text-red-400' : '',
			]"
		>
			{{ label }}
		</label>

		<Transition
			enter-active-class="transition duration-300 ease-out"
			enter-from-class="opacity-0 -translate-y-1"
			enter-to-class="opacity-100 translate-y-0"
			leave-active-class="transition duration-200 ease-in"
			leave-from-class="opacity-100 translate-y-0"
			leave-to-class="opacity-0 -translate-y-1"
		>
			<p
				v-if="error"
				class="absolute bottom-1 left-2 text-xs text-red-500/80 font-light tracking-wide"
			>
				{{ error }}
			</p>
		</Transition>
	</div>
</template>
