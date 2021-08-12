<template>
	<span>

        <span v-if="canUploadBackup">
            <!-- Upload a backup -->
            <Backup-Uploader :loading="!canUploadBackup" :uploadRequestCallback="sendFile"/>
        </span>
        <span v-else>
            <!-- Display the backup -->

			<!-- Backup info and filters block -->
            <div class="guide">
				<p class="title">
					<el-button type="danger" size="mini" icon="el-icon-close" circle @click="closeBackup()"></el-button> {{ backupFilename }}
				</p>

                <span class="filters-list">
                    <ElInput v-model="filters.search" placeholder="Search..." clearable class="searchBar"/>

                    <div class="tabsOption">
                        Library tabs:
                        <ElSelect v-model="filters.tabs" placeholder="All tabs" multiple clearable>
                            <ElOption
                                v-for="(name, id) in backup.tabs"
                                :key="id"
                                :label="name"
                                :value="id"
                            />
                        </ElSelect>
                    </div>

                    <div class="sourcesOption">
                        Sources:
                        <ElSelect v-model="filters.sources" placeholder="All sources" multiple clearable>
                            <ElOption
                                v-for="(name, id) in backup.sources"
                                :key="id"
                                :label="name"
                                :value="id"
                            />
                        </ElSelect>
                    </div>

                </span>
            </div>
        </span>

		<br/>

		<!-- Backup content -->
		<div class="backupContainer">
			<span v-for="manga in filtredLibrary" :key="manga.id" @click="dialog.mangaObject = manga; dialog.visible = true" class="mangaTile">
				<Backup-MangaTile :manga="manga"/>
			</span>
		</div>
        
		<!-- Manga dialog -->
        <el-dialog v-if="dialog.visible" :title="dialog.mangaObject.titles[0]" :visible.sync="dialog.visible" center width="50%">
            <Backup-MangaPage :manga="dialog.mangaObject" :tabs="backup.tabs" :sources="backup.sources"/>
        </el-dialog>
        

	</span>
</template>

<script>

const converter = require('./bundle.js')

export default {
	data() {
		return {
			// Filter the backup content
			filters: {
				search: "",
				tabs: "",
                sources: "",
			},
			// Manga dialog
			dialog: {
				visible: false,
				mangaObject: {}		// The manga that is selected, a LightRepresentation.title object
			},
            canUploadBackup: true,	// If the uploader should be shown
			backup: {},				// A LightRepresentation.Backup object to display
			backupFilename: ""
        }
	},
	computed: {
		// Called on modification of the filters form. Return backup.library filtred accordinly.
		filtredLibrary() {
			const { backup, filters } = this

			var library = backup.library

			if (filters.search) {
				library = library.filter((manga) => 
					this.includeInTitles(manga.titles, filters.search.toLowerCase().trim())
				)
			}
			
			if (filters.tabs.length > 0) {
				// Only keep manga which have one of the requested filters.tabs
				library = library.filter((manga) => {
					for (const requestedTab of filters.tabs) {
						if (manga.tabsIds.includes(requestedTab)) {
							return true
						}
					}
					return false
				})
			}

			if (filters.sources.length > 0) {
				// Only keep manga which have one of the requested filters.tabs
				library = library.filter((manga) => {
					for (const requestedSource of filters.sources) {
						if (manga.sourcesIds.includes(requestedSource)) {
							return true
						}
					}
					return false
				})
			}
			
			return library
		},
	},
	methods: {
		// The function that will be called when a backup is submitted
        sendFile(data) {

			// Mask the uploader
            this.$data.canUploadBackup = false
			
			// Save the file name
			this.$data.backupFilename = data.file.name

			// Call the async file handler
            this.handleFile(data)
				.then( (result) => {
					console.log("Finished")
					this.$data.backup = result
            	})
				.catch((error) => {
					console.error(error)
					this.$message({
						type: 'error',
						message: error
					})
					// Show the uploader again
					this.$data.canUploadBackup = true
				})
        },

		// An async function that handle the submitted file. Return a LightRepresentation.Backup object.
        handleFile: async(data) => {

            // Check the file type of the submited file
			if (data.file.type === 'application/json') {
                // It's a paperback backup

                // We don't need to check if the backup format is supported, it done by the converter in `loadText()`
                // The converter only accept backupSchemaVersion 3

                // The convert can load a backup from a stringified JSON object
                const backupString = await data.file.text()
                
                const backupManager = new converter.PaperbackBackupManager()

				backupManager.loadText(backupString)

                return backupManager.exportLightRepresentation()

			} else if (data.file.type === 'application/x-gzip') {
                // It's a Tachiyomi backup

				const protoGzFile = await data.file.arrayBuffer()

				const backupManager = new converter.TachiyomiBackupManager()

				backupManager.loadProtoGz(protoGzFile)

                return backupManager.exportLightRepresentation()
            }
            else {
                // It's not a supported format
                throw new Error(`Unsupported file format: ${data.file.type}`)
            }


        },
        
		includeInTitles(titles, requestedSearch) {
			// Check if the string search is included in one of the titles
            // Should apply .toLowerCase().trim() to requestedSearch
			for (const title of titles) {
				console.log(title)
				if (title.toLowerCase().includes(requestedSearch)) {
					return true
				}
			}
			return false
		},

		closeBackup() {
			this.$data.backup = {}
			this.$data.dialog.visible = false
			this.$data.canUploadBackup = true
		}
	}
	
};

 

</script>

<style lang="stylus">

guide
	.title
		// Align vertically
		display: inline-flex;
		align-items: center;

.el-dialog__title
	font-weight bold

.backupContainer
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
.mangaTile
	width: 100px
	cursor: pointer
	margin-bottom: 0.5em;

.searchBar
	margin-bottom: 0.5em;
.tabsOption
	margin-bottom: 0.5em;
.sourcesOption
	margin-bottom: 0.5em;

.upload-backup
	text-align center
.el-upload-dragger
	background-color #fbfdff
	border 1.2px dashed #d9d9d9
	// Prevent the component from being to large
	width unset
	padding-left 4rem
	padding-right 4rem
.instruction
	font-size 1.65rem
	font-weight 600
	line-height 1.25
.downloadBackup
	text-align center
	padding-bottom 1rem
table
	display table
	width 100%
	table-layout auto
	.sourceID
		text-align center

</style>
