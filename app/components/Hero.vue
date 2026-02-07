<script setup lang="ts">
const { gsap, CustomEase, animate } = useGSAP()
const { startEntrance } = useLoading()

const container = ref()
const title = ref()
const availabilityInfo = ref()
const sectionTitle = ref()
const gradientTitle = ref()
const heroAbout = ref()
const imageContainer = ref()
const cta = ref()

CustomEase.create(
	'smooth.out',
	'M0,0 C0.207,0.561 0.489,0.793 0.489,0.793 0.489,0.793 0.735,1 1,1 ',
)

animate(() => {
	const tl = gsap.timeline({ paused: true })

	tl.from(
		title.value.getElements(),
		{
			duration: 0.5,
			ease: 'expo.inOut',
			y: 30,
			autoAlpha: 0,
			stagger: 0.075,
			filter: 'blur(10px)',
		},
		'+=.5',
	)
		.from(
			sectionTitle.value.getElements(),
			{
				duration: 0.5,
				ease: 'expo.inOut',
				y: 30,
				autoAlpha: 0,
				stagger: 0.035,
				filter: 'blur(10px)',
			},
			'<',
		)
		.from(
			heroAbout.value.getElements(),
			{
				duration: 1,
				ease: 'expo.inOut',
				y: 30,
				autoAlpha: 0,
				stagger: 0.055,
				filter: 'blur(10px)',
			},
			'<',
		)
		.from(
			gradientTitle.value,
			{
				duration: 1.5,
				ease: 'expo.out',
				z: 500,
				rotationX: -45,
				autoAlpha: 0,
				filter: 'blur(20px)',
				scale: 1.2,
			},
			'-=0.8',
		)
		.from(
			availabilityInfo.value,
			{
				duration: 1.5,
				ease: 'expo.out',
				z: 500,
				rotationX: -45,
				autoAlpha: 0,
				filter: 'blur(20px)',
				scale: 1.2,
			},
			'<',
		)
		.fromTo(
			imageContainer.value,
			{
				clipPath: 'inset(0% 0% 100% 0%)',
			},
			{
				duration: 1.5,
				clipPath: 'inset(0% 0% 0% 0%)',
				ease: 'smooth.out',
				onComplete: () => {
					gsap.set(imageContainer.value, { clipPath: 'none' })
				},
			},
			'<',
		)
		.from(
			cta.value.$el,
			{
				duration: 1.5,
				ease: 'expo.out',
				z: 500,
				rotationX: -45,
				autoAlpha: 0,
				filter: 'blur(20px)',
				scale: 1.2,
			},
			'-=.5',
		)

	watch(
		startEntrance,
		shouldStart => {
			if (shouldStart && tl) {
				tl.play()
			}
		},
		{ immediate: true },
	)
}, container?.value)
</script>

<template>
	<section
		ref="container"
		class="section-container relative w-full min-h-screen flex flex-col justify-end pb-20 pt-32 overflow-hidden mb-40"
	>
		<div
			class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0"
		>
			<UISplitText
				ref="title"
				as="h1"
				class="text-[18vw] leading-none font-semibold text-white/5 tracking-tighter mix-blend-overlay"
			>
				Julianna
			</UISplitText>
		</div>

		<div
			class="container mx-auto px-6 lg:px-12 relative z-10 grid lg:grid-cols-12 gap-12 items-end"
		>
			<div class="lg:col-span-5 mb-10 lg:mb-20">
				<div
					ref="availabilityInfo"
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
						>Available for Work</span
					>
				</div>
				<UISplitText
					ref="sectionTitle"
					as="h1"
					class="section-title text-5xl lg:text-7xl font-medium text-white tracking-tighter leading-[1.1]"
				>
					Sales Manager <br />
					based <br />
				</UISplitText>
				<h2
					ref="gradientTitle"
					class="gradient-wrapper text-5xl lg:text-7xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-brand-500 to-white"
				>
					in Armenia
				</h2>
			</div>

			<div
				ref="imageContainer"
				class="image-container lg:col-span-4 relative flex justify-center lg:justify-end lg:-mb-20"
			>
				<div
					class="relative w-full max-w-md aspect-[3/4] rounded-t-[10rem] overflow-hidden bg-neutral-900 border-x border-t border-white/10 shadow-2xl shadow-brand-500/10"
				>
					<NuxtImg
						format="webp"
						src="/julianna.jpg"
						alt="Julianna Portrait"
						class="object-cover w-full h-full opacity-90"
					/>
					<div
						class="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80"
					></div>
					<div
						class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-dark-500 to-transparent"
					></div>
				</div>
			</div>

			<div class="lg:col-span-3 mb-10 lg:mb-24 flex flex-col items-start">
				<UISplitText
					as="p"
					type="words"
					inner-class="split-word"
					ref="heroAbout"
					class="text-lg text-neutral-400 mb-8 leading-relaxed"
				>
					Hi, I'm Julianna. A passionate brand designer crafting
					seamless digital experiences that connect and convert.
				</UISplitText>
				<UIButton ref="cta" v-roll-text class="uppercase"
					>See My Works</UIButton
				>
			</div>
		</div>
	</section>
</template>

<style scoped>
.section-container {
	perspective: 1200px;
}

.image-container {
	will-change: clip-path, transform, opacity;
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
