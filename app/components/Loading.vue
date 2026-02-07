<script setup lang="ts">
const { isLoaded, isTransitioned, startEntrance } = useLoading()
const { gsap } = useGSAP()

const overlay = ref(null)

watch(isLoaded, ready => {
	if (ready) {
		const tl = gsap.timeline({
			onComplete: () => {
				isTransitioned.value = true
			},
		})

		tl.to(overlay.value, {
			yPercent: -100,
			duration: 1.2,
			ease: 'expo.inOut',
			onStart: () => {
				startEntrance.value = true
			},
		})
	}
})
</script>

<template>
	<div ref="overlay" class="loading-screen">
		<div class="loader-content">
			<h2 class="text-black font-bold tracking-widest text-4xl">
				WELCOME
			</h2>
		</div>
	</div>
</template>

<style scoped>
.loading-screen {
	position: fixed;
	inset: 0;
	z-index: 9999;
	background-color: #ffffff; /* Pure white background */
	display: flex;
	align-items: center;
	justify-content: center;
}

.loader-content {
	text-align: center;
}
</style>

<!-- <script setup lang="ts">
const { isLoaded, startEntrance, isTransitioned } = useLoading()
const { gsap } = useGSAP()
const overlay = ref(null)

watch(isLoaded, ready => {
	if (ready) {
		const tl = gsap.timeline({
			onComplete: () => {
				isTransitioned.value = true
			},
		})

		tl.to(overlay.value, {
			yPercent: -100,
			duration: 1.2,
			ease: 'expo.inOut',
		}).call(
			() => {
				startEntrance.value = true
			},
			[],
			'-=0.5',
		)
	}
})
</script> -->
