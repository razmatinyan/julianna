<template>
	<div class="flex flex-col min-h-screen relative isolate">
		<UIBackgroundBlob />
		<NavigationBar />

		<div id="__layout" class="flex-1">
			<slot />
		</div>

		<NavigationFooter />
	</div>
</template>
