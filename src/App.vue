<template>
	<div
		id="app"
		class="app"
		:class="{'dark': isDarkModeOn}"
	>
		<WelcomeScreen />

		<TopBar />

		<RulesPage />

		<div class="setlist">
			<SearchBar />
			<MusicItem
				v-for="(music, index) in list"
				:key="index"
				:data="music"
			/>
		</div>
	</div>
</template>

<script>
import WelcomeScreen from './components/WelcomeScreen';
import TopBar from './components/TopBar';
import RulesPage from './components/RulesPage';
import SearchBar from './components/SearchBar';
import MusicItem from './components/MusicItem';
import list from './dummy/list.json';

import { mapState } from 'vuex';

export default {
	name: 'App',
	components: {
		WelcomeScreen,
		TopBar,
		RulesPage,
		MusicItem,
		SearchBar
	},
	data () {
		return {
			list: list
		};
	},
	computed:{
		...mapState({
			isDarkModeOn: 'darkMode'
		})
	}
};
</script>

<style lang="scss">
	@import 'node_modules/css-reset-and-normalize/scss/reset-and-normalize';
	@import url('https://fonts.googleapis.com/css2?family=Poller+One&family=Quicksand:wght@400;600&display=swap');
	@import 'assets/scss/variables.scss';
	body {
		font-family: 'Quicksand', sans-serif;
		background-color: #fffef8;
		overflow-x: hidden;
	}

	.setlist {
		margin: 0 auto;
		max-width: 80ch;
		padding: 3em 0 50vh;
		min-height: calc(100vh - 64px);
	}

	// from Bootstrap
	// see: https://github.com/twbs/bootstrap/blob/a4a04cd9ec741050390746f8056cc79a9c04c8df/scss/mixins/_screen-reader.scss
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	.app {
		transition: background-color 300ms ease-in-out;
	}

	.dark {
		background-color: $dm-bgc;
	}
</style>
