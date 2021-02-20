<!--
Custom home page based on Vuepress default theme home page
-->
<template>
  <main
    class="home"
    aria-labelledby="main-title"
  >
    <header class="hero">
      <img
        v-if="data.heroImage"
        :src="$withBase(data.heroImage)"
        :alt="data.heroAlt || 'hero'"
      >

      <h1
        v-if="data.heroText !== null"
        id="main-title"
      >
        {{ data.heroText || $title || 'Hello' }}
      </h1>

      <p
        v-if="data.tagline !== null"
        class="description"
      >
        {{ data.tagline || $description || 'Welcome to your VuePress site' }}
      </p>

      <p
        v-if="data.actionText && data.actionLink"
        class="action"
      >
        <NavLink
          class="action-button"
          :item="actionLink"
        />
      </p>

      <!-- Download on the App Store button -->
      <p class="action">
        <!--<a href="https://apps.apple.com/app/paperback-manga-reader/id1519509781"> 
          <img
            :src="'/assets/AppStore/AppStore_' + data.lang + '_White.svg'"
            alt="Download on the App Store"
            class="darkrendered"
          > 
          <img
            :src="'/assets/AppStore/AppStore_' + data.lang + '_Black.svg'"
            :alt="data.buttonDownload"
            class="lightrendered"
          >   
        </a>-->
        <a href="https://testflight.apple.com/join/DPmSzDEL"> 
          <img
            :src="'/assets/AppStore/AppStore_' + data.lang + '_White.svg'"
            alt="Download on the App Store"
            class="darkrendered"
          > 
          <img
            :src="'/assets/AppStore/AppStore_' + data.lang + '_Black.svg'"
            :alt="data.buttonDownload"
            class="lightrendered"
          >   
        </a>
       
        <!-- User guide button -->
        <!-- RouterLink is used by the NavLink component --> 
        <RouterLink
          class="nav-link action-button action-button__Guides"
          to="help/guides/getting-started/"
          @focusout.native="focusoutAction"
        >
          {{ data.buttonGuides }}
          <i class="el-icon-notebook-2"></i>
        </RouterLink>
			</p>

    </header>

    <div
      v-if="data.features && data.features.length"
      class="features"
    >
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

    <!-- Footer -->
    <div
      v-if="data.footer"
      class="footer"
    >
      {{ data.footer }} | <a href="/privacy_policy/"> {{ data.privacy }}</a>
    </div>
  </main>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue'

export default {
  name: 'PaperbackHome',
  
  components: { NavLink },

  computed: {
    data () {
      return this.$page.frontmatter
    },

    actionLink () {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
    }
  },
}
</script>

<style lang="stylus">
// In dark mode use the white App Store badge 
.yuu-theme-dark
  .home
    .hero
      a
        .darkrendered
          display inline-block
        .lightrendered
          display none
// In light mode use the black App Store badge
.home
  .hero
    a
      .darkrendered
        display none
      .lightrendered
        display inline-block

.home
  padding $navbarHeight 2rem 0
  max-width $homePageWidth
  margin 0px auto
  display block
  .hero
    a
      display inline-block
      img
        // App Store badge
        height 3.7rem
        margin-top 0px
        margin-bottom 5px   // Use the same margin-botton on the badge and the buttons
        vertical-align middle
      .action-button
        border-radius 10px  // Match the button with the App Store badge
    text-align center
    img
      max-width: 100%
      max-height 280px
      display block
      margin 3rem auto 1.5rem
    h1
      font-size 3rem
    h1, .description, .action
      margin 1.8rem auto
    .description
      max-width 35rem
      font-size 1.6rem
      line-height 1.3
      color lighten($textColor, 40%)
    .action-button
      // Align the text inside the button and make it the same size as the badge
      height 3.7rem
      width 11.069rem
      display inline-flex
      align-items center
      justify-content center
      margin-bottom 5px
      //display inline-block
      font-size 1.2rem
      color #fff
      //background-color $accentColor
      padding 0.8rem 1.4rem
      border-radius 11px
      transition background-color .1s ease
      box-sizing border-box
      i
        // Add a space between the text and the Element icon in buttons
        margin-left 3px

      // Removed from the default template to not override Yuu colors
      //border-bottom 1px solid darken($accentColor, 10%)
      //&:hover
      //  background-color lighten($accentColor, 10%)

      margin-right 0.1rem
      margin-left 0.1rem
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
  .footer
    padding 2.5rem
    border-top 1px solid $borderColor
    text-align center
    color lighten($textColor, 25%)
    a
      // Use the same weight as the footer and not the font-weight 500 of a a elements
      font-weight initial

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
      a
      img
        img
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
