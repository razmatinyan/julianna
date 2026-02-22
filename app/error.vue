<script setup lang="ts">
import type { NuxtError } from '#app'
import { UISplitText, UIGradientText, UIButton } from '~/components/UI/'
import { useHead } from '#imports'

const props = defineProps({
	error: Object as () => NuxtError,
})

useHead({
	title: `${props.error?.statusCode || 'Error'} | Page Not Found`,
})

const handleError = () => clearError({ redirect: '/' })

const { $lenis } = useNuxtApp()

const { startEntrance, finishLoading, isTransitioned } = useLoading()
onMounted(() => {
	if ($lenis) {
		// @ts-ignore
		$lenis.scrollTo(0, { immediate: true })
	}
	nextTick(() => {
		isTransitioned.value = true
		finishLoading()
		startEntrance.value = true
	})
})

const { gsap, CustomEase, animate } = useGSAP()

const container = useTemplateRef<HTMLElement | null>('container')
const errorBackgroundText = useTemplateRef<InstanceType<
	typeof UISplitText
> | null>('errorBackgroundText')
const errorTitle = useTemplateRef<InstanceType<typeof UIGradientText> | null>(
	'errorTitle',
)
const errorDescription = useTemplateRef<InstanceType<
	typeof UISplitText
> | null>('errorDescription')
const cta = useTemplateRef<InstanceType<typeof UIButton> | null>('cta')

animate(() => {
	CustomEase.create(
		'smooth.out',
		'M0,0 C0.207,0.561 0.489,0.793 0.489,0.793 0.489,0.793 0.735,1 1,1 ',
	)

	const tl = gsap.timeline()

	tl.from(errorBackgroundText.value!.getElements(), {
		duration: 0.8,
		ease: 'expo.inOut',
		y: 30,
		autoAlpha: 0,
		stagger: 0.05,
		filter: 'blur(10px)',
	})
		.from(
			errorTitle.value!.$el,
			{
				duration: 1.5,
				ease: 'expo.out',
				z: 500,
				rotationX: -45,
				autoAlpha: 0,
				filter: 'blur(20px)',
				scale: 1.2,
			},
			'-=0.6',
		)
		.from(
			errorDescription.value!.getElements(),
			{
				duration: 1,
				ease: 'expo.inOut',
				y: 30,
				autoAlpha: 0,
				stagger: 0.05,
				filter: 'blur(10px)',
			},
			'-=1.2',
		)
		.from(
			cta.value!.$el,
			{
				duration: 1.5,
				ease: 'expo.out',
				z: 500,
				rotationX: -45,
				autoAlpha: 0,
				filter: 'blur(20px)',
				scale: 1.2,
			},
			'-=1.0',
		)
}, container.value)
</script>

<template>
	<div
		class="flex flex-col min-h-screen w-full relative isolate bg-[#0a0a0a] text-white"
	>
		<NavigationBar :force-external="true" />

		<div
			id="__layout"
			class="flex flex-col justify-center items-center relative w-full h-[100svh] overflow-hidden px-6 lg:px-12 section-container"
			ref="container"
		>
			<div
				class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex justify-center items-center text-center pointer-events-none select-none z-0"
			>
				<UISplitText
					ref="errorBackgroundText"
					as="h1"
					class="text-[25vw] leading-none font-semibold text-white/5 tracking-tighter mix-blend-overlay"
				>
					{{ error?.statusCode || '404' }}
				</UISplitText>
			</div>

			<div
				class="relative z-10 flex flex-col items-center justify-center text-center mt-20"
			>
				<UIGradientText
					as="h2"
					ref="errorTitle"
					class="gradient-wrapper text-5xl lg:text-7xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-brand-500 to-white mb-6"
				>
					{{
						error?.statusCode === 404
							? 'Page Not Found'
							: 'An Error Occurred'
					}}
				</UIGradientText>

				<UISplitText
					as="p"
					type="words"
					ref="errorDescription"
					class="text-xl lg:text-2xl text-neutral-400 mb-12 leading-relaxed max-w-2xl"
				>
					{{
						error?.message ||
						"The page you are looking for doesn't exist or has been moved."
					}}
				</UISplitText>

				<UIButton
					ref="cta"
					@click="handleError"
					class="uppercase lg:mt-4"
				>
					Back to Home
				</UIButton>
			</div>
		</div>

		<NavigationFooter />
	</div>
</template>

<style scoped>
.section-container {
	perspective: 1200px;
}

.gradient-wrapper {
	display: inline-block;
	transform-style: preserve-3d;
	will-change: transform, opacity, filter;
	backface-visibility: hidden;
}

button {
	overflow: hidden;
	transform-origin: center;
	will-change: transform;
}
</style>
