<script setup lang="ts">
import { useTemplateRef, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const blobRef = useTemplateRef<HTMLElement | null>('blobRef')

onMounted(() => {
	if (!blobRef.value) return

	// Setup GSAP quickTo for highly performant mouse tracking
	const xTo = gsap.quickTo(blobRef.value, 'x', {
		duration: 0.8,
		ease: 'power3.out',
	})

	const yTo = gsap.quickTo(blobRef.value, 'y', {
		duration: 0.8,
		ease: 'power3.out',
	})

	// Initial center positioning
	gsap.set(blobRef.value, {
		xPercent: -50,
		yPercent: -50,
		x: window.innerWidth / 2,
		y: window.innerHeight / 2,
	})

	const handleMouseMove = (e: MouseEvent) => {
		xTo(e.clientX)
		yTo(e.clientY)
	}

	window.addEventListener('mousemove', handleMouseMove)

	// Infinite subtle pulsing animation
	gsap.to(blobRef.value, {
		scale: 1.2,
		rotation: 45,
		duration: 10,
		repeat: -1,
		yoyo: true,
		ease: 'sine.inOut',
	})

	onUnmounted(() => {
		window.removeEventListener('mousemove', handleMouseMove)
	})
})
</script>

<template>
	<div
		ref="blobRef"
		class="fixed top-0 left-0 w-[20vw] h-[20vw] max-w-[400px] max-h-[400px] min-w-[200px] min-h-[200px] bg-brand-500/15 rounded-full blur-[120px] pointer-events-none mix-blend-screen"
	></div>
</template>
