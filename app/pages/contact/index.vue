<script lang="ts" setup>
import {
	UISplitText,
	UIGradientText,
	UIButton,
	UIPulseButtonText,
} from '~/components/UI/'

useSeoMeta({
	title: "Contact Julianna Gharibyan | Let's Connect",
	description:
		'Get in touch with Julianna Gharibyan. Open for B2B sales management opportunities, partnerships, and strategic consulting in Armenia and beyond.',
	ogTitle: 'Contact Julianna Gharibyan',
	ogDescription:
		'Get in touch with Julianna Gharibyan. Open for B2B sales management opportunities, partnerships, and strategic consulting in Armenia and beyond.',
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
const contactText = useTemplateRef<InstanceType<typeof UISplitText> | null>(
	'contactText',
)
const availabilityInfo = useTemplateRef<InstanceType<
	typeof UIPulseButtonText
> | null>('availabilityInfo')
const emailButton = useTemplateRef<InstanceType<typeof UIButton> | null>(
	'emailButton',
)
const linkedinButton = useTemplateRef<InstanceType<typeof UIButton> | null>(
	'linkedinButton',
)

animate(() => {
	CustomEase.create(
		'smooth.out',
		'M0,0 C0.207,0.561 0.489,0.793 0.489,0.793 0.489,0.793 0.735,1 1,1 ',
	)

	const tl = gsap.timeline({ paused: true })

	tl.from(
		availabilityInfo.value!.$el,
		{
			duration: 1,
			ease: 'expo.out',
			y: 20,
			autoAlpha: 0,
			filter: 'blur(10px)',
		},
		'+=.8',
	)
		.from(
			pageTitle.value!.getElements(),
			{
				duration: 0.8,
				ease: 'expo.inOut',
				y: 30,
				autoAlpha: 0,
				stagger: 0.05,
				filter: 'blur(10px)',
			},
			'-=0.6',
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
			contactText.value!.getElements(),
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
		.from(
			[emailButton.value!.$el, linkedinButton.value!.$el],
			{
				duration: 1,
				ease: 'expo.out',
				y: 30,
				autoAlpha: 0,
				stagger: 0.1,
				filter: 'blur(15px)',
			},
			'-=0.8',
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
}, container.value)
</script>

<template>
	<div
		ref="container"
		class="pb-32 pt-32 lg:pt-48 overflow-hidden min-h-screen flex items-center"
	>
		<div class="container mx-auto px-6 lg:px-12">
			<div
				class="max-w-4xl mx-auto text-center flex flex-col items-center"
			>
				<UIPulseButtonText ref="availabilityInfo" class="mb-8">
					Available for New Opportunities
				</UIPulseButtonText>

				<UISplitText
					ref="pageTitle"
					as="h1"
					class="text-5xl lg:text-7xl md:text-8xl font-medium text-white tracking-tighter leading-[1.1] mb-2"
				>
					Let's Create<br />
				</UISplitText>
				<UIGradientText
					as="p"
					ref="gradientText"
					class="text-5xl lg:text-7xl md:text-8xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-brand-500 to-white mb-10"
				>
					Something Great.
				</UIGradientText>

				<div class="max-w-2xl text-center space-y-6 mb-16">
					<UISplitText
						as="p"
						type="lines"
						ref="contactText"
						class="text-xl md:text-2xl text-neutral-400 leading-relaxed font-light"
					>
						Whether you're looking to scale your sales operations,
						enter new markets, or build high-performing B2B
						partnerships, I'm just a message away.
					</UISplitText>
				</div>

				<div
					class="flex flex-col sm:flex-row gap-6 justify-center items-center"
				>
					<a href="mailto:hello@example.com" class="block">
						<UIButton
							ref="emailButton"
							class="uppercase px-8 py-4 text-lg"
						>
							Send an Email
						</UIButton>
					</a>
					<a
						href="https://linkedin.com"
						target="_blank"
						rel="noopener noreferrer"
						class="block"
					>
						<UIButton
							ref="linkedinButton"
							class="uppercase px-8 py-4 text-lg !bg-transparent !border !border-white/20 hover:!border-white/50"
						>
							Connect on LinkedIn
						</UIButton>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
