<script setup lang="ts">
const { isLoaded, isTransitioned, startEntrance } = useLoading()
const { gsap, CustomEase } = useGSAP()

CustomEase.create('hop', '0.9, 0, 0.1, 1')

const overlay = ref()

watch(isLoaded, ready => {
	if (ready) {
		const tl = gsap.timeline({
			delay: 0.3,
			defaults: {
				ease: 'hop',
			},
			onComplete: () => {
				isTransitioned.value = true
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
	<div ref="overlay" class="loader">
		<div class="overlay">
			<div class="overlay-block"></div>
			<div class="overlay-block"></div>
		</div>
		<div class="divider"></div>
		<div class="spinner-container">
			<div class="spinner"></div>
		</div>
	</div>
</template>

<style scoped>
.loader {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100svh;
	overflow: hidden;
	@apply z-50 pointer-events-none;
}

.overlay {
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
	display: flex;
}

.overlay-block {
	width: 100%;
	height: 100%;
	clip-path: polygon(0% 0%, 100% 0, 100% 100%, 0% 100%);
	@apply bg-slate-100;
}

.divider {
	position: absolute;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	transform-origin: center top;
	width: 1px;
	height: 100%;
	transform: scaleY(0%);

	@apply bg-dark-500;
}

.spinner-container {
	position: absolute;
	bottom: 10%;
	left: 50%;
	transform: translateX(-50%);
}

.spinner {
	width: 50px;
	height: 50px;
	border: 1.4px solid #0a0a0a;
	border-top-color: rgba(0, 0, 0, 0.125);
	border-radius: 50%;
	animation: spin 1s linear infinite;
}

@keyframes spin {
	to {
		transform: rotate(360deg);
	}
}
</style>
