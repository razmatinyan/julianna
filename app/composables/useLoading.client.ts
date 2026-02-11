export const useLoading = () => {
	const { $lenis } = useNuxtApp()

	const isFinished = useState('loading-finished', () => false)
	const isLoaded = useState('isLoaded', () => false)
	const startEntrance = useState('startEntrance', () => false)
	const isTransitioned = useState('isTransitioned', () => false)

	if (process.client && !isFinished.value) {
		nextTick(() => {
			if ($lenis) {
				$lenis.scrollTo(0, { immediate: true })
				$lenis.stop()
			}
		})
	}

	const finishLoading = () => {
		isFinished.value = true
		if (process.client && $lenis) {
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
