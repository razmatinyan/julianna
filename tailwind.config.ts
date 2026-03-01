import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
	content: ['./app/**/*.{js,ts,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Geist', 'sans-serif'],
				serif: ['Cormorant Garamond', 'serif'],
			},
			colors: {
				brand: {
					400: '#fbbf24',
					500: '#ea580c',
					600: '#c2410c',
				},
				dark: {
					surface: '#121212',
					500: '#050505',
					800: '#1a1a1a',
					900: '#0a0a0a',
				},
			},
			letterSpacing: {
				tighter: '-0.04em',
				widest: '0.2em',
			},
			fontSize: {
				'button-fluid-base': 'clamp(0.875rem, 1vw, 1.75rem)',
			},
			transitionTimingFunction: {
				button: 'cubic-bezier(0.35, 0, 0, 1)',
				smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
			},
		},
	},
}
