<template>
	<header>
		<nav class="fixed top-8 left-1/2 -translate-x-1/2 z-40">
			<div
				class="bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-full pl-2 pr-6 py-2 flex items-center shadow-2xl transition-all duration-500"
			>
				<div class="bg-white/10 p-2 rounded-full mr-4">
					<span
						class="text-brand-500 font-semibold text-lg leading-none w-5 h-5 flex items-center justify-center"
					>
						J
					</span>
				</div>
				<span
					class="text-sm font-medium text-white tracking-tight mr-5"
				>
					Julianna
				</span>
				<div class="h-4 w-[1px] bg-white/20 mr-5"></div>
				<div
					id="nav-links"
					class="flex items-center overflow-hidden max-w-xs opacity-100 transition-color duration-300 ease-[cubic-bezier(0.87,0,0.13,1)]"
				>
					<NuxtLink
						v-for="link in links"
						:key="link.name"
						:to="link.href"
						class="text-sm font-medium text-neutral-400 hover:text-white transition-colors mr-6 last:mr-0"
					>
						{{ link.name }}
					</NuxtLink>
				</div>
			</div>
		</nav>
	</header>
</template>

<script setup lang="ts">
type NavLink = {
	name: string
	href: string
}

const links: NavLink[] = [
	{ name: 'About', href: '#about' },
	{ name: 'Work', href: '#work' },
	{ name: 'Contact', href: '#contact' },
]
</script>

<style lang="scss" scoped></style>
