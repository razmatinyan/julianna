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
}, footerContainer)

const socialLinks = [
	{ name: 'Twitter', url: '#' },
	{ name: 'LinkedIn', url: '#' },
	{ name: 'Instagram', url: '#' },
	{ name: 'Dribbble', url: '#' },
]
</script>

<template>
	<footer
		ref="footerContainer"
		class="relative overflow-hidden bg-neutral-950 pt-32 pb-12 border-t border-white/10"
	>
		<!-- Background Floating Lines -->
		<div class="absolute inset-0 z-0 opacity-40">
			<UIBackgroundLines
				:lines-gradient="['#ff6b2c', '#e65214', '#ff6b2c']"
			/>
		</div>

		<div
			class="container mx-auto px-6 lg:px-12 flex flex-col justify-between h-full relative z-10 pointer-events-none"
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
				<UIButton class="pointer-events-auto">
					Start a Project
				</UIButton>
			</div>

			<!-- Bottom Bar & Socials -->
			<div
				ref="bottomBar"
				class="relative z-20 flex flex-col md:flex-row justify-between items-center text-neutral-500 text-sm border-t border-white/5 pt-8 mt-auto pointer-events-auto"
			>
				<p
					class="order-2 md:order-1 mt-6 md:mt-0 font-light tracking-wide"
				>
					&copy; 2026 Julianna. All rights reserved.
				</p>

				<div
					class="flex items-center gap-6 md:gap-8 order-1 md:order-2"
				>
					<a
						v-for="link in socialLinks"
						:key="link.name"
						:href="link.url"
						:aria-label="link.name"
						class="relative flex items-center gap-1 group text-neutral-400 hover:text-white transition-colors duration-300 z-10"
					>
						<span>{{ link.name }}</span>
						<Icon
							name="lucide:arrow-up-right"
							class="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity"
						/>
						<span
							class="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-white transition-all duration-300 ease-out group-hover:w-full"
						></span>
					</a>
				</div>
			</div>
		</div>
	</footer>
</template>

<style lang="scss" scoped></style>
