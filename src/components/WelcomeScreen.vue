<template lang="html">
	<section
		v-if="!isScrolled"
		ref="root"
		class="welcome-screen"
		:class="{'scrolling': isScrolling}"
		@transitionend="focusOut"
	>
		<div class="welcome-screen__texts">
			<h1 class="welcome-screen__title">
				WART<span class="fliker">H</span>S' STREAM SE<span class="fliker">T</span>LI<span class="fliker">S</span>T
			</h1>
			<p class="welcome-screen__comment">
				{{ $t('welcome.message.part1') }}<br>{{ $t('welcome.message.part2') }}
			</p>
		</div>

		<div class="welcome-screen__scrolldown">
			<div class="scrolldown__text">
				{{ $t('welcome.see') }}
			</div>

			<button
				class="scrolldown__logo"
				@click="scroll"
			>
				<img
					svg-inline
					class="scrolldown__static"
					src="@/assets/images/scrolldown/static.svg"
					aria-hidden="true"
				>
				<img
					svg-inline
					class="scrolldown__moving"
					src="@/assets/images/scrolldown/moving.svg"
					aria-hidden="true"
				>
				<div class="sr-only">
					{{ $t('welcome.scrolldown') }}
				</div>
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
			isScrolled: false,
			isScrolling: false
		};
	},
	mounted() {
		document.addEventListener('scroll', this.scroll, { once: true });
	},
	methods: {
		scroll() {
			// trigger animation
			this.isScrolling = true;
			// reset scroll to top
			document.childNodes[1].scrollTo({ top: 0 });

			// after animation
			this.$refs.root.addEventListener('animationend', e => {
				// check if the animation that ended is the on scroll one
				if (e.animationName === 'scroll') {
					// emit the new value for the visibility flag
					this.$emit('visible', false);
					// update internal flags relative to the scroll animation
					this.$nextTick(() => {
						this.isScrolled = true;
						this.isScrolling = false;
					});
				}
			});
		},
		// check if the root element lost :focus-within and scroll
		focusOut(e) {
			if (e.target == this.$refs.root) {
				this.scroll();
			}
		}
	}
};

</script>

<style lang="scss">
  .welcome-screen {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		height: 100vh;
		min-height: 670px;
		display: flex;
		flex-direction: column;
		background-image: var(--bg-gradient);
		z-index: 1000;

		// this is used to know when the focus escape the welcome screen
		outline-width: 0;
		outline-color: #0000;
		transition: outline-color 1ms linear;

		&:focus-within{
			outline-color: #1111;
			transition: none;
		}
		// end of the focus tracking

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

		&.scrolling {
			animation: cubic-bezier(.46,.03,.52,.96) 500ms scroll 1 forwards;
		}

		@keyframes scroll {
			0% {
				transform: translateY(0vh);
			}
			100% {
				transform: translateY(-100vh);
			}
		}
  }
</style>
