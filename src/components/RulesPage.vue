<template lang="html">
	<Fragment />
</template>

<script lang="js">
import { mapGetters } from 'vuex';
import { Fragment } from 'vue-fragment';

export default {
	name: 'RulesPage',
	components: {
		Fragment
	},
	props:{
		show:{
			type: Boolean,
			default: false,
			required: true
		}
	},
	computed:{
		...mapGetters([
			'isLastRuleVersionAccepted',
			'isForceShowRulesUp'
		])
	},
	watch:{
		show(newValue) {
			if (newValue && (!this.isLastRuleVersionAccepted || this.isForceShowRulesUp)) {
				this.showAlert();
			}
		}
	},
	methods: {
		showAlert() {
			// Use sweetalert2
			this.$swal({
				title: this.$t('rules.title'),
				html: this.$t('rules.body'),
				customClass: {
					container: 'container',
					popup: 'popup-box',
					header: 'header',
					title: 'title',
					closeButton: 'close',
					icon: 'icon',
					image: 'img',
					content: 'content',
					htmlContainer: 'body',
					input: 'input',
					inputLabel: 'label',
					validationMessage: 'validation',
					actions: 'action',
					confirmButton: 'confirm',
					denyButton: 'deny',
					cancelButton: 'cancel',
					loader: 'loader',
					footer: 'footer'
				},
				allowOutsideClick: false,
				confirmButtonText: this.$t('rules.agree'),
				focusConfirm: false
			})
				.then(result => {
					if (result.isConfirmed) {
						this.$store.commit('SET_LAST_ACCEPTED_RULE_VERSION', process.env.VUE_APP_RULES_VERSION);
					}
				});

			// focus the popup body on open
			const popup = document.querySelector('.popup-box');

			this.$nextTick(() => popup.focus());
		}
	}
};


</script>

<style lang="scss">
  .rules-page {
		line-height: 1.4;
		margin: 0 auto;
		max-width: 60ch;
		background-color: var(--filler-1);
		color: var(--text);
		border-radius: 5px;
		transition: 300ms ease-in-out;
		transition-property: background-color, color;
		padding: 2em 3em;
		margin: 5em auto 0;

		&__article {
			margin: 1em auto;
		}
		&__footer {
			margin-top: 3em;
		}
		h2 {
			margin: 2em 0 .5em;
			font-weight: bold;
			font-size: 120%;
		}
		* + p {
			margin: 1em 0 0;
		}
		li {
			padding: .25em 0;

			&::before {
				content: '-';
				font-weight: bold;
				padding: 0 .5em;
			}
		}

		a {
			color: var(--text);
			font-weight: bold;
			border: 1px solid transparent;
			padding: .25em .15em;
			border-radius: 5px;
			margin: -0.05em;
			transition: border-color 300ms ease-in-out;

			&:hover,
			&:focus {
				border-color: var(--text);
				outline: none;
			}
		}
  }
	.container{
		.popup-box{
			background-color: var(--filler-1);
			color: var(--text)
		}
		.title,
		.body{
			color: var(--text)
		}

		.header {
			align-items: unset;
			padding: 0 1.6em;

			&::after {
				content: '';
				display: block;
				background-image: linear-gradient(18deg, var(--primary-2) 0%, transparent 100%);
				width: 100%;
				height: .25em;
				border-radius: 1em;
			}
		}

		.title {
			font-size: 1.5rem;
		}

		.content{
			text-align: unset;
			font-size: 1rem;
			padding-top: 2em;
			line-height: 1.3;

			h2 {
				margin: 2em 0 .5em;
				font-weight: bold;
				font-size: 120%;
			}
			* + p {
				margin: 1em 0 0;
			}
			li {
				padding: .25em 0 0;

				&::before {
					content: '-';
					font-weight: bold;
					padding: 0 .5em;
				}
			}

			a {
				color: var(--text);
				font-weight: bold;
				border: 1px solid transparent;
				padding: .25em .15em;
				border-radius: 5px;
				margin: -0.05em;
				transition: border-color 300ms ease-in-out;

				&:hover,
				&:focus {
					border-color: var(--text);
					outline: none;
				}
			}
		}

		.confirm.confirm {
			border: 3px solid #0000;
			background-color: var(--filler-1);
			color: var(--text);
			padding: 0.5em 1em;
			cursor: pointer;
			transition: border-color ease-in-out 300ms;

			&:hover,
			&:focus {
				border-color: var(--primary-2);
				outline: none;
				box-shadow: none;
				background-image: none !important;
			}

			&-group {
				display: flex;

				& > .btn:first-of-type{
					border-top-left-radius: 5px;
					border-bottom-left-radius: 5px;
				}
				& > .btn:last-of-type{
					border-top-right-radius: 5px;
					border-bottom-right-radius: 5px;
				}
				& > .btn:not(.btn:first-of-type){
					margin-left:.1em
				}
			}
		}

		.action {
			justify-content: end;
		}
	}

</style>
