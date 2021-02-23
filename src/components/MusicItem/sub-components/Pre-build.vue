<template>
	<div class="prebuild">
		<div class="btn-group modifier">
			<button
				class="btn small dull with-icon"
				aria-live="assertive"
				@click="toggleVip"
			>
				<img
					v-if="vip"
					svg-inline
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
				class="btn small dull with-icon"
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
		<input
			type="text"
			readonly="readonly"
			class="output"
			:value="command"
		>
		<div class="btn-group copy">
			<button class="btn small dull with-icon">
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
		copy() {
			this.$refs.output.select();
			document.execCommand('copy');
			this.showTooltip = true;
			setTimeout(() => {
				this.showTooltip = false;
			}, 1500);

			this.$nextTick().then(() => {
				this.$refs.copyButton.focus();
			});
		}
	}
};


</script>

<style scoped lang="scss">
  .prebuild {
		display: grid;
		grid-template-areas: 'modifier output copy';
		grid-template-columns: auto 1fr auto;
		padding: var(--margin);
		gap: var(--margin);
		background-color: var(--filler-1);

		@media screen and (max-width: 30rem) {
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
			flex-grow: 1;
			border-radius: 5px;
			background-color: var(--root-bg);
			border: 3px solid #0000;
			cursor: default;
			color: var(--text);
			padding: calc(var(--margin-thin) - 3px) calc(var(--margin) - 3px);
			grid-area: output;

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
