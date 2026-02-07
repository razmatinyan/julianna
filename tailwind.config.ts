import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
	content: ['./app/**/*.{js,ts,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Geist', 'sans-serif'],
			},
			colors: {
				brand: {
					500: '#ff6b2c',
					600: '#e65214',
				},
			},
			letterSpacing: {
				tighter: '-0.04em',
			},
		},
	},
}
