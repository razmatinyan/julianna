const { gsap } = useGSAP()

export const useMagnetic = (
	target: Ref<HTMLElement | null>,
	options = { strength: 40, parallaxStrength: 1.5 },
) => {
	let ctx: gsap.Context

	const onMouseMove = (e: MouseEvent) => {
		if (!target.value) return

		const { clientX, clientY } = e
		const { left, top, width, height } =
			target.value.getBoundingClientRect()

		// Distance from center (-1 to 1)
		const x = (clientX - (left + width / 2)) / (width / 2)
		const y = (clientY - (top + height / 2)) / (height / 2)

		// Move the container
		gsap.to(target.value, {
			x: x * options.strength,
			y: y * options.strength,
			// Change duration from 0.6 to 0.1 or 0.2 for instant feedback
			duration: 0.2,
			ease: 'power3.out', // Snappier ease
			overwrite: 'auto', // Prevents animation conflicts
		})

		// Move nested parallax elements (text/icons)
		const parallaxElements = target.value.querySelectorAll('.parallax')
		if (parallaxElements.length > 0) {
			gsap.to(parallaxElements, {
				x: x * (options.strength * options.parallaxStrength),
				y: y * (options.strength * options.parallaxStrength),
				duration: 0.2,
				ease: 'power3.out',
				overwrite: 'auto',
			})
		}
	}

	const onMouseLeave = () => {
		if (!target.value) return

		// Snap everything back
		gsap.to([target.value, target.value.querySelectorAll('.parallax')], {
			x: 0,
			y: 0,
			duration: 0.8,
			ease: 'elastic.out(1, 0.3)',
		})
	}

	onMounted(() => {
		if (!target.value) return
		ctx = gsap.context(() => {})

		target.value.addEventListener('mousemove', onMouseMove)
		target.value.addEventListener('mouseleave', onMouseLeave)
	})

	onUnmounted(() => {
		ctx?.revert()
		if (target.value) {
			target.value.removeEventListener('mousemove', onMouseMove)
			target.value.removeEventListener('mouseleave', onMouseLeave)
		}
	})
}
