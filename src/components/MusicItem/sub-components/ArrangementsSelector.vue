<template>
	<details
		ref="localRoot"
		class="arrangements"
	>
		<summary>Arrangements</summary>
		<ul>
			<li
				v-for="(arrangement, index) in list"
				:key="index"
				class="radio__group meta"
			>
				<input
					:id="'arrangement-'+songId+'-'+index"
					:value="arrangement.type"
					:checked="arrangement.type===value"
					type="radio"
					class="radio"
					:name="'arrangement-'+songId"
					@change="select(index)"
				>
				<label
					:for="'arrangement-'+songId+'-'+index"
					class="radio__label"
				>
					<span class="key">{{ arrangement.name }}</span>
					<div class="spacer" />
					<span class="value">{{ arrangement.tuning }}</span>
				</label>
			</li>
		</ul>
	</details>
</template>

<script lang="js">

export default {
	name: 'ArrangementsSelector',
	props: {
		list: {
			type: Array,
			required: false,
			default: () => []
		},
		value: {
			type: Object,
			required: false,
			default: () => ({})
		},
		songId:{
			type: String,
			required: true
		}
	},
	methods: {
		select(index) {
			this.$emit('input', this.list[index]);
		}
	}
};


</script>

<style lang="scss">
  .arrangements {
		display: flex;
		justify-items: space-between;
		padding: 0 1.5em;
		transform: rotate(0);
		&__list {
			display: flex;
			height: auto;
			align-items: center;
			overflow-x: auto;
			scrollbar-width: thin;
			scrollbar-color: var(--filler-2) transparent;

			&::before,
			&::after {
				content: '';
				position: fixed;
				width: 20px;
				height: 100%;
				left: calc(1.5rem);
				background-image: linear-gradient(-90deg, transparent 0%, var(--filler-1) 100%);
				top: 0;
				pointer-events: none;
				opacity: 0;
				transition: opacity 300ms ease-out;
			}
			&::after {
				left: unset;
				right: calc(1.5rem + 28px);
				background-image: linear-gradient(90deg, transparent 0%, var(--filler-1) 100%);
			}

			&.left::before{
				opacity: 1;
			}
			&.right::after{
				opacity: 1;
			}

			&::-webkit-scrollbar {
				height: .4em;
			}

			&::-webkit-scrollbar-thumb {
				background-color: var(--filler-2-translucent);
				border-radius: .4em;
			}
		}
		&__input {
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
		&__label {
			background-color: var(--filler-2);
			padding: .25em .5em;
			font-size: 85%;
			border-radius: 5px;
			cursor: pointer;
			display: flex;
			transition: background-color 300ms ease-in-out;
			width: max-content;
			height: max-content;
			margin-right: .25em;
			border: 1px solid transparent;

			&:hover,
			&:focus {
				background-color: var(--filler-2-translucent);
				border-color: var(--primary-2);
				outline: none;
			}
		}
		&__input:checked + &__label {
			background-color: var(--primary-1);
		}
		&__input:focus + &__label {
			background-color: var(--primary-2);
			border-color: var(--primary-2);
			outline: none;
		}

		&__tuning {
			display: inline-block;
			white-space: nowrap;
			padding-left: .5ch;
		}
		&__toggle {
			background-color: transparent;
			border: none;
			border-radius: 5px;
			padding: .25em;
			color: var(--text);
			transition: background-color 300ms ease-in-out;
			cursor: pointer;
			margin-left: auto;

			&:focus,
			&:hover {
				background-color: var(--filler-2-translucent);
				outline: none;
			}

			svg {
				width: 1.25em;
				height: 1.25em;
			}

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
