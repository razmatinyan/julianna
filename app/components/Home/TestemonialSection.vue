<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { UIGradientText, UISplitText } from '../UI'

const { animate, gsap } = useGSAP()

const container = useTemplateRef<HTMLElement | null>('container')
const sectionTitle = useTemplateRef<InstanceType<typeof UISplitText> | null>(
	'sectionTitle',
)
const gradientText = useTemplateRef<InstanceType<typeof UIGradientText> | null>(
	'gradientText',
)
const sectionText = useTemplateRef<InstanceType<typeof UISplitText> | null>(
	'sectionText',
)

animate(() => {
	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: container.value,
			start: 'top 80%',
		},
	})

	if (sectionTitle.value) {
		tl.from(sectionTitle.value.getElements(), {
			duration: 0.7,
			ease: 'expo.inOut',
			y: 10,
			autoAlpha: 0,
			stagger: 0.025,
			filter: 'blur(10px)',
		})
	}
	if (gradientText.value) {
		tl.from(
			gradientText.value.$el,
			{
				duration: 1.2,
				delay: 0.4,
				ease: 'expo.out',
				autoAlpha: 0,
				filter: 'blur(20px)',
				scale: 1.1,
			},
			'<',
		)
	}
	if (sectionText.value) {
		tl.from(
			sectionText.value.getElements(),
			{
				duration: 1.2,
				ease: 'expo.inOut',
				y: 10,
				autoAlpha: 0,
				stagger: 0.025,
				filter: 'blur(20px)',
			},
			'<',
		)
	}
}, container)

const reviews = [
	{
		id: 1,
		name: 'Sarah Jenkins',
		role: 'Founder & CEO, TechFlow',
		text: 'Julianna completely transformed our sales approach. Under her management, our enterprise accounts grew by 45% in just two quarters. Her strategic insight is unmatched.',
		image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop',
	},
	{
		id: 2,
		name: 'Marcus Aurelius',
		role: 'VP of Sales, OmniCorp',
		text: 'The pipeline strategy she implemented exceeded our expectations. Our conversion rate increased by 40% in just two months. Julianna is a true professional who understands both strategy and execution.',
		image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
	},
	{
		id: 3,
		name: 'Elena Rodriguez',
		role: 'Operations Director',
		text: 'Her ability to synthesize complex market data into actionable sales strategies is extremely rare. She brought our vision to life with targeted campaigns that our partners love.',
		image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
	},
	{
		id: 4,
		name: 'James Chen',
		role: 'Product Manager, Apex AI',
		text: 'We needed a go-to-market strategy fast, and she delivered within record time. The new sales framework feels state-of-the-art and highly intuitive for our entire team.',
		image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
	},
	{
		id: 5,
		name: 'Maya Patel',
		role: 'Head of Business Development',
		text: "She doesn't just manage sales; she crafts predictable revenue engines. The new partnership models feel incredibly seamless and drive consistent growth.",
		image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
	},
]
</script>

<template>
	<section ref="container" class="py-32 container mx-auto px-6 lg:px-12">
		<div class="mb-24 flex flex-col items-center text-center">
			<UISplitText
				as="h2"
				ref="sectionTitle"
				class="text-5xl lg:text-7xl font-serif font-medium text-neutral-100 tracking-tighter leading-[1]"
			>
				Trusted by Partners,
			</UISplitText>
			<UIGradientText
				as="h2"
				ref="gradientText"
				class="text-6xl lg:text-8xl font-serif-italic tracking-tighter text-brand-400 mt-2 mb-8"
			>
				Proven by Results
			</UIGradientText>
			<UISplitText
				as="p"
				ref="sectionText"
				type="words"
				class="text-lg text-neutral-400 max-w-2xl font-light leading-relaxed"
			>
				Effective sales management goes beyond closing deals—it builds
				lasting partnerships. Hear from clients who have experienced the
				impact of strategic growth.
			</UISplitText>
		</div>

		<HomeTestemonialsCarousel :reviews="reviews" />
	</section>
</template>

<style lang="scss" scoped></style>
