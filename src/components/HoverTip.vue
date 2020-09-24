<template functional>
	<div class="hover-tip">
		<div
			class="hover-tip__nob"
			tabindex="0"
		>
			<span class="sr-only">aide</span>
		</div>
		<div class="hover-tip__tip">
			<slot />
		</div>
	</div>
</template>

<script lang="js">

export default {
	name: 'HoverTip'
};


</script>

<style lang="scss">
  .hover-tip {
		display: inline-block;
		position: relative;
		z-index: 15;
		width: 1em;
		&__nob {
			width: 1em;
			height: 1em;
			border-radius: 50%;
			background-color: var(--filler-1);
			transition: background-color 200ms ease-in-out;

			&:focus {
				outline: none;
			}

			&::before {
				content: '?';
				width: 100%;
				height: 100%;
				display: block;
				color: var(--text);
				text-align: center;
				transition: color 200ms ease-in-out;
			}
		}

		&__tip {
			position: absolute;
			left: -1000vw;
			opacity: 0;
			width: max-content;
			max-width: 25ch;
			transform: translate(-50%, 1em);
			text-align: center;
			background-color: var(--filler-1);
			padding: .25em .5em;
			color: var(--text);
			box-shadow: var(--shadow);
			border-radius: 5px;
			transition: opacity 200ms ease-in-out, transform 200ms ease-out, left 0s 200ms linear;

			&::before {
				content: '';
				display: block;
				position: absolute;
				width: .5em;
				height: .5em;
				background-color: var(--filler-1);
				left: 50%;
				transform: translate(-50%, -100%) rotate(45deg);
			}
		}

		&__nob:hover + &__tip,
		&__nob:focus + &__tip,
		&__tip:hover,
		&__tip:focus {
			left: 50%;
			opacity: 1;
			transform: translate(-50%, .2em);
			transition: opacity 200ms ease-in-out, transform 200ms ease-out, left 0s 0s linear;

		}
  }
</style>
