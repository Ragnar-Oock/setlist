<template lang="html">
	<div
		class="double-slider-range"
		role="group"
		aria-labelledby="multi-label"
	>
		<div class="double-slider-range__multi-label">
			<slot />
			<div
				v-if="help"
				v-tippy="{placement: 'right'}"
				class="double-slider-range__nob"
				:content="help"
			/>
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
				ref="inputMin"
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
				ref="inputMax"
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

export default {
	name: 'DoubleSliderRange',
	components: {
		VueSlider
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
			required: true
			// default: () => ([this.min, this.max])
		},
		help: {
			type: String,
			required: false,
			default: undefined
		}
	},
	data () {
		return {
			minValue: this.value[0] || this.min,
			maxValue: this.value[1] || this.max
		};
	},
	computed: {
		range: {
			get() {
				return [this.minValue, this.maxValue];
			},
			set(newValue) {
				// force cast to number to avoide evaluating the length instead of the value
				newValue[0] = Number(newValue[0]);
				newValue[1] = Number(newValue[1]);

				if (newValue[0] < newValue[1]) {
					this.minValue = newValue[0];
					this.maxValue = newValue[1];
				}
				else {
					this.minValue = newValue[1];
					this.maxValue = newValue[0];

					if (this.$refs.inputMin === document.activeElement) {
						this.$refs.inputMax.focus();
					}
					else if (this.$refs.inputMax === document.activeElement) {
						this.$refs.inputMin.focus();
					}
				}
			}
		}
	},
	watch: {
		value : function (newValue) {
			this.range = newValue;
		},
		minValue() {
			this.$emit('input', this.range);
		},
		maxValue() {
			this.$emit('input', this.range);
		}
	},
	methods: {
		// on blur realocate the value so they are ordered
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
			transition-property: background-color, border-color;
			box-shadow: var(--shadow);
			border: 2px solid var(--filler-1);

			&:focus,
			&:hover {
				outline: none;
				border-color: var(--primary-2)
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
				box-shadow: var(--shadow);

				&:focus-within {
					background-color: var(--filler-2);
				}
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

		&__nob {
			z-index: 11;
			width: 1em;
			height: 1em;
			border-radius: 50%;
			background-color: var(--filler-1);
			transition: background-color 200ms ease-in-out;
			display: inline-block;

			&:focus {
				outline: none;
			}

			&::before {
				content: '?';
				width: 100%;
				height: 100%;
				display: block;
				color: var(--text);
				text-align: center;
				transition: color 200ms ease-in-out;
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
