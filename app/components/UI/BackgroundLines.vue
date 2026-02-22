<script setup lang="ts">
import {
	Timer,
	Mesh,
	OrthographicCamera,
	PlaneGeometry,
	Scene,
	ShaderMaterial,
	Vector2,
	Vector3,
	WebGLRenderer,
} from 'three'
import {
	onBeforeUnmount,
	onMounted,
	ref,
	useTemplateRef,
	watch,
	type CSSProperties,
} from 'vue'
import { fragmentShader } from '~/utils/backgroundLinesShader'

const vertexShader = `
precision highp float;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const MAX_GRADIENT_STOPS = 8

type WavePosition = {
	x: number
	y: number
	rotate: number
}

type FloatingLinesProps = {
	linesGradient?: string[]
	enabledWaves?: Array<'top' | 'middle' | 'bottom'>
	lineCount?: number | number[]
	lineDistance?: number | number[]
	topWavePosition?: WavePosition
	middleWavePosition?: WavePosition
	bottomWavePosition?: WavePosition
	animationSpeed?: number
	interactive?: boolean
	bendRadius?: number
	bendStrength?: number
	mouseDamping?: number
	parallax?: boolean
	parallaxStrength?: number
	mixBlendMode?: CSSProperties['mixBlendMode']
}

const props = withDefaults(defineProps<FloatingLinesProps>(), {
	enabledWaves: () => ['top', 'middle', 'bottom'],
	lineCount: () => [6],
	lineDistance: () => [5],
	bottomWavePosition: () => ({ x: 2.0, y: -0.7, rotate: -1 }),
	animationSpeed: 1,
	interactive: true,
	bendRadius: 5.0,
	bendStrength: -0.5,
	mouseDamping: 0.05,
	parallax: true,
	parallaxStrength: 0.2,
	mixBlendMode: 'screen',
})

function hexToVec3(hex: string): Vector3 {
	let value = hex.trim()

	if (value.startsWith('#')) {
		value = value.slice(1)
	}

	let r = 255
	let g = 255
	let b = 255

	if (value.length === 3) {
		r = parseInt(value.charAt(0) + value.charAt(0), 16)
		g = parseInt(value.charAt(1) + value.charAt(1), 16)
		b = parseInt(value.charAt(2) + value.charAt(2), 16)
	} else if (value.length === 6) {
		r = parseInt(value.slice(0, 2), 16)
		g = parseInt(value.slice(2, 4), 16)
		b = parseInt(value.slice(4, 6), 16)
	}

	return new Vector3(r / 255, g / 255, b / 255)
}

const containerRef = useTemplateRef<HTMLElement>('containerRef')
const targetMouseRef = ref<Vector2>(new Vector2(-1000, -1000))
const currentMouseRef = ref<Vector2>(new Vector2(-1000, -1000))
const targetInfluenceRef = ref<number>(0)
const currentInfluenceRef = ref<number>(0)
const targetParallaxRef = ref<Vector2>(new Vector2(0, 0))
const currentParallaxRef = ref<Vector2>(new Vector2(0, 0))

let cleanup: (() => void) | null = null
const setup = () => {
	if (!containerRef.value) return

	const getLineCount = (waveType: 'top' | 'middle' | 'bottom'): number => {
		if (typeof props.lineCount === 'number') return props.lineCount
		if (!props.enabledWaves.includes(waveType)) return 0
		const index = props.enabledWaves.indexOf(waveType)
		return (props.lineCount as number[])[index] ?? 6
	}

	const getLineDistance = (waveType: 'top' | 'middle' | 'bottom'): number => {
		if (typeof props.lineDistance === 'number') return props.lineDistance
		if (!props.enabledWaves.includes(waveType)) return 0.1
		const index = props.enabledWaves.indexOf(waveType)
		return (props.lineDistance as number[])[index] ?? 0.1
	}

	const topLineCount = props.enabledWaves.includes('top')
		? getLineCount('top')
		: 0
	const middleLineCount = props.enabledWaves.includes('middle')
		? getLineCount('middle')
		: 0
	const bottomLineCount = props.enabledWaves.includes('bottom')
		? getLineCount('bottom')
		: 0

	const topLineDistance = props.enabledWaves.includes('top')
		? getLineDistance('top') * 0.01
		: 0.01
	const middleLineDistance = props.enabledWaves.includes('middle')
		? getLineDistance('middle') * 0.01
		: 0.01
	const bottomLineDistance = props.enabledWaves.includes('bottom')
		? getLineDistance('bottom') * 0.01
		: 0.01

	const scene = new Scene()

	const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
	camera.position.z = 1

	const renderer = new WebGLRenderer({ antialias: true, alpha: false })
	renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
	renderer.domElement.style.width = '100%'
	renderer.domElement.style.height = '100%'
	containerRef.value.appendChild(renderer.domElement)

	const uniforms = {
		iTime: { value: 0 },
		iResolution: { value: new Vector3(1, 1, 1) },
		animationSpeed: { value: props.animationSpeed },

		enableTop: { value: props.enabledWaves.includes('top') },
		enableMiddle: { value: props.enabledWaves.includes('middle') },
		enableBottom: { value: props.enabledWaves.includes('bottom') },

		topLineCount: { value: topLineCount },
		middleLineCount: { value: middleLineCount },
		bottomLineCount: { value: bottomLineCount },

		topLineDistance: { value: topLineDistance },
		middleLineDistance: { value: middleLineDistance },
		bottomLineDistance: { value: bottomLineDistance },

		topWavePosition: {
			value: new Vector3(
				props.topWavePosition?.x ?? 10.0,
				props.topWavePosition?.y ?? 0.5,
				props.topWavePosition?.rotate ?? -0.4,
			),
		},
		middleWavePosition: {
			value: new Vector3(
				props.middleWavePosition?.x ?? 5.0,
				props.middleWavePosition?.y ?? 0.0,
				props.middleWavePosition?.rotate ?? 0.2,
			),
		},
		bottomWavePosition: {
			value: new Vector3(
				props.bottomWavePosition?.x ?? 2.0,
				props.bottomWavePosition?.y ?? -0.7,
				props.bottomWavePosition?.rotate ?? 0.4,
			),
		},

		iMouse: { value: new Vector2(-1000, -1000) },
		interactive: { value: props.interactive },
		bendRadius: { value: props.bendRadius },
		bendStrength: { value: props.bendStrength },
		bendInfluence: { value: 0 },

		parallax: { value: props.parallax },
		parallaxStrength: { value: props.parallaxStrength },
		parallaxOffset: { value: new Vector2(0, 0) },

		lineGradient: {
			value: Array.from(
				{ length: MAX_GRADIENT_STOPS },
				() => new Vector3(1, 1, 1),
			),
		},
		lineGradientCount: { value: 0 },
	}

	if (props.linesGradient && props.linesGradient.length > 0) {
		const stops = props.linesGradient.slice(0, MAX_GRADIENT_STOPS)
		uniforms.lineGradientCount.value = stops.length

		stops.forEach((hex, i) => {
			const color = hexToVec3(hex)
			uniforms.lineGradient.value[i]?.set(color.x, color.y, color.z)
		})
	}

	const material = new ShaderMaterial({
		uniforms,
		vertexShader,
		fragmentShader,
	})

	const geometry = new PlaneGeometry(2, 2)
	const mesh = new Mesh(geometry, material)
	scene.add(mesh)

	const timer = new Timer()

	const setSize = () => {
		const el = containerRef.value!
		const width = el.clientWidth || 1
		const height = el.clientHeight || 1

		renderer.setSize(width, height, false)

		const canvasWidth = renderer.domElement.width
		const canvasHeight = renderer.domElement.height
		uniforms.iResolution.value.set(canvasWidth, canvasHeight, 1)
	}

	setSize()

	const ro =
		typeof ResizeObserver !== 'undefined'
			? new ResizeObserver(setSize)
			: null

	if (ro && containerRef.value) {
		ro.observe(containerRef.value)
	}

	const handlePointerMove = (event: PointerEvent) => {
		const rect = renderer.domElement.getBoundingClientRect()
		const x = event.clientX - rect.left
		const y = event.clientY - rect.top
		const dpr = renderer.getPixelRatio()

		targetMouseRef.value.set(x * dpr, (rect.height - y) * dpr)
		targetInfluenceRef.value = 1.0

		if (props.parallax) {
			const centerX = rect.width / 2
			const centerY = rect.height / 2
			const offsetX = (x - centerX) / rect.width
			const offsetY = -(y - centerY) / rect.height
			targetParallaxRef.value.set(
				offsetX * props.parallaxStrength,
				offsetY * props.parallaxStrength,
			)
		}
	}

	const handlePointerLeave = () => {
		targetInfluenceRef.value = 0.0
	}

	if (props.interactive) {
		renderer.domElement.addEventListener('pointermove', handlePointerMove)
		renderer.domElement.addEventListener('pointerleave', handlePointerLeave)
	}

	let raf = 0
	const renderLoop = () => {
		timer.update()
		uniforms.iTime.value = timer.getElapsed()

		if (props.interactive) {
			currentMouseRef.value.lerp(targetMouseRef.value, props.mouseDamping)
			uniforms.iMouse.value.copy(currentMouseRef.value)

			currentInfluenceRef.value +=
				(targetInfluenceRef.value - currentInfluenceRef.value) *
				props.mouseDamping
			uniforms.bendInfluence.value = currentInfluenceRef.value
		}

		if (props.parallax) {
			currentParallaxRef.value.lerp(
				targetParallaxRef.value,
				props.mouseDamping,
			)
			uniforms.parallaxOffset.value.copy(currentParallaxRef.value)
		}

		renderer.render(scene, camera)
		raf = requestAnimationFrame(renderLoop)
	}
	renderLoop()

	cleanup = () => {
		cancelAnimationFrame(raf)
		if (ro && containerRef.value) {
			ro.disconnect()
		}

		if (props.interactive) {
			renderer.domElement.removeEventListener(
				'pointermove',
				handlePointerMove,
			)
			renderer.domElement.removeEventListener(
				'pointerleave',
				handlePointerLeave,
			)
		}

		geometry.dispose()
		material.dispose()
		renderer.dispose()
		if (renderer.domElement.parentElement) {
			renderer.domElement.parentElement.removeChild(renderer.domElement)
		}
	}
}

onMounted(() => {
	setup()
})

onBeforeUnmount(() => {
	cleanup?.()
})

watch(
	() => [
		props.linesGradient,
		props.enabledWaves,
		props.lineCount,
		props.lineDistance,
		props.topWavePosition,
		props.middleWavePosition,
		props.bottomWavePosition,
		props.animationSpeed,
		props.interactive,
		props.bendRadius,
		props.bendStrength,
		props.mouseDamping,
		props.parallax,
		props.parallaxStrength,
	],
	() => {
		cleanup?.()
		setup()
	},
	{
		deep: true,
	},
)
</script>

<template>
	<div
		ref="containerRef"
		class="relative w-full h-full overflow-hidden floating-lines-container"
		:style="{
			mixBlendMode: mixBlendMode,
		}"
	/>
</template>
