<template>
	<main class="home" aria-labelledby="main-title">
		<LottiePlayer
			autoplay
			src="/assets/render.json"
			speed="0.5"
			style="
				width: 100%;
				height: 1000px;
				left: 0%;
				position: absolute;
				z-index: -1;
				opacity: 0.25;
			"
		></LottiePlayer>

		<header class="hero">
			<img
				v-if="data.heroImage"
				:src="$withBase(data.heroImage)"
				:alt="data.heroAlt || 'hero'"
			/>

			<h1 v-if="data.heroText !== null" id="main-title">
				{{ data.heroText || $title || "Paperback" }}
			</h1>

			<p v-if="data.tagline !== null" class="description">
				{{
					data.tagline ||
					$description ||
					"An ad-free manga reader for iOS."
				}}
			</p>

			<p v-if="data.actionText && data.actionLink" class="action">
				<NavLink
					class="action-button action-button-getstarted"
					:item="actionLink"
				/>
			</p>
		</header>

		<div v-if="data.features && data.features.length" class="features">
			<div
				v-for="(feature, index) in data.features"
				:key="index"
				class="feature"
			>
				<h2>{{ feature.title }}</h2>
				<p>{{ feature.details }}</p>
			</div>
		</div>

		<Content class="theme-default-content custom" />
	</main>
</template>

<script>
import NavLink from "@theme/components/NavLink.vue";
import "@lottiefiles/lottie-player";

export default {
	name: "Home",

	components: { NavLink },

	computed: {
		data() {
			return this.$page.frontmatter;
		},
		actionLink() {
			return {
				link: this.data.actionLink,
				text: this.data.actionText,
			};
		},
	},
};
</script>

<style lang="stylus">
.home
  padding $navbarHeight 2rem 0
  max-width $homePageWidth
  margin 0px auto
  display block
  .hero
    text-align center
    img
      max-width: 100%
      max-height $heroImageHeight
      display block
      margin 2rem auto 1.5rem
    h1
      font-size $heroTitleSize
    h1, .description, .action
      margin 1.2rem auto
    .description
      max-width 35rem
      font-size $heroDescSize
      line-height 1.0
      color lighten($textColor, 40%)
    .action-button
      margin 0.25rem
      min-width 10rem
      display inline-block
      font-size 1rem
      color #fff
      padding 0.8rem 0rem
      border-radius 4px
      transition background-color .1s ease
      box-sizing border-box
      background-color $accentColor
      border-bottom 1px solid darken($accentColor, 10%)
      .icon.outbound
        display none
      &:hover
        background-color lighten($accentColor, 10%)
  .features
    border-top 1px solid $borderColor
    padding 1.2rem 0
    margin-top 2.5rem
    display flex
    flex-wrap wrap
    align-items flex-start
    align-content stretch
    justify-content space-between
  .feature
    flex-grow 1
    flex-basis 30%
    max-width 30%
    h2
      font-size 1.4rem
      font-weight 500
      border-bottom none
      padding-bottom 0
      color lighten($textColor, 10%)
    p
      color lighten($textColor, 25%)

@media (max-width: $MQMobile)
  .home
    .features
      flex-direction column
    .feature
      max-width 100%
      padding 0 2.5rem

@media (max-width: $MQMobileNarrow)
  .home
    padding-left 1.5rem
    padding-right 1.5rem
    .hero
      img
        max-height 210px
        margin 2rem auto 1.2rem
      h1
        font-size 2rem
      h1, .description, .action
        margin 1.2rem auto
      .description
        font-size 1.2rem
      .action-button
        font-size 1rem
        padding 0.6rem 1.2rem
    .feature
      h2
        font-size 1.25rem
</style>
