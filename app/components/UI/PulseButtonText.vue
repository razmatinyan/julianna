<script lang="ts" setup></script>

<template>
	<div
		ref="root"
		class="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 mb-8"
	>
		<span class="relative flex h-2 w-2">
			<span
				class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75"
			></span>
			<span
				class="relative inline-flex rounded-full h-2 w-2 bg-brand-500"
			></span>
		</span>
		<span
			class="text-xs font-medium text-neutral-300 tracking-wide uppercase"
		>
			<slot />
		</span>
	</div>
</template>
