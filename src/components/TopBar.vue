<template lang="html">
	<div
		ref="menu"
		class="top-bar"
	>
		<button
			class="top-bar__toggle"
			@click="toggleMenu"
		>
			<span class="sr-only">Menu</span>
			<div class="top-bar__icon-bar bar1" />
			<div class="top-bar__icon-bar bar2" />
			<div class="top-bar__icon-bar bar3" />
		</button>

		<transition name="fade">
			<div
				v-show="isMenuOpen"
				class="top-bar__menu"
			>
				<label for="darkMode">dark Mode</label>
				<input
					id="darkMode"
					v-model="isDarkModeOn"
					type="checkbox"
					name="darkMode"
				>
			</div>
		</transition>
	</div>
</template>

<script lang="js">

export default {
	name: 'TopBar',
	props: [],
	data () {
		return {
			isMenuOpen: false
		};
	},
	computed: {
		isDarkModeOn: {
			get() {
				return this.$store.state.darkMode;
			},
			set(newValue) {
				this.$store.commit('SET_DARK_MODE', newValue);
			}
		}
	},
	mounted() {
		// close the mennu if clic occure outside of it or the topbar
		document.addEventListener('click', event => {
			const isClickOnElement = event.composedPath().includes(this.$refs.menu);

			this.$nextTick().then(() => {
				if (this.isMenuOpen && !isClickOnElement) {
					this.toggleMenu(false);
				}
			});
		});
	},
	methods: {
		toggleMenu(state) {
			if (typeof state !== 'undefined' && !(state instanceof Event)) {
				this.isMenuOpen = state;
			}
			else {
				this.isMenuOpen = !this.isMenuOpen;
			}
		}
	}
};


</script>

<style scoped lang="scss">
	@import '../assets/scss/variables.scss';

  .top-bar {
		background-color: $dark;
		position: sticky;
		top: 0;
		height: 3em;
		z-index: 15;
		display: flex;
		align-items: center;
		box-shadow: 0 0 5px #0003;

		&__toggle {
			background-color: transparent;
			border: none;
			padding: .25em .5em;
			margin-left: 1em;
			border: thin solid transparent;
			border-radius: 5px;
			transition: ease-in-out 300ms;
			transition-property: border-color, opacity;

			&:focus {
				outline: none;
				border-color: $white;
			}

			&:hover {
				opacity: .5;
			}
		}

		&__icon-bar {
			display: block;
			background-color: $white;
			height: .3em;
			width: 2em;
			margin: .3em 0;
			border-radius: .15em;
		}

		&__menu {
			position: absolute;
			top: calc(100% + 5px);
			background-color: #253f55;
			width: 30ch;
			padding: .25em .5em;
			border-radius: 5px;
			left: 5px;
			color: $white;
		}

		.fade-enter-active, .fade-leave-active {
			transition: opacity .5s;
		}
		.fade-enter, .fade-leave-to {
			opacity: 0;
		}
	}
</style>
