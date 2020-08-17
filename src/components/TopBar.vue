<template lang="html">
	<section class="top-bar">
		<h1>top-bar Component</h1>
	</section>
</template>

<script lang="js">

export default {
	name: 'TopBar',
	props: [],
	data () {
		return {

		};
	},
	computed: {

	},
	methods: {

	}
};


</script>

<style scoped lang="scss">
  .top-bar {
		background-color: #253f55;
		padding: 1.5em 0;
		position: sticky;
		top: 0;
  }
</style>
