<script setup lang="ts">
defineProps<{
	name: string
	role: string
	text: string
	image: string
}>()
</script>

<template>
	<div
		class="relative bg-neutral-900 border border-white/5 rounded-3xl p-8 hover:border-brand-500/50 hover:bg-neutral-800/80 transition-all duration-500 group overflow-hidden flex flex-col justify-between h-full"
	>
		<!-- Decorative Background Glow -->
		<div
			class="absolute -top-12 -right-12 w-40 h-40 bg-brand-500/20 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
		></div>

		<div>
			<!-- Quote Icon -->
			<div
				class="mb-6 opacity-30 group-hover:opacity-60 transition-all duration-700 ease-out transform group-hover:scale-110 group-hover:-translate-y-1 origin-top-left"
			>
				<Icon
					name="lucide:quote"
					class="text-brand-500 w-10 h-10 transform scale-x-[-1]"
				/>
			</div>

			<p
				class="text-neutral-300 mb-8 text-lg font-light leading-relaxed relative z-10"
			>
				"{{ text }}"
			</p>
		</div>

		<div
			class="flex items-center gap-4 relative z-10 mt-auto pt-6 border-t border-white/5 group-hover:border-white/10 transition-colors duration-500"
		>
			<img
				:src="image"
				:alt="name"
				class="w-12 h-12 rounded-full object-cover border border-white/10 group-hover:border-brand-500/50 transition-colors duration-500"
			/>
			<div>
				<h5
					class="text-white font-medium text-sm group-hover:text-brand-400 transition-colors duration-300"
				>
					{{ name }}
				</h5>
				<p class="text-neutral-500 text-xs mt-0.5">
					{{ role }}
				</p>
			</div>
		</div>
	</div>
</template>
