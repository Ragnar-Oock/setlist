<template>
	<div class="prebuild">
		<div class="btn-group modifier">
			<button
				class="btn small dull with-icon vip"
				aria-live="assertive"
				@click="toggleVip"
			>
				<img
					v-if="vip"
					svg-inline
					class="icon"
					src="@/assets/images/diamond-fill.svg"
					aria-hidden="true"
				>
				<img
					v-else
					svg-inline
					class="icon"
					src="@/assets/images/diamond.svg"
					aria-hidden="true"
				>
				{{ vipToggleTitle }}
			</button>
			<button
				class="btn small dull with-icon edit"
				aria-live="assertive"
				@click="toggleEdit"
			>
				<img
					v-if="edit"
					svg-inline
					class="icon"
					src="@/assets/images/edit-fill.svg"
					aria-hidden="true"
				>
				<img
					v-else
					svg-inline
					class="icon"
					src="@/assets/images/edit.svg"
					aria-hidden="true"
				>
				{{ editToggleTitle }}
			</button>
		</div>
		<label
			:for="song.id + 'output'"
			class="sr-only"
		>{{ $t('song.prebuild.output') }}</label>
		<input
			:id="song.id + 'output'"
			ref="output"
			type="text"
			readonly="readonly"
			class="output"
			:value="command"
		>
		<div class="btn-group copy">
			<button
				ref="copyButton"
				class="btn small dull with-icon"
				@click="copy"
			>
				<img
					svg-inline
					class="icon"
					src="@/assets/images/clipboard-plus.svg"
					aria-hidden="true"
				>
				{{ $t('song.prebuild.copy.label') }}
			</button>
		</div>
	</div>
</template>

<script lang="js">

export default {
	name: 'Prebuild',
	props: {
		selectedArrangement: {
			type: Object,
			required: true
		},
		song: {
			type: Object,
			required: true
		}
	},
	data () {
		return {
			vip: false,
			edit: false
		};
	},
	computed: {
		command() {
			let command;

			if (this.vip) {
				if (this.edit) {
					command = 'vipedit';
				}
				else {
					command = 'vip';
				}
			}
			else {
				if (this.edit) {
					command = 'edit';
				}
				else {
					command = 'sr';
				}
			}

			return `!${ command } ${ this.song.name } - ${ this.song.artist } ${ this.selectedArrangement.type ? `*${ this.selectedArrangement.type }` : '' }`;
		},
		vipToggleTitle() {
			return this.vip ? this.$t('song.prebuild.vip.label') : this.$t('song.prebuild.regular.label');
		},
		editToggleTitle() {
			return this.edit ? this.$t('song.prebuild.edit.label') : this.$t('song.prebuild.request.label');
		}
	},
	methods: {
		toggleVip() {
			this.vip = !this.vip;
		},
		toggleEdit() {
			this.edit = !this.edit;
		},
		/**
		 * copy the command to the user's clipboard
		 */
		copy() {
			this.$refs.output.select();
			document.execCommand('copy');

			this.$nextTick().then(() => {
				this.$refs.copyButton.focus();
			});
		}
	}
};


</script>

<style lang="scss">
  .prebuild {
		display: grid;
		grid-template-areas: 'modifier output copy';
		grid-template-columns: auto 1fr auto;
		padding: var(--margin);
		border-top: 1px solid var(--filler-2);
		gap: var(--margin);

		@media screen and (max-width: 32rem) {
			grid-template-areas: 'output output output' 'modifier . copy';
			grid-template-columns: auto 1fr auto;
		}

		.button-group {
			display: flex;

			& > button:first-of-type{
				border-top-left-radius: 5px;
				border-bottom-left-radius: 5px;
			}
			& > button:last-of-type{
				border-top-right-radius: 5px;
				border-bottom-right-radius: 5px;
			}
		}

		.output {
			border-radius: 5px;
			background-color: var(--root-bg);
			border: 3px solid #0000;
			cursor: default;
			color: var(--text);
			padding: calc(var(--margin-thin) - 3px) calc(var(--margin) - 3px);
			grid-area: output;
			min-width: 1em;
			transition: border-color ease-in-out 300ms;

			&:focus{
				outline: none;
				border-color: var(--filler-3);
			}
		}
		.modifier {
			grid-area: modifier;
		}
		.copy {
			grid-area: copy;
		}
  }
</style>
