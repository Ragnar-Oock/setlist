<template functional>
	<div class="tool-tip">
		<slot />
		<div
			class="tool-tip__wrapper"
			:class="{'tool-tip--show': props.displayed, 'tool-tip--show-on-hover': props.showOnHover}"
			:style="{'background-color': props.color}"
		>
			<slot name="tooltip" />
		</div>
	</div>
</template>

<script>

export default {
	name: 'ToolTip',
	props: {
		color: { type: String, required: false, default: '#d7d7d7' },
		displayed: { type: Boolean, required: true },
		showOnHover: { type: Boolean, required: false, default: false }
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
		transform: translateY(-50%) translateX(-1em);
		border-radius: 5px;
		filter: drop-shadow(0 0 5px #0003);
		width: max-content;
		max-width: 18ch;
		opacity: 0;
		transition: 300ms ease-in-out;
		transition-property: opacity, transform;

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
	&--show-on-hover:hover,
	&--show {
		opacity: 1;
		transform: translateY(-50%);
	}
}
</style>
