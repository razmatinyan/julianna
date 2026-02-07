import { SplitText } from 'gsap/SplitText'
import { gsap } from 'gsap'

export const vRollText = {
	mounted(el: HTMLElement, binding: any) {
		const defaults = {
			duration: 0.4,
			stagger: 0.02,
			ease: 'power3.out',
		}

		const config = { ...defaults, ...binding.value }

		const textTarget = el.querySelector('.button-text') as HTMLElement
		if (!textTarget) return

		const content = textTarget.innerText

		textTarget.innerHTML = `
            <span class="roll-wrapper" style="position: relative; overflow: hidden; display: block;">
                <span class="roll-normal" style="display: block;">${content}</span>
                <span class="roll-hover" style="display: block; position: absolute; top: 0; left: 0; transform: translateY(100%);">${content}</span>
            </span>
        `

		const normal = textTarget.querySelector('.roll-normal')
		const hover = textTarget.querySelector('.roll-hover')

		const splitNormal = new SplitText(normal, {
			type: 'chars',
			charsClass: 'char inline-block',
			tag: 'span',
		})
		const splitHover = new SplitText(hover, {
			type: 'chars',
			charsClass: 'char inline-block',
			tag: 'span',
		})

		const tl = gsap.timeline({ paused: true })

		tl.to(splitNormal.chars, {
			yPercent: -100,
			duration: config.duration,
			ease: config.ease,
			stagger: config.stagger,
		}).to(
			splitHover.chars,
			{
				yPercent: -100,
				duration: config.duration,
				ease: config.ease,
				stagger: config.stagger,
			},
			0,
		)

		const onEnter = () => tl.play()
		const onLeave = () => tl.reverse()

		el.addEventListener('mouseenter', onEnter)
		el.addEventListener('mouseleave', onLeave)
		;(el as any)._gsapRoll = { tl, onEnter, onLeave }
	},

	unmounted(el: HTMLElement) {
		const data = (el as any)._gsapRoll
		if (data) {
			data.tl.kill()
			el.removeEventListener('mouseenter', data.onEnter)
			el.removeEventListener('mouseleave', data.onLeave)
		}
	},
}
