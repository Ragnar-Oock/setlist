<template lang="html">
	<v-tour
		name="tutorial"
		class="tutorial"
		:steps="steps"
	>
		<template slot-scope="tour">
			<transition name="fade">
				<CustomStep
					v-if="tour.steps[tour.currentStep]"
					:key="tour.currentStep"
					:step="tour.steps[tour.currentStep]"
					:previous-step="tour.previousStep"
					:next-step="tour.nextStep"
					:stop="tour.stop"
					:skip="tour.skip"
					:is-first="tour.isFirst"
					:is-last="tour.isLast"
					:labels="tour.labels"
				>
					<template #actions="actions">
						<!-- <button @click="log(actions, actions.actions.isFirst)">
							log
						</button> -->
						<div class="tutorial__actions btn-group">
							<!-- previous -->
							<button
								v-if="!actions.actions.isFirst && actions.actions.isButtonEnabled('buttonPrevious')"
								class="previous btn dull small with-icon "
								@click.prevent="actions.actions.previousStep"
							>
								<img
									svg-inline
									class="icon arrow left"
									src="@/assets/images/scrolldown/chevron_down.svg"
									aria-hidden="true"
								>
								{{ actions.actions.labels.buttonPrevious }}
							</button>
							<!-- skip tour -->
							<button
								v-if="!actions.actions.isLast && actions.actions.isButtonEnabled('buttonSkip')"
								class="skip btn dull small"
								@click.prevent="actions.actions.skip"
							>
								{{ actions.actions.labels.buttonSkip }}
							</button>
							<!-- next -->
							<button
								v-if="!actions.actions.isLast && actions.actions.isButtonEnabled('buttonNext')"
								class="next btn dull small"
								@click.prevent="actions.actions.nextStep"
							>
								{{ actions.actions.labels.buttonNext }}
								<img
									svg-inline
									class="icon arrow right"
									src="@/assets/images/scrolldown/chevron_down.svg"
									aria-hidden="true"
								>
							</button>
							<!-- finish -->
							<button
								v-if="actions.actions.isLast && actions.actions.isButtonEnabled('buttonStop')"
								class="finish btn dull small"
								@click.prevent="actions.actions.finish"
							>
								{{ actions.actions.labels.buttonStop }}
							</button>
						</div>
					</template>
				</CustomStep>
			</transition>
		</template>
	</v-tour>
</template>

<script lang="js">
// initialize vue tour as a vue global component
import Vue from 'vue';
import VueTour from 'vue-tour';
import 'vue-tour/dist/vue-tour.css';
Vue.use(VueTour);
// end of initialisation

import CustomStep from './VStep';

export default {
	name: 'TourWrapper',
	components: {
		CustomStep
	},
	computed: {
		steps() {
			return [
				{
					target: '#lang-selector',
					content: this.$t('tutorial.languageSelector.content'),
					header: { title: this.$t('tutorial.languageSelector.title') },
					params: {
						enableScrolling: false
					}
				},
				{
					target: '#darkmode-label',
					content: this.$t('tutorial.darkmode.content'),
					header: { title: this.$t('tutorial.darkmode.title') },
					params: {
						enableScrolling: false
					}
				},
				{
					target: '#search',
					content: this.$t('tutorial.search.content'),
					header: { title: this.$t('tutorial.search.title') },
					params: {
						enableScrolling: false
					}
				},
				{
					target: '#advenced-search',
					content: this.$t('tutorial.filters.content'),
					header: { title: this.$t('tutorial.filters.title') },
					params: {
						enableScrolling: false
					}
				},
				{
					target: '#order-widget',
					content: this.$t('tutorial.order.content'),
					header: { title: this.$t('tutorial.order.title') },
					params: {
						enableScrolling: false
					}
				},
				{
					target: '.music-item',
					content: this.$t('tutorial.openItem.content'),
					header: { title: this.$t('tutorial.openItem.title') },
					params: {
						enableScrolling: false
					}
				},
				{
					target: '.music-item .arrangements',
					content: this.$t('tutorial.arrangementSelector.content'),
					header: { title: this.$t('tutorial.arrangementSelector.title') },
					before: () => new Promise((resolve, reject) => {
						this.$store.dispatch('toggleItem', { index: 0, value: true }).then(() => {
							new Promise(res => setTimeout(res, 500)).then(resolve);
						}).catch(reject);
					}),
					params: {
						enableScrolling: false,
						modifier: {
							placement: 'top'
						}
					}
				},
				{
					target: '.music-item .vip',
					content: this.$t('tutorial.prebuildVIP.content'),
					header: { title: this.$t('tutorial.prebuildVIP.title') },
					params: {
						enableScrolling: false
					}
				},
				{
					target: '.music-item .edit',
					content: this.$t('tutorial.prebuildEdit.content'),
					header: { title: this.$t('tutorial.prebuildEdit.title') },
					params: {
						enableScrolling: false
					}
				},
				{
					target: '.music-item .copy',
					content: this.$t('tutorial.prebuildCopy.content'),
					header: { title: this.$t('tutorial.prebuildCopy.title') },
					params: {
						enableScrolling: false
					}
				},
				{
					target: '#kofi',
					content: this.$t('tutorial.tips.content'),
					header: { title: this.$t('tutorial.tips.title') },
					params: {
						enableScrolling: false
					}
				},
				{
					target: '#kofi',
					content: this.$t('tutorial.bugs.content'),
					header: { title: this.$t('tutorial.bugs.title') },
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
		log() {
			console.log(...arguments);
		}
	}
};


</script>

<style lang="scss">
@use '../../assets/scss/mixins.scss' as *;

  .v-tour.tutorial{
		.v-step{
			background-color: var(--filler-1);

			&__arrow {
				border-color: var(--filler-1);
			}

			&__header {
				background-color: var(--filler-1);
				text-align: left;
				font-weight: bold;
				margin: 0;
				padding: 0 0 1rem;
			}

			&__content {
				text-align: left;
			}
		}
	}
	.tutorial {
		&__actions {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			grid-template-areas: 'previous skip next';
		}

		$areas : previous, skip, next;
		@include multi-grid-area($areas);

		.icon {
			width: 1em;
			&.left {
				transform: rotate(90deg);
			}
			&.right {
				transform: rotate(-90deg);
			}
		}

		a {
			color: var(--text);

			&:focus {
				outline: 3px var(--primary-2) solid;
				outline-offset: 2px;
			}
		}
	}
</style>
