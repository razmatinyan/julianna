<template>
	<Loading v-if="!isTransitioned" />

	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup lang="ts">
const { isLoaded, isTransitioned } = useLoading()

onMounted(() => {
	document.fonts.ready.then(() => {
		setTimeout(() => {
			isLoaded.value = true
		}, 500)
	})
})
</script>
