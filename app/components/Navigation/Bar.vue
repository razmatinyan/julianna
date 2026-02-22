<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'

const props = defineProps({
	forceExternal: {
		type: Boolean,
		default: false,
	},
})

const { gsap } = useGSAP()
const { startEntrance } = useLoading()

const navContainer = useTemplateRef<HTMLElement | null>('navContainer')
const logoCircle = useTemplateRef<ComponentPublicInstance | null>('logoCircle')
const logoLetter = useTemplateRef<HTMLElement | null>('logoLetter')
const revealWrapper = useTemplateRef<HTMLElement | null>('revealWrapper')

const links = [
	{ name: 'Home', href: '/' },
	{ name: 'About', href: '/about' },
	{ name: 'Contact', href: '/contact' },
]

let navTl: gsap.core.Timeline | null = null

watch(startEntrance, val => {
	if (val) {
		if (navTl) navTl.kill()
		navTl = gsap.timeline({
			defaults: { ease: 'expo.out' },
		})

		navTl.set(navContainer.value, { autoAlpha: 1 })

		navTl
			.fromTo(
				logoCircle.value!.$el,
				{ scale: 0 },
				{
					scale: 1,
					duration: 0.8,
					ease: 'back.out(1.7)',
					delay: 1,
				},
			)
			.fromTo(
				logoLetter.value,
				{
					opacity: 0,
					y: 10,
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.5,
				},
				'-=0.4',
			)
			.fromTo(
				revealWrapper.value,
				{
					width: '0px',
				},
				{
					width: 'auto',
					duration: 1.4,
					ease: 'expo.inOut',
				},
				'-=0.2',
			)
			.fromTo(
				revealWrapper.value!.children,
				{
					opacity: 0,
					x: -20,
				},
				{
					opacity: 1,
					x: 0,
					stagger: 0.05,
					duration: 0.8,
				},
				'-=0.8',
			)
	} else {
		if (navTl) navTl.kill()
		navTl = gsap.timeline({
			defaults: { ease: 'expo.in' },
			onComplete: () => {
				gsap.set(navContainer.value, { autoAlpha: 0 })
			},
		})

		navTl
			.to(revealWrapper.value!.children, {
				opacity: 0,
				x: -20,
				stagger: 0.05,
				duration: 0.4,
			})
			.to(
				revealWrapper.value,
				{
					width: '0px',
					duration: 0.6,
					ease: 'expo.inOut',
				},
				'-=0.2',
			)
			.to(
				logoLetter.value,
				{
					opacity: 0,
					y: 10,
					duration: 0.3,
				},
				'-=0.4',
			)
			.to(
				logoCircle.value!.$el,
				{
					scale: 0,
					duration: 0.5,
					ease: 'back.in(1.7)',
				},
				'-=0.2',
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
					:external="forceExternal"
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
							:external="forceExternal"
						/>
					</div>
				</div>
			</div>
		</nav>
	</header>
</template>
