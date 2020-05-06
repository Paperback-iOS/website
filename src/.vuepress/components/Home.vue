<template>
<main aria-labelledby="main-title" class="home">
	<div class="wrapper">
		<div class="nested-wrapper1">
			<div class="1">
				<img v-if="data.previewImage" :src="$withBase(data.previewImage)" :alt="data.heroAlt || 'hero'">
			</div>
		</div>
		<div class="nested-wrapper2">
			<div class="2 head">
				<img v-if="data.heroImage" :src="$withBase(data.heroImage)" :alt="data.heroAlt || 'hero'">
				<h1 v-if="data.heroText !== null" id="main-title">{{ data.heroText || $title || 'Hello' }}</h1>
			</div>
			<div class="3 desc">
				<p v-if="data.tagline !== null" class="main-description">{{ data.tagline || $description || 'Welcome to your VuePress site' }}</p><p v-if="data.actionText && data.actionLink" class="action">
				<div class="hero"><NavLink class="action-button" :item="actionLink"/></div>
				</p>
			</div>
		</div>
	</div>
</main>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue'

export default {
	name: 'Home',

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
	}
}
</script>

<style lang="stylus" scoped>
body
    text-align center

.wrapper
	display flex
	position relative

.nested-wrapper1
	display flex
	width 65%
	& > [class='1']
		flex 1
		padding 1em
		img
			filter brightness(75%)
			max-width 100%

.nested-wrapper2
    width 35%
    & > [class='2']
        padding 1em
		.head
			padding-top 10rem
			text-align center
			img
				max-height 8rem
				max-height calc(64px + 6vw)
			h1
				font-size 3rem
				font-size calc(32px + 1vw)
				margin 2px 4px 10px
    & > [class='3']
        padding 1em
		.desc
			text-align center
			p
				font-size 1.2rem
				font-size calc(16px + .5vw)
				margin 2px 4px 20px
			.action
				margin-top 2rem
				&-button
					border-radius 4px
					box-sizing border-box
					color #fdfdfd
					font-size 1rem
					font-size calc(16px + .25vw)
					padding 0.8rem 1.6rem
					transition background-color .1s ease
@media only screen and (max-width: $MQNarrow)
	.wrapper
		justify-content center
		.nested-wrapper1
			display none
			width 0%
		.nested-wrapper2
			width 100%
</style>
