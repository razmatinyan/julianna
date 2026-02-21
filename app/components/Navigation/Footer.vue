<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { UIGradientText, UISplitText } from '../UI'

const { animate, gsap } = useGSAP()

const footerContainer = useTemplateRef<HTMLElement | null>('footerContainer')
const footerTitle = useTemplateRef<InstanceType<typeof UISplitText> | null>(
	'footerTitle',
)
const gradientText = useTemplateRef<InstanceType<typeof UIGradientText> | null>(
	'gradientText',
)
const bottomBar = useTemplateRef<HTMLElement | null>('bottomBar')

animate(() => {
	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: footerContainer.value,
			start: 'top 80%',
		},
	})

	if (footerTitle.value) {
		tl.from(footerTitle.value.getElements(), {
			duration: 0.8,
			ease: 'power4.out',
			y: 30,
			autoAlpha: 0,
			stagger: 0.05,
			filter: 'blur(10px)',
		})
	}
	if (gradientText.value) {
		tl.from(
			gradientText.value.$el,
			{
				duration: 1.2,
				delay: 0.2,
				ease: 'expo.out',
				autoAlpha: 0,
				filter: 'blur(20px)',
				scale: 1.05,
			},
			'<',
		)
	}

	tl.from(
		'.social-link',
		{
			duration: 0.6,
			ease: 'back.out(1.7)',
			y: 20,
			autoAlpha: 0,
			stagger: 0.1,
		},
		'-=0.5',
	)

	if (bottomBar.value) {
		tl.from(
			bottomBar.value,
			{
				duration: 1,
				ease: 'power3.out',
				y: 20,
				autoAlpha: 0,
			},
			'<',
		)
	}
}, footerContainer)

const socialLinks = [
	{ name: 'Twitter', icon: 'lucide:twitter', url: '#' },
	{ name: 'LinkedIn', icon: 'lucide:linkedin', url: '#' },
	{ name: 'Instagram', icon: 'lucide:instagram', url: '#' },
	{ name: 'Dribbble', icon: 'lucide:dribbble', url: '#' },
]
</script>

<template>
	<footer
		ref="footerContainer"
		class="relative overflow-hidden bg-neutral-950 pt-32 pb-12 border-t border-white/10"
	>
		<!-- Background Decorative Blob -->
		<div
			class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-brand-500/10 blur-[100px] rounded-full opacity-50 pointer-events-none"
		></div>

		<div
			class="container mx-auto px-6 lg:px-12 flex flex-col justify-between h-full relative z-10"
		>
			<!-- Main CTA Area -->
			<div class="flex flex-col items-center text-center mb-24">
				<UISplitText
					as="h2"
					ref="footerTitle"
					class="text-4xl lg:text-7xl font-bold text-white tracking-tighter leading-[1.1] mb-2"
				>
					Ready to craft your
				</UISplitText>
				<UIGradientText
					as="h2"
					ref="gradientText"
					class="text-5xl lg:text-8xl font-black mb-8 pb-4"
				>
					Digital Legacy?
				</UIGradientText>
				<p
					class="text-neutral-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed"
				>
					Let’s build something extraordinary together. Reach out and
					tell me about your next big project.
				</p>
				<UIButton class=""> Start a Project </UIButton>
			</div>

			<!-- Bottom Bar & Socials -->
			<div
				ref="bottomBar"
				class="flex flex-col md:flex-row justify-between items-center text-neutral-500 text-sm border-t border-white/5 pt-8 mt-auto"
			>
				<p
					class="order-2 md:order-1 mt-6 md:mt-0 font-light tracking-wide"
				>
					&copy; 2026 Julianna. All rights reserved.
				</p>

				<div
					class="flex items-center gap-4 md:gap-6 order-1 md:order-2"
				>
					<a
						v-for="link in socialLinks"
						:key="link.name"
						:href="link.url"
						:aria-label="link.name"
						class="social-link w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 bg-neutral-900/50 hover:bg-brand-500/20 hover:text-brand-400 hover:border-brand-500/50 transition-all duration-300 hover:scale-110 hover:-translate-y-1 active:scale-95 focus:ring-2 focus:ring-brand-500 backdrop-blur-sm"
					>
						<Icon :name="link.icon" class="w-5 h-5" />
					</a>
				</div>
			</div>
		</div>
	</footer>
</template>

<style lang="scss" scoped></style>
