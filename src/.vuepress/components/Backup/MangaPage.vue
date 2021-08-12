<template>
	<span>
        <div class="mangaPage">
            <Backup-MangaCover :src="manga.cover"/>

			<div class="block info">
				<p class="title">
					<b>{{ manga.titles[0] }}</b><span v-for="title in manga.titles.slice(1)" :key="title">, {{ title }}</span>
                </p>
				<p class="author" v-if="manga.author"><span class="light">Author:</span> {{ manga.author }}</p>
				<p class="artist" v-if="manga.artist"><span class="light">Artist:</span> {{ manga.artist }}</p>
				<div class="hentai" v-if="manga.hentai">
					<el-tag size="mini" type="danger">18+ title</el-tag>
					<el-tooltip placement="right">
						<div slot="content">By default 18+ titles are not shown in the library.<br/>Adjust <a href="/help/faq/#adjust-content-settings">content settings</a> to change this behaviour.</div>
						<i class="el-icon-info"></i>
					</el-tooltip>
				</div>
				<!-- Paperback id, useless {{ libraryMangaObject.manga.id }} -->
			</div>
                    
			<div class="block desc">
				<p class="light">Description:</p>
				<!--<br/>-->
				{{ manga.description }}
			</div>

			<div class="block libraryTabs" v-if="manga.tabsIds.length">
				<p class="light">Library tabs:</p>
				<el-tag v-for="tabId in manga.tabsIds" :key="tabId" class="tab" size="medium" type="info" effect="plain"> {{ tabs[tabId] }} </el-tag>
			</div>
			<div class="block sources" v-if="manga.sourcesIds.length">
				<p class="light">Available in sources: </p>
				<el-tag v-for="sourceId in manga.sourcesIds" :key="sourceId" class="tab" size="medium" type="info" effect="plain"> {{ sources[sourceId] ? sources[sourceId] : 'id: ' + sourceId }} </el-tag>
			</div>
        </div>
            
            <!--
                Titles
                Authors
                Artists
                Tags
                Sources
                Ids
                -->
			<!-- Download Button 
			<div class="downloadBackup">
		  		<el-button type="primary" plain @click="downloadData">Download Paperback backup <i class="el-icon-download"></i></el-button>
			</div>

			<!-Unresolved items list 
			<div v-if="convertedBackupData.noConverted.length != 0">
				<p>The conversion was successful but {{convertedBackupData.noConverted.length}} items could not be resolved</p>
				<table>
					<thead>
						<tr>
							<th>Source Id</th>
							<th>Manga Title</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in convertedBackupData.noConverted" :key="item.sourceId">
							<td class="sourceID">{{item.sourceId}}</td>
							<td>{{item.mangaTitle}}</td>
						</tr>
					</tbody>
			</table>
			</div>
            -->

	</span>
</template>

<script> 


export default {
    props: {
		manga: {
			required: true,
		},
		tabs: {
			required: true,
		},
		sources: {
			required: true,
		}

	},
};

 

</script>

<style lang="stylus">



.mangaPage
	display grid
	grid-template-columns 100px auto
	grid-template-rows auto auto auto
	grid-gap 10px
	/* By default el-dialog use word-break: break-all; */
	overflow-wrap break-word
	word-break initial

.block p
	margin 0

.cover
	grid-column 1
	grid-row 1



.info
	grid-row 1
	grid-column 2
	//max-width: 60%;

.desc
	grid-column-start 1
	grid-column-end 3
	grid-row 2

.libraryTabs
	grid-column-start 1
	grid-column-end 3
	grid-row 3
	.tab
		margin-right: 5px;

.sources
	grid-column-start 1
	grid-column-end 3
	grid-row 4
	.tab
		margin-right: 5px;

/*
.title
	font-weight bold
*/

.light
	//color: grey
	font-weight lighter
</style>
