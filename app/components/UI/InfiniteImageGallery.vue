<script lang="ts" setup>
interface GalleryItem {
	id: number
	src: string | undefined
}

const props = defineProps<{
	items: GalleryItem[]
}>()
</script>

<template>
	<div class="flex w-full overflow-x-auto no-scrollbar gap-4">
		<div
			v-for="i in 2"
			:key="i"
			class="slider-wrapper flex items-center justify-center gap-4"
		>
			<div
				v-for="item in items"
				:key="item.id"
				class="image flex-[0_0_26em] h-full"
			>
				<NuxtImg
					:src="item.src"
					format="webp"
					class="select-none pointer-events-none"
				/>
			</div>
		</div>
	</div>
</template>

<style scoped>
.slider-wrapper {
	animation: spin 30s infinite linear;
}

@keyframes spin {
	from {
		translate: 0;
	}
	to {
		translate: -100%;
	}
}
</style>
