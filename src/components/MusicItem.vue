<template>
	<div
		ref="root"
		class="music-item"
		:class="{'openned': idState.openned, 'closed': !idState.openned, 'hidden': idState.hidden}"
	>
		<div
			class="music-item__card"
			tabindex="0"
			@click="toggleMusic"
			@keypress.enter="toggleMusic"
		>
			<div class="music-item__col-left">
				<span
					v-if="duration && idState.openned"
					v-tippy="{placement: 'right'}"
					class="music-item__duration"
					:content="$t('song.duration')"
				>
					{{ duration }}
				</span>
				<p
					:key="idState.openned"
					class="music-item__title"
				>
					{{ data.name }}
				</p>
				<hr class="music-item__hr">
				<p
					:key="idState.openned+'source'"
					class="music-item__source"
				>
					<span class="sr-only">{{ $t('song.byArtist') }}</span>
					{{ source }}
				</p>
			</div>
			<div class="music-item__col-right">
				<svg
					v-if="data.showlights"
					v-tippy="{placement: 'bottom'}"
					:content="$t('song.showlight')"
					aria-hidden="true"
					class="icon"
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
				<svg
					v-if="data.vocals"
					v-tippy="{placement: 'bottom'}"
					:content="$t('song.lyrics')"
					aria-hidden="true"
					class="icon"
					viewBox="0 0 16 16"
					fill="currentColor"
					xmlns="http://www.w3.org/2000/svg"
					width="1em"
					height="1em"
				>
					<path
						fill-rule="evenodd"
						d="M2 2a2 2 0 0 1 2-2h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm7.5 1.5v-2l3 3h-2a1 1 0 0 1-1-1zM11 6.64a1 1 0 0 0-1.243-.97l-1 .25A1 1 0 0 0 8 6.89v4.306A2.572 2.572 0 0 0 7 11c-.5 0-.974.134-1.338.377-.36.24-.662.628-.662 1.123s.301.883.662 1.123c.364.243.839.377 1.338.377.5 0 .974-.134 1.338-.377.36-.24.662-.628.662-1.123V8.89l2-.5V6.64z"
					/>
				</svg>
				<span
					v-if="duration && !idState.openned"
					v-tippy="{placement: 'bottom'}"
					class="music-item__duration"
					:content="$t('song.duration')"
				>
					{{ duration }}
				</span>
			</div>
			<svg
				aria-hidden="true"
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
			:class="{'play': idState.isQuickCopyCliked}"
			:tabindex="idState.openned?-1:0"
			@click="quickCopy"
		>
			<span class="music-item__quick-copy-text"><span>{{ $t('song.quickCopy') }}</span></span>
			<!-- don't change this svg import if you don't want to skrew up the styling -->
			<svg
				aria-hidden="true"
				width="1em"
				height="1em"
				viewBox="0 0 16 16"
				xmlns="http://www.w3.org/2000/svg"
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
			:value="shallowCommand"
			readonly
		>
		<div class="music-item__body-wrapper">
			<transition
				appear
				name="open"
			>
				<div
					v-show="idState.openned"
					class="music-item__body"
				>
					<TagList
						:tags="data.tags"
						:has-showlights="data.showlights"
						:has-vocals="data.vocals"
					/>
					<div class="music-item__section music-item__section--main">
						<Metadata
							:meta="data.metadata"
						/>
						<ArrangementsSelector
							v-if="data.arrangements"
							v-model="idState.selectedArrangement"
							:list="data.arrangements"
							:song-id="data.id"
						/>
					</div>
					<Prebuild
						:selected-arrangement="idState.selectedArrangement"
						:song="data"
					/>
				</div>
			</transition>
		</div>
	</div>
</template>

<script lang="js">
import ArrangementsSelector from '@/components/MusicItem/sub-components/ArrangementsSelector';
import Prebuild from '@/components/MusicItem/sub-components/Pre-build';
import Metadata from '@/components/MusicItem/sub-components/Meta';
import TagList from '@/components/MusicItem/sub-components/TagList';

import { IdState } from 'vue-virtual-scroller';
import mixins from '@/mixins.js';

export default {
	name: 'MusicItem',
	components: {
		ArrangementsSelector,
		Prebuild,
		Metadata,
		TagList
	},
	mixins: [
		// eslint-disable-next-line new-cap
		IdState({
			// You can customize this
			idProp: vm => vm.data.id
		}),
		mixins
	],
	props: {
		data: { type: Object, required: true }
	},
	idState () {
		return {
			openned: false,
			vip: false,
			edit: false,
			isQuickCopyCliked: false,
			selectedArrangement: Object(),
			hidden: true
		};
	},
	computed: {
		haveTags() {
			return typeof this.data.tags !== 'undefined' && this.data.tags.length > 0;
		},
		duration() {
			let duration;

			if (this.data.length !== 0) {
				duration = new Date(this.data.length * 1000).toISOString().substr(14, 5);
			}
			else {
				duration = false;
			}

			return duration;
		},
		source() {
			return `${ this.data.artist || '' }${ this.data.artist && this.data.album ? ' - ' : '' }${ this.data.album || '' }`;
		},
		showMeta() {
			return typeof this.data.metadata !== 'undefined' && Object.keys(this.data.metadata).length !== 0;
		},
		shallowCommand() {
			return `!sr ${ this.data.name } - ${ this.data.artist }`;
		}
	},
	mounted() {
		const options = {
			rootMargin: '0px 0px 0px 0px',
			threshold: 1
		};
		const io = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					this.idState.hidden = false;
					if (this.$refs.root.contains(document.activeElement)) {
						document.activeElement.blur();
					}
				}
				else {
					this.idState.hidden = true;
				}
			}, options);
		});

		io.observe(this.$refs.root);
	},
	methods: {
		toggleMusic() {
			this.idState.openned = !this.idState.openned;
			this.$emit('open', this.idState.openned);
		},
		/**
		 * infer the font color from the background color to maximise the contrast
		 * @param {String} bgc color of the background
		 */
		calcColor(bgc) {
			function invertColor(color) {
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
			}

			function invertChannel(channel) {
				let c = parseInt(channel, 16);

				c = 255 - c;
				c = c.toString(16);

				return c;
			}

			function colorToBW(color) {
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
			}

			return colorToBW(invertColor(bgc));
		},
		quickCopy($event) {
			this.$refs.outputExt.select();
			document.execCommand('copy');

			if ($event.offsetX !== 0 && $event.offsetY !== 0) {
				this.$refs.quickCopyButton.style.setProperty('--mouse-x', `${ $event.offsetX }px`);
				this.$refs.quickCopyButton.style.setProperty('--mouse-y', `${ $event.offsetY }px`);
			}

			this.idState.isQuickCopyCliked = true;

			this.$nextTick().then(() => {
				this.$refs.copyButton.focus();
			});
			setTimeout(() => {
				this.idState.isQuickCopyCliked = false;
				this.$refs.quickCopyButton.style.setProperty('--mouse-x', '50%');
				this.$refs.quickCopyButton.style.setProperty('--mouse-y', '50%');
			}, 500);
		}
	}
};


</script>

<style lang="scss">
	// disable any transition/animation if the component is not visible
	.hidden,
	.hidden *,
	.hidden *::before,
	.hidden *::after
	{
    animation-delay: -1ms !important;
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    background-attachment: initial !important;
    scroll-behavior: auto !important;
    transition-duration: 0s !important;
    transition-delay: 0s !important;
	}

  .music-item {
		position: relative;
		--height: 67px;
		min-height: var(--height);
		max-height: var(--height);
		max-width: 60ch;
		margin: 0 auto;
		display: flex;
		transition: max-width 300ms ease-in-out,
		height 300ms ease-in-out;
		transition:
			max-width 300ms ease-in-out,
			height 300ms cubic-bezier(.39,.58,.57,1),
			max-height 300ms cubic-bezier(.39,.58,.57,1),
			min-height 300ms cubic-bezier(.39,.58,.57,1);


		--width: min(80ch, calc(100vw - .5em));

		&.openned {
			--height: 300px;
		}

		&__hr {
			border-color: var(--text);
			width: 3em;
			margin: 0;
			opacity: 0;
			transition: 300ms ease-in-out;
			transition-property:  opacity, margin;

			@at-root .openned & {
				margin: 4px 0;
				opacity: 1;
			}
		}

		&__card {
			display: flex;
			flex-direction: row;

			position: absolute;
			padding: 0.7em 2.5em 0.7em 1.5em;
			border-radius: 5px;

			background-color: var(--filler-1);
			color: var(--text);
			box-shadow: 0 0 5px 1px #0001;

			transition:
				background-color ease-in-out 300ms,
				transform ease-in-out 300ms 250ms,
				color ease-in-out 300ms,
				transform ease-out 400ms,
				width ease-in-out 400ms,
				padding ease-in-out 300ms;
			width: 100%;
			height: 100%;

			z-index: 10;
			cursor: pointer;
			overflow: hidden;

			&::before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-image: linear-gradient(18deg, var(--primary-1) 0%, rgba(91, 3, 3, 0.04) 100%);
				z-index: -1;
				transition: opacity 300ms ease-in-out;
				opacity: 0;
			}

			&:focus {
				outline: none;
				box-shadow: 0 0 10px #0003;
				background-color: var(--filler-1);

				&::before {
					opacity: .8;
				}
			}

			&:hover::before {
				opacity: .8;
			}

			@at-root .openned & {
				box-shadow: 0 0 10px #0003;
				color: var(--text);
				background-color: var(--primary-1);
				background-image: linear-gradient(18deg, rgba(91, 3, 3, 0.04) 0%, rgba(143, 255, 155, 0.26) 100%);
				background-blend-mode: color-dodge;
				padding-bottom: 3em;
				padding-top: 1.5em;
				width: calc(var(--width) * .34);
				transform: translateX(calc(var(--width) * -0.125));
				transition:
					background-color ease-in-out 300ms,
					transform ease-in-out 300ms 250ms,
					color ease-in-out 300ms,
					transform ease-out 400ms,
					width ease-in-out 400ms,
					padding ease-in-out 300ms;

				&:hover {
					background-color: var(--primary-2);
				}

				&::before {
					content: unset;
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
			display: none;
		}
		&__quick-copy:focus,
		&__quick-copy:hover {
			right: 2.5em;
			z-index: 11;
		}
		&__card:hover + &__quick-copy,
		&__card:focus + &__quick-copy,
		&__quick-copy:hover,
		&__quick-copy:focus {
			z-index: 11;
			outline: none;
			opacity: 1;

			transition: opacity 300ms ease-in-out;

			@at-root .openned & {
				opacity: 0;
			}
		}

		@media screen  and (min-width: 60em){
			&__quick-copy {
				--mouse-x: 50%;
				--mouse-y: 50%;

				position: absolute;
				border: none;
				width: max-content;
				color: var(--text);
				background: var(--bg-gradient);
				cursor: pointer;
				display: flex;
				align-items: center;
				overflow: hidden;
				top: 0;
				bottom: 0;
				left: 100%;
				border-radius: 0 5px 5px 0;
				padding: 0 8px 0 13px;
				transition:
					transform 300ms 100ms ease-out,
					opacity 0s 500ms;
				z-index: 0;
				transform: translateX(-45px);
				opacity: 1;

				@at-root .openned & {
					opacity: 0;
					transform: translateX(calc(var(--width) * -0.5));
				}

				&-text {
					max-width: 0ch;
					margin-right: 0;
					overflow: hidden;
					white-space: nowrap;
					transition: 300ms 100ms ease-out;
					transition-property: max-width, margin-right;
					display: flex;
					height: 100%;
					pointer-events: none;

					span {
						margin: auto;
					}

					svg {
						pointer-events: none;
					}
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

				&:focus > &-text,
				&:hover > &-text {
					margin-right: .5em;
					max-width: 20ch;
				}
			}
			&__card:hover + &__quick-copy,
			&__card:focus + &__quick-copy,
			&__quick-copy:hover,
			&__quick-copy:focus {
				transform: translateX(-5px);
				z-index: 0;
				transition:
					transform 300ms 200ms ease-out;
				@at-root .openned & {
					opacity: 0;
					transform: translateX(calc(var(--width) * -0.5));
				}
			}
		}

		&__duration {
			margin-top: 0;
			height: 0;
			display: block;
			width: max-content;
			width: 42px;
			text-align: center;
		}

		&__col-left &__duration {
			font-variant-numeric: tabular-nums;
			opacity: 0;
			transition:  150ms ease-in-out;
			transition-property: opacity, margin-top;

			@at-root .openned & {
				opacity: 1;
				height: auto;
			}
		}

		&__col-left {
			height: 100%;
			display: flex;
			flex-direction: column;
			overflow: hidden;
			flex-grow: 1;

			@at-root .openned & {
				width: calc(min(80ch, calc(100vw - .5em)) * .34 - 4em);
				height: calc(100% - 4.5em);
				position: absolute;
			}
		}

		&__col-right {
			display: flex;
			flex-direction: row;
			align-items: center;
			transition: opacity 200ms ease-in-out 300ms;

			& > * {
				margin: 0 .25em;
			}

			@at-root .openned & {
				opacity: 0;
				position: absolute;
				z-index: -10;
				pointer-events: none;
				transition: opacity 0s 0s;
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

			@at-root .openned & {
				font-size: 1.4em;
				white-space: unset;
				text-overflow: unset;
				overflow: unset;
				max-width: 210px;
			}
		}

		&__source {
			// auto-elipsis
			width: 100%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;

			@at-root .openned & {
				white-space: unset;
				text-overflow: unset;
				overflow: unset;
			}
		}

		&__title,
		&__source {
			line-height: 1.2;
		}

		&__head {
			display: flex;
			justify-content: space-between;
		}

		&__body {
			display: flex;
			position: relative;
			width: 100%;
			max-width: 500px;
			filter: drop-shadow(0 0 3px #0000001a);
			flex-direction: column;
			overflow: hidden;
			border-radius: 0 10px 10px 0;
			margin: 4px 0;

			&-wrapper {
				width: 100%;
				overflow: hidden;
				display: flex;
				width: calc(var(--width) * .66);
				transition: transform 0ms 300ms;
				@at-root .openned & {
					// make the layout changes via transform instead of right (improved performances)
					transform: translateX(calc(var(--width) * .215));
				}
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
			&--right {
				margin-left: auto;

				& > .icon + .icon {
					margin-left: .5em;
				}
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
				padding: var(--margin) 0;
				overflow-y: auto;
				scrollbar-width: thin;
				scrollbar-color: var(--filler-2) var(--filler-1);
				overscroll-behavior: contain;

				&::-webkit-scrollbar {
					width: .4em;
				}

				&::-webkit-scrollbar-thumb {
					background-color: var(--filler-2);
					border-radius: .4em;
					transition: opacity 300ms ease-in-out;
				}
			}
		}

		&__prebuild {
			display: flex;
		}

		&__button {
			background-color: var(--filler-1);
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
		&__copy {
			display: flex;

			.in-out-enter-active,
			.in-out-leave-active {
				overflow: hidden;
				transition: max-width 300ms ease-out;
			}

			.in-out-enter {
				max-width: 0ch;
			}
			.in-out-enter-to{
				max-width: 15ch;
			}

			.in-out-leave {
				max-width: 15ch;

			}
			.in-out-leave-to {
				max-width: 0ch;
			}
		}
		&__success {
			margin-left: .5em;
			white-space: nowrap;
		}
		&__vip {
			margin-right: 3px;
		}

		.tool-tip__wrapper{
			background-color: var(--filler-2);
		}

		&__output {
			margin: 0 3px;
			flex-grow: 1;
			background-color: var(--filler-1);
			color: var(--text);
			padding: .5em;
			border: none;
			&:focus{
				outline: none;
				background-color: var(--filler-2);
			}

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
				overflow-y: overlay;
				scrollbar-color: var(--filler-2-translucent) var(--filler-1);

				&::-webkit-scrollbar {
					width: .4em;
				}

				&::-webkit-scrollbar-thumb {
					background-color: var(--filler-2-translucent);
					border-radius: .4em;
				}
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
			&:only-child {
				margin: auto;
			}
		}

		.open-enter-active,
		.open-leave-active {
			transition: 300ms ease-out;
			transition-property: transform;
		}

		.open-enter-active {
			transition-delay: 300ms;
		}

		.open-enter {
			transform: translateX(-100%);
		}
		.open-enter-to{
			transform: translateX(0);
		}

		.open-leave {
			transform: translateX(0);
		}
		.open-leave-to {
			transform: translateX(-100%);
		}

		@media screen and (max-width: 48.25em) {
			flex-direction: column;
			&.openned {
				height: auto;
				min-height: 300px;
				max-height: 500px;
				max-width: 60ch;
			}
			&__card {
				position: relative;
				overflow: unset;

				@at-root .openned & {
					padding: 0.7em 2.5em 0.7em 1.5em;
					position: static;
					width: auto;
					transform: none;
				}
			}

			@at-root .openned &__col-left {
				height: unset;
				position: static;
				width: unset;
			}

			&__title {
				height: auto;
				padding: 0;
				margin: 0;
				@at-root .openned & {
					max-width: unset;
					font-size: 1.2em;
				}
				@at-root .openned &, .closed & {
					animation: none;
					opacity: 1;
				}
			}

			&__body {
				left: unset;
				border-radius: 0 0 10px 10px;
				margin: 0 4px;
				max-width: unset;

				&-wrapper {
					width: 100%;
					flex-grow: 1;
					transform: none;

					@at-root .openned & {
						transform: none;
					}
				}
			}

			.open-enter-active,
			.open-leave-active {
				transition: 300ms ease-in-out;
				transition-property: transform;
			}

			.open-enter {
				transform: translateY(-100%);
			}
			.open-enter-to{
				transform: translateY(0);
			}

			.open-leave {
				transform: translateY(0);
			}
			.open-leave-to {
				transform: translateY(-100%);
			}

			&__copy {
				border-radius: 0 0 10px 0;
			}
			&__vip {
				border-radius: 0 0 0 10px;
			}

			&__quick-copy#{&}__quick-copy {
				top: 17.5px;
				transform: none;
			}
		}

		.icon {
			width: 1.25em;
			height: 1.25em;
			color: var(--text);

			&.arrow {
				width: 1em;
				height: 0.5em;
			}
		}

	}

</style>
