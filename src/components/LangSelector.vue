<template>
	<section class="lang-selector">
		<select v-model="$i18n.locale">
			<option
				v-for="(value, key) in supportedLocales"
				:key="key"
				:value="key"
			>
				{{ value }}
			</option>
		</select>
	</section>
</template>

<script lang="js">

import { supportedLocales } from '@/lang/supported';

export default {
	name: 'LangSelector',
	data () {
		return {
			supportedLocales
		};
	}
};


</script>

<style scoped lang="scss">
  .lang-selector {
		&__button {
			border: groove 5px lime;
		}
  }
</style>
