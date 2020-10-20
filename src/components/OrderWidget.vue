<template lang="html">
	<div class="order-widget">
		<p class="sr-only">
			Order the list by :
		</p>
		<button
			v-for="(val, key) in orderBy"
			:id="key"
			:key="key"
			:class="orderBy[key]"
			class="order-widget__btn"
			@click="cicleOrderBy(key)"
		>
			{{ key }}
			<span
				v-if="orderBy.hasOwnProperty(key)"
				class="order-widget__direction sr-only"
				:class="orderBy[key]"
			>{{ orderBy[key] }}</span>
			<svg
				aria-hidden="true"
				class="order-widget__arrow"
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
		</button>
	</div>
</template>

<script lang="js">

export default {
	name: 'OrderWidget',
	props: {
		value: {
			type: Object,
			default: () => ({}),
			required: false
		}
	},
	data () {
		return {
			orderBy: {}
		};
	},
	watch: {
		value(newValue) {
			this.orderBy = newValue;
		}
	},
	mounted() {
		this.orderBy = this.value;
	},
	methods: {
		cicleOrderBy(target) {
			if (typeof this.orderBy[target] === 'undefined' || this.orderBy[target] === '') {
				this.$set(this.orderBy, target, 'ASC');
			}
			else if (this.orderBy[target] === 'ASC') {
				this.orderBy[target] = 'DESC';
			}
			else {
				this.orderBy[target] = '';
			}

			this.$emit('input', this.orderBy);
		}
	}
};


</script>

<style lang="scss">
  .order-widget {
		background-color: var(--filler-2);
		padding: .5em 1em;
		margin: 0 auto 3em;
		width: 100%;
		max-width: 60ch;
		border-radius: 5px;
		box-shadow: 0 0 5px 1px #0001;
		transition: background-color 300ms ease-in-out;
		display: flex;
		justify-content: space-around;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: .5em 1em;

		@media screen and( max-width: 35em) {
			grid-template-columns: repeat(2, 1fr);
		}

		&__btn {
			padding: .25em .5em;
			border: none;
			color: var(--text);
			border-radius: 5px;
			border: 1px solid transparent;
			overflow: hidden;
			background: transparent;
			cursor: pointer;
			text-align: center;
			position: relative;
			z-index: 1;

			&:hover,
			&:focus {
				outline: 0;
				border-color: var(--counter-text);
			}

			&::before {
				content: '';
				background: var(--primary-1);
				background-image: linear-gradient(18deg, var(--primary-1) 0%, var(--primary-2) 100%);
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				z-index: -1;
				opacity: 0;
				transition: opacity 150ms ease-in-out;
			}
			&.ASC::before,
			&.DESC::before {
				opacity: .8;
			}
		}

		&__arrow {
			color: var(--text);
			width: 1em;
			opacity: 0;
			position: absolute;
			right: .5em;
			top: 50%;
			transform: translateY(-50%);
			transition: opacity 150ms ease-in-out, transform 300ms 150ms ease-in-out;

			@at-root .ASC &, .DESC &{
				opacity: 1;
			}

			@at-root .DESC & {
				transform: translateY(-50%) rotateX(180deg);
			}
		}
  }
</style>
