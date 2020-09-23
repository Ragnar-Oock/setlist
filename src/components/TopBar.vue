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
				class="menu"
			>
				<div class="menu__item">
					<label
						for="darkMode"
						class="menu__label"
						:class="{'checked': isDarkModeOn}"
					>
						<input
							id="darkMode"
							v-model="isDarkModeOn"
							type="checkbox"
							name="darkMode"
							class="menu__checkbox"
						>
						<div class="menu__icon">
							<img
								src="../assets/images/tick.svg"
								alt="tick"
							>
						</div>
						<span class="menu__text">
							dark Mode
						</span>
					</label>
				</div>
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

<style lang="scss">
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



		.fade-enter-active, .fade-leave-active {
			transition: opacity .5s;
		}
		.fade-enter, .fade-leave-to {
			opacity: 0;
		}
	}
	.menu {
		position: absolute;
		top: calc(100% + 1.1em);
		background-color: var(--primary-1);
		width: 30ch;
		padding: .5em;
		border-radius: 5px;
		left: .5em;
		color: $white;
		filter: drop-shadow(0px 0px 5px #0003);

		&::before {
			content: '';
			display: block;
			width: 1em;
			height: 1em;
			position: absolute;
			background-color: var(--primary-1);
			transform: rotate(45deg);
			top: -0.4em;
			left: 1.5em;
			z-index: -1;
			border-radius: 5px;
		}

		&__label {
			display: flex;
			align-items: center;
			padding: .2em;
			border-radius: 5px;
			transition: background-color 300ms ease-in-out;
			background-color: var(--primary-1);
			cursor: pointer;

			&.checked {
				background-color: var(--primary-2);
			}

			&:focus-within {
				background-color: var(--primary-2);
			}
		}

		&__text {
			padding: .5em .8em;
		}

		&__checkbox {
			position: absolute;
			transform: scale(0);
		}

		&__icon {
			display: flex;
			width: 1.5em;
			height: 1.5em;
			border-radius: 5px;
			background-color: transparent;
			border: 2px solid var(--white);
			align-items: center;
			margin: auto .3em;
			transition: background-color 300ms ease-in-out;

			img {
				width: 100%;
				opacity: 0;
				transition: opacity 300ms ease-in-out;
			}

			@at-root .top-bar .checked & {
				background-color: white;

				img {
					opacity: 1;
				}
			}
			}
		}
</style>
