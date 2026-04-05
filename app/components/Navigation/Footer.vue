<script setup lang="ts">
import { useTemplateRef, ref, watch } from 'vue'
import {
	UIGradientText,
	UISplitText,
	UIInput,
	UITextarea,
	UIModal,
	UIButton,
} from '../UI'
const { animate, gsap } = useGSAP()

const footerContainer = useTemplateRef<HTMLElement | null>('footerContainer')
const footerTitle = useTemplateRef<InstanceType<typeof UISplitText> | null>(
	'footerTitle',
)
const gradientText = useTemplateRef<InstanceType<typeof UIGradientText> | null>(
	'gradientText',
)
const bottomBar = useTemplateRef<HTMLElement | null>('bottomBar')

animate(() => {
	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: footerContainer.value,
			start: 'top 80%',
		},
	})

	if (footerTitle.value) {
		tl.from(footerTitle.value.getElements(), {
			duration: 0.8,
			ease: 'power4.out',
			y: 30,
			autoAlpha: 0,
			stagger: 0.05,
			filter: 'blur(10px)',
		})
	}
	if (gradientText.value) {
		tl.from(
			gradientText.value.$el,
			{
				duration: 1.2,
				delay: 0.2,
				ease: 'expo.out',
				autoAlpha: 0,
				filter: 'blur(20px)',
				scale: 1.05,
			},
			'<',
		)
	}
}, footerContainer)

const socialLinks = [
	{
		name: 'LinkedIn',
		url: 'https://www.linkedin.com/in/julianna-gharibyan-0a62a7299/',
	},
]

// Form State
const form = ref({
	fullName: '',
	email: '',
	idea: '',
})

const getDefaultErrors = () => ({
	fullName: '',
	email: '',
	idea: '',
})

const errors = ref(getDefaultErrors())

const isSubmitting = ref(false)
const hasSubmitted = ref(false)

const modal = ref({
	isOpen: false,
	type: 'success' as 'success' | 'error',
	title: '',
	message: '',
})

const sanitizeInput = (val: string) => {
	return val.replace(/[<>{}[\]]/g, '').trim()
}

const validateEmail = (email: string) => {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return re.test(String(email).toLowerCase())
}

const validateForm = () => {
	let isValid = true
	errors.value = {
		fullName: '',
		email: '',
		idea: '',
	}

	form.value.fullName = sanitizeInput(form.value.fullName)
	form.value.email = sanitizeInput(form.value.email)
	form.value.idea = sanitizeInput(form.value.idea)

	if (!form.value.fullName) {
		errors.value.fullName = 'Full Name is required'
		isValid = false
	} else if (form.value.fullName.length < 2) {
		errors.value.fullName = 'Name must be at least 2 characters'
		isValid = false
	}

	if (!form.value.email) {
		errors.value.email = 'Email is required'
		isValid = false
	} else if (!validateEmail(form.value.email)) {
		errors.value.email = 'Please enter a valid email address'
		isValid = false
	}

	if (!form.value.idea) {
		errors.value.idea = 'Please describe your idea'
		isValid = false
	} else if (form.value.idea.length < 10) {
		errors.value.idea = 'Message must be at least 10 characters'
		isValid = false
	}

	return isValid
}

const route = useRoute()

watch(
	() => route.path,
	() => {
		errors.value = getDefaultErrors()
	},
)

watch(
	() => form.value.fullName,
	newVal => {
		if (errors.value.fullName && newVal.trim().length >= 2) {
			errors.value.fullName = ''
		}
	},
)

watch(
	() => form.value.email,
	newVal => {
		if (errors.value.email && validateEmail(newVal.trim())) {
			errors.value.email = ''
		}
	},
)

watch(
	() => form.value.idea,
	newVal => {
		if (errors.value.idea && newVal.trim().length >= 10) {
			errors.value.idea = ''
		}
	},
)


const submitForm = async () => {
	hasSubmitted.value = true
	if (!validateForm()) return

	isSubmitting.value = true

	try {
		await $fetch('/api/email/', {
			method: 'POST',
			body: form.value,
		})

		modal.value = {
			isOpen: true,
			type: 'success',
			title: 'Message Sent',
			message:
				'Thank you for reaching out. I will get back to you shortly regarding your idea.',
		}

		form.value = {
			fullName: '',
			email: '',
			idea: '',
		}
		hasSubmitted.value = false
	} catch (error) {
		modal.value = {
			isOpen: true,
			type: 'error',
			title: 'Failed to Send',
			message:
				'There was an error sending your message. Please try again later.',
		}
	} finally {
		isSubmitting.value = false
	}
}
</script>

<template>
	<footer
		ref="footerContainer"
		class="relative overflow-hidden bg-neutral-950 pt-32 pb-12 border-t border-white/10"
	>
		<!-- Background Floating Lines -->
		<div class="absolute inset-0 z-0 opacity-40">
			<!-- UIBackgroundLines
				:lines-gradient="['#ff6b2c', '#e65214', '#ff6b2c']"
			/ -->
		</div>

		<div
			class="container mx-auto px-6 lg:px-12 flex flex-col justify-between h-full relative z-10 pointer-events-none"
		>
			<!-- Main CTA Area -->
			<div class="flex flex-col items-center text-center mb-24">
				<UISplitText
					as="p"
					ref="footerTitle"
					class="text-4xl lg:text-7xl font-medium text-neutral-200 tracking-tighter leading-[1] mb-2 font-serif"
				>
					Ready to scale your
				</UISplitText>
				<UIGradientText
					as="p"
					ref="gradientText"
					class="text-6xl lg:text-8xl font-serif-italic mb-12 pb-4 tracking-tight"
				>
					Revenue Growth?
				</UIGradientText>

				<form
					@submit.prevent="submitForm"
					class="w-full max-w-xl mx-auto flex flex-col gap-6 pointer-events-auto text-left relative z-20 mt-8"
				>
					<div class="flex flex-col md:flex-row gap-6 md:gap-4">
						<UIInput
							id="fullName"
							label="Full Name"
							v-model="form.fullName"
							:error="errors.fullName"
						/>
						<UIInput
							id="email"
							type="email"
							label="Email Address"
							v-model="form.email"
							:error="errors.email"
						/>
					</div>
					<UITextarea
						id="idea"
						label="Describe your idea"
						v-model="form.idea"
						:error="errors.idea"
						:rows="4"
					/>

					<UIButton
						type="submit"
						class="uppercase tracking-widest text-sm py-4 px-10 w-full md:w-auto md:self-center mt-4 group relative overflow-hidden transition-all duration-300 disabled:opacity-75 disabled:cursor-not-allowed"
						:disabled="isSubmitting"
					>
						Send Message
					</UIButton>
				</form>
			</div>

			<!-- Bottom Bar & Socials -->
			<div
				ref="bottomBar"
				class="relative z-20 flex flex-col md:flex-row justify-between items-center text-neutral-500 text-sm border-t border-white/5 pt-8 mt-auto pointer-events-auto"
			>
				<div
					class="order-2 md:order-1 mt-6 md:mt-0 flex flex-col items-center md:items-start gap-1"
				>
					<p class="font-light tracking-wide">
						&copy; 2026 Julianna Gharibyan. All rights reserved.
					</p>
					<p class="font-light text-xs text-neutral-600">
						Website made by
						<a
							href="https://github.com/razmatinyan"
							target="_blank"
							rel="noopener noreferrer"
							class="hover:text-neutral-300 underline underline-offset-2 transition-colors"
							>Razmik Matinyan</a
						>
					</p>
				</div>

				<div
					class="flex flex-wrap justify-center items-center gap-6 md:gap-8 order-1 md:order-2"
				>
					<NavigationFooterLink
						v-for="link in socialLinks"
						:key="link.name"
						:link="link"
					/>
				</div>
			</div>
		</div>

		<UIModal
			v-model="modal.isOpen"
			:type="modal.type"
			:title="modal.title"
			:message="modal.message"
		/>
	</footer>
</template>

<style lang="scss" scoped></style>
