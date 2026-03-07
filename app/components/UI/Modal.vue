<script setup lang="ts">
import { onMounted, onUnmounted, watch, ref, useTemplateRef } from 'vue'
import { useElementHover } from '@vueuse/core'

const props = defineProps<{
	modelValue: boolean
	type?: 'success' | 'error'
	title: string
	message: string
}>()

const emit = defineEmits<{
	'update:modelValue': [value: boolean]
}>()

const cancelBtn = useTemplateRef<HTMLElement | null>('cancelBtn')
const isHovered = useElementHover(cancelBtn)

const close = () => {
	emit('update:modelValue', false)
}

const handleEsc = (e: KeyboardEvent) => {
	if (e.key === 'Escape' && props.modelValue) {
		close()
	}
}

onMounted(() => {
	window.addEventListener('keydown', handleEsc)
})

onUnmounted(() => {
	window.removeEventListener('keydown', handleEsc)
})

const isRendered = ref(props.modelValue)
const isOpen = ref(false)
let timeout: any = null

watch(
	() => props.modelValue,
	val => {
		if (val) {
			if (timeout) clearTimeout(timeout)
			isRendered.value = true
			if (import.meta.client) document.body.style.overflow = 'hidden'
			setTimeout(() => {
				isOpen.value = true
			}, 10)
		} else {
			isOpen.value = false
			if (import.meta.client) document.body.style.overflow = ''
			timeout = setTimeout(() => {
				isRendered.value = false
			}, 500) // matches the duration to wait until animations finish
		}
	},
	{ immediate: true },
)
</script>

<template>
	<Teleport to="body">
		<div v-if="isRendered" class="fixed inset-0 z-[1030] overflow-hidden">
			<!-- Backdrop -->
			<div
				class="absolute inset-0 bg-black/40 backdrop-blur-[8px] transition-opacity"
				:class="
					isOpen
						? 'opacity-100 duration-300 ease-in-out'
						: 'opacity-0 duration-[400ms] ease-in-out delay-[100ms]'
				"
				@click.self="close"
			></div>

			<!-- Modal Dialog -->
			<div
				class="absolute left-1/2 top-1/2 z-[1031] flex w-[90%] max-w-[600px] h-auto max-h-[85vh] sm:max-h-[600px] flex-col overflow-hidden rounded-none border border-white/10 bg-neutral-950/95 font-['Geist',_sans-serif] text-white shadow-[0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-[12px] sm:rounded-[20px] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
				:class="
					isOpen
						? 'opacity-100 pointer-events-auto'
						: 'opacity-0 pointer-events-none'
				"
				:style="{
					transform: isOpen
						? 'translate(-50%, -50%) scale(1)'
						: 'translate(-50%, -48%) scale(0.96)',
				}"
			>
				<!-- Close Button -->
				<button
					@click="close"
					class="absolute top-3 right-3 sm:top-5 sm:right-5 p-2 rounded-full text-neutral-500 hover:bg-white/10 hover:text-white transition-all duration-200 z-10 flex items-center justify-center"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="square"
							stroke-linejoin="miter"
							stroke-width="1.5"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>

				<!-- Title Section -->
				<div
					class="flex items-center border-b border-white/10 px-8 pb-5 pt-8"
				>
					<h1 class="m-0 text-[22px] font-semibold tracking-[-0.5px]">
						{{ title }}
					</h1>
				</div>

				<!-- Main Content Area -->
				<div
					class="flex flex-1 flex-col items-center justify-center overflow-y-auto p-6"
				>
					<div class="mb-6">
						<div
							v-if="type === 'success'"
							class="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10 text-green-600"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-8 w-8"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="square"
									stroke-linejoin="miter"
									stroke-width="1.5"
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</div>
						<div
							v-else
							class="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 text-red-600"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-8 w-8"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="square"
									stroke-linejoin="miter"
									stroke-width="1.5"
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
								/>
							</svg>
						</div>
					</div>

					<p
						class="max-w-md text-center text-lg font-normal text-neutral-400"
					>
						{{ message }}
					</p>

					<button
						ref="cancelBtn"
						@click="close"
						class="mt-10 px-8 py-2 bg-white text-black hover:bg-neutral-200 rounded-lg transition-colors font-medium tracking-wide text-sm uppercase"
					>
						<UIRollText :is-hovered="isHovered">
							CANCEL
						</UIRollText>
					</button>
				</div>
			</div>
		</div>
	</Teleport>
</template>
