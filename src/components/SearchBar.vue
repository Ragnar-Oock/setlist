<template>
	<Fragment>
		<form
			ref="searchBar"
			class="search-bar"
			:class="{'docked': isSearchbarDocked}"
			autocomplete="off"
			@submit="submit($event)"
		>
			<div class="container">
				<label
					for="search"
					class="sr-only"
				>{{ $t('search.label') }}</label>
				<div class="search-bar__input-wrapper">
					<input
						id="search"
						ref="search"
						v-model="search"
						type="text"
						name="search"
						class="search-bar__input"
						:placeholder="$t('search.placeholder')"
						@focus="toggleInputFocusState(true)"
						@blur="toggleInputFocusState(false)"
						@keydown.down="focusFirstSuggestion"
					>
					<button
						ref="submit"
						type="submit"
						class="search-bar__button"
					>
						<span class="search-bar__button-text">{{ $t('search.submit') }}</span>
						<!-- don't change this svg import if you don't want to skrew up the styling -->
						<svg
							aria-hidden="true"
							width="1em"
							height="1em"
							viewBox="0 0 16 16"
							xmlns="http://www.w3.org/2000/svg"
							class="search-bar__open-more-icon"
						>
							<use
								xlink:href="../assets/images/search.svg#el"
							/>
						</svg>
					</button>
				</div>
				<svg
					aria-hidden="true"
					width="0"
					height="0"
					viewBox="0 0 16 16"
					xmlns="http://www.w3.org/2000/svg"
					class="search-bar__open-more-icon"
				>
					<defs>
						<clipPath id="open-more-top">
							<path d="M 0,0 A 5,5 0 0 1 5,5 V 0 Z" />
						</clipPath>
						<clipPath id="open-more-bottom">
							<path d="M 5,0 A 5,5 0 0 1 0,5 H 5 Z" />
						</clipPath>
					</defs>
				</svg>
				<button
					type="button"
					class="search-bar__open-more"
					title="recherche avancée"
					:class="{'active': isAdvencedSearchOpen}"
					@click="openAdvencedSearch"
				>
					<span class="search-bar__open-more-text">{{ $t('search.filters') }}</span>
					<!-- don't change this svg import if you don't want to skrew up the styling -->
					<svg
						aria-hidden="true"
						width="1em"
						height="1em"
						viewBox="0 0 16 16"
						xmlns="http://www.w3.org/2000/svg"
						class="search-bar__open-more-icon"
					>
						<use
							xlink:href="../assets/images/gear.svg#el"
						/>
					</svg>
				</button>
			</div>

			<div
				ref="suggestions"
				:class="{'show': showSuggestions}"
				class="search-bar__suggestions suggestions"
			>
				<div class="suggestions__wrapper">
					<span class="suggestions__label">{{ $t('search.suggestion.artists') }}</span>
					<ul class="suggestions__list">
						<li
							v-for="(artist, index) in suggestionsArtists"
							:key="index"
							tabindex="-1"
							class="suggestions__item"
							@keydown.down="focusSuggestion(1, $event)"
							@keydown.up="focusSuggestion(-1, $event)"
							@click="selectArtist(index)"
							@keydown.enter="selectArtist(index)"
							@blur="isSuggestionFocused = false"
						>
							<span class="suggestions__name">
								{{ artist }}
							</span>
						</li>
					</ul>
				</div>
				<div class="suggestions__wrapper">
					<span class="suggestions__label">{{ $t('search.suggestion.songs') }}</span>
					<ul class="suggestions__list">
						<li
							v-for="(song, index) in suggestionsSongs"
							:key="index"
							tabindex="-1"
							class="suggestions__item"
							@keydown.down="focusSuggestion(1, $event)"
							@keydown.up="focusSuggestion(-1, $event)"
							@blur="isSuggestionFocused = false"
							@click="selectSong(index)"
							@keydown.enter="selectSong(index)"
						>
							<span class="suggestions__name">
								{{ song.name }}
							</span>
							<span class="suggestions__subname">
								{{ song.artist }}
							</span>
						</li>
					</ul>
				</div>
			</div>
		</form>
		<form
			v-if="isAdvencedSearchOpen"
			class="search-bar__advenced"
			@submit="submit"
		>
			<button
				type="button"
				class="search-bar__close"
				@click="closeAdvencedSearch"
			>
				<span class="sr-only">{{ $t('search.advenced.close') }}</span>
			</button>
			<DoubleSliderRange
				v-model="lastInterpretation"
				:min="lastInterpretationMin"
				:max="lastInterpretationMax"
				:help="$t('search.advenced.lastInterpretation.help')"
			>
				{{ $t('search.advenced.lastInterpretation.title') }}
				<template #label-min-value>
					{{ $t('search.advenced.lastInterpretation.min') }}
				</template>
				<template #label-max-value>
					{{ $t('search.advenced.lastInterpretation.max') }}
				</template>
			</DoubleSliderRange>
			<DoubleSliderRange
				v-model="interpretationNumber"
				:min="interpretationNumberMin"
				:max="interpretationNumberMax"
			>
				{{ $t('search.advenced.InterpretationNumber.title') }}
				<template #label-min-value>
					{{ $t('search.advenced.InterpretationNumber.min') }}
				</template>
				<template #label-max-value>
					{{ $t('search.advenced.InterpretationNumber.max') }}
				</template>
			</DoubleSliderRange>
			<DoubleSliderRange
				v-model="score"
				:min="scoreMin"
				:max="scoreMax"
			>
				{{ $t('search.advenced.score.title') }}
				<template #label-min-value>
					{{ $t('search.advenced.score.min') }}
				</template>
				<template #label-max-value>
					{{ $t('search.advenced.score.max') }}
				</template>
			</DoubleSliderRange>
			<div class="search-bar__row search-bar__sm-col">
				<div class="search-bar__col-left">
					<div class="search-bar__row">
						<div class="search-bar__group">
							<input
								id="odlc"
								v-model="odlc"
								type="checkbox"
								class="search-bar__checkbox"
							>
							<label
								for="odlc"
								class="search-bar__label"
							>{{ $t('search.advenced.dlc.official') }}</label>
							<input
								id="cdlc"
								v-model="cdlc"
								type="checkbox"
								class="search-bar__checkbox"
							>
							<label
								for="cdlc"
								class="search-bar__label"
							>{{ $t('search.advenced.dlc.cdlc') }}</label>
						</div>
						<div
							v-tippy="{placement: 'right'}"
							class="search-bar__nob"
							:content="$t('search.advenced.dlc.help')"
						/>
					</div>
					<div class="search-bar__row">
						<div class="search-bar__group">
							<input
								id="showlight"
								v-model="showlight"
								type="checkbox"
								class="search-bar__checkbox"
							>
							<label
								for="showlight"
								class="search-bar__label"
							>{{ $t('search.advenced.light.button') }}</label>
						</div>
						<div
							v-tippy="{placement: 'right'}"
							class="search-bar__nob"
							:content="$t('search.advenced.light.help')"
						/>
					</div>
					<div class="search-bar__row">
						<div class="search-bar__group">
							<input
								id="vocals"
								v-model="vocals"
								type="checkbox"
								class="search-bar__checkbox"
							>
							<label
								for="vocals"
								class="search-bar__label"
							>{{ $t('search.advenced.lirics.button') }}</label>
						</div>
						<div
							v-tippy="{placement: 'right'}"
							class="search-bar__nob"
							:content="$t('search.advenced.lirics.help')"
						/>
					</div>
				</div>
				<ArrangementsFilter
					class="search-bar__col-right"
				/>
			</div>

			<div class="search-bar__btn-group">
				<button
					type="reset"
					class="search-bar__reset search-bar__btn"
					@click="resetForm"
				>
					{{ $t('search.advenced.reset') }}
				</button>

				<button
					type="submit"
					class="search-bar__submit search-bar__btn search-bar__btn--with-icon"
				>
					{{ $t('search.advenced.submit') }}
					<!-- don't change this svg import if you don't want to skrew up the styling -->
					<svg
						aria-hidden="true"
						class="search-bar__btn-icon"
						width="1em"
						height="1em"
						viewBox="0 0 16 16"
						xmlns="http://www.w3.org/2000/svg"
					>
						<use
							xlink:href="../assets/images/search.svg#el"
						/>
					</svg>
				</button>
			</div>
		</form>

		<OrderWidget v-model="orderBy" />
	</Fragment>
</template>

<script lang="js">
import { Fragment } from 'vue-fragment';
import DoubleSliderRange from './DoubleSliderRange';
import OrderWidget from './OrderWidget';
import { mapFields } from 'vuex-map-fields';
import ArrangementsFilter from './ArrangementsFilter';

export default {
	name: 'SearchBar',
	components: {
		Fragment,
		DoubleSliderRange,
		OrderWidget,
		ArrangementsFilter
	},
	data () {
		return {
			isSearchbarDocked: false,
			isAdvencedSearchOpen: false,
			lastInterpretationMin: 0,
			lastInterpretationMax: 100,
			interpretationNumberMin: 0,
			interpretationNumberMax: 100,
			scoreMin: 0,
			scoreMax: 100,
			suggestionsArtists: [
				'A Day To Remember',
				'A Nanana',
				'Je suis un artiste'
			],
			suggestionsSongs: [
				{
					name: 'All I want',
					artist: 'A Day To Remember'
				},
				{
					name: 'All Sign Point to Lauderdale',
					artist: 'A Day To Remember'
				},
				{
					name: 'If It Means a Lot to You',
					artist: 'A Day To Remember'
				},
				{
					name: 'It\'s Complicated',
					artist: 'A Day To Remember'
				},
				{
					name: 'A Day To Depart',
					artist: 'Noumena'
				}
			],
			isInputFocused: false,
			isSuggestionFocused: false
		};
	},
	computed: {
		showSuggestions() {
			// return (this.isInputFocused || this.isSuggestionFocused) && this.search !== '';
			return false;
		},

		orderBy: {
			get() {
				return this.$store.getters.getOrderBy;
			},
			set(newValue) {
				this.$store.commit('SET_ORDER_BY', newValue);
				this.refreshList();
			}
		},
		...mapFields([
			'searchSettings.search',
			'searchSettings.lastInterpretation',
			'searchSettings.interpretationNumber',
			'searchSettings.score',
			'searchSettings.showlight',
			'searchSettings.vocals',
			'searchSettings.odlc',
			'searchSettings.cdlc'
		])
	},
	watch: {
		odlc(newValue) {
			this.cdlc = newValue ? false : this.cdlc;
		},
		cdlc(newValue) {
			this.odlc = newValue ? false : this.odlc;
		},
		isSearchbarDocked(newValue) {
			this.$emit('docked', newValue);
		}
	},
	mounted() {
		const options = {
			rootMargin: '-48px 0px 10000px 0px',
			threshold: 1
		};
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				// let the advenced search open when scrolled past
				this.isSearchbarDocked = !entry.isIntersecting;

				/*
				// close the advenced search when scrolled past
				// if the bar just docked close the advenced search, if the bar undocked don't change the value
				this.isAdvencedSearchOpen = this.isSearchbarDocked ? false : this.isAdvencedSearchOpen;
				*/
			});
		}, options);

		observer.observe(this.$refs.searchBar);

		document.addEventListener('click', event => {
			this.isSuggestionFocused = event.composedPath().includes(this.$refs.suggestions);
		});
		this.$refs.suggestions.addEventListener('focusin', event => {
			event.preventDefault();
			this.isSuggestionFocused = event.composedPath().includes(this.$refs.suggestions);
		});
	},
	methods: {
		submit(event) {
			if (event) {
				event.preventDefault();
			}

			this.$store.dispatch('getSearch');

			if (this.isSearchbarDocked) {
				this.isSearchbarDocked = false;

				this.$nextTick().then(() => {
					this.$refs.searchBar.scrollIntoView();
					document.getElementsByTagName('HTML')[0].scrollBy({
						top: -100,
						left: 0,
						behavior: 'smooth'
					});
				});
			}
		},
		openAdvencedSearch() {
			if (this.isSearchbarDocked) {
				this.isAdvencedSearchOpen = true;
				this.isSearchbarDocked = false;

				this.$nextTick().then(() => {
					this.$refs.searchBar.scrollIntoView();
					document.getElementsByTagName('HTML')[0].scrollBy({
						top: -100,
						left: 0,
						behavior: 'smooth'
					});
				});
			}
			else {
				this.isAdvencedSearchOpen = !this.isAdvencedSearchOpen;
			}
		},
		closeAdvencedSearch() {
			this.isAdvencedSearchOpen = false;
		},
		resetForm() {
			this.$store.commit('RESET_FORM');
			this.$store.commit('SET_IS_SEARCH', false);
		},
		toggleInputFocusState(state) {
			this.isInputFocused = state;
		},
		focusFirstSuggestion(event) {
			event.preventDefault();
			this.$refs.suggestions.querySelector('.suggestions__item').focus();
		},
		focusSuggestion(padding, event) {
			event.preventDefault();
			let index = -1;
			const allSuggestions = this.$refs.suggestions.querySelectorAll('.suggestions__item');

			for (let i = 0; i < allSuggestions.length; i++) {
				if (event.target === allSuggestions[i]) {
					index = i;
					break;
				}
			}

			if (allSuggestions.length !== index + padding && index + padding >= 0) {
				allSuggestions[(index + padding) % allSuggestions.length].focus();
			}
			else if (index + padding < 0) {
				this.$refs.search.focus();
			}

		},
		selectArtist(index) {
			this.search = this.suggestionsArtists[index];
			this.$refs.submit.focus();
			this.isSuggestionFocused = false;
			this.submit();
		},
		selectSong(index) {
			this.search = `${ this.suggestionsSongs[index].name } - ${ this.suggestionsSongs[index].artist }`;
			this.$refs.submit.focus();
			this.isSuggestionFocused = false;
			this.submit();
		},
		refreshList() {
			this.$emit('refresh');
		}
	}
};


</script>

<style lang="scss">
  .search-bar {
		padding: 0;
		margin: 0 auto 2em;
		width: 100%;
		max-width: 60ch;
		transition:
			max-width 300ms cubic-bezier(.19,1,.22,1),
			transform 300ms ease-in-out,
			box-shadow 300ms ease-in-out,
			background-color 300ms ease-in-out;
		z-index: 100;
		position: relative;
		border-radius: 5px;

		// &:focus-within {
		// 	box-shadow: 0 0 10px 3px #0003;
		// }

		&__input {
			width: 100%;
			height: 100%;
			border: none;
			padding: .5em 1em;
			border-radius: 5px;
			background-color: var(--filler-2);
			color: var(--text);
			transition: background-color 300ms ease-in-out;

			&::placeholder {
				color: var(--text);
				opacity: .8;
				transition: opacity 300ms ease-in-out;
			}

			&:focus {
				outline: none;
				background-color: var(--filler-2);

				&::placeholder {
					opacity: .4;
				}
			}
			@at-root .docked & {
				background-color: var(--filler-2-translucent);

				&:focus {
					background-color: var(--filler-2);

					&::placeholder {
						opacity: .9;
					}
				}
			}

			&-wrapper {
				position: relative;
				flex-grow: 1;
			}
		}

		&__button {
			display: flex;
			padding: .25em .5em;
			border: none;
			background: var(--primary-1);
			background: linear-gradient(18deg, var(--primary-1) 0%, var(--primary-2) 100%);
			color: var(--text);
			position: absolute;
			right: 1em;
			top: 50%;
			transform: translateY(-50%);
			border-radius: 5px;
			overflow: hidden;
			cursor: pointer;

			&-text {
				overflow: hidden;
				max-width: 0ch;
				transition: 300ms ease-out;
				transition-property: max-width, margin-right;
			}

			&:focus > &-text,
			&:hover > &-text {
				margin-right: .5em;
				max-width: 15ch;
			}

			&-logo {
				box-shadow: 0 0 5px 6px #d7d7d7;
			}

			&:focus {
				outline: none;
			}
		}

		&__nob {
			z-index: 11;
			width: 1em;
			height: 1em;
			border-radius: 50%;
			background-color: var(--filler-1);
			transition: background-color 200ms ease-in-out;
			flex-shrink: 0;
			align-self: center;


			&:focus {
				outline: none;
			}

			&::before {
				content: '?';
				width: 100%;
				height: 100%;
				display: block;
				color: var(--text);
				text-align: center;
				transition: color 200ms ease-in-out;
			}
		}

		&.docked{
			max-width: 80ch;
			width: calc(100vw - 2em);
			position: sticky;
			top: .4em;
		}

		.container {
			display: flex;
			width: 100%;
			border-radius: 5px;
			transition: box-shadow 300ms ease-in-out;
			&:focus-within {
				box-shadow: 0 0 5px 0 #0003;
			}
		}

		.suggestions {
			position: absolute;
			top: 2em;
			left: .5em;
			right: 2.5em;

			padding: .75em 1em .5em;
			border-radius: 0 0 5px 5px;
			z-index: -1;

			background-color: var(--filler-2);
			color: var(--text);
			box-shadow: 0 0 5px 0 #0003;
			clip-path: inset(100% 0 0 0);
			transform: translateY(-100%);
			transition: 150ms 100ms ease-out;
			transition-property: clip-path, transform;


			&__label {
				font-size: small;
			}
			&__list {
				padding: .25em 0;
			}
			&__item {
				padding: .25em .5em;
				cursor: pointer;
				border-radius: 5px;
				position: relative;
				z-index: 5;
				display: block;
				outline: none;

				&::before {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					border-radius: 5px;
					z-index: -1;
					transition: opacity 300ms ease-in-out;
					opacity: 0;

					background-image: linear-gradient(90deg, var(--primary-2) 0%, rgba(91, 3, 3, 0) 100%);

					@at-root .dark & {
						background-image: linear-gradient(90deg, var(--primary-1) 0%, rgba(91, 3, 3, 0) 100%);
					}
				}

				&:hover::before,
				&:focus::before {
					opacity: 1;
				}
			}
			&__name {
				font-weight: bold;
			}
			&__subname {
				font-size: small;
				margin-left: .5em;
			}
			&.show {
				clip-path: inset(-10px -10px -10px -10px);
				transform: translateY(0);
			}
		}

		&__open-more {
			position: relative;
			display: flex;
			width: 100%;
			max-width: max-content;
			height: 36px;
			padding: 0 8px;

			align-items: center;

			border: none;
			border-radius: 0 5px 5px 0;
			color: var(--text);
			background-color: var(--filler-1);

			cursor: pointer;

			transition: background-color 300ms ease-in-out;

			&::before,
			&:after {
				content: '';
				display: block;
				background-color: inherit;
				width: 5px;
				height: 5px;
				position: absolute;
				left: -5px;
				transition: background-color 300ms ease-in-out;
			}
			&:before {
				top: 0;
				clip-path: url(#open-more-top);
			}
			&:after {
				bottom: 0;
				clip-path: url(#open-more-bottom);
			}

			&-text {
				overflow: hidden;
				max-width: 0ch;
				transition: 300ms ease-out;
				white-space: nowrap;
				transition-property: max-width, margin-right;
			}

			&:focus {
				outline: none;
			}

			&:focus > &-text,
			&:hover > &-text {
				margin-right: .5em;
				max-width: 15ch;
			}

			&.active {
				background: var(--bg-gradient);

				&::before {
					background-color: var(--gradient-2);
				}
				&:after {
					background-color: var(--gradient-1);
				}
			}

			&-icon {
				animation: rotate 3s linear infinite paused;
			}
			&:focus &-icon,
			&:hover &-icon {
				animation-play-state: running;
			}

			@keyframes rotate {
				from {
					transform: rotate(0turn);
				}
				to {
					transform: rotate(1turn);
				}
			}
		}

		&__advenced {
			max-width: 60ch;
			margin: 0 auto 2em;
			border-radius: 5px;
			box-shadow: 0 0 5px 0 #0001;
			background: var(--primary-1);
			background: var(--bg-gradient);
			padding: 1em .5em;

			@media screen and (min-width: 25em) {
				padding: 1.5em;
			}
		}

		&__close {
			position: relative;
			height: 1em;
			width: 1em;
			border: 0;
			padding: 0;
			background-color: #fff0;
			cursor: pointer;
			margin-left: auto;
			display: block;
			margin-top: -.5em;

			&::before,
			&::after {
				content: '';
				position: absolute;
				display: block;
				width: .1em;
				height: 1.4em;
				border-radius: .05em;
				box-shadow: var(--shadow);
				background-color: var(--text);
			}

			&::before {
				top: 0;
				left: 0;
				transform: rotate(-45deg) translateX(-50%);
				transform-origin: top left;
			}
			&::after {
				top: 0;
				right: 0;
				transform: rotate(45deg) translateX(50%);
				transform-origin: top right;
			}

			&:focus,
			&:hover {
				outline: 0;
				opacity: .5;
			}
		}

		&__row {
			display: flex;
			flex-direction: row;
			gap: 1em;

			&:not(:last-child) {
				margin-bottom: .75em;
			}

		}
		&__col-left,
		&__col-right {
			width: 50%;
			display: flex;
			flex-direction: column;
		}
		@media screen and (max-width: 20em) {
			&__sm-col {
				display: flex;
				flex-direction: column;
			}
			&__col-left,
			&__col-right {
				width: 100%;
			}
		}

		&__group {
			width: 100%;
			box-shadow: var(--shadow);
			border-radius: 5px;
		}
		&__group &__checkbox + &__label:first-of-type {
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
		}
		&__group &__checkbox + &__label:last-of-type {
			border-bottom-left-radius: 5px;
			border-bottom-right-radius: 5px;
		}

		&__checkbox {
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
		&__checkbox + &__label {
			cursor: pointer;
			background-color: var(--filler-1);
			padding: .5em;
			width: 100%;
			display: block;
			color: var(--text);
			text-align: center;
			font-weight: bold;
			transition: 300ms ease-in-out;
			transition-property: color, background-color, border-color;
			border: 2px solid var(--filler-1);

			&:hover {
				border-color: var(--primary-2);
			}
		}

		&__checkbox:checked + &__label {
			background-color: var(--primary-2);
			border-color: var(--primary-2);

			color: black;

			&:hover {
				border-color: var(--filler-1);
			}
		}
		&__checkbox:focus + &__label,
		&__checkbox:active + &__label {
			border-color: var(--primary-2);
			outline: none;
		}
		&__checkbox:checked:focus + &__label,
		&__checkbox:checked:active + &__label {
			border-color: var(--filler-1);
		}

		&__label {
			font-weight: bold;
			color: var(--text);
		}

		&__radio {
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

		&__radio + &__label {
			position: relative;
			display: block;
			background-color: var(--filler-1);
			margin-top: .25em;
			margin-left: 2em;
			width: max-content;
			padding: .25em;
			box-shadow: var(--shadow);
			border-radius: 5px;
			border: 2px solid var(--filler-1);
			cursor: pointer;
			transition: 300ms ease-in-out;
			transition-property: background-color, border-color;

			&::before {
				content:'';
				position: absolute;
				display: block;
				width: 1em;
				height: 1em;
				background-color: var(--filler-1);
				left: -1em;
				top: 50%;
				transform: translate(-50%, -50%);
				border: 3px solid var(--filler-1);
				border-radius: 5px;
				transition: background-color 300ms ease-in-out;
			}

			&:hover{
				border: 2px solid var(--primary-2);
			}
		}

		&__radio:checked + &__label::before {
			background-color: var(--primary-2);
		}

		&__radio:focus + &__label,
		&__radio:active + &__label {
			border-color: var(--primary-2);
		}

		&__radio:checked:focus + &__label,
		&__radio:checked:active + &__label {
			&::before {
				background-color: var(--primary-2);
			}
		}

		&__btn-group {
			display: flex;
			gap: 1em;
		}

		&__btn {
			padding: .5em 1em;
			width: max-content;
			min-width: 15ch;
			font-weight: bold;
			color: var(--text);
			border-radius: 5px;
			box-shadow: var(--shadow);
			cursor: pointer;

			&-icon {
				margin-left: .5em;
				margin-right: -.5em;
			}

			&--with-icon {
				display: flex;
				justify-content: center;
				flex-direction: row;
			}
		}

		&__reset {
			border: 3px solid var(--filler-1);
			background-color: #0000;
			box-shadow: var(--shadow), inset var(--shadow);
			transition: 300ms ease-in-out;
			transition-property: box-shadow, border-color;

			&:focus,
			&:hover {
				outline: 0;
				// box-shadow: 0 0 5px 2px #0004, inset 0 0 5px 2px #0002;
				border-color: var(--primary-2);
			}
		}

		&__submit {
			background-color: var(--filler-1);
			border: 3px solid var(--filler-1);
			margin-left: auto;
			transition: border-color 300ms ease-in-out;

			&:focus,
			&:hover {
				outline: 0;
				// box-shadow: 0 0 5px 2px #0004;
				border-color: var(--primary-2);
			}
		}
	}
</style>
