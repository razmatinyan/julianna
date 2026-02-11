// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	app: {
		head: {
			title: 'Julianna Gharibyan | Sales Manager',
			htmlAttrs: { lang: 'en' },
			meta: [{ charset: 'utf-8' }],
			link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
		},
	},
	css: ['~/assets/css/tailwind.css', '~/assets/css/main.css'],
	modules: [
		'@nuxt/image',
		'@nuxt/icon',
		'@nuxtjs/tailwindcss',
		'@nuxt/fonts',
		'@vueuse/nuxt',
	],
	fonts: {
		families: [{ name: 'Geist', provider: 'google' }],
		priority: ['google'],
		processCSSVariables: true,
		experimental: {
			disableLocalFallbacks: true,
		},
	},
	image: {
		format: ['webp'],
		screens: {
			sm: 640,
			md: 768,
			lg: 1024,
			xl: 1280,
			'2xl': 1536,
		},
	},
})
