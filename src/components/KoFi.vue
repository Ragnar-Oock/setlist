<template lang="html">
	<Fragment>
		<button
			id="kofi"
			ref="open"
			v-tippy="{placement:'bottom', popperOptions: {strategy: 'fixed'}}"
			class="ko-fi top-bar__button"
			:data-tippy-content="$t('kofi.tooltip')"
			@click="togglePopup(true)"
		>
			<img
				svg-inline
				src="@/assets/images/ko-fi-icon-noBG.svg"
				aria-hidden="true"
			>
		</button>
		<portal to="popup">
			<div
				v-if="isOpen"
				ref="popup"
				class="popup"
				tabindex="-1"
				@keyup.esc="onEscape"
			>
				<div class="popup__col-left">
					<img
						src="https://media.giphy.com/media/ZEgBHVeRlmTqjCPlqx/giphy.gif"
						:alt="$t('kofi.imageAlt')"
					>
				</div>
				<div class="popup__col-right">
					<h2>{{ $t('kofi.title') }}</h2>
					<p class="popup__quote">
						"{{ $t('kofi.quote') }}"
					</p>
					<p class="popup__signature">
						{{ $t('kofi.signature') }}
					</p>
					<a
						href="https://ko-fi.com/ragnar_oock"
						target="_blank"
						rel="noopener noreferrer"
						class="popup__button"
					><span>{{ $t('kofi.button') }}</span></a>
				</div>
			</div>
		</portal>
		<portal to="screen">
			<div
				v-if="isOpen"
				class="screen"
				@click="togglePopup(false)"
			/>
		</portal>
	</Fragment>
</template>

<script lang="js">

import { Fragment } from 'vue-fragment';

export default {
	name: 'KoFi',
	components: {
		Fragment
	},
	props: [],
	data () {
		return {
			isOpen: false
		};
	},
	methods: {
		togglePopup(state) {
			this.isOpen = state || !this.isOpen;
			if (this.isOpen) {
				this.$nextTick().then(() => {
					this.$refs.popup.focus();
				});
			}
			else {
				this.$refs.open.focus();
			}
		},
		onEscape() {
			this.togglePopup(false);
		}
	}
};


</script>

<style lang="scss">
  .ko-fi {
		cursor: pointer;
		border-radius: 5px;
		transition: border-color 300ms ease-in-out;
		display: block;
		height: 100%;
		padding: .5em;
		border: 1px solid transparent;

		&:focus,
		&:hover {
			border-color: var(--text);
			outline: none;
		}

		svg {
			width: 1.25em;
			height: 1.25em;
			color: var(--text);
		}
  }
	.popup {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		z-index: 1000;
		display: grid;
		grid-template: auto 1fr / 1fr;
		background: var(--bg-gradient);
		border-radius: 5px;
		overflow: hidden;
		max-width: 40ch;
		color: var(--text);
		box-shadow: var(--shadow);

		&__col-left{
			img {
				width: 100%;
				max-height: 19em;
				object-fit: cover;
			}
		}
		&__col-right {
			padding: 1em 2em;
			text-align: center;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		h2 {
			font-size: 1.25rem;
			font-weight: bold;
			max-width: 20ch;
			margin: 1em auto 1em;
		}
		&__quote{
			font-style: italic;
			font-size: 1.1rem;
		}
		&__signature {
			font-weight: bold;
			margin: .5em 0;
		}
		&__button {
			margin-top: auto;
			background-color: #434B57;
			color: white;
			width: max-content;
			padding: .5em 1em;
			text-decoration: none;
			border-radius: 5px;
			display: flex;
			align-items: center;

			&::before{
				content:'';
				display: inline-block;
				width: 1.5em;
				height: 1.5em;
				background-image: url(../assets/images/Ko-fi.png);
				background-position: center;
				background-size: contain;
				margin-right: .5em;
			}
		}
	}
	.screen {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: #0005;
		z-index: 100;
	}
</style>
