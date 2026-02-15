<script setup lang="ts">
import { UIGradientText, UISplitText, UIButton } from '../UI'

const { animate, gsap } = useGSAP()

const container = useTemplateRef<HTMLElement | null>('container')
const sectionTitle = useTemplateRef<InstanceType<typeof UISplitText> | null>(
	'sectionTitle',
)
const sectionText = useTemplateRef<InstanceType<typeof UISplitText> | null>(
	'sectionText',
)
const gradientText = useTemplateRef<InstanceType<typeof UIGradientText> | null>(
	'gradientText',
)
const cta = useTemplateRef<InstanceType<typeof UIButton> | null>('cta')

interface GalleryItem {
	id: number
	src: string
}

const galleryItems: GalleryItem[] = []

for (let i = 0; i < 10; i++) {
	galleryItems.push({
		id: i + 1,
		src: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=600',
	})
}

animate(() => {
	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: container.value,
		},
	})

	tl.from(sectionTitle.value!.getElements(), {
		duration: 0.7,
		ease: 'expo.inOut',
		y: 10,
		autoAlpha: 0,
		stagger: 0.025,
		filter: 'blur(10px)',
	})
		.from(
			gradientText.value!.$el,
			{
				duration: 1.2,
				delay: 0.8,
				ease: 'expo.out',
				z: 500,
				rotationX: -45,
				autoAlpha: 0,
				filter: 'blur(20px)',
				scale: 1.1,
			},
			'<',
		)
		.from(
			sectionText.value!.getElements(),
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
		.from(
			cta.value!.$el,
			{
				duration: 1.5,
				ease: 'expo.out',
				z: 500,
				rotationX: -45,
				y: 20,
				autoAlpha: 0,
				filter: 'blur(20px)',
				scale: 1.2,
			},
			'-=.8',
		)
}, container.value)
</script>

<template>
	<section
		ref="container"
		class="py-20 overflow-hidden bg-neutral-900/50 border-y border-white/5 relative"
	>
		<div
			class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/20 via-[#0a0a0a] to-[#0a0a0a] -z-10"
		></div>

		<div
			class="container mx-auto px-6 lg:px-12 text-center mb-16 relative z-10"
		>
			<UISplitText
				as="h2"
				ref="sectionTitle"
				class="text-4xl lg:text-6xl font-medium text-white tracking-tighter leading-[1.1]"
			>
				Let's Create Something
			</UISplitText>
			<UIGradientText as="h2" ref="gradientText" class="mb-4">
				Exceptional
			</UIGradientText>

			<UISplitText
				as="p"
				ref="sectionText"
				type="words"
				class="text-lg text-neutral-400 max-w-xl mx-auto mb-8"
			>
				Let's collaborate to create a bold brand or seamless digital
				experience. Get in touch!
			</UISplitText>

			<UIButton ref="cta" class="mx-auto uppercase">
				Contact me
			</UIButton>
		</div>

		<InfiniteImageGallery :items="galleryItems" />
	</section>
</template>

<style lang="scss" scoped></style>
