<template lang="html">
	<div class="tool-tip">
		<slot />
		<transition name="fade">
			<div
				v-show="displayed"
				class="tool-tip__wrapper"
				:style="{'background-color': color}"
			>
				<slot name="tooltip" />
			</div>
		</transition>
	</div>
</template>

<script lang="js">

export default {
	name: 'ToolTip',
	props: {
		color: { type: String, required: false, default: '#d7d7d7' },
		displayed: { type: Boolean, required: true }
	}
};


</script>

<style lang="scss">
.tool-tip {
	position: relative;
	display: flex;
	&__wrapper {
		position: absolute;
		top: 50%;
		right: calc(100% + 0.5em);
		padding: .25em .5em;
		transform: translateY(-50%);
		border-radius: 5px;
		filter: drop-shadow(0 0 5px #0003);
		width: max-content;
		max-width: 18ch;

		&::before {
			content: '';
			display: block;
			width: 10px;
			height: 10px;
			position: absolute;
			background-color: inherit;
			right: -5px;
			transform: translateY(-50%) rotate(45deg);
			top: 50%;
			z-index: -1;
			border-top-right-radius: 3px;
		}
	}
	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
}
</style>
