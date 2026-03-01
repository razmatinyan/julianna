<script lang="ts" setup>
import { UISplitText, UIGradientText } from '~/components/UI/'

useSeoMeta({
	title: 'About Julianna Gharibyan | Sales Manager in Armenia',
	description:
		'Discover the professional journey of Julianna Gharibyan, a data-driven Sales Manager specializing in B2B partnerships, revenue growth, and strategic market expansion.',
	ogTitle: 'About Julianna Gharibyan | Expert Sales Manager',
	ogDescription:
		'Discover the professional journey of Julianna Gharibyan, a data-driven Sales Manager specializing in B2B partnerships, revenue growth, and strategic market expansion.',
	ogImage: '/julianna.jpg',
	twitterCard: 'summary_large_image',
	twitterTitle: 'Julianna Gharibyan | B2B Sales Manager',
	twitterDescription:
		'Results-driven Sales Manager based in Armenia, specializing in B2B growth, strategic client acquisition, and revenue scaling.',
	twitterImage: '/julianna.jpg',
})

const { gsap, CustomEase, animate } = useGSAP()
const { startEntrance } = useLoading()

const container = useTemplateRef<HTMLElement | null>('container')
const pageTitle = useTemplateRef<InstanceType<typeof UISplitText> | null>(
	'pageTitle',
)
const gradientText = useTemplateRef<InstanceType<typeof UIGradientText> | null>(
	'gradientText',
)
const aboutText = useTemplateRef<InstanceType<typeof UISplitText> | null>(
	'aboutText',
)
const expertiseTitle = useTemplateRef<InstanceType<typeof UISplitText> | null>(
	'expertiseTitle',
)
const imageContainer = useTemplateRef<HTMLElement | null>('imageContainer')

const experienceData = [
	{
		id: useId(),
		title: 'Sales Strategy',
		description:
			'Developing and executing comprehensive sales plans that align with organizational goals. Expertise in pipeline management, forecasting, and driving market expansion.',
	},
	{
		id: useId(),
		title: 'B2B Client Relations',
		description:
			'Forging and nurturing long-term partnerships with enterprise clients. Skilled in account management, high-stakes negotiation, and ensuring mutual success.',
	},
	{
		id: useId(),
		title: 'Revenue Growth',
		description:
			'A proven track record of consistently exceeding targets. I leverage data analytics and market trends to identify new opportunities and maximize revenue generation.',
	},
	{
		id: useId(),
		title: 'Team Leadership',
		description:
			'Mentoring and aligning cross-functional teams to streamline processes, improve client satisfaction, and create a cohesive, high-performing sales culture.',
	},
]

animate(() => {
	CustomEase.create(
		'smooth.out',
		'M0,0 C0.207,0.561 0.489,0.793 0.489,0.793 0.489,0.793 0.735,1 1,1 ',
	)

	const tl = gsap.timeline({ paused: true })

	tl.from(
		pageTitle.value!.getElements(),
		{
			duration: 0.8,
			ease: 'expo.inOut',
			y: 30,
			autoAlpha: 0,
			stagger: 0.05,
			filter: 'blur(10px)',
		},
		'+=.3',
	)
		.from(
			gradientText.value!.$el,
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
			aboutText.value!.getElements(),
			{
				duration: 0.8,
				ease: 'expo.inOut',
				y: 20,
				autoAlpha: 0,
				stagger: 0.03,
				filter: 'blur(10px)',
			},
			'-=1',
		)
		.fromTo(
			imageContainer.value,
			{
				clipPath: 'inset(100% 0% 0% 0%)',
			},
			{
				duration: 1.5,
				clipPath: 'inset(0% 0% 0% 0%)',
				ease: 'smooth.out',
				onComplete: () => {
					gsap.set(imageContainer.value, { clipPath: 'none' })
				},
			},
			'-=1.2',
		)

	gsap.from(expertiseTitle.value!.getElements(), {
		scrollTrigger: {
			trigger: expertiseTitle.value!.$el,
			start: 'top 85%',
		},
		duration: 0.8,
		ease: 'expo.inOut',
		y: 30,
		autoAlpha: 0,
		stagger: 0.05,
		filter: 'blur(10px)',
	})

	// Experience sections scroll animation
	const features = container.value?.querySelectorAll('.feature')
	if (features) {
		features.forEach((feature: Element) => {
			const line = feature.querySelector('.feature-line')
			const title = feature.querySelector('.feature-title')
			const desc = feature.querySelector('.feature-description')

			gsap.from(line, {
				scrollTrigger: {
					trigger: feature,
					start: 'top 85%',
				},
				scaleX: 0,
				transformOrigin: 'left center',
				duration: 0.8,
				ease: 'power2.inOut',
			})
			gsap.from([title, desc], {
				scrollTrigger: {
					trigger: feature,
					start: 'top 85%',
				},
				y: 15,
				scale: 1.05,
				filter: 'blur(20px)',
				autoAlpha: 0,
				stagger: 0.1,
				duration: 0.6,
				delay: 0.2,
			})
		})
	}

	watch(
		startEntrance,
		shouldStart => {
			if (shouldStart && tl) {
				tl.play()
			}
		},
		{ immediate: true },
	)
}, container.value)
</script>

<template>
	<div
		ref="container"
		class="pb-32 pt-32 lg:pt-48 overflow-hidden min-h-screen"
	>
		<div class="container mx-auto px-6 lg:px-12">
			<!-- Hero Section -->
			<div class="grid lg:grid-cols-12 gap-12 items-start mb-32">
				<div class="lg:col-span-7">
					<UISplitText
						ref="pageTitle"
						as="h1"
						class="text-6xl lg:text-8xl font-serif font-medium text-neutral-100 tracking-tighter leading-[1]"
					>
						Beyond Numbers. <br />
						Building Lasting <br />
					</UISplitText>
					<UIGradientText
						as="p"
						ref="gradientText"
						class="text-7xl lg:text-9xl font-serif-italic tracking-tighter text-brand-400 mt-2 mb-12"
					>
						Partnerships.
					</UIGradientText>

					<div class="max-w-xl space-y-6">
						<UISplitText
							as="p"
							type="lines"
							ref="aboutText"
							class="text-xl text-neutral-400 leading-relaxed font-light"
						>
							With years of hands-on experience in the dynamic
							world of B2B sales, I've learned that driving
							revenue is only half the equation. The real success
							lies in understanding client needs, aligning
							perfectly with their strategic goals, and nurturing
							relationships built on mutual trust.
						</UISplitText>
					</div>
				</div>

				<div
					class="lg:col-span-5 relative flex justify-center lg:justify-end"
				>
					<div
						ref="imageContainer"
						class="relative w-full max-w-sm aspect-[4/5] rounded-[2rem] overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl"
					>
						<NuxtImg
							format="webp"
							src="/julianna.jpg"
							alt="Julianna Profile"
							class="object-cover w-full h-full opacity-80"
						/>
						<div
							class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0a0a0a] to-transparent"
						></div>
					</div>
				</div>
			</div>

			<!-- Core Expertise Section -->
			<div class="max-w-5xl pt-12">
				<UISplitText
					ref="expertiseTitle"
					as="h2"
					class="text-4xl lg:text-5xl font-serif font-medium text-white mb-16 tracking-tighter"
				>
					Core Expertise
				</UISplitText>
				<div class="space-y-16">
					<div
						v-for="data in experienceData"
						:key="data.id"
						class="feature"
					>
						<div
							class="feature-line h-px w-full bg-white/10 mb-6 origin-left"
						></div>
						<div class="grid md:grid-cols-3 gap-4 md:gap-8">
							<h3
								class="feature-title text-white font-medium text-2xl tracking-tight"
							>
								{{ data.title }}
							</h3>
							<p
								class="feature-description text-neutral-400 text-lg leading-relaxed md:col-span-2"
							>
								{{ data.description }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.feature-line {
	will-change: transform;
}
</style>
