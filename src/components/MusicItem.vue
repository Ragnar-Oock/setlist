<template lang="html">
	<div class="music-item">
		<div
			class="music-item__head"
			:class="{'openned': openned}"
			tabindex="0"
			@click="toggleMusic"
			@keypress.enter="toggleMusic"
		>
			<p class="music-item__title">
				{{ data.title }}
			</p>
			<p class="music-item__artiste">
				{{ data.artiste }}
			</p>
		</div>

		<transition name="open">
			<div
				v-show="openned"
				class="music-item__body"
			>
				<div class="music-item__body-wrapper">
					<div class="music-item__section">
						<div
							v-if="haveTags"
							class="music-item__tags"
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
					<div class="music-item__section">
						<div class="music-item__prebuild">
							<button
								class="music-item__button"
								:title="vipToggleTitle"
								@click="toggleVip"
							>
								<svg
									width="1em"
									height="1em"
									viewBox="0 0 16 16"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<!-- <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" /> -->

									<use
										v-if="vip"
										xlink:href="../assets/images/star-filled.svg#el"
									/>
									<use
										v-else
										xlink:href="../assets/images/star.svg#el"
									/>
								</svg>
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
									class="music-item__button"
									title="copier la commande"
									@click="copy"
								>
									<svg
										width="1em"
										height="1em"
										viewBox="0 0 16 16"
										fill="currentColor"
										xmlns="http://www.w3.org/2000/svg"
									>
										<use
											xlink:href="../assets/images/copy.svg#el"
										/>
									</svg>
								</button>

								<template v-slot:tooltip>
									skjhdgfklb
								</template>
							</tooltip>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script lang="js">
import ToolTip from './ToolTip';

export default {
	name: 'MusicItem',
	components: {
		ToolTip
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
		&__head {
			padding: 1em 1.5em;
			margin: 8px 0 0;
			border-radius: 5px;
			box-shadow: 0 0 5px 1px #0001;
			display: block;
			position: relative;
			transition: ease-in-out 300ms;
			transition-property: background-color, box-shadow, transform, color;
			background-color: var(--elements-bgc);
			cursor: pointer;
			z-index: 10;
			color: var(--text);

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
				top: 50%;
				transform: translateY(-50%);
				transition: transform ease-in-out 300ms;
				color: var(--text);

				@at-root .dark & {
					mix-blend-mode: color-dodge;
				}
			}

			&.openned {
				box-shadow: 0 0 10px #0003;
				transform: scale(1.02);
				background-color: var(--elements-bgc--focus);
				color: var(--text);

				&::after {
					transform: translateY(-50%) rotateX(180deg);
				}

				&:hover {
					background-color: var(--elements-bgc--hover-focus);
				}
			}
		}
		&__title {
			font-weight: bold;
			font-size: 1.2em;
		}

		&__body {
			max-height: 500px;
			overflow-y: hidden;
			border-radius: 0 0 5px 5px;
			filter: drop-shadow(0 0 3px #0000001a);

		}

		&__tag {
			padding: 0.1em 0.3em;
			border-radius: 5px;
			margin-right: 3px;
		}

		&__tags {
			position: relative;
			display: flex;
			padding: .5em 0;

			&::after {
				content: '';
				width: calc(100% + 20px);
				display: block;
				height: 1px;
				background-color: #ccc;
				margin: 0 auto;
				bottom: 0;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
			}
		}

		&__section {
			background-color: var(--elements-bgc--hover);
			margin: 0 0 3px;
			padding: .5em 1.5em;
			transition: background-color 300ms ease-in-out;

			&:last-of-type {
				border-radius: 0 0 5px 5px;
				padding: 0;
				overflow-y: hidden;
				background-color: transparent;
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

		.open-enter-active {
			transition: max-height 300ms 150ms ease-in-out;
		}
		.open-leave-active {
			transition: max-height 300ms ease-in-out;
		}

		.open-enter,
		.open-leave-to {
			max-height: 0px;
		}
  }
</style>
