<template lang="html">
	<div
		class="double-slider-range"
		role="group"
		aria-labelledby="multi-label"
	>
		<div class="double-slider-range__multi-label">
			<slot />
			<HoverTip v-if="$slots.help">
				<slot name="help" />
			</HoverTip>
		</div>
		<div class="double-slider-range__wrapper">
			<label
				for="minValue"
				class="double-slider-range__label sr-only"
			>
				<slot name="label-min-value">
					min value
				</slot>
			</label>
			<input
				id="minValue"
				v-model="minValue"
				class="double-slider-range__input"
				type="number"
				:min="min"
				:max="max"
				@blur="onBlur"
			>

			<vue-slider
				ref="slider"
				v-model="range"
				aria-hidden="true"
				:tooltip="'none'"
				:contained="true"
				class="double-slider-range__range"
			/>

			<label
				for="maxValue"
				class="double-slider-range__label sr-only"
			>
				<slot name="label-max-value">
					max value
				</slot>
			</label>
			<input
				id="maxValue"
				v-model="maxValue"
				class="double-slider-range__input"
				type="number"
				:min="min"
				:max="max"
				@blur="onBlur"
			>
		</div>
	</div>
</template>

<script lang="js">
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';

import HoverTip from './HoverTip';

export default {
	name: 'DoubleSliderRange',
	components: {
		VueSlider,
		HoverTip
	},
	props: {
		min: {
			type: Number,
			required: true
		},
		max: {
			type: Number,
			required: true
		},
		value: {
			type: Array,
			required: false,
			default: () => ([this.min, this.max])
		}
	},
	data () {
		return {
			minValue: this.min,
			maxValue: this.max
		};
	},
	computed: {
		range: {
			get() {
				return [this.minValue, this.maxValue];
			},
			set(newValue) {
				this.minValue = Math.min(newValue[0], newValue[1]);
				this.maxValue = Math.max(newValue[0], newValue[1]);
			}
		}
	},
	watch: {
		value : function (newValue) {
			this.range = newValue;
		}
	},
	methods: {
		onBlur() {
			this.range = [this.minValue, this.maxValue];
		}
	}
};


</script>

<style lang="scss">
  .double-slider-range {
		margin-bottom: 1em;

		&__input {
			appearance: textfield;
			border: none;
			background-color: var(--filler-1);
			width: 7ch;
			border-radius: 5px;
			text-align: center;
			color: var(--text);
			transition: 300ms ease-in-out;
			transition-property: background-color, box-shadow;

			&:focus {
				box-shadow: 0 0 5px 2px #0004;
				background-color: var(--filler-2);
				outline: none;
			}

			&:first-of-type {
				grid-area: input1;
			}

			&:last-of-type {
				grid-area: input2;
				margin-left: auto;
			}
		}

		&__multi-label {
			font-weight: bold;
			color: var(--text);
		}

		&__wrapper {
			display: grid;
			grid-template-columns: auto 1fr auto;
			grid-template-areas: 'input1 range input2';
			gap: .5em;
			padding-top: .5em ;

			@media screen and (max-width: 25em) {
				grid-template-areas:'range range' 'input1 input2' ;
				grid-template-columns: 1fr 1fr;
			}
		}

		&__range {
			grid-area: range;

			.vue-slider-rail {
				background-color: var(--filler-1);
				height: .5em;
				border-radius: 3px;
			}
			.vue-slider-dot-handle {
				background-color: var(--primary-2);
				width: .5em;
				height: 1em;
				border-radius: 5px;
				position: relative;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				transition: background-color 300ms ease-in-out;
			}
			.vue-slider-dot-handle-focus{
				background-color: var(--primary-1);
				box-shadow: var(--shadow);
			}
			.vue-slider-process {
				background-color: #0000;
			}
		}

		.sr-only {
			position: absolute;
			width: 1px;
			height: 1px;
			padding: 0;
			margin: -1px;
			overflow: hidden;
			clip: rect(0, 0, 0, 0);
			white-space: nowrap;
			border: 0;
		}
  }
</style>
