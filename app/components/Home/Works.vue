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

		<!-- Fan Effect Images -->
		<div
			class="flex justify-center items-center gap-4 lg:gap-8 scale-90 lg:scale-100 opacity-80 hover:opacity-100 transition-opacity duration-500"
		>
			<div
				class="w-48 h-64 lg:w-64 lg:h-80 bg-neutral-800 rounded-2xl rotate-[-12deg] translate-y-12 overflow-hidden border border-white/10 shadow-2xl"
			>
				<img
					src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&amp;w=600&amp;auto=format&amp;fit=crop"
					class="w-full h-full object-cover"
				/>
			</div>
			<div
				class="w-48 h-64 lg:w-64 lg:h-80 bg-neutral-800 rounded-2xl rotate-[-6deg] translate-y-4 overflow-hidden border border-white/10 shadow-2xl z-10"
			>
				<img
					src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&amp;w=600&amp;auto=format&amp;fit=crop"
					class="w-full h-full object-cover"
				/>
			</div>
			<div
				class="w-48 h-64 lg:w-64 lg:h-80 bg-neutral-800 rounded-2xl rotate-0 z-20 overflow-hidden border border-white/10 shadow-2xl shadow-brand-900/20"
			>
				<img
					src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop"
					class="w-full h-full object-cover"
				/>
			</div>
			<div
				class="w-48 h-64 lg:w-64 lg:h-80 bg-neutral-800 rounded-2xl rotate-[6deg] translate-y-4 overflow-hidden border border-white/10 shadow-2xl z-10"
			>
				<img
					src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&amp;w=600&amp;auto=format&amp;fit=crop"
					class="w-full h-full object-cover"
				/>
			</div>
			<div
				class="w-48 h-64 lg:w-64 lg:h-80 bg-neutral-800 rounded-2xl rotate-[12deg] translate-y-12 overflow-hidden border border-white/10 shadow-2xl"
			>
				<img
					src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop"
					class="w-full h-full object-cover"
				/>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped></style>
