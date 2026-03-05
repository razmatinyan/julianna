<template>
	<div class="flex flex-col min-h-screen relative isolate">
		<BackgroundNoise />
		<NavigationBar />
		<div id="__layout" class="flex-1">
			<slot />
		</div>
		<NavigationFooter />
	</div>
</template>
