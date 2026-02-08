<script setup lang="ts">
const { gsap } = useGSAP()
const { startEntrance } = useLoading()

const navContainer = ref<HTMLElement | null>(null)
const logoCircle = ref<HTMLElement | null>(null)
const logoLetter = ref<HTMLElement | null>(null)
const revealWrapper = ref()
const hoveredLink = ref()

const links = [
	{ name: 'About', href: '#about' },
	{ name: 'Work', href: '#work' },
	{ name: 'Contact', href: '#contact' },
]

watch(startEntrance, val => {
	if (val) {
		const tl = gsap.timeline({
			defaults: { ease: 'expo.out' },
		})

		tl.set(navContainer.value, { autoAlpha: 1 })

		tl.from(logoCircle.value, {
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
				revealWrapper.value.children,
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
			class="fixed top-8 left-1/2 -translate-x-1/2 z-40 invisible"
		>
			<div
				class="bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-full p-2 flex items-center shadow-2xl"
			>
				<div
					ref="logoCircle"
					class="bg-white/10 p-2 rounded-full flex-shrink-0"
				>
					<span
						ref="logoLetter"
						class="text-brand-500 font-semibold text-lg leading-none w-5 h-5 flex items-center justify-center"
					>
						J
					</span>
				</div>

				<div
					ref="revealWrapper"
					class="flex items-center overflow-hidden whitespace-nowrap"
					style="width: 0px"
				>
					<span
						class="text-sm font-medium text-white tracking-tight ml-4 mr-5"
					>
						Julianna
					</span>

					<div class="h-4 w-[1px] bg-white/20 mr-5"></div>

					<div class="flex items-center pr-4">
						<NuxtLink
							v-for="link in links"
							:key="link.name"
							:to="link.href"
							@mouseenter="hoveredLink = link.name"
							@mouseleave="hoveredLink = null"
							class="text-sm font-medium text-neutral-400 hover:text-white transition-colors mr-6 last:mr-0"
						>
							<UIRollText :is-hovered="hoveredLink === link.name">
								{{ link.name }}
							</UIRollText>
						</NuxtLink>
					</div>
				</div>
			</div>
		</nav>
	</header>
</template>
