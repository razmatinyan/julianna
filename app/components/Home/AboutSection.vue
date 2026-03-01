<script setup lang="ts">
import { UISplitText, UIGradientText, UIButton } from '~/components/UI/'

const { gsap, animate } = useGSAP()

const container = useTemplateRef<HTMLElement | null>('container')
const sectionTitle = useTemplateRef<InstanceType<typeof UISplitText> | null>(
	'sectionTitle',
)
const gradientText = useTemplateRef<InstanceType<typeof UIGradientText> | null>(
	'gradientText',
)
const sectionDescription = useTemplateRef<InstanceType<
	typeof UISplitText
> | null>('sectionDescription')
const cta = useTemplateRef<InstanceType<typeof UIButton> | null>('cta')

const sectionData = [
	{
		id: useId(),
		title: 'Sales Strategy',
		description: 'Pipeline Management, Forecasting, Market Expansion',
	},
	{
		id: useId(),
		title: 'Client Relations',
		description: 'B2B Partnerships, Account Management, Negotiation',
	},
]

animate(() => {
	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: container.value,
		},
	})

	tl.from(sectionTitle.value!.getElements(), {
		duration: 0.7,
		ease: 'expo.inOut',
		y: 30,
		autoAlpha: 0,
		stagger: 0.075,
		filter: 'blur(10px)',
	})
		.from(
			gradientText.value!.$el,
			{
				duration: 1.5,
				delay: 0.8,
				ease: 'expo.out',
				z: 500,
				rotationX: -45,
				autoAlpha: 0,
				filter: 'blur(20px)',
				scale: 1.2,
			},
			'<',
		)
		.from(
			sectionDescription.value!.getElements(),
			{
				duration: 0.7,
				ease: 'expo.inOut',
				y: 30,
				autoAlpha: 0,
				stagger: 0.075,
				filter: 'blur(10px)',
			},
			'<',
		)

	const features = container.value?.querySelectorAll('.feature')

	if (features) {
		features.forEach((feature: Element) => {
			const line = feature.querySelector('.feature-line')
			const title = feature.querySelector('.feature-title')
			const desc = feature.querySelector('.feature-description')

			tl.from(
				line,
				{
					scaleX: 0,
					transformOrigin: 'left center',
					duration: 0.8,
					ease: 'power2.inOut',
				},
				'<',
			).from(
				[title, desc],
				{
					y: 15,
					scale: 1.05,
					filter: 'blur(20px)',
					autoAlpha: 0,
					stagger: 0.065,
					duration: 0.5,
				},
				'-=0.6',
			)
		})
	}

	tl.from(
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
		'-=.5',
	)
}, container.value)
</script>

<template>
	<section
		ref="container"
		class="section-container py-32 container mx-auto px-6 lg:px-12"
	>
		<div class="grid lg:grid-cols-2 gap-16 items-start">
			<div>
				<UISplitText
					as="h2"
					ref="sectionTitle"
					type="words"
					class="text-5xl lg:text-7xl font-serif font-medium text-neutral-100 tracking-tighter leading-[1]"
				>
					Driving Measurable <br />
					<span class="text-neutral-500 font-serif-italic"
						>Revenue &amp; Strategic</span
					>
					<br />
					Business Growth <br />
				</UISplitText>
				<UIGradientText
					as="p"
					ref="gradientText"
					class="text-6xl lg:text-8xl font-serif-italic tracking-tighter text-brand-400 mt-2"
				>
					That Scales
				</UIGradientText>
			</div>
			<div class="space-y-8 pt-4">
				<UISplitText
					as="p"
					type="lines"
					ref="sectionDescription"
					class="text-xl text-neutral-400 leading-relaxed font-light"
				>
					I'm Julianna, an Armenia-based Sales Manager passionate
					about building high-performing sales pipelines and forging
					lasting B2B partnerships. With a data-driven approach and a
					focus on client success, I help businesses expand their
					market share and accelerate revenue growth. Let's elevate
					your sales strategy together.
				</UISplitText>

				<div
					class="features grid md:grid-cols-2 gap-8 border-t border-white/5 pt-8 mt-8"
				>
					<HomeAboutFeature
						v-for="data in sectionData"
						:key="data.id"
						:title="data.title"
						:description="data.description"
					/>
				</div>

				<div class="pt-6">
					<NuxtLink to="/about">
						<UIButton ref="cta" class="uppercase"
							>More About Me</UIButton
						>
					</NuxtLink>
				</div>
			</div>
		</div>
	</section>
</template>
