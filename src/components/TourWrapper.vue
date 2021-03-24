<template lang="html">
	<v-tour
		name="tutorial"
		:steps="steps"
	/>
</template>

<script lang="js">
// initialize vue tour as a vue global component
import Vue from 'vue';
import VueTour from 'vue-tour';
import 'vue-tour/dist/vue-tour.css';
Vue.use(VueTour);
// end of initialisation

export default {
	name: 'TourWrapper',
	props: {},
	data () {
		return {
		};
	},
	computed: {
		steps() {
			return [
				{
					target: '#lang-selector',
					content: this.$t('tutorial.languageSelector'),
					params: {
						enableScrolling: false
					}
				},
				{
					target: '#darkmode-label',
					content: this.$t('tutorial.darkmode'),
					params: {
						enableScrolling: false
					}
				},
				{
					target: '#search',
					content: this.$t('tutorial.search'),
					params: {
						enableScrolling: false
					}
				},
				{
					target: '#advenced-search',
					content: this.$t('tutorial.filters'),
					params: {
						enableScrolling: false
					}
				},
				{
					target: '#order-widget',
					content: this.$t('tutorial.order'),
					params: {
						enableScrolling: false
					}
				},
				{
					target: '.music-item',
					content: this.$t('tutorial.openItem'),
					params: {
						enableScrolling: false
					}
				},
				{
					target: '.music-item .arrangements',
					content: this.$t('tutorial.arrangementSelector'),
					before: () => new Promise((resolve, reject) => {
						this.$store.dispatch('toggleItem', { index: 0, value: true }).then(() => {
							new Promise(res => setTimeout(res, 500)).then(resolve);
						}).catch(reject);
					}),
					params: {
						enableScrolling: false,
						placement: 'top'
					}
				},
				{
					target: '.music-item .vip',
					content: this.$t('tutorial.prebuildVIP'),
					params: {
						enableScrolling: false
					}
				},
				{
					target: '.music-item .edit',
					content: this.$t('tutorial.prebuildEdit'),
					params: {
						enableScrolling: false
					}
				},
				{
					target: '.music-item .copy',
					content: this.$t('tutorial.prebuildCopy'),
					params: {
						enableScrolling: false
					}
				},
				{
					target: '#kofi',
					content: this.$t('tutorial.tips'),
					params: {
						enableScrolling: false
					}
				},
				{
					target: '#kofi',
					content: this.$t('tutorial.bugs'),
					params: {
						enableScrolling: false
					}
				}

			];
		}
	},
	mounted() {
		this.$tours['tutorial'].start();
	},
	methods: {
	}
};


</script>

<style scoped lang="scss">
  // .tour-wrapper {

  // }
</style>
