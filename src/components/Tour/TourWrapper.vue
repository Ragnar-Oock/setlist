<template lang="html">
	<v-tour
		name="tutorial"
		class="tutorial"
		:steps="steps"
		:callbacks="callbacks"
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
								{{ $t('tutorial.buttons.previous') }}
							</button>
							<!-- skip tour -->
							<button
								v-if="!actions.actions.isLast && actions.actions.isButtonEnabled('buttonSkip')"
								class="skip btn dull small"
								@click.prevent="actions.actions.skip"
							>
								{{ $t('tutorial.buttons.skip') }}
							</button>
							<!-- next -->
							<button
								v-if="!actions.actions.isLast && actions.actions.isButtonEnabled('buttonNext')"
								class="next btn dull small"
								@click.prevent="actions.actions.nextStep"
							>
								{{ $t('tutorial.buttons.next') }}
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
								@click.prevent="onFinish"
							>
								{{ $t('tutorial.buttons.finish') }}
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
	data() {
		return {
			callbacks: {
				onFinish: this.onFinish,
				onSkip: this.onFinish
			}
		};
	},
	computed: {
		steps() {
			return [
				{
					target: '#startTutorial',
					content: this.$t('tutorial.steps.start.content'),
					header: { title: this.$t('tutorial.steps.start.title') },
					params: {
						enableScrolling: false
					}
				},
				{
					target: '#darkmode-label',
					content: this.$t('tutorial.steps.darkmode.content'),
					header: { title: this.$t('tutorial.steps.darkmode.title') },
					params: {
						enableScrolling: false
					}
				},
				{
					target: '#search',
					content: this.$t('tutorial.steps.search.content'),
					header: { title: this.$t('tutorial.steps.search.title') },
					params: {
						enableScrolling: false
					}
				},
				{
					target: '#advenced-search',
					content: this.$t('tutorial.steps.filters.content'),
					header: { title: this.$t('tutorial.steps.filters.title') },
					params: {
						enableScrolling: false
					}
				},
				{
					target: '#order-widget',
					content: this.$t('tutorial.steps.order.content'),
					header: { title: this.$t('tutorial.steps.order.title') },
					params: {
						enableScrolling: false
					}
				},
				{
					target: '.music-item',
					content: this.$t('tutorial.steps.openItem.content'),
					header: { title: this.$t('tutorial.steps.openItem.title') },
					params: {
						enableScrolling: false
					}
				},
				{
					target: '.music-item .arrangements',
					content: this.$t('tutorial.steps.arrangementSelector.content'),
					header: { title: this.$t('tutorial.steps.arrangementSelector.title') },
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
					content: this.$t('tutorial.steps.prebuildVIP.content'),
					header: { title: this.$t('tutorial.steps.prebuildVIP.title') },
					params: {
						enableScrolling: false
					}
				},
				{
					target: '.music-item .edit',
					content: this.$t('tutorial.steps.prebuildEdit.content'),
					header: { title: this.$t('tutorial.steps.prebuildEdit.title') },
					params: {
						enableScrolling: false
					}
				},
				{
					target: '.music-item .copy',
					content: this.$t('tutorial.steps.prebuildCopy.content'),
					header: { title: this.$t('tutorial.steps.prebuildCopy.title') },
					params: {
						enableScrolling: false
					}
				},
				{
					target: '#kofi',
					content: this.$t('tutorial.steps.tips.content'),
					header: { title: this.$t('tutorial.steps.tips.title') },
					params: {
						enableScrolling: false
					}
				},
				{
					target: '#kofi',
					content: this.$t('tutorial.steps.bugs.content'),
					header: { title: this.$t('tutorial.steps.bugs.title') },
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
		},
		onFinish() {
			this.$store.commit('SET_TUTORIAL_COMPLETION', true);
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
