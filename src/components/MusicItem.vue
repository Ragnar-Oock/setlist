<template lang="html">
	<div
		class="music-item"
		:class="{'openned': openned}"
	>
		<div
			class="music-item__card"
			:class="{'openned': openned}"
			tabindex="0"
			@click="toggleMusic"
			@keypress.enter="toggleMusic"
		>
			<span
				v-if="duration"
				class="music-item__duration"
				title="durée de la musique"
			>
				{{ duration }}
			</span>

			<p class="music-item__title">
				{{ data.title }}
			</p>
			<hr class="music-item__hr">
			<p
				v-if="data.artiste"
				class="music-item__artiste"
			>
				<span class="sr-only">by</span>
				{{ data.artiste }}
			</p>
		</div>

		<transition
			appear
			name="open"
		>
			<div
				v-if="openned"
				class="music-item__body"
			>
				<div
					class="music-item__body-wrapper"
				>
					<div
						v-if="haveTags"
						class="music-item__section music-item__head"
					>
						<div
							class=" music-item__tags"
						>
							<div
								v-for="(tag, index) in data.tags"
								:key="index"
								class="music-item__tag"
								:style="{'background-color': tag.color, 'color': calcColor(tag.color)}"
							>
								{{ tag.title }}
							</div>
						</div>
					</div>
					<div class="music-item__section music-item__section--main">
						<div
							v-if="typeof data.meta !== 'undefined' && data.meta.length !== 0"
							class="music-item__meta-list"
						>
							<div
								v-for="(value, key, index) in data.meta"
								:key="index"
								class="music-item__meta-item"
							>
								<span class="music-item__meta-key">
									{{ key }}
								</span>
								<span class="music-item__meta-value">
									{{ value }}
								</span>
							</div>
						</div>
						<div
							v-else
							class="music-item__no-meta"
						>
							Aucune informations additionnelles
						</div>

					<div class="music-item__arrangements-list">
						<ArrangementItem
							v-for="(arrangement, id) in data.arrangements"
							:key="id"
						>
							{{ arrangement.Name }}
							<template #accord>
								{{ arrangement.tunning }}
							</template>
						</ArrangementItem>
					</div>
					</div>
					<div class="music-item__prebuild">
						<button
							class="music-item__button"
							:title="vipToggleTitle"
							@click="toggleVip"
						>
						<img
							v-if="vip"
							src="../assets/images/star-filled.svg"
							alt="star icon"
						>
						<img
							v-else
							src="../assets/images/star.svg"
							alt="star icon"
						>
					</button>

						<input
							ref="output"
							class="music-item__output"
							type="text"
							:value="command"
							readonly
						>

					<ToolTip :displayed="showTooltip">
						<button
							ref="copyButton"
							class="music-item__button music-item__copy"
							title="copier la commande"
							@click="copy"
						>
							<img
								src="../assets/images/copy.svg"
								alt="star icon"
							>
						</button>

							<template v-slot:tooltip>
								Commande copiée
							</template>
						</ToolTip>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script lang="js">
import ToolTip from './ToolTip';
import ArrangementItem from './ArrangementItem';

export default {
	name: 'MusicItem',
	components: {
		ToolTip,
		ArrangementItem
	},
	props: {
		data: { type: Object, required: true }
	},
	data () {
		return {
			openned: false,
			vip: false,
			showTooltip: false
		};
	},
	computed: {
		haveTags() {
			return typeof this.data.tags !== 'undefined' && this.data.tags.length > 0;
		},
		command() {
			return `!${ this.vip ? 'vip' : 'sr' } ${ this.data.title } - ${ this.data.artiste }`;
		},
		vipToggleTitle() {
			return this.vip ? 'faire une request normale' : 'faire une request VIP';
		},
		duration() {
			let duration;

			if (typeof this.data.length !== 'undefined') {
				duration = new Date(142.671 * 1000).toISOString().substr(14, 5);
			}
			else {
				duration = false;
			}

			return duration;
		}
	},
	watch: {
		showTooltip() {
			setTimeout(() => {
				this.showTooltip = false;
			}, 1500);
		}
	},
	methods: {
		toggleMusic() {
			this.openned = !this.openned;
		},
		/**
		 * infer the font color from the background color to maximise the contrast
		 * @param {String} bgc color of the background
		 */
		calcColor(bgc) {
			const invertColor = color => {
				let prefix = '';

				if (color.includes('#')) {
					prefix = '#';
					color = color.substring(1, 7);
				}

				const r = color.slice(0, 2);
				const g = color.slice(2, 4);
				const b = color.slice(4, 6);

				color = invertChannel(r) + invertChannel(g) + invertChannel(b);

				return prefix + color;
			};

			const invertChannel = channel => {
				let c = parseInt(channel, 16);

				c = 255 - c;
				c = c.toString(16);

				return c;
			};

			const colorToBW = color => {
				let prefix = '';

				if (color.includes('#')) {
					prefix = '#';
					color = color.substring(1, 7);
				}

				color =
				(parseInt(color.slice(0, 2), 16) +
					parseInt(color.slice(2, 4), 16) +
					parseInt(color.slice(4, 6), 16)) /
					3 >
				127
					? 'ffffff'
					: '000000';

				return prefix + color;
			};

			return colorToBW(invertColor(bgc));
		},
		toggleVip() {
			this.vip = !this.vip;
		},
		copy() {
			console.log(this.$refs.output);
			this.$refs.output.select();
			document.execCommand('copy');
			this.showTooltip = true;

			this.$nextTick().then(() => {
				this.$refs.copyButton.focus();
			});
		}
	}
};


</script>

<style lang="scss">
	@import '../assets/scss/variables.scss';

  .music-item {
		position: relative;
		height: 67px;
		margin-bottom: .25em;
		display: flex;

		transition: height 300ms 150ms ease-in-out;

		&.openned {
			height: 300px;
			transition: height 300ms ease-in-out;
		}

		&__hr {
			border-color: transparent;
			width: 3em;
			margin: 0;
			transition: 300ms ease-in-out;
			transition-property:  border-color, margin;

			@at-root .openned & {
				margin: 4px 0;
				border-color: white;
			}
		}

		&__card {
			display: flex;
			flex-direction: column;
			justify-content: right;

			position: absolute;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			padding: 1em 2.5em 1em 1.5em;
			border-radius: 5px;

			background-color: var(--elements-bgc);
			color: var(--text);
			box-shadow: 0 0 5px 1px #0001;

			transition:
				background-color  ease-in-out 300ms 0s,
				box-shadow  ease-in-out 300ms 250ms,
				transform ease-in-out 300ms 250ms,
				color ease-in-out 300ms,
				right ease-in-out 300ms 250ms,
				padding-bottom ease-in-out 300ms 150ms;

			overflow: hidden;

			z-index: 10;
			cursor: pointer;

			// opacity: .5;

			&:focus,
			&:hover:focus {
				outline: none;
				background-color: var(--elements-bgc--hover-focus);
				box-shadow: 0 0 10px #0003;

			}

			&:hover {
				background-color: var(--elements-bgc--hover);
			}

			&::after {
				content: '';
				background-image: url('../assets/images/scrolldown/chevron_down.svg');
				width: 1em;
				display: block;
				height: 0.5em;
				background-size: contain;
				background-repeat: no-repeat;
				position: absolute;
				right: 1em;
				top: 2em;
				transition: transform ease-in-out 300ms 250ms;
				color: var(--text);

				@at-root .dark & {
					mix-blend-mode: color-dodge;
				}
			}

			&.openned {
				box-shadow: 0 0 10px #0003;
				color: var(--white);
				background-color: var(--secondary);
				background-image: linear-gradient(18deg, hsla(260, 39%, 35%, 0.11) 0%, hsla(260, 39%, 52%, 0.271) 100%);
				right: 66%;
				padding-bottom: 3em;
				transition:
					background-color  ease-in-out 300ms,
					box-shadow  ease-in-out 300ms 250ms,
					transform ease-in-out 300ms 250ms,
					color ease-in-out 300ms,
					right ease-in-out 300ms 250ms,
					padding-bottom ease-in-out 300ms;

				&::after {
					transform: rotateX(180deg);
					transition: transform ease-in-out 300ms;
				}

				&:hover {
					background-color: var(--secondary--hover-focus);
				}
			}
		}

		&__duration {
			margin-top: 0;
			height: 0;
			font-variant-numeric: tabular-nums;
			opacity: 0;
			transition:  150ms ease-in-out;
			transition-property: opacity, margin-top;

			@at-root .openned & {
				opacity: 1;
				margin-top: 0.7em;
				height: auto;
			}
		}

		&__title {
			font-weight: bold;
			font-size: 1.2em;
			transition: font-size 300ms ease-in-out, width 0s 200ms linear;
			max-width: 80ch;
			margin-top: auto;
			// auto-elipsis
			width: 100%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;

			padding-bottom: 1.1em;

			@at-root .openned & {
				font-size: 1.4em;
				max-width: 210px;
				transition: font-size 300ms ease-in-out, width 0s 150ms linear;
				white-space: unset;
				text-overflow: unset;
			}
		}

		&__head {
			display: flex;
			justify-content: space-between;
		}

		&__body {
			display: flex;
			position: relative;
			left: 34%;
			padding: 4px 0;
			width: 66%;
			max-width: 500px;
			filter: drop-shadow(0 0 3px #0000001a);

			&-wrapper{
				display: flex;
				flex-direction: column;
				width: 100%;
				overflow: hidden;
				border-radius: 0 10px 10px 0;
			}
		}

		&__tag {
			padding: 0.1em 0.3em;
			border-radius: 5px;
			margin-right: 3px;

			&s {
				position: relative;
				display: flex;
			}
		}


		&__section {
			background-color: var(--white);
			margin: 0 0 3px;
			padding: .5em 1.5em;
			transition: background-color 300ms ease-in-out;

			&--main {
				flex-grow: 1;
				height: 100%;
				display: flex;
				flex-direction: column;
				padding: .5em 0;
			}
		}

		&__prebuild {
			display: flex;
		}

		&__button {
			background-color: #d7d7d7;
			color: #404040;
			border: none;
			padding: .5em;
			cursor: pointer;

			> svg {
				width: 1em;
				height: 1em;
				color: inherit;
			}

			&:active,
			&:focus {
				background-color: #aaa;
				outline: none;
			}
		}

		&__output {
			margin: 0 3px;
			flex-grow: 1;
			background-color: #d7d7d7;
			color: #484848;
			padding: .5em;
			border: none;
		}

		&__meta {
			&-list {
				max-height: 10.5em;
				overscroll-behavior: contain;
				overflow-y: auto;
				margin-top: auto;
			}
			&-item {
				display: flex;
				justify-content: space-between;
				padding: .25em 1.5em;

				&:nth-child(2n) {
					background-color: #0001;
				}
			}
		}

		&__no-meta {
			padding: 0 1.25em;
			margin: auto auto 0 auto;
		}

// #region animation
		.open-enter-active {
			animation: clip 300ms 450ms;
		}
		.open-leave-active {
			animation: clip 300ms reverse;

		}

		.open-enter {
			// opacity: .5;
			transform: translateX(0);
			// transform: translateX(-100%);
			clip-path: inset(-10px -10px -10px -10px );
		}

		.open-leave-to {
			transform: translateX(0);
			// transform: translateX(-100%);
			clip-path: inset(-10px -10px -10px -10px );
		}

		.open-enter-to{
			transform: translateX(-100%);
			// transform: translateX(0);
			clip-path: inset(-10px -10px -10px 90% );
		}
		.open-leave {
			transform: translateX(-100%);
			// transform: translateX(0);
			clip-path: inset(-10px -10px -10px 90% );
		}

		@keyframes clip {
			0% {
				transform: translateX(-100%);
				clip-path: inset(-10px -10px -10px 90% );
			}
			100% {
				transform: translateX(0);
				clip-path: inset(-10px -10px -10px -10px );
			}
		}
  }
	// #endregion animation

</style>
