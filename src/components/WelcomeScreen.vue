<template lang="html">
	<section class="welcome-screen">
		<div class="welcome-screen__texts">
			<h1 class="welcome-screen__title">
				WARTHS' STREAM SETLIST
			</h1>
			<p class="welcome-screen__comment">
				Have a look, who know...<br>You may find something you like.
			</p>
		</div>

		<div class="welcome-screen__scrolldown">
			<div class="scrolldown__text">
				See for yourself
			</div>
			<div class="scrolldown__logo">
				<img
					src="../assets/images/scrolldown/static.svg"
					aria-hidden="true"
					class="scrolldown__static"
				>
				<img
					src="../assets/images/scrolldown/moving.svg"
					aria-hidden="true"
					class="scrolldown__moving"
				>
			</div>
		</div>
	</section>
</template>

<script lang="js">

export default {
	name: 'WelcomeScreen',
	props: [],
	data () {
		return {

		};
	}
};


</script>

<style lang="scss">
	@import '../assets/scss/variables.scss';

  .welcome-screen {
		height: 100vh;
		min-height: 500px;
		background-color: $primary;
		display: flex;
		flex-direction: column;

		&__texts {
			top: 50%;
			position: relative;
			transform: translateY(-50%);
		}

		&__title,
		&__comment{
			text-align: center;
		}

		&__title {
			color: white;
			font-size: 3.5rem;
			font-family: 'Poller One', Arial, Helvetica, sans-serif;
		}

		&__comment {
			font-size: 1.2rem;
			color: #f4f4f4;
		}

		&__scrolldown {
			margin: auto auto 1em;
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.scrolldown {
			&__moving {
				position: absolute;
				left: 50%;
				top: 10%;

				animation: scrolldown 2.5s ease-in-out infinite;
			}

			&__text {
				color: #f4f4f4;
				padding: .5em;
			}

			&__logo {
				position: relative;
			}

			@keyframes scrolldown {
				0% {
					opacity: 0;
					transform: translate(-50%, 0%);
				}
				70% {
					opacity: 1;
				}
				90% {
					opacity: 0;
					transform: translate(-50%, 100%);
				}
				100% {
					opacity: 0;
					transform: translate(-50%, 100%);
				}
			}
		}
  }
</style>
