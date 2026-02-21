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
		role: 'Founder & CEO, LuxeBrands',
		text: 'Julianna transformed our brand identity with a fresh, modern look that truly resonates with our audience. The attention to detail is unmatched, and the process was incredibly collaborative.',
		image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop',
	},
	{
		id: 2,
		name: 'Marcus Aurelius',
		role: 'CMO, StoicTech',
		text: 'The web design she provided exceeded our expectations. Our conversion rate increased by 40% in just two months. Julianna is a true professional who understands both aesthetics and UX.',
		image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
	},
	{
		id: 3,
		name: 'Elena Rodriguez',
		role: 'Creative Director',
		text: 'Her ability to synthesize complex ideas into stunning visual interfaces is extremely rare. She brought our vision to life with vibrant, engaging designs that our users love.',
		image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
	},
	{
		id: 4,
		name: 'James Chen',
		role: 'Product Manager, Apex AI',
		text: 'We needed a redesign fast, and she delivered within record time without compromising quality. The new system feels state-of-the-art and highly intuitive.',
		image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
	},
	{
		id: 5,
		name: 'Maya Patel',
		role: 'Head of Marketing',
		text: "She doesn't just design interfaces; she crafts digital experiences. The new platform feels incredibly seamless and looks gorgeous on every device.",
		image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
	},
]
</script>

<template>
	<section ref="container" class="py-32 container mx-auto px-6 lg:px-12">
		<div class="mb-16">
			<UISplitText
				as="h2"
				ref="sectionTitle"
				class="text-4xl lg:text-6xl font-medium text-white tracking-tighter leading-[1.1]"
			>
				Trusted by Brands,
			</UISplitText>
			<UIGradientText as="h2" ref="gradientText" class="mb-4">
				Loved by Clients
			</UIGradientText>
			<UISplitText
				as="p"
				ref="sectionText"
				type="words"
				class="text-lg text-neutral-400 max-w-2xl"
			>
				Great design goes beyond aesthetics—it creates impact. Hear from
				clients who have experienced the power of thoughtful branding.
			</UISplitText>
		</div>

		<HomeTestemonialsCarousel :reviews="reviews" />
	</section>
</template>

<style lang="scss" scoped></style>
