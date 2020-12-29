<!-- eslint-disable vue/no-v-html -->
<template lang="html">
	<div
		class="rules-page"
	>
		<article
			class="rules-page__article"
			v-html="rules"
		/>
		<article
			class="rules-page__article"
			v-html="tuto"
		/>
		<footer
			class="rules-page__footer"
			v-html="footer"
		/>
	</div>
</template>

<script lang="js">
import marked from 'marked';

export default {
	name: 'RulesPage',
	computed:{
		rules() {
			return marked(this.$t('rules.rules'));
		},
		tuto() {
			return marked(this.$t('rules.tuto'));
		},
		footer() {
			return marked(this.$t('rules.footer'));
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
		margin: 1em auto 0;

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

		&__button {
			border-radius: 5px;
			border: 1px solid transparent;
			background: var(--bg-gradient);
			box-shadow: 0 0 5px 0 #0003;
			color: var(--text);
			padding: .25em 1em;
			cursor: pointer;

			&-container {
				display: flex;
				justify-content: flex-end;
			}

			&:hover,
			&:focus {
				outline: 0;
				border-color: var(--text);
			}
		}
  }
</style>
