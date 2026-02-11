<script setup lang="ts">
import { UISplitText } from '@/components/UI'

const { gsap, animate } = useGSAP()

const props = defineProps({
	isHovered: { type: Boolean, default: false },
	duration: { type: Number, default: 0.4 },
	stagger: { type: Number, default: 0.02 },
	ease: { type: String, default: 'power3.out' },
})

const root = useTemplateRef<HTMLElement | null>('root')
const defaultText = useTemplateRef<InstanceType<typeof UISplitText> | null>(
	'defaultText',
)
const hoverText = useTemplateRef<InstanceType<typeof UISplitText> | null>(
	'hoverText',
)

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

animate(() => {
	if (!defaultText || !hoverText) return

	tl = gsap.timeline({ paused: true })

	if (!defaultText.value?.getElements() || !hoverText.value?.getElements())
		return

	tl.to(defaultText.value.getElements(), {
		yPercent: -100,
		duration: props.duration,
		stagger: props.stagger,
		ease: props.ease,
	}).to(
		hoverText.value.getElements(),
		{
			yPercent: -100,
			duration: props.duration,
			stagger: props.stagger,
			ease: props.ease,
		},
		0,
	)
}, root)
</script>

<template>
	<span ref="root" class="roll-container flex pointer-events-none">
		<span class="roll-wrapper relative block overflow-hidden">
			<span class="roll-normal block">
				<UISplitText ref="defaultText">
					<slot></slot>
				</UISplitText>
			</span>
			<span
				class="roll-hover block absolute top-0 left-0 w-full translate-y-full"
			>
				<UISplitText ref="hoverText">
					<slot></slot>
				</UISplitText>
			</span>
		</span>
	</span>
</template>
