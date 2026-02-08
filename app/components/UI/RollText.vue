<script setup lang="ts">
const { gsap, SplitText } = useGSAP()
const slots = useSlots()
const inputText = ref()

const props = defineProps({
	isHovered: { type: Boolean, default: false },
	duration: { type: Number, default: 0.4 },
	stagger: { type: Number, default: 0.02 },
	ease: { type: String, default: 'power3.out' },
})

const root = ref<HTMLElement | null>()
// @ts-ignore
let ctx: gsap.Context
let tl: gsap.core.Timeline | null = null

const play = () => tl?.play()
const reverse = () => tl?.reverse()

defineExpose({ play, reverse })

watch(
	() => props.isHovered,
	hovering => {
		if (hovering) tl?.play()
		else tl?.reverse()
	},
)

onMounted(() => {
	inputText.value = getSlotText(slots)

	nextTick(() => {
		ctx = gsap.context(() => {
			const normal = root.value?.querySelector('.roll-normal')
			const hover = root.value?.querySelector('.roll-hover')

			if (!normal || !hover) return

			const splitNormal = new SplitText(normal, {
				type: 'chars',
				charsClass: 'inline-block',
			})
			const splitHover = new SplitText(hover, {
				type: 'chars',
				charsClass: 'inline-block',
			})

			tl = gsap.timeline({ paused: true })

			tl.to(splitNormal.chars, {
				yPercent: -100,
				duration: props.duration,
				stagger: props.stagger,
				ease: props.ease,
			}).to(
				splitHover.chars,
				{
					yPercent: -100,
					duration: props.duration,
					stagger: props.stagger,
					ease: props.ease,
				},
				0,
			)
		}, root.value!)
	})
})

onUnmounted(() => {
	// @ts-ignore
	if (ctx) ctx.revert()
})
</script>

<template>
	<span ref="root" class="roll-container flex pointer-events-none">
		<span class="roll-wrapper relative block overflow-hidden">
			<span class="roll-normal block">{{ inputText }}</span>
			<span
				class="roll-hover block absolute top-0 left-0 w-full translate-y-full"
			>
				{{ inputText }}
			</span>
		</span>
	</span>
</template>
