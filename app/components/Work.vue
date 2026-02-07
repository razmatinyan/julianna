<script setup lang="ts">
const { animate, $gsap: gsap } = useGsap()
const container = ref(null)
const title = ref(null)

animate(() => {
	gsap.set(title.value, { autoAlpha: 0, y: 50 })

	const tl = gsap.timeline({
		delay: 0.1,
		scrollTrigger: {
			trigger: container.value,
			start: 'top 80%',
		},
	})
}, container)
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
			<h2
				ref="title"
				class="text-4xl lg:text-5xl font-medium text-white tracking-tighter mb-4"
			>
				Let's Create Something <br />
				Exceptional
			</h2>
			<p class="text-lg text-neutral-400 max-w-xl mx-auto mb-8">
				Let's collaborate to create a bold brand or seamless digital
				experience. Get in touch!
			</p>

			<button
				class="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white rounded-full pl-2 pr-6 py-2 transition-all"
			>
				<span class="bg-white text-brand-600 rounded-full p-2">
					<Icon
						name="lucide:arrow-right"
						class="block w-4 h-4"
					></Icon>
				</span>
				<span class="font-medium text-sm">Contact me</span>
			</button>
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
