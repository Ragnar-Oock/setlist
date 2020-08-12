<template>
	<div id="app">
		<WelcomeScreen />

		<div class="topbar">
			topbar
		</div>

		<div class="rules">
			rules
		</div>

		<div class="setlist">
			list
		</div>
	</div>
</template>

<script>
import WelcomeScreen from './components/WelcomeScreen';

export default {
	name: 'App',
	components: {
		WelcomeScreen
	}
};
</script>

<style lang="scss">
	@import 'node_modules/css-reset-and-normalize/scss/reset-and-normalize';
	@import url('https://fonts.googleapis.com/css2?family=Poller+One&family=Quicksand:wght@400;600&display=swap');
	body {
		font-family: 'Quicksand', sans-serif;
	}
</style>
