import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export const useGSAP = () => {
	const animate = (
		fn: () => void,
		scope?: Ref<HTMLElement | null> | HTMLElement,
	) => {
		let ctx: gsap.Context

		onMounted(() => {
			const element = isRef(scope) ? scope.value : scope
			ctx = gsap.context(fn, element || undefined)
		})

		onUnmounted(() => {
			ctx?.revert()
		})
	}

	return { gsap, animate, ScrollTrigger, SplitText }
}
