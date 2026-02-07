const { gsap } = useGSAP()

export const useHover = (
	target: Ref<HTMLElement | null>,
	fn: (tl: gsap.core.Timeline) => void,
) => {
	let ctx: gsap.Context
	let tl: gsap.core.Timeline

	const onEnter = () => tl?.play()
	const onLeave = () => tl?.reverse()

	onMounted(() => {
		if (!target.value) return

		ctx = gsap.context(() => {
			tl = gsap.timeline({ paused: true })
			fn(tl)
		}, target.value)

		target.value.addEventListener('mouseenter', onEnter)
		target.value.addEventListener('mouseleave', onLeave)
	})

	onUnmounted(() => {
		ctx?.revert()
		if (target.value) {
			target.value.removeEventListener('mouseenter', onEnter)
			target.value.removeEventListener('mouseleave', onLeave)
		}
	})
}
