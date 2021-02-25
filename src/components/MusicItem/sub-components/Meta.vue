<template lang="html">
	<component
		:is="rootComponent"
		class="meta"
	>
		<template
			v-if="haveMeta"
		>
			<li
				v-for="(value, key) in meta"
				:key="key"
				class="meta__item"
			>
				<span class="meta__key">
					{{ key }}
				</span>
				<span class="meta__value">
					{{ value }}
				</span>
			</li>
		</template>
		<div
			v-else
			class="meta__no-info"
		>
			{{ $t('song.noMeta') }}
		</div>
	</component>
</template>

<script lang="js">

export default {
	name: 'Metadata',
	props: {
		meta: {
			type: Object,
			required: false,
			default: () => ({})
		}
	},
	data () {
		return {

		};
	},
	computed: {
		haveMeta() {
			return Object.keys(this.meta).length > 0;
		},
		rootComponent() {
			return this.haveMeta ? 'ul' : 'div';
		}
	},
	methods: {

	}
};


</script>

<style scoped lang="scss">
  .meta {
		padding: var(--margin);

		&__item{
			display: grid;
			grid-template-columns: auto 1fr auto;
			grid-template-areas: 'key spacer value';
			gap: var(--margin);
			align-items: center;
			padding: var(--margin-thin) var(--margin);

			&::after{
				content:'';
				display: block;
				width: 100%;
				height: .2em;
				border-radius: 50vh;
				background-color: var(--filler-2);
				transition: opacity ease-in-out 300ms;
				grid-area: spacer;
				opacity: 0;
			}
			&:hover::after{
				opacity: 1;
			}
		}

		&__key {
			grid-area: key;
		}

		&__value {
			grid-area: value;
		}

		&__no-info{
			text-align: center;
		}
  }
</style>
