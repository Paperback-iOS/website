<template>
	<main class="page">
		<slot name="top"></slot>
		<Content class="theme-default-content"></Content>
		<PageEdit />
		<PageNav v-bind="{ sidebarItems }" />
		<slot name="bottom"></slot>
	</main>
</template>

<script>
import PageEdit from '@parent-theme/components/PageEdit.vue';
import PageNav from '@parent-theme/components/PageNav.vue';
import yuuConfig from '@theme/mixins/yuuConfig.js';
import themeHandler from '@theme/mixins/themeHandler.js';

export default {
	components: { PageEdit, PageNav },
	mixins: [yuuConfig, themeHandler],
	props: ['sidebarItems'],
};
</script>

<style lang="stylus">
.page {
	display: block;
	padding-bottom: 2rem;
}
</style>
