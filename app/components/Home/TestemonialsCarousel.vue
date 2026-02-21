<script setup lang="ts">
import { useTemplateRef } from 'vue'

const props = defineProps<{
	reviews: Array<{
		id: number | string
		name: string
		role: string
		text: string
		image: string
	}>
}>()

const { animate, gsap } = useGSAP()
const wrapperRef = useTemplateRef<HTMLElement | null>('wrapperRef')
const carouselRef = useTemplateRef<HTMLElement | null>('carouselRef')
const canScrollLeft = ref(false)
const canScrollRight = ref(true)

const checkScroll = () => {
	if (!carouselRef.value) return
	const { scrollLeft, scrollWidth, clientWidth } = carouselRef.value
	canScrollLeft.value = scrollLeft > 0
	canScrollRight.value = Math.ceil(scrollLeft + clientWidth) < scrollWidth
}

let autoScrollInterval: ReturnType<typeof setInterval> | null = null

const startAutoScroll = () => {
	autoScrollInterval = setInterval(() => {
		if (canScrollRight.value) {
			scrollNext()
		} else {
			if (carouselRef.value) {
				carouselRef.value.scrollTo({ left: 0, behavior: 'smooth' })
			}
		}
	}, 4000)
}

const stopAutoScroll = () => {
	if (autoScrollInterval) clearInterval(autoScrollInterval)
}

animate(() => {
	gsap.from('.testimonial-card-item', {
		scrollTrigger: {
			trigger: wrapperRef.value,
			start: 'top 80%',
		},
		y: 50,
		autoAlpha: 0,
		stagger: 0.1,
		duration: 1,
		ease: 'power3.out',
	})
}, wrapperRef)

onMounted(() => {
	if (carouselRef.value) {
		carouselRef.value.addEventListener('scroll', checkScroll)
		checkScroll()
		startAutoScroll()
	}
})

onUnmounted(() => {
	if (carouselRef.value) {
		carouselRef.value.removeEventListener('scroll', checkScroll)
	}
	stopAutoScroll()
})

const scrollNext = () => {
	if (carouselRef.value) {
		const itemWidth = carouselRef.value.children[0]?.clientWidth ?? 350
		carouselRef.value.scrollBy({ left: itemWidth + 24, behavior: 'smooth' }) // Account for gap
	}
}

const scrollPrev = () => {
	if (carouselRef.value) {
		const itemWidth = carouselRef.value.children[0]?.clientWidth ?? 350
		carouselRef.value.scrollBy({
			left: -(itemWidth + 24),
			behavior: 'smooth',
		})
	}
}
</script>

<template>
	<div class="relative w-full" ref="wrapperRef">
		<!-- Carousel Wrapper with Edge Masking -->
		<div class="relative -mx-6 lg:-mx-12 mask-edges">
			<!-- Carousel Container -->
			<div
				ref="carouselRef"
				class="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 pt-4 px-6 lg:px-12 items-stretch"
				@mouseenter="stopAutoScroll"
				@mouseleave="startAutoScroll"
				@touchstart="stopAutoScroll"
				@touchend="startAutoScroll"
			>
				<div
					v-for="review in reviews"
					:key="review.id"
					class="testimonial-card-item w-[85vw] md:w-[400px] flex-shrink-0 snap-center"
				>
					<HomeTestemonialCard
						:name="review.name"
						:role="review.role"
						:text="review.text"
						:image="review.image"
					/>
				</div>
			</div>
		</div>

		<!-- Navigation Controls -->
		<div class="flex justify-end items-center mt-2 gap-4">
			<button
				@click="scrollPrev"
				:disabled="!canScrollLeft"
				class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white bg-neutral-900/50 hover:bg-white hover:text-black transition-all hover:scale-105 focus:ring-2 focus:ring-brand-500 disabled:opacity-30 disabled:hover:bg-neutral-900 disabled:hover:scale-100 disabled:hover:text-white disabled:cursor-not-allowed backdrop-blur-sm"
				aria-label="Previous Testimonial"
			>
				<Icon name="lucide:chevron-left" class="w-5 h-5" />
			</button>
			<button
				@click="scrollNext"
				:disabled="!canScrollRight"
				class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white bg-neutral-900/50 hover:bg-white hover:text-black transition-all hover:scale-105 focus:ring-2 focus:ring-brand-500 disabled:opacity-30 disabled:hover:bg-neutral-900 disabled:hover:scale-100 disabled:hover:text-white disabled:cursor-not-allowed backdrop-blur-sm"
				aria-label="Next Testimonial"
			>
				<Icon name="lucide:chevron-right" class="w-5 h-5" />
			</button>
		</div>
	</div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
	display: none;
}
.scrollbar-hide {
	-ms-overflow-style: none;
	scrollbar-width: none;
}
.mask-edges {
	mask-image: linear-gradient(
		to right,
		transparent,
		black 8%,
		black 92%,
		transparent
	);
	-webkit-mask-image: linear-gradient(
		to right,
		transparent,
		black 8%,
		black 92%,
		transparent
	);
}
@media (min-width: 1024px) {
	.mask-edges {
		mask-image: linear-gradient(
			to right,
			transparent,
			black 5%,
			black 95%,
			transparent
		);
		-webkit-mask-image: linear-gradient(
			to right,
			transparent,
			black 5%,
			black 95%,
			transparent
		);
	}
}
</style>
