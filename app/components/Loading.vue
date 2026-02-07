<script setup lang="ts">
const { isLoaded, isTransitioned, startEntrance, finishLoading } = useLoading()
const { gsap, CustomEase } = useGSAP()

CustomEase.create('hop', '0.9, 0, 0.1, 1')

watch(isLoaded, ready => {
	if (ready) {
		const tl = gsap.timeline({
			delay: 0.3,
			defaults: {
				ease: 'hop',
			},
			onComplete: () => {
				isTransitioned.value = true
				finishLoading()
			},
		})

		tl.to('.spinner', {
			opacity: 0,
			duration: 0.3,
		})

		tl.to('.divider', {
			scaleY: '100%',
			duration: 1,
			onComplete: () => {
				gsap.to('.divider', { opacity: 0, duration: 0.4, delay: 0.3 })
			},
		})

		tl.to('.overlay-block', {
			clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
			duration: 1,
			stagger: 0.1,
			delay: 0.75,
			onStart: () => {
				startEntrance.value = true
			},
		})
	}
})
</script>

<template>
	<div
		class="loader fixed top-0 left-0 w-[100vw] h-[100svh] overflow-hidden z-50 pointer-events-none"
	>
		<div class="overlay absolute top-0 w-full h-full flex">
			<div class="overlay-block w-full h-full bg-slate-100"></div>
			<div class="overlay-block w-full h-full bg-slate-100"></div>
		</div>
		<div
			class="divider absolute top-0 left-1/2 -translate-x-1/2 origin-top w-px h-full scale-y-0 bg-dark-500"
		></div>
		<div
			class="spinner-container absolute bottom-[10%] left-1/2 -translate-x-1/2"
		>
			<div
				class="spinner w-[50px] h-[50px] border-[1.4px] border-solid border-dark-500 border-t-dark-500/10 rounded-full animate-spin"
			></div>
		</div>
	</div>
</template>

<style scoped>
.overlay-block {
	clip-path: polygon(0% 0%, 100% 0, 100% 100%, 0% 100%);
}

@keyframes spin {
	to {
		transform: rotate(360deg);
	}
}
</style>
