import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin(nuxtApp => {
	gsap.registerPlugin(ScrollTrigger)

	ScrollTrigger.defaults({
		anticipatePin: 1,
		start: 'top 80%',
		end: 'bottom 20%',
		toggleActions: 'play none none reverse',
		// markers: process.dev ? { fontSize: '12px', fontWeight: 'bold' } : false,
	})

	nuxtApp.hooks.hook('page:finish', () => {
		ScrollTrigger.refresh()
	})
})
