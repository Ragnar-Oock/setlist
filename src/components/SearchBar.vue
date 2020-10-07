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
				class="search-bar__open-more"
				title="recherche avancée"
				:class="{'active': isAdvencedSearchOpen}"
				@click="openAdvencedSearch"
			>
				<span class="search-bar__open-more-text">filtres</span>
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
		</form>
		<form
			v-if="isAdvencedSearchOpen"
			class="search-bar__advenced"
			@submit="submit"
		>
			<button
				class="search-bar__close"
				@click="openAdvencedSearch"
			>
				<span class="sr-only">Close</span>
			</button>
			<DoubleSliderRange
				v-model="lastInterpretation"
				:min="lastInterpretationMin"
				:max="lastInterpretationMax"
				help="Nombre de jours depuis la dernière foi que cette musique a été jouée.<br>0 équivalent à aujourd'hui et 100 à tout le temps"
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
				v-model="interpretationNumber"
				:min="interpretationNumberMin"
				:max="interpretationNumberMax"
			>
				Nombre d'interprétation
				<template #label-min-value>
					Durée minimum
				</template>
				<template #label-max-value>
					Durée maximum
				</template>
			</DoubleSliderRange>
			<DoubleSliderRange
				v-model="score"
				:min="scoreMin"
				:max="scoreMax"
			>
				Score
				<template #label-min-value>
					Score minimum
				</template>
				<template #label-max-value>
					Score maximum
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
							>Officielle</label>
							<input
								id="cdlc"
								v-model="cdlc"
								type="checkbox"
								class="search-bar__checkbox"
							>
							<label
								for="cdlc"
								class="search-bar__label"
							>CDLC</label>
						</div>
						<div
							v-tippy="{placement: 'right'}"
							class="search-bar__nob"
							content="put some text here"
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
							>Showlight</label>
						</div>
						<div
							v-tippy="{placement: 'right'}"
							class="search-bar__nob"
							content="La musique recherchée a des effets de lumiere"
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
							>Paroles</label>
						</div>
						<div
							v-tippy="{placement: 'right'}"
							class="search-bar__nob"
							content="La musique recherchée affiche ses paroles."
						/>
					</div>
				</div>
				<div class="search-bar__col-right">
					<p class="search-bar__label">
						Arrangement&nbsp;:
					</p>
					<div
						v-for="(value, key) in arrangement"
						:key="key"
						class="search-bar__radio_group"
					>
						<input
							:id="'arrangement-' + key"
							v-model="arrangement[key]"
							type="checkbox"
							class="search-bar__radio"
							:value="value"
						>
						<label
							:for="'arrangement-' + key"
							class="search-bar__label"
						>
							{{ key }}
						</label>
					</div>
				</div>
			</div>

			<div class="search-bar__btn-group">
				<button
					class="search-bar__reset search-bar__btn"
					@click="resetForm"
				>
					Reset
				</button>

				<button
					type="submit"
					class="search-bar__submit search-bar__btn search-bar__btn--with-icon"
				>
					Rechercher
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

		<OrderWidget />
	</Fragment>
</template>

<script lang="js">
import { Fragment } from 'vue-fragment';

import DoubleSliderRange from './DoubleSliderRange';
import OrderWidget from './OrderWidget';

export default {
	name: 'SearchBar',
	components: {
		Fragment,
		DoubleSliderRange,
		OrderWidget
	},
	props: [],
	data () {
		return {
			search: '',
			isSearchbarDocked: false,
			isAdvencedSearchOpen: false,
			lastInterpretation: [0, 100],
			lastInterpretationMin: 0,
			lastInterpretationMax: 100,
			interpretationNumber: [0, 100],
			interpretationNumberMin: 0,
			interpretationNumberMax: 100,
			arrangement: { 'rythm': false, 'lead': false, 'bass': false },
			showlight: false,
			vocals: false,
			odlc: false,
			cdlc: false,
			score: [0, 100],
			scoreMin: 0,
			scoreMax: 100
		};
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
		},
		resetForm() {
			this.lastInterpretation = [0, 100];
			this.lastInterpretationMin = 0;
			this.lastInterpretationMax = 100;
			this.interpretationNumber = [0, 100];
			this.interpretationNumberMin = 0;
			this.interpretationNumberMax = 100;
			this.arrangement = { 'rythm': false, 'lead': false, 'bass': false };
			this.showlight = false;
			this.odlc = false;
			this.cdlc = false;
			this.score = [0, 100];
			this.scoreMin = 0;
			this.scoreMax = 100;
		}
	}
};


</script>

<style lang="scss">
  .search-bar {
		top: 1.5em;
		padding: 0;
		margin: 0 auto 2em;
		width: 100%;
		max-width: 60ch;
		border-radius: 5px;
		overflow: hidden;
		box-shadow: 0 0 5px 1px #0003;
		transition:
			max-width 300ms cubic-bezier(.19,1,.22,1),
			transform 300ms ease-in-out,
			box-shadow 300ms ease-in-out,
			background-color 300ms ease-in-out;
		transform: translateY(-50%);
		z-index: 100;
		display: flex;
		position: relative;

		&:focus-within {
			box-shadow: 0 0 10px 3px #0003;
		}

		&__input {
			width: 100%;
			height: 100%;
			border: none;
			padding: .5em 1em;
			border-radius: 5px;
			box-shadow: 0 0 5px 0 #0008;
			background-color: var(--filler-2);
			color: var(--counter-text);
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
			box-shadow: 0 0 5px #0005;
			width: calc(100vw - 2em);
			position: sticky;
		}

		.container {
			position: relative;
			flex-grow: 1;
			z-index: 10;
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
				animation: close-idle 7s cubic-bezier(.65,.05,.11,1.12) infinite;
			}
		}
		@keyframes close-idle {
			0% {
				transform: rotate(0deg);
			}
			30% {
				transform: rotate(90deg);
			}
			100% {
				transform: rotate(90deg);
			}
		}

		&__row {
			display: flex;
			flex-direction: row;
			gap: 1em;
			align-items: center;

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
			transition-property: color, background-color;
		}

		&__checkbox:checked + &__label {
			background-color: var(--primary-2);
			color: black;
		}
		&__checkbox:focus + &__label,
		&__checkbox:active + &__label {
			box-shadow: 0 0 5px 2px #0004;
			background-color: var(--filler-2);
			outline: none;
		}
		&__checkbox:checked:focus + &__label,
		&__checkbox:checked:active + &__label {
			color: var(--white);
			background-color: var(--primary-1);
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
			cursor: pointer;
			transition: background-color 300ms ease-in-out;

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
		}

		&__radio:checked + &__label::before {
			background-color: var(--primary-2);
		}

		&__radio:focus + &__label,
		&__radio:active + &__label {
			box-shadow: 0 0 5px 2px #0004;
			background-color: var(--filler-2);

			&::before {
				box-shadow: 0 0 5px 2px #0004;
				background-color: var(--filler-2);
			}
		}

		&__radio:checked:focus + &__label,
		&__radio:checked:active + &__label {
			box-shadow: 0 0 5px 2px #0004;
			background-color: var(--primary-1);

			&::before {
				box-shadow: 0 0 5px 2px #0004;
				background-color: var(--primary-1);
			}
		}

		&__btn-group {
			display: flex;
		}

		&__btn {
			padding: .5em 1em;
			width: 100%;
			max-width: 15ch;
			font-weight: bold;
			color: var(--text);
			border-radius: 5px;
			box-shadow: var(--shadow);
			cursor: pointer;

			&-icon {
				margin-left: .5em;
			}

			&--with-icon {
				display: flex;
				flex-direction: row;
			}
		}

		&__reset {
			border: 3px solid var(--filler-2);
			background-color: #0000;
			box-shadow: var(--shadow), inset var(--shadow);
			transition: box-shadow 300ms ease-in-out;

			&:focus {
				outline: 0;
				box-shadow: 0 0 5px 2px #0004, inset 0 0 5px 2px #0002;
			}
		}

		&__submit {
			background-color: var(--filler-2);
			border: 3px solid var(--filler-2);
			margin-left: auto;

			&:focus {
				outline: 0;
				box-shadow: 0 0 5px 2px #0004;
			}
		}
	}
</style>
