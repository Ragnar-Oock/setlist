<template>
	<Fragment>
		<form
			ref="searchBar"
			class="search-bar"
			:class="{'docked': isSearchbarDocked}"
			@submit="submit($event)"
		>
			<div class="container">
				<label
					for="search"
					class="sr-only"
				>Rechercher une musique</label>
				<input
					id="search"
					v-model="search"
					type="search"
					name="search"
					class="search-bar__input"
					placeholder="Recherche un titre, un artiste..."
				>
				<button
					type="submit"
					class="search-bar__button"
				>
					<span class="search-bar__button-text">Rechercher</span>
					<img
						src="../assets/images/search.svg"
						alt="search icon"
					>
				</button>
			</div>
			<button
				class="search-bar__open-more"
				title="recherche avancée"
				@click="openAdvencedSearch"
			>
				<svg
					width="1em"
					height="1em"
					viewBox="0 0 16 16"
					fill="currentColor"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 0 0-5.86 2.929 2.929 0 0 0 0 5.858z"
					/>
				</svg>

				<span class="sr-only">recherche avancée</span>
			</button>
		</form>
		<div
			v-if="isAdvencedSearchOpen"
			class="search-bar__advenced"
		>
			<DoubleSliderRange
				v-model="interpretationRange"
				:min="interpretationMin"
				:max="interpretationMax"
			>
				Dernière interprétation (en jours)
				<template #help>
					Nombre de jours depuis la dernière foi que cette musique a été jouée.<br>0 équivalent à aujourd'hui et 100 à tout le temps
				</template>
				<template #label-min-value>
					Durée minimum
				</template>
				<template #label-max-value>
					Durée maximum
				</template>
			</DoubleSliderRange>
			<DoubleSliderRange
				v-model="interpretationRange"
				:min="interpretationMin"
				:max="interpretationMax"
			>
				Nombre d'interprétation
				<template #label-min-value>
					Durée minimum
				</template>
				<template #label-max-value>
					Durée maximum
				</template>
			</DoubleSliderRange>
		</div>
	</Fragment>
</template>

<script lang="js">

import { Fragment } from 'vue-fragment';
import DoubleSliderRange from './DoubleSliderRange';

export default {
	name: 'SearchBar',
	components: {
		Fragment,
		DoubleSliderRange
	},
	props: [],
	data () {
		return {
			search: '',
			isSearchbarDocked: false,
			isAdvencedSearchOpen: false,
			interpretationRange: [0, 100],
			interpretationMin: 0,
			interpretationMax: 100
		};
	},
	computed: {

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
	},
	methods: {
		submit(event) {
			event.preventDefault();
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
					console.log('scroll');
				});
			}
			else {
				this.isAdvencedSearchOpen = !this.isAdvencedSearchOpen;
			}
		}
	}
};


</script>

<style lang="scss">
  .search-bar {
		top: 3em;
		padding: 0;
		margin: 0 auto 3em;
		width: 100%;
		max-width: 60ch;
		border-radius: 5px;
		overflow: hidden;
		box-shadow: 0 0 5px 1px #0003;
		transition:
			max-width 300ms cubic-bezier(.31,.45,.21,1.76),
			transform 300ms ease-in-out,
			box-shadow 300ms ease-in-out,
			background-color 300ms ease-in-out;
		transform: translateY(-50%);
		z-index: 100;
		display: flex;

		&:focus-within {
			box-shadow: 0 0 10px 3px #0003;
		}

		&__input {
			width: 100%;
			height: 100%;
			border: none;
			padding: .5em 1em;
			background-color: #fffef8;
			transition: background-color 300ms ease-in-out;
			border-radius: 5px;
			box-shadow: 0 0 5px 0 #0008;
			background-color: #999;
			&:focus {
				outline: none;
				background-color: #fff;
			}

			&::placeholder {
				color: #1d1d1d;
			}

			@at-root .docked & {
				background-color: #fff;
			}

			@supports (backdrop-filter: blur(5px)) {
				@at-root .docked & {
					backdrop-filter: blur(5px);
					background-color: #fff6;

					&:focus {
						background-color: #fff;
					}
				}
			}
		}

		&__button {
			display: flex;
			padding: .25em .5em;
			border: none;
			background-color: #d7d7d7;
			color: #fffef8;
			position: absolute;
			right: 1em;
			top: 50%;
			transform: translateY(-50%);
			border-radius: 5px;
			overflow: hidden;
			cursor: pointer;

			&-text {
				color: #404040;
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
		}

		&.docked{
			max-width: 80ch;
			box-shadow: 0 0 5px #0005;
			width: calc(100vw - (2 * (50px + 2em)));
			position: sticky;
		}

		.container {
			position: relative;
			flex-grow: 1;
			z-index: 10;
		}

		&__open-more {
			border: none;
			position: relative;
			background-color: #404040;
			color: white;

			&::before,
			&:after {
				content: '';
				display: block;
				background-color: inherit;
				width: 5px;
				height: 5px;
				position: absolute;
				left: -5px;
			}
			&:before {
				top: 0;
				clip-path: path('M 0,0 A 5,5 0 0 1 5,5 V 0 Z');
			}
			&:after {
				bottom: 0;
				clip-path: path('M 5,0 A 5,5 0 0 1 0,5 H 5 Z');
			}
		}

		&__advenced {
			max-width: 60ch;
			margin: auto;
			border-radius: 5px;
			box-shadow: 0 0 5px 0 #0001;
		}
	}
</style>
