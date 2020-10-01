<template lang="html">
	<section class="welcome-screen">
		<div class="welcome-screen__texts">
			<h1 class="welcome-screen__title">
				WART<span class="fliker">H</span>S' STREAM SE<span class="fliker">T</span>LI<span class="fliker">S</span>T
			</h1>
			<p class="welcome-screen__comment">
				Have a look, who knows...<br>You may find something you'd like.
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
	@import url('https://fonts.googleapis.com/css2?family=Poiret+One&display=swap');

  .welcome-screen {
		height: 100vh;
		min-height: 670px;
		display: flex;
		flex-direction: column;
		position: relative;
		background-image: var(--bg-gradient);
		overflow: hidden;

		&__texts {
			margin: auto;
		}

		&__title,
		&__comment{
			text-align: center;
		}

		&__title {
			color: white;
			font-size: 15vw;
			font-size: clamp(5rem, 15vw, 11rem);
			font-family: 'Poiret One', Arial, Helvetica, sans-serif;
			filter: drop-shadow(0 0 5px white) drop-shadow(0 0 15px rgba(255, 255, 255, 0.7));
			width: min-content;
			margin: auto;
			line-height: .85;

			.fliker:nth-child(1) {
				animation: fliker 25s -25s ease-out infinite;
			}
			.fliker:nth-child(2) {
				animation: fliker 17s -15s ease-out infinite;
			}
			.fliker:nth-child(3) {
				animation: fliker 11s -90s ease-out infinite;
			}

			@keyframes fliker {
				0% {
					opacity: .2;
				}
				.5% {
					opacity: .3;
				}
				1% {
					opacity: .2;
				}
				2.5% {
					opacity: .4;
				}
				2.75% {
					opacity: .2;
				}
				3% {
					opacity: .3;
				}
				5% {
					opacity: .2;
				}
				7.5% {
					opacity: .3;
				}
				8% {
					opacity: .1;
				}
				8.5% {
					opacity: .3;
				}
				9% {
					opacity: .2;
				}
				9.5% {
					opacity: .3;
				}
				10% {
					opacity: .2;
				}
				10.5% {
					opacity: .3;
				}
				15% {
					opacity: .1;
				}
				20% {
					opacity: .2;
				}
				20.5% {
					opacity: 1;
				}

				100% {
					opacity: 1;
				}
			}
		}

		&__comment {
			font-size: 1.2rem;
			color: var(--text);
		}

		&__scrolldown {
			display: flex;
			flex-direction: column;
			align-items: center;
			color: var(--text);
			margin-bottom: 2em;
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
				color: var(--text);
				padding: 0;
				border: 1px solid transparent;
				border-radius: 15px;
				transition: border-color ease-in-out 300ms;

				&:active,
				&:focus,
				&:hover {
					padding: 0;
					border-color: var(--text);
					outline: none;
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
