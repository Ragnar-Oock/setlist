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
										xlink:href="../assets/images/star-filled.svg#star-filled"
									/>
									<use
										v-else
										xlink:href="../assets/images/star.svg#star"
									/>
								</svg>
							</button>

							<output class="music-item__output">{{ command }}</output>

							<button
								class="music-item__button"
								title="copier la commande"
							>
								<svg
									width="1em"
									height="1em"
									viewBox="0 0 16 16"
									class="bi bi-clipboard-plus"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"
									/>
									<path
										fill-rule="evenodd"
										d="M9.5 1h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3zM8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script lang="js">

export default {
	name: 'MusicItem',
	props: {
		data: { type: Object, required: true }
	},
	data () {
		return {
			openned: false,
			vip: false
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
		}
	}
};


</script>

<style lang="scss">
  .music-item {
		&__head {
			padding: 1em 1.5em;
			margin: 8px 0 0;
			border-radius: 5px;
			box-shadow: 0 0 5px 1px #0001;
			display: block;
			position: relative;
			transition: ease-in-out 300ms;
			transition-property: background-color, box-shadow, scale;
			background-color: #fffef8;
			cursor: pointer;
			z-index: 10;

			&:focus {
				outline: none;
				background-color: #d7d7d7;
				box-shadow: 0 0 10px #0003;
				// scale: 1.02;
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
			}

			&.openned {
				// background-color: #d7d7d7;
				box-shadow: 0 0 10px #0003;
				scale: 1.02;
				&::after {
					transform: translateY(-50%) rotateX(180deg);
				}
			}
		}
		&__artiste {
			color: #404040;
		}
		&__title {
			font-weight: bold;
			font-size: 1.2em;
			color: #404040;
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
			background-color: #fffef8;
			margin: 0 0 3px;
			padding: .5em 1.5em;

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
				background-color: #ccc;
				color: #fffef8;
				outline: none;
			}
		}

		&__output {
			margin: 0 3px;
			flex-grow: 1;
			background-color: #d7d7d7;
			color: #484848;
			padding: .5em;
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
