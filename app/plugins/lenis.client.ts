import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin(nuxtApp => {
	const lenis = new Lenis({
		autoRaf: false,
		duration: 1.2,
		easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
	})

	lenis.on('scroll', ScrollTrigger.update)

	gsap.ticker.add(time => {
		lenis.raf(time * 1000)
	})
	gsap.ticker.lagSmoothing(0)

	nuxtApp.hooks.hook('page:finish', () => {
		lenis.scrollTo(0, { immediate: true })
	})

	nuxtApp.provide('lenis', lenis)
})
