<template lang="html">
	<form
		ref="searchBar"
		class="search-bar"
		:class="{'docked': isSearchbarDocked}"
		@submit="submit($event)"
	>
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
			<svg
				width="1em"
				height="1em"
				viewBox="0 0 16 16"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
				class="search-bar__button-logo"
			>
				<use
					xlink:href="../assets/images/search.svg#el"
				/>
			</svg>
		</button>
	</form>
</template>

<script lang="js">

export default {
	name: 'SearchBar',
	props: [],
	data () {
		return {
			search: '',
			isSearchbarDocked: false
		};
	},
	mounted() {
		const options = {
			rootMargin: '-80px 0px 10000px 0px',
			threshold: 0
		};
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				this.isSearchbarDocked = !entry.isIntersecting;
			});
		}, options);

		observer.observe(this.$refs.searchBar);
	},
	methods: {
		submit(event) {
			event.preventDefault();
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
		max-width: 100%;
		border-radius: 5px;
		overflow: hidden;
		box-shadow: 0 0 5px 1px #0001;
		transition: 300ms ease-in-out;
		transition-property: max-width, transform, width, box-shadow;
		transform: translateY(-50%);
		z-index: 100;

		&:focus-within {
			transform: translateY(-50%) scale(1.05);
		}

		&__input {
			width: 100%;
			height: 100%;
			border: none;
			padding: .5em 1em;
			background-color: #fffef8;
			transition: background-color 300ms ease-in-out;

			&:focus {
				outline: none;
			}

			&::placeholder {
				color: #1d1d1d;
			}

			@at-root .docked & {
				backdrop-filter: blur(5px);
				background-color: #fff6;
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
			max-width: 100%;
			box-shadow: 0 0 5px #0005;
			width: calc(100vw - (2 * (50px + 2em)));
			position: sticky;
		}
	}
</style>
