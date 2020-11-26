<template>
	<div
		id="app"
		class="app"
	>
		<WelcomeScreen />

		<TopBar :is-search-bar-docked="isSearchBarDocked" />

		<RulesPage />

		<div class="setlist">
			<SearchBar @docked="isSearchBarDocked=$event" />
			<MusicItem
				v-for="(music, index) in songList"
				:key="index"
				:data="music"
			/>
		</div>
		<div
			id="bottom"
			ref="bottom"
		/>
	</div>
</template>

<script>
import WelcomeScreen from './components/WelcomeScreen';
import TopBar from './components/TopBar';
import RulesPage from './components/RulesPage';
import SearchBar from './components/SearchBar';
import MusicItem from './components/MusicItem';
import list from './dummy/list.json';
import debounce from 'debounce';

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
			list: list,
			isSearchBarDocked: false
		};
	},
	computed:{
		...mapState({
			isDarkModeOn: 'darkMode',
			songList: 'songs'
		})
	},
	watch: {
		isDarkModeOn() {
			document.getElementsByTagName('html')[0].classList.toggle('dark', this.isDarkModeOn);
		}
	},
	mounted() {
		document.getElementsByTagName('html')[0].classList.toggle('dark', this.isDarkModeOn);

		this.$store
			.dispatch('getSongList')
			.catch(e => {
				console.error(e);
			});

		const debouncedFunc = debounce(() => this.getMoreSongs(), 500, true);

		const options = {
			rootMargin: '0px 0px 1000px 0px',
			threshold: 1
		};
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				// let the advenced search open when scrolled past
				if (entry.isIntersecting) {
					// console.log('intersect', entry);
					// alert(1)

					debouncedFunc();
				}

				/*
				// close the advenced search when scrolled past
				// if the bar just docked close the advenced search, if the bar undocked don't change the value
				this.isAdvencedSearchOpen = this.isSearchbarDocked ? false : this.isAdvencedSearchOpen;
				*/
			});
		}, options);

		observer.observe(this.$refs.bottom);
	},
	methods: {
		getMoreSongs() {
			this.$store
				.dispatch('getMoreSongs')
				.catch(e => {
					console.error(e);
				});
		}
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
		width: 100%;
		scroll-behavior: smooth;
	}

	.setlist {
		margin: 0 auto;
		padding: 3em .25em 50vh;
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
		background-color: var(--root-bg);
	}

	html {
		scrollbar-color: var(--filler-1) var(--root-bg);

		&::-webkit-scrollbar {
			width: .6em;
			background-color: var(--root-bg);
		}

		&::-webkit-scrollbar-thumb {
			background-color: var(--filler-1);
			border-radius: .4em;
		}
	}

</style>
