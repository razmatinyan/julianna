<script setup lang="ts">
import HeroSection from '@/components/Home/HeroSection.vue'
import AboutSection from '@/components/Home/AboutSection.vue'
import TestemonialSection from '@/components/Home/TestemonialSection.vue'

useSeoMeta({
	title: 'Julianna Gharibyan | B2B Sales Manager in Armenia',
	description:
		'Julianna Gharibyan is a results-driven Sales Manager based in Armenia, specializing in B2B growth, strategic client acquisition, and maximizing revenue pipelines.',
	ogTitle: 'Julianna Gharibyan | Expert B2B Sales Manager',
	ogDescription:
		'Julianna Gharibyan is a results-driven Sales Manager based in Armenia, specializing in B2B growth, strategic client acquisition, and maximizing revenue pipelines.',
	ogImage: '/julianna.jpg',
	twitterCard: 'summary_large_image',
	twitterTitle: 'Julianna Gharibyan | B2B Sales Manager',
	twitterDescription:
		'Results-driven Sales Manager based in Armenia, specializing in B2B growth, strategic client acquisition, and revenue scaling.',
	twitterImage: '/julianna.jpg',
})
</script>

<template>
	<HeroSection />
	<AboutSection />
	<TestemonialSection />
</template>
