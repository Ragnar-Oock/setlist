<template>
	<details
		ref="localRoot"
		class="arrangements"
	>
		<summary>
			<span class="title">Arrangements</span>
			<img
				svg-inline
				class="icon arrow"
				src="@/assets/images/scrolldown/chevron_down.svg"
				aria-hidden="true"
			>
		</summary>
		<ul>
			<li
				v-for="(arrangement, index) in list"
				:key="index"
				class="radio__group meta"
			>
				<input
					:id="'arrangement-'+songId+'-'+index"
					:checked="arrangement.type===value.type"
					:value="arrangement.type"
					:name="'arrangement-'+songId"
					type="radio"
					class="radio"
					@change="select(index)"
				>
				<label
					:for="'arrangement-'+songId+'-'+index"
					class="radio__label"
				>
					<span class="key">{{ arrangement.name }}</span>
					<span class="value">
						<span class="sr-only">{{ $t('song.arrangements.tunning') }}</span>
						{{ i18nFallback('song.arrangements', arrangement.tuning) }}
					</span>
				</label>
			</li>
		</ul>
	</details>
</template>

<script lang="js">
import mixins from '@/mixins.js';

export default {
	name: 'ArrangementsSelector',
	mixins:[mixins],
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
	mounted() {
		if (this.list.length === 1) {
			this.select(0);
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

		summary {
			display: grid;
			grid-template-columns: auto 1fr auto;
			grid-template-areas: 'title spacer arrow';
			gap: var(--margin);
			align-items: center;
			cursor: pointer;

			&::after{
				content:'';
				display: block;
				grid-area: spacer;
				width: 100%;
				height: .2em;
				border-radius: 50vh;
				background-color: var(--filler-2);
				opacity: 0;
				transition: opacity ease-in-out 300ms;
			}
			&:hover::after{
				opacity: 1;
			}
			.arrow{
				grid-area: arrow;
			}
		}
		&[open] .arrow {
			transform: rotate(180deg);
		}
	}
</style>
