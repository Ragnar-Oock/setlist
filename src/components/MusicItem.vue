<template>
	<div
		class="music-item"
		:class="{'openned': openned, 'closed': !openned}"
	>
		<div
			class="music-item__card"
			tabindex="0"
			@click="toggleMusic"
			@keypress.enter="toggleMusic"
		>
			<div class="music-item__col-left">
				<span
					v-if="duration"
					class="music-item__duration"
					title="durée de la musique"
				>
					{{ duration }}
				</span>
				<p
					v-if="openned"
					:key="openned"
					class="music-item__title"
				>
					{{ data.title }}
				</p>
				<p
					v-else
					key="closed"
					class="music-item__title"
				>
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
			<div class="music-item__col-right">
				<svg
					v-if="data.showlight"
					key="off"
					class="top-bar__icon"
					viewBox="0 0 16 16"
					fill="currentColor"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
					<path
						fill-rule="evenodd"
						d="M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"
					/>
				</svg>
				<span
					v-if="duration"
					class="music-item__duration"
					title="durée de la musique"
				>
					{{ duration }}
				</span>
			</div>
			<svg
				class="music-item__arrow"
				version="1.1"
				viewBox="0 0 16 9.4999"
				xmlns="http://www.w3.org/2000/svg"
			><path
				class="a"
				d="M 1.5,1.5 8,8 14.5,1.5"
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1.5"
			/></svg>
		</div>

		<button
			ref="quickCopyButton"
			class="music-item__quick-copy"
			:class="{'play': isQuickCopyCliked}"
			@click="quickCopy"
		>
			<span class="music-item__quick-copy-text">Copier la commande</span>
			<!-- don't change this svg import if you don't want to skrew up the styling -->
			<svg
				width="1em"
				height="1em"
				viewBox="0 0 16 16"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
				class="search-bar__open-more-icon"
			>
				<use
					xlink:href="../assets/images/copy.svg#el"
				/>
			</svg>
		</button>

		<input
			ref="outputExt"
			tabindex="-1"
			aria-hidden="true"
			class="music-item__output-ext"
			type="text"
			:value="command"
			readonly
		>

		<transition
			appear
			name="open"
		>
			<div
				v-show="openned"
				class="music-item__body"
			>
				<div
					v-if="haveTags"
					class="music-item__section music-item__head"
				>
					<div
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
					<div
						v-if="data.showlight"
						v-tippy="{placement: 'right'}"
						class="music-item__showlight"
						content="Cette musique a des effets de lumieres"
					>
						<svg
							key="off"
							/>
						</svg>
						<div class="sr-only">
							Cette musique a des effets de lumieres
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

					<ArrangementList
						v-if="data.arrangements"
						v-model="selectedArrangement"
						:list="data.arrangements"
					/>
				</div>
				<div class="music-item__prebuild">
					<button
						class="music-item__button music-item__vip"
						:title="vipToggleTitle"
						@click="toggleVip"
					>
						<!-- don't change this svg import if you don't want to skrew up the styling -->
						<svg
							width="1em"
							height="1em"
							viewBox="0 0 16 16"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
							class="search-bar__open-more-icon"
						>
							<use
								v-if="vip"
								xlink:href="../assets/images/diamond-fill.svg#el"
							/>
							<use
								v-else
								xlink:href="../assets/images/diamond.svg#el"
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

						class="music-item__button music-item__copy"
						title="copier la commande"
						:name="id+'copy'"
						@click="copy"
						>
							<!-- don't change this svg import if you don't want to skrew up the styling -->
							<svg
								width="1em"
								height="1em"
								viewBox="0 0 16 16"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
								xlink:href="../assets/images/copy.svg#el"
							/>
						</svg>
						<div class="sr-only">
							Copier la commande
						</div>
					</button>
				</div>
			</div>
		</transition>
	</div>
</template>

<script lang="js">
import ToolTip from './ToolTip';
import ArrangementList from './ArrangementList';

export default {
	name: 'MusicItem',
	components: {
		ArrangementList,
		TippyComponent
	},
	mixins: [mixins],
	props: {
		data: { type: Object, required: true }
	},
	data () {
		return {
			openned: false,
			vip: false,
			showTooltip: false,
			isQuickCopyCliked: false,
			selectedArrangement: '',
			id: this.uuid()
		};
	},
	computed: {
		haveTags() {
			return typeof this.data.tags !== 'undefined' && this.data.tags.length > 0;
		},
		command() {
			return `!${ this.vip ? 'vip' : 'sr' } ${ this.data.title } - ${ this.data.artiste } ${ this.selectedArrangement !== '' ? `*${ this.selectedArrangement }` : '' }`;
		},
		vipToggleTitle() {
			return this.vip ? 'faire une request normale' : 'faire une request VIP';
		},
		duration() {
			let duration;

			if (typeof this.data.length !== 'undefined') {
				duration = new Date(this.data.length * 1000).toISOString().substr(14, 5);
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
			this.$refs.output.select();
			document.execCommand('copy');
			this.showTooltip = true;

			this.$nextTick().then(() => {
				this.$refs.copyButton.focus();
			});
		},
		quickCopy($event) {
			this.$refs.outputExt.select();
			document.execCommand('copy');

			if ($event.layerX !== 0 && $event.layerY !== 0) {
				this.$refs.quickCopyButton.style.setProperty('--mouse-x', `${ $event.layerX }px`);
				this.$refs.quickCopyButton.style.setProperty('--mouse-y', `${ $event.layerY }px`);
			}

			this.isQuickCopyCliked = true;

			this.$nextTick().then(() => {
				this.$refs.copyButton.focus();
			});
			setTimeout(() => {
				this.isQuickCopyCliked = false;
				this.$refs.quickCopyButton.style.setProperty('--mouse-x', '50%');
				this.$refs.quickCopyButton.style.setProperty('--mouse-y', '50%');
			}, 500);
		}
	}
};


</script>

<style lang="scss">
  .music-item {
		position: relative;
		min-height: 67px;
		height: auto;
		max-height: 67px;
		max-width: 60ch;
		margin: 0 auto .5em;
		display: flex;
		transition: 300ms ease-in-out;
		transition-property: min-height, max-height, max-width;

		&.openned {
			min-height: 300px;
			max-height: 300px;
			max-width: 100%;
			max-width: 80ch;
		}

		&__hr {
			border-color: transparent;
			width: 3em;
			margin: 0;
			transition: 300ms ease-in-out;
			transition-property:  border-color, margin;

			@at-root .openned & {
				margin: 4px 0;
				border-color: var(--text);
			}
		}

		&__card {
			display: flex;
			flex-direction: row;

			position: absolute;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			padding: .9em 2.5em .9em 1.5em;
			border-radius: 5px;

			background-color: var(--filler-1);
			color: var(--text);
			box-shadow: 0 0 5px 1px #0001;

			transition:
				background-color  ease-in-out 500ms 0s,
				box-shadow  ease-in-out 500ms 250ms,
				transform ease-in-out 500ms 250ms,
				color ease-in-out 500ms,
				right ease-in-out 500ms,
				padding-bottom ease-in-out 150ms 150ms;

			z-index: 10;
			cursor: pointer;

			&:focus,
			&:hover:focus {
				outline: none;
				box-shadow: 0 0 10px #0003;

			}

			@at-root .openned & {
				box-shadow: 0 0 10px #0003;
				color: var(--text);
				background-color: var(--primary-1);
				background-image: linear-gradient(18deg, rgba(91, 3, 3, 0.04) 0%, rgba(143, 255, 155, 0.26) 100%);
				background-blend-mode: color-dodge;
				right: 66%;
				padding-bottom: 3em;
				transition:
					background-color  ease-in-out 300ms,
					box-shadow  ease-in-out 300ms 250ms,
					transform ease-in-out 300ms 250ms,
					color ease-in-out 300ms,
					right ease-in-out 300ms 250ms,
					padding ease-in-out 300ms;

				&:hover {
					background-color: var(--primary-2);
				}
			}
		}

		&__arrow {
				width: 1em;
				height: 0.5em;
				position: absolute;
				right: 1em;
				top: 2em;
				transition: transform ease-in-out 300ms 250ms;
				color: var(--text);

				@at-root .openned & {
					transform: rotateX(180deg);
					transition: transform ease-in-out 300ms;
				}
			}

		&__quick-copy {
			--mouse-x: 50%;
			--mouse-y: 50%;

			position: absolute;
			left: calc(100% - 37px);
			border: none;
			top: 0;
			bottom: 0;
			border-radius: 0 5px 5px 0;
			background: var(--bg-gradient);
			padding: 0 8px 0 13px;
			color: var(--text);
			cursor: pointer;
			display: flex;
			align-items: center;
			overflow: hidden;
			transition: left 300ms 100ms ease-out,
				opacity 300ms ease-in-out;

			&-text {
				overflow: hidden;
				max-width: 0ch;
				white-space: nowrap;
				transition: 300ms 100ms ease-out;
				transition-property: max-width, margin-right;
			}

			&:focus > &-text,
			&:hover > &-text {
				margin-right: .5em;
				max-width: 20ch;
			}

			&::before {
				content: '';
				display: block;
				width: 0;
				height: 0;
				position: absolute;
				left: var(--mouse-x);
				top: var(--mouse-y);
				transform: translate(-50%, -50%);
				border-radius: 50%;
				box-shadow: inset 0 0 1em 0 #fff6;
			}
			&.play::before {
				animation: click 500ms ease-out 1;
			}

			@keyframes click {
				0% {
					width: 0;
					padding-top: 0;
					opacity: 1;
				}
				80% {
					opacity: 1;
				}
				100% {
					width: 300px;
					padding: 100%;
					opacity: 0;
				}
			}
		}
		&__card:hover + &__quick-copy,
		&__card:focus + &__quick-copy,
		&__quick-copy:hover,
		&__quick-copy:focus {
			left: calc(100% - 5px);
			outline: none;

			transition: left 300ms 200ms ease-out,
				opacity 300ms ease-in-out;
		}

		.openned &__quick-copy,
		.openned &__card:hover + &__quick-copy,
		.openned &__card:focus + &__quick-copy,
		.openned &__quick-copy:hover,
		.openned &__quick-copy:focus {
			left: 50%;
			opacity: 0;
		}

		&__duration {
			margin-top: 0;
			height: 0;
			display: block;
		}

		&__col-left &__duration {
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

		&__col-left {
			height: 100%;
			display: flex;
			flex-direction: column;
			overflow: hidden;
			flex-grow: 1;
		}

		&__col-right {
			display: flex;
			flex-direction: row;
			align-items: center;

			transition: opacity 300ms ease-in-out, z-index 0s 300ms;

			& > * {
				margin: 0 .25em;
			}

			@at-root .openned & {
				opacity: 0;
				position: absolute;
				z-index: -10;
				pointer-events: none;
			}
		}

		&__col-right &__duration {
			opacity: .8;
			height: auto;

			@at-root .openned & {
				margin-top: 0;
				opacity: 0;
				height: 0;
				display: block;
			}
		}

		&__title {
			font-weight: bold;
			font-size: 1.2em;
			max-width: 80ch;
			margin-top: auto;
			// auto-elipsis
			width: 100%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			opacity: 0;

			@at-root .openned & {
				font-size: 1.4em;
				white-space: unset;
				text-overflow: unset;
				overflow: unset;
				max-width: 210px;
				animation: title-transition-open 600ms ease-in-out 150ms 1 forwards;
			}

			@at-root .closed & {
				animation: title-transition-close 300ms ease-in-out 150ms 1 forwards;
			}

		}

		@keyframes title-transition-open {
			0% {
				opacity: 0;
				transform: translateY(-1em);
			}
			100% {
				opacity: 1;
				transform: translateY(0);
			}
		}

		@keyframes title-transition-close {
			0% {
				opacity: 0;
				transform: translateY(-1em);
			}
			100% {
				opacity: 1;
				transform: translateY(0);
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
			width: 66%;
			max-width: 500px;
			filter: drop-shadow(0 0 3px #0000001a);
			flex-direction: column;
			overflow: hidden;
			border-radius: 0 10px 10px 0;
			margin: 4px 0;
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
			background-color: var(--filler-1);
			color: var(--text);
			margin: 0 0 3px;
			padding: .5em 1.5em;
			transition: background-color 300ms ease-in-out;

			&--main {
				flex-grow: 1;
				height: 100%;
				display: flex;
				flex-direction: column;
				padding: .5em 0;

				& > :last-child{
					margin-top: auto;
				}
			}
		}

		&__prebuild {
			display: flex;
		}

		&__button {
			background-color: var(--filler-2-translucent);
			color: var(--text);
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
				background-color: var(--filler-2);
				outline: none;
			}
		}

		.tool-tip__wrapper{
			background-color: var(--filler-2);
		}

		&__output {
			margin: 0 3px;
			flex-grow: 1;
			background-color: var(--filler-2-translucent);
			color: var(--text);
			padding: .5em;
			border: none;

			&-ext {
				position: absolute;
				left: 1000vh;
			}
		}

		&__meta {
			&-list {
				max-height: 10.5em;
				overscroll-behavior: contain;
				overflow-y: auto;
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

		&__arrangements {
			&-list {
				padding: 0 1.5em;
				display: flex;
				gap: .25em;
			}
		}

		.open-enter-active,
		.open-leave-active {
			transition: 300ms ease-out;
			transition-property: transform, clip-path;
		}

		.open-enter-active {
			transition-delay: 300ms;
		}

		.open-enter {
			transform: translateX(-100%);
			clip-path: inset(-10px -10px -10px 100%);
		}
		.open-enter-to{
			transform: translateX(0);
			clip-path: inset(-10px -10px -10px -10px);
		}

		.open-leave {
			transform: translateX(0);
			clip-path: inset(-10px -10px -10px -10px);
		}
		.open-leave-to {
			transform: translateX(-100%);
			clip-path: inset(-10px -10px -10px 100%);
		}

		@media screen and (max-width: 43em) {
			flex-direction: column;
			&.openned {
				height: auto;
				min-height: 300px;
				max-height: 500px;
				max-width: 60ch;
			}
			&__card {
				position: static;
				overflow: unset;

				@at-root .openned & {
					padding-bottom: 1em;
					position: static;
					right: 0;
				}
			}

			&__title {
				height: auto;
				padding: 0;
				margin: 0;
				@at-root .openned & {
					max-width: unset;
				}
				@at-root .openned &, .closed & {
					animation: none;
					opacity: 1;
				}
			}

			&__body {
				left: unset;
				width: unset;
				border-radius: 0 0 10px 10px;
				margin: 0 4px;
				max-width: unset;
				overflow: unset;
				flex-grow: 1;
			}

			.open-enter-active,
			.open-leave-active {
				transition: 300ms ease-in-out;
				transition-property: transform, clip-path;
			}

			.open-enter {
				transform: translateY(-100%);
				clip-path: inset(100% -10px -10px -10px );
			}
			.open-enter-to{
				transform: translateY(0);
				clip-path: inset(-10px -10px -10px -10px);
			}

			.open-leave {
				transform: translateY(0);
				clip-path: inset(-10px -10px -10px -10px);
			}
			.open-leave-to {
				transform: translateY(-100%);
				clip-path: inset(100% -10px -10px -10px );
			}

			.music-item__copy {
				border-radius: 0 0 10px 0;
			}
			.music-item__vip {
				border-radius: 0 0 0 10px;
			}
		}

		@media screen  and (max-width: 60em){
			&__quick-copy {
				top: 50%;
				transform: translateY(-50%);
				width: max-content;
				left: unset;
				right: 2.5em;
				bottom: unset;
				padding: 0.5em .75em;
				border-radius: 5px;
				opacity: 0;

				&-text {
					max-width: unset;
					margin-right: .5em;
				}
			}
			&__quick-copy:focus,
			&__quick-copy:hover {
				left: unset;
				right: 2.5em;
				z-index: 11;
			}
			&__card:hover + &__quick-copy,
			&__card:focus + &__quick-copy,
			&__quick-copy:hover,
			&__quick-copy:focus {
				left: unset;
				z-index: 11;
				outline: none;
				opacity: 1;

				transition: opacity 300ms ease-in-out;
			}
			.openned &__quick-copy,
		.openned &__card:hover + &__quick-copy,
		.openned &__card:focus + &__quick-copy,
		.openned &__quick-copy:hover,
		.openned &__quick-copy:focus {
			left: unset;
			opacity: 0;
		}
		}
	}

</style>
