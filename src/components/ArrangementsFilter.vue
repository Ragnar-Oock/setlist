<template lang="html">
	<div class="arrangements-filter">
		<p class="search-bar__label">
			{{ $t('search.advenced.arrangement.label') }}
		</p>
		<div
			v-for="(value, key) in arrangementsFilter"
			:key="key"
			class="search-bar__radio_group"
		>
			<input
				:id="'arrangement-' + key"
				:value="arrangementsFilter[key]"
				type="checkbox"
				class="search-bar__radio"
				@change="onChange(key, $event)"
			>
			<label
				:for="'arrangement-' + key"
				class="search-bar__label"
			>
				{{ $t('search.advenced.arrangement.'+key) }}
			</label>
		</div>
	</div>
</template>

<script lang="js">

export default {
	name: 'ArrangementsFilter',
	data() {
		return {
			filter: {}
		};
	},
	computed: {
		arrangementsFilter: {
			get() {
				return this.$store.state.searchSettings.arrangements;
			},
			set(newValue) {
				this.$store.commit('SET_ARRANGEMENTS_FILTER', newValue);
			}
		}
	},
	methods: {
		onChange(key, event) {
			this.$store.commit('SET_ARRANGEMENTS_FILTER_KEY', { key, value: event.target.checked });
		}
	}
};


</script>
