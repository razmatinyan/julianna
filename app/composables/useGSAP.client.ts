import { gsap } from 'gsap'
import { CustomEase } from 'gsap/all'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase)

export const useGSAP = () => {
	const animate = (
		fn: (ctx: gsap.Context) => void,
		scope?: Ref<HTMLElement | null>,
	) => {
		let ctx: gsap.Context

		onMounted(() => {
			ctx = gsap.context(() => {
				fn(ctx)
			}, scope?.value || undefined)
		})

		onUnmounted(() => {
			if (ctx) ctx.revert()
		})
	}

	return { gsap, SplitText, ScrollTrigger, CustomEase, animate }
}
