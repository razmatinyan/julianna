import { vRollText } from '~/directives/roll-text'

export default defineNuxtPlugin(nuxtApp => {
	nuxtApp.vueApp.directive('roll-text', vRollText)
})
