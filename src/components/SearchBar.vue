<template lang="html">
	<form
		class="search-bar"
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
			search: ''
		};
	},
	computed: {

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
		padding: 0;
		border-radius: 5px;
		box-shadow: 0 0 5px 1px #0001;
		margin-bottom: 3em;
		overflow: hidden;
		position: relative;
		transition: scale 300ms ease-in-out;

		&:focus-within {
			scale: 1.05;
		}

		&__input {
			width: 100%;
			height: 100%;
			border: none;
			padding: .5em 1em;
			background-color: #fffef8;

			&:focus {
				outline: none;
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
	}
</style>
