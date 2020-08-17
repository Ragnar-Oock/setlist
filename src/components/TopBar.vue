<template lang="html">
	<section
		class="top-bar"
	>
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
	}
};


</script>

<style scoped lang="scss">
  .top-bar {
		background-color: #253f55;
		position: sticky;
		top: 0;
		height: 3em;
		z-index: 15;
		display: flex;
		align-items: center;
	}
</style>
