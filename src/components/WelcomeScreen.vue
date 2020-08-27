<template lang="html">
	<section class="welcome-screen">
		<div class="welcome-screen__texts">
			<h1 class="welcome-screen__title">
				WARTHS' STREAM SETLIST
			</h1>
			<p class="welcome-screen__comment">
				Have a look, who know...<br>You may find something you'd like.
			</p>
		</div>

		<div class="welcome-screen__scrolldown">
			<div class="scrolldown__text">
				See for yourself
			</div>

			<button
				class="scrolldown__logo"
				@click="scroll"
			>
				<svg
					width="42px"
					height="82px"
					viewBox="0 0 42 82"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
					class="scrolldown__static"
				>
					<use
						xlink:href="../assets/images/scrolldown/static.svg#el"
					/>
				</svg>
				<svg
					width="31.796"
					height="17.398"
					viewBox="0 0 31.796 17.398"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
					class="scrolldown__moving"
				>
					<use
						xlink:href="../assets/images/scrolldown/moving.svg#el"
					/>
				</svg>
			</button>
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
	},
	methods: {
		scroll() {
			document.childNodes[1].scrollTo({ top: window.innerHeight, behavior: 'smooth' });
		}
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
			color: #fffef8;
		}

		&__scrolldown {
			margin: auto auto 1em;
			display: flex;
			flex-direction: column;
			align-items: center;
			color: #fffef8;
		}

		.scrolldown {
			&__moving {
				position: absolute;
				left: 50%;
				top: 10%;

				animation: scrolldown 2.5s ease-in-out infinite;
			}

			&__text {
				padding: .5em;
			}

			&__logo {
				position: relative;
				background-color: transparent;
				color: #fffef8;
				border: none;
				padding: 0;
				border: thin solid transparent;
				border-radius: 15px;
				transition: border-color ease-in-out 300ms;

				&:active:hover,
				&:focus,
				&:hover:focus {
					padding: 0;
					border-color: #fffef8;
					outline: none;
				}

				&:hover {
					border-color: #fffef870;
				}
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
					transform: translate(-50%, 130%);
				}
				100% {
					opacity: 0;
					transform: translate(-50%, 130%);
				}
			}
		}
  }
</style>
