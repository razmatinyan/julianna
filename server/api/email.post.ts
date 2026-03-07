import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default defineEventHandler(async event => {
	const { fullName, email, idea } = await readBody(event)

	const { data, error } = await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: 'razmatinyan28@gmail.com',
		subject: 'Message from Your Website julianna-sales.com',
		text: `You got a new email from ${fullName} (${email}): ${idea}`,
	})

	if (error) throw createError({ statusCode: 500, message: error.message })

	return { success: true, statusCode: 200, id: data?.id }
})
