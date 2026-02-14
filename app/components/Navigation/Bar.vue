<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'

const { gsap } = useGSAP()
const { startEntrance } = useLoading()

const navContainer = useTemplateRef<HTMLElement | null>('navContainer')
const logoCircle = useTemplateRef<ComponentPublicInstance | null>('logoCircle')
const logoLetter = useTemplateRef<HTMLElement | null>('logoLetter')
const revealWrapper = useTemplateRef<HTMLElement | null>('revealWrapper')

const links = [
	{ name: 'Home', href: '/' },
	{ name: 'About', href: '/about' },
	{ name: 'Works', href: '/works' },
	{ name: 'Contact', href: '/contact' },
]

watch(startEntrance, val => {
	if (val) {
		const tl = gsap.timeline({
			defaults: { ease: 'expo.out' },
		})

		tl.set(navContainer.value, { autoAlpha: 1 })

		tl.from(logoCircle.value!.$el, {
			scale: 0,
			duration: 0.8,
			ease: 'back.out(1.7)',
			delay: 1,
		})
			.from(
				logoLetter.value,
				{
					opacity: 0,
					y: 10,
					duration: 0.5,
				},
				'-=0.4',
			)

			.to(
				revealWrapper.value,
				{
					width: 'auto',
					duration: 1.4,
					ease: 'expo.inOut',
				},
				'-=0.2',
			)

			.from(
				revealWrapper.value!.children,
				{
					opacity: 0,
					x: -20,
					stagger: 0.05,
					duration: 0.8,
				},
				'-=0.8',
			)
	}
})
</script>

<template>
	<header>
		<nav
			ref="navContainer"
			class="fixed top-8 left-1/2 -translate-x-1/2 z-40"
		>
			<div
				class="bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-full p-2 flex items-center shadow-2xl"
			>
				<NuxtLink
					to="/"
					ref="logoCircle"
					class="group bg-white/10 p-2 rounded-full flex-shrink-0 flex"
				>
					<span
						ref="logoLetter"
						class="text-brand-500 font-semibold text-lg leading-none w-5 h-5 flex items-center justify-center"
					>
						J
					</span>
				</NuxtLink>

				<div
					ref="revealWrapper"
					class="flex items-center overflow-hidden whitespace-nowrap"
					style="width: 0px"
				>
					<div class="flex items-center px-4">
						<NavigationLink
							v-for="link in links"
							:key="link.name"
							:link="link"
						/>
					</div>
				</div>
			</div>
		</nav>
	</header>
</template>
