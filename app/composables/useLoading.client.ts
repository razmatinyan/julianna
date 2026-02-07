export const useLoading = () => {
	const { $lenis } = useNuxtApp()

	const isFinished = useState('loading-finished', () => false)
	const isLoaded = useState('isLoaded', () => false)
	const startEntrance = useState('startEntrance', () => false)
	const isTransitioned = useState('isTransitioned', () => false)

	if (process.client && $lenis) {
		// @ts-ignore
		$lenis.scrollTo(0, { immediate: true })
		// @ts-ignore
		$lenis.stop()
	}

	const finishLoading = () => {
		isFinished.value = true
		if (process.client && $lenis) {
			// @ts-ignore
			$lenis.start()
		}
	}

	return {
		isFinished,
		finishLoading,
		isLoaded,
		startEntrance,
		isTransitioned,
	}
}
