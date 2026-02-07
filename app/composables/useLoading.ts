export const useLoading = () => {
	const isLoaded = useState('isLoaded', () => false)
	const startEntrance = useState('startEntrance', () => false)
	const isTransitioned = useState('isTransitioned', () => false)

	return { isLoaded, startEntrance, isTransitioned }
}
