<template>
	<span
		class="arrangement-item"
		tabindex="0"
		@click="open = !open"
	>
		<span class="arrangement-item__label">
			<slot />
		</span>
		<transition
			name="slide-fade"
		>
			<span
				v-if="open"
				class="arrangement-item__accord"
			>
				: <slot name="accord" />
			</span>
		</transition>
	</span>
</template>

<script lang="js">

export default {
	name: 'ArrangementItem',
	data () {
		return {
			open: false
		};
	},
	methods: {
		onclick() {
			this.open = !this.open;
		}
	}
};


</script>

<style lang="scss">
  .arrangement-item {
		background-color: var(--filler-2);
		padding: .25em .5em;
		font-size: 85%;
		border-radius: 5px;
		cursor: pointer;
		display: flex;
		width: max-content;

		&__accord {
			display: inline-block;
			white-space: nowrap;
			padding-left: .5ch;
		}
  }
	.slide-fade-enter-active {
		transition: max-width 300ms ease-in,
		padding-left 100ms linear,
		opacity 300ms ease-in-out;
	}
	.slide-fade-leave-active {
		transition: max-width 300ms ease-out,
		padding-left 100ms 200ms linear,
		opacity 300ms ease-in-out;
	}
	.slide-fade-enter, .slide-fade-leave-to {
		max-width: 0px;
		padding-left: 0;
		opacity: 0
	}

	.slide-fade-leave, .slide-fade-enter-to {
		max-width: 100px;
		padding-left: .5ch;
		opacity: 1
	}
</style>
