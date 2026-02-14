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
		title: 'Strategy',
		description: 'Research, Insights, Positioning',
	},
	{
		id: useId(),
		title: 'Design',
		description: 'UI/UX, Visual Identity, Motion',
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
					class="text-4xl lg:text-6xl font-medium text-white tracking-tighter leading-[1.1]"
				>
					Crafting Meaningful <br />
					<span class="text-neutral-500">Brands &amp; Intuitive</span>
					<br />
					Digital Experiences <br />
				</UISplitText>
				<UIGradientText as="h2" ref="gradientText">
					That Stand Out
				</UIGradientText>
			</div>
			<div class="space-y-8 pt-4">
				<UISplitText
					as="p"
					type="lines"
					ref="sectionDescription"
					class="text-xl text-neutral-400 leading-relaxed font-light"
				>
					I'm Julianna, a London-based Brand and UI/UX Designer
					passionate about crafting visually compelling identities and
					seamless digital experiences. With a strategic approach and
					a keen eye for detail, I help businesses stand out and
					connect with their audience. Let's build something
					remarkable together.
				</UISplitText>

				<div class="features grid grid-cols-2 gap-6 pt-4">
					<AboutFeature
						v-for="data in sectionData"
						:key="data.id"
						:title="data.title"
						:description="data.description"
					/>
				</div>

				<div class="pt-6">
					<UIButton ref="cta" class="uppercase"
						>See My Works</UIButton
					>
				</div>
			</div>
		</div>
	</section>
</template>
