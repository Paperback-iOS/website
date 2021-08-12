<template>
	<span>
		<Backup-MangaCover :src="manga.cover"/>

		<p class="title">{{ manga.titles[0] }}</p> <!--We should use a v-if-->
		<!--<span style="color: grey;" v-for="title in libraryMangaObject.manga.titles" :key="title">{{title}}, </span>-->
		<!--<img :src="libraryManga.manga.image">-->
	</span>
</template>

<script> 


export default {
    props: {
		manga: {
			required: true,
		},
	},
};

 

</script>

<style scoped lang="stylus">


.title
	margin: 0
	font-weight: bold
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

</style>
