<template lang="html">
	<section class="rules-page">
		<article
			class="rules-page__article"
			tabindex="0"
		>
			<h3 class="rules-page__title">
				Les regles
			</h3>
			<ul class="rules-page__list">
				<li class="rules-page__item">
					Les requests standards sont <strong>jouées aléatoirement</strong> et les requests VIP sont <strong>jouées dans l'ordre</strong>.
				</li>
				<li class="rules-page__item">
					On peut vous demander de <strong>changer votre request</strong> pour diverses raisons (musique deja jouée durant le stream, accordage trop contraignant, lien mort, mauvaise partition, diffulté trop élevée...)
				</li>
				<li class="rules-page__item">
					Si vous êtes absent trop longtemps, votre request est <strong>automatiquement retirée</strong> de la playlist.
				</li>
				<li class="rules-page__item">
					La request d'une musique suppose l'acceptation des règles. Le non respect des regles entrainera le <strong>bloquage de la request</strong>. Tous manquements répétés à celles-ci entrainera des <strong>sanction à la discrétion des moderateurs</strong> (bannissement des requests, bannissement temporaire ou definitif du chat...).
				</li>
			</ul>
		</article>

		<article
			class="rules-page__article"
			tabindex="0"
		>
			<h3 class="rules-page__title">
				Comment demander une musique
			</h3>
			<p>
				Toutes les commandes utilisent la meme structure un point d'exclamation <code>!</code>, suivit du nom de la commande puis du <code>titre</code> et de l'<code>artiste</code> de la musique.
			</p>
			<ul class="rules-page__list">
				<li class="rules-page__item">
					Ajouter une musique à la playlist :<br>
					<code>!sr titre - artiste</code>
				</li>
				<li class="rules-page__item">
					Modifier sa request :<br>
					<code>!edit titre - artiste</code>
				</li>
				<li class="rules-page__item">
					Effectuer une request prioritaire (VIP) :<br>
					<code>!vip titre - artiste</code>
				</li>
				<li class="rules-page__item">
					Modifier sa request prioritaire (VIP) :<br>
					<code>!vipedit titre - artiste</code>
				</li>
			</ul>
		</article>
	</section>
</template>

<script lang="js">

export default {
	name: 'RulesPage',
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

<style lang="scss">
	@import '../assets/scss/variables.scss';

  .rules-page {
		padding: 3em 0;
		line-height: 1.4;
		margin: 0 auto;

		&__title {
			padding: 0.5em 0 .75em;
			font-weight: bold;
		}
		&__article {
			max-width: 60ch;
			margin: 1em auto;
			background-color: var(--filler-1);
			color: var(--text);
			border-radius: 5px;
			padding: 2em 3em;
			transition: 300ms ease-in-out;
			transition-property: box-shadow, background-color, color;

			&:focus {
				outline: none;
				box-shadow: 0 0 5px 1px #0003;
			}
		}
		&__item{
			padding: .25em 0;

			&::before {
				content: '-';
				font-weight: bold;
				padding: 0 .5em;
			}
		}

		code {
			background-color: #00000020;
			border-radius: 5px;
			border: thin solid #00000033;
		}
  }
</style>
