<template>
	<section class="lang-selector">
		<div
			v-for="(value, key) in supportedLocales"
			:key="key"
			class="lang-selector__item"
		>
			<input
				:id="key"
				v-model="$i18n.locale"
				type="radio"
				name="lang"
				:value="key"
				class="lang-selector__input"
				@change="change"
			>
			<label
				v-tippy="{placement: 'bottom', popperOptions: {strategy: 'fixed'}}"
				:for="key"
				:data-tippy-content="value"
				class="lang-selector__label"
			>{{ key | toUpper }}
				<span class="sr-only">{{ value }}</span>
			</label>
		</div>
	</section>
</template>

<script lang="js">

import { supportedLocales } from '@/lang/supported';

export default {
	name: 'LangSelector',
	filters: {
		toUpper: function (value) {
			if (!value) {
				return '';
			}

			return value.toString().toUpperCase();
		}
	},
	data () {
		return {
			supportedLocales
		};
	},
	methods:{
		change() {
			localStorage.setItem('langLocal', this.$i18n.locale);
			document.documentElement.lang = this.$i18n.locale;
		}
	}
};


</script>

<style lang="scss">
  .lang-selector {
		display: flex;
		color: var(--text);

		&__input{
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
			padding: .25em .5em;
			border-radius: 5px;
			cursor: pointer;
			border: thin solid transparent;

			&:hover {
				border-color: var(--text);
			}
		}

		&__item + &__item{
			position: relative;
			margin-left: calc(.5em + 3px);

			&::before {
				content: '';
				position: absolute;
				display: block;
				width: 3px;
				height: calc(100% + .5em);
				top: -.25em;
				left: calc(-.25em - 3px);
				border-radius: 100px;
				background-color: var(--text);
			}
		}

		&__input:checked + &__label {
			background-color: var(--primary-1);
		}
		&__input:focus + &__label{
			border-color: var(--text);
		}
  }
</style>
