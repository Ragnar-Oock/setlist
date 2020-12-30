<template>
	<div
		id="app"
		class="app"
	>
		<div class="beta">
			<p>{{ $t('beta.disclamer') }}</p>
		</div>

		<WelcomeScreen />

		<TopBar :is-search-bar-docked="isSearchBarDocked" />

		<RulesPage />

		<div class="setlist">
			<SearchBar
				@docked="isSearchBarDocked=$event"
				@refresh="refreshList"
			/>

			<div
				v-if="error"
				class="error message-box"
			>
				<p class="message-box__title">
					{{ $t('apiError') }}
				</p>
				<p>{{ error }}</p>
			</div>

			<DynamicScroller
				:class="{'scroller':!isLastPage}"
				:items="songList"
				:min-item-size="95"
				key-field="uuid"
				page-mode
				:buffer="350"
			>
				<template v-slot="{ item, index, active }">
					<DynamicScrollerItem
						:item="item"
						:active="active"
						:size-dependencies="[
							item.open
						]"
						:data-index="index"
					>
						<MusicItem
							:data="item"
							@open="open(index)"
						/>
					</DynamicScrollerItem>
				</template>
			</DynamicScroller>

			<div
				v-if="isLoading && !error"
				class="message-box"
			>
				<p>{{ $t('loading') }}</p>
				<div class="loader" />
			</div>
			<div
				v-if="isLastPage"
				class="message-box"
			>
				<p class="message-box__title">
					{{ $t('listEnd.title') }}
				</p>
				<p>{{ $t('listEnd.hint') }}</p>
			</div>
		</div>
		<div
			id="bottom"
			ref="bottom"
		/>
		<portal-target name="screen" />
		<portal-target name="popup" />
	</div>
</template>

<script>
import WelcomeScreen from './components/WelcomeScreen';
import TopBar from './components/TopBar';
import RulesPage from './components/RulesPage';
import SearchBar from './components/SearchBar';
import MusicItem from './components/MusicItem';
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller';
import debounce from 'debounce';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import { mapGetters, mapState } from 'vuex';

export default {
	name: 'App',
	components: {
		WelcomeScreen,
		TopBar,
		RulesPage,
		MusicItem,
		DynamicScroller,
		DynamicScrollerItem,
		SearchBar
	},
	data () {
		return {
			isSearchBarDocked: false,
			dbRefreshList: debounce(() => this.$store.dispatch('refreshList'), 300)
		};
	},
	computed:{
		...mapState({
			songList: 'songs',
			error: 'apiError',
			isLoading: 'isLoading',
			isLastPage: 'isLastPage'
		}),
		...mapGetters([
			'isDarkModeOn'
		])
	},
	watch: {
		isDarkModeOn() {
			document.getElementsByTagName('html')[0].classList.toggle('dark', this.isDarkModeOn);
		}
	},
	mounted() {
		// set dark/light mode
		document.getElementsByTagName('html')[0].classList.toggle('dark', this.isDarkModeOn);
		// set scroll position to top
		document.documentElement.scroll({ top:0 });

		// get first songs page
		this.$store
			.dispatch('getSongList')
			.catch(e => {
				console.error(e);
			});

		// setup the infinite scroll loader
		const debouncedFunc = debounce(() => this.getMoreSongs(), 100, true);

		const options = {
			rootMargin: '0px 0px 1000px 0px',
			threshold: 1
		};
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					debouncedFunc();
				}
			});
		}, options);

		// activate the infinite scroll loader
		observer.observe(this.$refs.bottom);
	},
	methods: {
		getMoreSongs() {
			this.$store
				.dispatch('getMoreSongs')
				.catch(e => {
					console.error(e);
				});
		},
		open(index) {
			this.$store.commit('ACTIVATE_ITEM', index);
		},
		refreshList() {
			// execute de debounced version of the refresh function
			this.dbRefreshList();
		}
	}
};
</script>

<style lang="scss">
	@import 'node_modules/css-reset-and-normalize/scss/reset-and-normalize';
	@import 'assets/scss/variables.scss';

	@font-face {
		font-family: 'Quicksand';
		src: url('./assets/fonts/Quicksand-VariableFont_wght.ttf') format('truetype');
		font-display: swap;
	}
	@font-face {
		font-family: 'Poiret One';
		src: url('./assets/fonts/PoiretOne-Regular.ttf') format('truetype');
		font-display: swap;
	}

	body {
		font-family: 'Quicksand', sans-serif;
		background-color: #fffef8;
		overflow-x: hidden;
		width: 100%;
		scroll-behavior: smooth;
	}

	.beta {
		font-size: 1.2em;
		background-color: red;
		position: fixed;
		z-index: 9999;
		padding: 0.5em 1em;
		border-radius: 0.4em;
		left: 1em;
		bottom: 1em;
		text-transform: uppercase;
	}

	.scroller {
		min-height: 100vh;
	}
	[data-index] {
		padding-bottom: .5em;
	}

	.tippy-tooltip {
		color: var(--text);
		box-shadow: var(--shadow);

		.tippy-backdrop{
			background-color: var(--filler-1);
		}
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


	.message-box{
		display: flex;
		flex-direction: column;
		margin: auto;
		background: var(--filler-1);
		width: 60ch;
		align-items: center;
		padding: 2em 1em;
		border-radius: 5px;
		box-shadow: 0 0 .5em #0003;
		color: var(--text);
		margin-top: .5em;

		&__title{
			font-size: 1.2;
			font-weight: bold;
		}

		& p{
			text-align: center;
			margin: 0 0 1em;
			white-space: pre-line;
		}
	}

	.error {
		background: linear-gradient(18deg, #531C1C  0%, #851E1E 100%);
		color: white;
	}

	.loader{
		--fill: var(--filler-1);
		width: 20em;
		height: 1em;
		background: var(--fill);
		border-radius: 100vh;
		position: relative;
		overflow: hidden;
		box-shadow: inset 0 0 .5em #0003;
		margin: 0;

		&::before{
		content: '';
		display: block;
		position: absolute;
		width: 25%;
		height: 100%;
		left:50%;
		background-color: #a2a2a2;
		border-radius: 100vh;
		animation: slide alternate 1.5s ease-in-out infinite;
		box-shadow: 0 0 0 .25em var(--fill), 0 0 .5em .25em #0003;
	}

	}

	@keyframes slide {
		0% {
			transform: translateX(-200%);
			width: 25%;
		}
		50%{
			width: 40%;
		}
		100% {
			transform: translateX(100%);
			width: 25%;
		}
	}
</style>
