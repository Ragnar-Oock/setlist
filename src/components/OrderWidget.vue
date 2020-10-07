<template lang="html">
	<div class="order-widget">
		<p class="sr-only">
			Order the list by :
		</p>
		<button
			v-for="(value, key) in availableOrders"
			:id="key"
			:key="key"
			:class="by[key]"
			class="order-widget__btn"
			@click="cicleOrderBy(key)"
		>
			{{ value }}
			<span
				v-if="by.hasOwnProperty(key)"
				class="order-widget__direction sr-only"
				:class="by[key]"
			>{{ by[key] }}</span>
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
	props: [],
	data () {
		return {
			by: {},
			availableOrders: {
				title: 'titre',
				album: 'album',
				artist: 'artiste',
				new: 'nouveau'
			}
		};
	},
	computed: {

	},
	methods: {
		cicleOrderBy(target) {
			if (typeof this.by[target] === 'undefined' || this.by[target] === '') {
				this.$set(this.by, target, 'ASC');
			}
			else if (this.by[target] === 'ASC') {
				this.by[target] = 'DESC';
			}
			else {
				this.by[target] = '';
			}
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
		box-shadow: 0 0 5px 1px #0003;
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
			overflow: hidden;
			background: transparent;
			cursor: pointer;
			text-align: center;
			position: relative;
			z-index: 1;

			&:hover,
			&:focus {
				&::before {
					opacity: 1;
					background-image: none;
				}
				outline: 0;
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