<template>
	<header
		class="top-bar"
		:class="{'docked': isSearchBarDocked}"
	>
		<div class="top-bar__left">
			<LangSelector />
		</div>
		<div class="top-bar__right">
			<button
				id="startTutorial"
				v-tippy="{placement:'bottom', popperOptions: {strategy: 'fixed'}}"
				class="top-bar__button"
				:data-tippy-content="$t('topBar.startTutorial')"
				@click="startTutorial"
			>
				<img
					svg-inline
					class="top-bar__icon"
					src="@/assets/images/question-circle-fill.svg"
					aria-hidden="true"
				>
			</button>
			<KoFi />
			<label
				id="darkmode-label"
				ref="darkmode"
				v-tippy="{placement:'bottom', popperOptions: {strategy: 'fixed'}}"
				for="darkMode"
				class="top-bar__label"
				:class="{'checked': isDarkModeOn}"
				:data-tippy-content="$t('topBar.darkMode')"
			>
				<input
					id="darkMode"
					v-model="isDarkModeOn"
					type="checkbox"
					name="darkMode"
					class="sr-only"
				>

				<transition
					name="rise"
					mode="out-in"
				>
					<!-- icon if darkMode is on -->
					<img
						v-if="isDarkModeOn"
						key="on"
						svg-inline
						class="top-bar__icon"
						src="@/assets/images/moon.svg"
						aria-hidden="true"
					>
					<img
						v-else
						key="off"
						svg-inline
						class="top-bar__icon"
						src="@/assets/images/light.svg"
						aria-hidden="true"
					>
				</transition>

				<div
					v-if="isDarkModeOn"
					key="on"
					class="top-bar__horizon on"
				/>
				<div
					v-else
					key="off"
					class="top-bar__horizon off"
				/>

				<span class="sr-only">{{ $t('topBar.darkMode') }}</span>
			</label>
		</div>
	</header>
</template>

<script lang="js">
import LangSelector from '@/components/LangSelector';
import KoFi from '@/components/KoFi';

export default {
	name: 'TopBar',
	components: {
		LangSelector,
		KoFi
	},
	props: {
		isSearchBarDocked: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	data () {
		return {
			isMenuOpen: false
		};
	},
	computed: {
		isDarkModeOn: {
			get() {
				return this.$store.getters.isDarkModeOn;
			},
			set(newValue) {
				this.$store.commit('SET_DARK_MODE', newValue);
			}
		}
	},
	methods: {
		toggleMenu(state) {
			if (typeof state !== 'undefined' && !(state instanceof Event)) {
				this.isMenuOpen = state;
			}
			else {
				this.isMenuOpen = !this.isMenuOpen;
			}
		},
		startTutorial() {
			this.$store.commit('SET_TUTORIAL_COMPLETION', false);
		}
	}
};


</script>

<style lang="scss">
  .top-bar {
		background: var(--bg-gradient);
		position: fixed;
		width: 100%;
		top: 0;
		height: 3em;
		z-index: 15;
		display: flex;
		align-items: center;
		box-shadow: 0 0 5px #0003;
		display: flex;
		padding: 0 2em;
		transition: background-image 300ms ease-in-out;

		&__left,
		&__right{
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: .25em;

			transition: opacity 300ms ease-in-out;
			@media screen and (max-width: 68em) {
				@at-root .docked & {
					opacity: 0;
				}
			}
		}

		&__left{
			margin-right: auto;
		}

		&__label,
		&__button {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: .5em;
			border-radius: 5px;
			cursor: pointer;
			transition: 300ms ease-in-out;
			transition-property: border-color, opacity;
			border: 1px solid transparent;
			background-color: #0000;

			&:focus,
			&:hover {
				border-color: var(--text);
				outline: none;
			}
		}

		&__horizon {
			background-color: var(--text);
			height: 2px;
			width: 0;
			border-radius: 1.5px;
			margin-bottom: -2px;

			&.on, &.off {
				animation: grow 1250ms 1 ease-out;

				@keyframes grow {
					0% {
						width: 0%;
					}
					20% {
						width: 150%;
					}
					80% {
						width: 150%;
					}
					100% {
						width: 0%;
					}
				}
			}
		}

		&__icon {
			width: 1.25em;
			height: 1.25em;
			color: var(--text);

		}
		.rise-enter-active,
		.rise-leave-active {
			transition: 250ms 250ms ease-out;
			transition-property: transform, clip-path;
		}

		.rise-enter {
			transform: translateY(100%);
			clip-path: inset(0 0 100% 0);
		}
		.rise-enter-to{
			transform: translateY(0);
			clip-path: inset(0 0 0 0);
		}

		.rise-leave {
			transform: translateY(0);
			clip-path: inset(0 0 0 0);
		}
		.rise-leave-to {
			transform: translateY(100%);
			clip-path: inset(0 0 100% 0);
		}
	}
</style>
