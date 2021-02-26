<template lang="html">
	<div
		v-if="hasTags || hasShowlights || hasVocals"
		class="wrapper"
	>
		<ul
			v-if="hasTags"
			class="tag-list"
		>
			<li
				v-for="t in tags"
				:key="t.id"
				class="tag"
				:style="{'background-color': '#'+t.color, 'color': '#'+calcColor(t.color)}"
			>
				{{ i18nFallback('song.tags', t.name) }}
			</li>
		</ul>
		<img
			v-if="hasShowlights"
			v-tippy="{placement: 'bottom'}"
			src="@/assets/images/light.svg"
			svg-inline
			class="icon"
			:content="$t('song.showlight')"
			tabindex="0"
		>
		<img
			v-if="hasVocals"
			v-tippy="{placement: 'bottom'}"
			src="@/assets/images/file-earmark-music-fill.svg"
			svg-inline
			class="icon"
			:content="$t('song.lyrics')"
			tabindex="0"
		>
	</div>
</template>

<script lang="js">
import mixins from '@/mixins.js';

export default {
	name: 'TagList',
	mixins:[mixins],
	props: {
		tags:{
			type: Array,
			required: false,
			default: () => []
		},
		hasShowlights: {
			type: Boolean,
			required: false,
			default: false
		},
		hasVocals: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	computed: {
		hasTags() {
			return this.tags.length > 0;
		}
	}
};


</script>

<style scoped lang="scss">
  .wrapper {
		display: flex;
		flex-direction: row;
		padding: calc(var(--margin) * 2) var(--margin) 0 calc(var(--margin) * 2);
		align-items: center;
	}
	.tag-list {
		display: flex;
		flex-direction: row;
		margin-right: auto;

		.tag {
			padding: var(--margin);
			border-radius: 5px;

			& + .tag {
				margin-left: var(--margin);
			}
		}
	}
	.icon {
		margin-right: var(--margin);
		&:first-of-type {
			margin-left: auto;
		}
	}
</style>
