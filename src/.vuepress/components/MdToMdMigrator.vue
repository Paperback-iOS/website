<!--
Allows to upload a Paperback backup and migrate MangaDex titles from legacy ids to UUIDs

The migration is done in three steps:
0	The user can upload a backup
1	The user is shown information about the backup and can start the conversion
2	Conversion process
3	The new backup can be downloaded
The variable activeStep indicates the current step
-->

<template>
	<span>

		<el-steps :active="activeStep" align-center finish-status="wait">
			<el-step title="Load backup"></el-step>
			<el-step title="Information"></el-step>
			<el-step title="Migration"></el-step>
			<el-step title="Download backup"></el-step>
		</el-steps>

		<!-- Upload a backup -->
		<div v-if="activeStep === 0">
			
			<p class="instruction">
				Provide a Paperback <code>.json</code> Backup
			</p>

			<!--
				ref="upload" is used to call clearFiles()
			-->
			<el-upload
				ref="upload"
				class="upload-backup"
				drag
				action="#"
				:http-request="submitBackup"
				v-loading="loading"
			>
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">Drop backup here or <em>click to upload</em></div>
				<div class="el-upload__tip" slot="tip">Upload a Paperback <code>.json</code> backup</div>
			</el-upload>
		</div>

		<!-- Backup information -->
		<div v-if="activeStep === 1">
			<p class="instruction">
				Backup successfully imported 
			</p>
			<p>
				The backup countains {{ backupStats.nbManga }} manga and {{ backupStats.nbChapters }} chapters.
				<br/>
				{{ backupStats.nbMangaToMigrate }} manga and {{ backupStats.nbChaptersToMigrate }} chapter legacy ids need to be migrated.
				<br/>
				Estimated convertion time: {{ Math.round(loadingTotal / 500 *10 ) / 10 }} seconds. <!-- It takes 1 second per request. We convert 500 id by request -->
			</p>
			<div class="buttonContainer">
				<el-button type="danger" plain @click="resetMigrator">Cancel</el-button>
		  		<el-button type="primary" plain @click="startMigration">Start migration</el-button>
			</div>
		</div>

		<!-- Migration -->
		<div v-if="activeStep === 2">
			<p class="instruction">
				Migrating library
			</p>
			<p>
				<!-- loadingDone is increased by 500 on each request and can thus be greater than loadingTotal, we need to round it -->
				Converted {{ Math.round(loadingDone) > loadingTotal ? loadingTotal : Math.round(loadingDone) }}/{{ loadingTotal }} ids. Please wait...
			</p>
			<el-progress :percentage="getLoadingPercentage()" :format="formatLoadingPercentage"></el-progress>
		</div>

		<!-- Downloading -->
		<div v-if="activeStep === 3">
			<p class="instruction">
				Migrated library
			</p>
			<p>
				Successful migration. Converted {{ Math.round(loadingTotal) }} ids.
				<br />
				Download your migrated backup.
			</p>
			<blockquote v-if="errorsList.length > 0">
					<p v-for="(error, index) in errorsList" :key="index" :class="error.type">{{ error.message }} </p>
			</blockquote>
			<div class="buttonContainer">
				<el-button type="danger" plain @click="resetMigrator">Cancel</el-button>
		  		<el-button type="primary" plain @click="downloadData">Download Paperback backup <i class="el-icon-download"></i></el-button>
			</div>
		</div>

	</span>
</template>

<script>
// Axios is used to make the POST request to the converter
import axios from "axios";

const REQUESTSSIZE = 500

export default {
	data() {
		return {
			activeStep: 0,
			loading:false,					// Put the uploader in loading mode

			backupJson: undefined,			// Content of the backup, format json

			backupStats: {					// Information about the backup and the process
				nbManga: 0,
				nbMangaToMigrate: 0,
				nbMigratedManga: 0,
				nbChapters: 0,
				nbChaptersToMigrate: 0,
				nbMigratedChapters: 0,
			},

			mangaAssociationDict: {},				// {mangaLegacyId: {manga:[mangaBackupIndex], chapters:[chapterBackupIndex]}}
														// mangaBackupIndex is the index of the manga in the backup
														// chapterBackupIndex is the index of the chapter in the backup
			chaptersAssociationDict: {},			// {chapterLegacyId: {chapters:[chapterBackupIndex]}}
														// chapterBackupIndex is the index of the chapter in the backup

			loadingDone: 0,							// Number of steps already done
			loadingTotal: 0,						// Number of steps to do

			backupFileName: "",						// Filename of the original backup
			
			errorsList: [],							// {type: "errorMessage", message: ""}
													// List of errors that are displayed at the end of the migration
		};
	},
	
	methods: {

		// Cancel the current migration and return to step one
		resetMigrator() {
			this.$data.activeStep = 0
			this.$data.loading = false
			this.$data.backupJson = undefined
			this.$data.backupStats = {					// Information about the backup and the process
				nbManga: 0,
				nbMangaToMigrate: 0,
				nbMigratedManga: 0,
				nbChapters: 0,
				nbChaptersToMigrate: 0,
				nbMigratedChapters: 0,
			}
			this.$data.mangaAssociationDict = {}
			this.$data.chaptersAssociationDict = {}

			this.$data.loadingDone = 0
			this.$data.loadingTotal = 0

			this.$data.backupFileName = ""

			this.errorsList = []

			// We don't need and can't reset the files list for all reset except the "invalid file format" and "unsuported backup version" errors
			//this.$refs.upload.clearFiles();
		},

		// Calculate and return the percentage of the loading indicator
		getLoadingPercentage () {
			if (this.$data.loadingTotal === 0) {
				// Prevent division by zero
				return 100
			}
			const percentage = Math.round(this.$data.loadingDone / this.$data.loadingTotal * 100)
			return percentage >= 100 ? 100 : percentage
		},

		// Return the percentage shown on the right of the loading indicator
		formatLoadingPercentage (percentage) {
			if (this.$data.loadingTotal === 0) {
				return "no items"
			}
			return `${percentage}%`
		},
		
		// Step 1 process
		// Called on backup submission
		submitBackup(data) {
			/*
				Open the backup and store it
				Identify legacy ids
				Show step 2
			 */

			console.log("Backup submitted");
			this.$data.loading = true
			this.$data.backupFileName = data.file.name

			// Check the file type of the backup
			if (data.file.type !== 'application/json') {
				this.$message({
					type: 'error',
					message: 'Invalid file format'
				});
				console.error("Migrator: Invalid file format");
				// We need to reset the migrator and remove the uploaded file from the upload object
				this.$refs.upload.clearFiles();
				this.resetMigrator()
				return
			}
			
			data.file.text().then((value) => {

				const backup = typeof value === "string" ? JSON.parse(value) : value
				this.$data.backup = backup

				// Check the backupSchemaVersion, only `backupSchemaVersion 1` is supported
				if (backup.backupSchemaVersion !== 1 ) {
					this.$message({
						type: 'error',
						message: `Unsuported backup schema version: ${backup.backupSchemaVersion}`
					});
					console.error(`Migrator: unsuported backup schema version version ${backup.backupSchemaVersion}`);
					// We need to reset the migrator and remove the uploaded file from the upload object
					this.$refs.upload.clearFiles();
					this.resetMigrator()
					return
				}

				/* Manga legacy ids identification */

				// Manga are saved in backup.sourceMangas
				// For each legacy id found, we push the index of the manga in the backup to the dictionnary mangaAssociationDict 
				// When converted, we will just need to replace all legacyId by their corresponding UUID in `backup.sourceMangas` at the position `index`
				for (const mangaBackupIndex in backup.sourceMangas) {
					const mangaObject = backup.sourceMangas[mangaBackupIndex]
					if (mangaObject.sourceId === 'MangaDex') {
						if (!mangaObject.id.includes('-')) {
      						// It is a MangaDex manga legacy id, we add it to the association dict

							// We create the object for the id if it does not exist
							if (this.$data.mangaAssociationDict[mangaObject.id] === undefined) {
								this.$data.mangaAssociationDict[mangaObject.id] = {manga: [], chapters: []}
							}

							this.$data.mangaAssociationDict[mangaObject.id].manga.push(mangaBackupIndex)
						}
					}
				}
				

				/* Chapters legacy ids identification */

				// Chapters are saved in backup.chapterMarkers
				// A chapter countains a chapterId and a mangaId that may need to be converted
				// For each legacy id found, we push the index of the manga in the backup to the dictionnaries mangaAssociationDict and chaptersAssociationDict
				// When converted, we will just need to replace all legacyId by their corresponding UUID in `backup.chapterMarkers` at the position `index`
				for (const chapterBackupIndex in backup.chapterMarkers) {
					const chapterObject = backup.chapterMarkers[chapterBackupIndex].chapter
					if (chapterObject.sourceId === 'MangaDex') {
						if (!chapterObject.mangaId.includes('-')) {
							// It is a MangaDex manga legacy id, we add it to the association dict

							// We create the object for the id if it does not exist
							if (this.$data.mangaAssociationDict[chapterObject.mangaId] === undefined) {
								this.$data.mangaAssociationDict[chapterObject.mangaId] = {manga: [], chapters: []}
							}

							this.$data.mangaAssociationDict[chapterObject.mangaId].chapters.push(chapterBackupIndex)
						}
						if (!chapterObject.id.includes('-')) {
      						// It is a MangaDex chapter legacy id, we add it to the association dict

							// We create the object for the id if it does not exist
							if (this.$data.chaptersAssociationDict[chapterObject.id] === undefined) {
								this.$data.chaptersAssociationDict[chapterObject.id] = {chapters: []}
							}

							this.$data.chaptersAssociationDict[chapterObject.id].chapters.push(chapterBackupIndex)
						}
					}
				}

				/* Stats */

				this.$data.backupStats = {
					nbManga: backup.sourceMangas.length,
					nbMangaToMigrate: Object.keys(this.$data.mangaAssociationDict).length,
					nbMigratedManga: 0,
					nbChapters: backup.chapterMarkers.length,
					nbChaptersToMigrate: Object.keys(this.$data.chaptersAssociationDict).length,
					nbMigratedChapters: 0,
				}

				this.$data.loadingTotal = this.$data.backupStats.nbMangaToMigrate + this.$data.backupStats.nbChaptersToMigrate

				console.log(`Found ${this.$data.loadingTotal} ids to migrate`)

				if (this.$data.backupStats.nbMangaToMigrate === 0) {
					console.log("No manga ids to convert")
				}
				if (this.$data.backupStats.nbChaptersToMigrate === 0) {
					console.log("No chapters ids to convert")
				}
				
				// Activate the step 1
				this.$data.activeStep = 1
			})
		},
			
		
		async getMangaUUIDs(numericIds, type = 'manga') {
			// Adapted from https://github.com/Paperback-iOS/extensions-promises/blob/master/src/MangaDex/MangaDex.ts
			// Return a dictionnary of legacy ids / UUIDs

			const requestLength = numericIds.length
			let offset = 0
			const UUIDsDict = {}

			while (true) {

				const ids = numericIds.slice(offset, offset + REQUESTSSIZE).map(x => Number(x))

				const data = {
					'type': type,
					'ids': ids
				}

				var request = {
					"url": "https://cors.paperback.workers.dev/corsproxy/?apiurl=https://api.mangadex.org/legacy/mapping",
					"method": "POST",
					"timeout": 0,
					"mimeType": "multipart/form-data",
					"contentType": 'application/json',
					"processData": false,
					"data": data
				}

				offset += REQUESTSSIZE
				
				await axios(request, {crossDomain: true})
				.then((response) => {
					console.log(`Successful request: ${type}-${offset}`)

					const json = typeof response.data === "string" ? JSON.parse(response.data) : response.data

					for (const mapping of json) {
						//console.log(`${mapping.data.attributes.legacyId} -> ${mapping.data.attributes.newId}`)
						UUIDsDict[mapping.data.attributes.legacyId] = mapping.data.attributes.newId
					}
					
				}, (error) => {
					console.error(`Migrator: failed request: ${type}-${offset}, error:`)
					console.log(error)
					this.$data.errorsList.push({type:"errorMessage", message:`ERROR: Failed request: ${type}-${offset}, see logs`})
				})		
				
				// Wait one second while updating the progress bar
				const nbLoadingStep = 50
				const loadingStepDuration = 20
				const loadingStepSize = (1/nbLoadingStep)*REQUESTSSIZE

				for (let index = 0; index < nbLoadingStep; index++) {
					await new Promise((resolve) => {
						setTimeout(resolve, loadingStepDuration);
						
					})
					this.$data.loadingDone += loadingStepSize
				}

				if (offset >= requestLength) {
					break
				}

			}
			return UUIDsDict
		},

		// Step 2 process
		// Called on "Migrate" button click
		async startMigration(){

			// Show step 2
			this.$data.activeStep = 2

			console.log("Starting migration")
			const backup = this.$data.backup

			/* Manga migration */
			
			console.log("Migrating manga ids")
			// We get the mapping legacy ids / UUIDs
			const mangaUUIDsDict = await this.getMangaUUIDs(Object.keys(this.$data.mangaAssociationDict), 'manga')
			
			// We modify ids in the manga backup
			for (const mangaLegacyId of Object.keys(this.$data.mangaAssociationDict)) {
				const mangaIndexList = this.$data.mangaAssociationDict[mangaLegacyId].manga
				const chaptersIndexList = this.$data.mangaAssociationDict[mangaLegacyId].chapters

				// Sometimes, a legacy id does not exist on MangaDex, it was probably removed
				if (mangaUUIDsDict[mangaLegacyId] !== undefined) {
					for (const mangaIndex of mangaIndexList) {
						backup.sourceMangas[mangaIndex].id = mangaUUIDsDict[mangaLegacyId]
					}
					for (const chapterIndex of chaptersIndexList) {
						backup.chapterMarkers[chapterIndex].chapter.mangaId = mangaUUIDsDict[mangaLegacyId]
					}

				} else {
					this.$data.errorsList.push({type: "infoMessage", message: `INFO: Unexisting manga id ${mangaLegacyId}, skipping`})
					console.log(`Migrator: unexisting manga id ${mangaLegacyId}, skipping`)
				}
			}
			

			
			/* Chapters migration */
			
			console.log("Migrating chapter ids")
			// We get the mapping legacy ids / UUIDs
			const chaptersUUIDsDict = await this.getMangaUUIDs(Object.keys(this.$data.chaptersAssociationDict), 'chapter')

			// We modify ids in the backup
			for (const chapterLegacyId of Object.keys(this.$data.chaptersAssociationDict)) {
				const chaptersIndexList = this.$data.chaptersAssociationDict[chapterLegacyId].chapters

				// Sometimes, a legacy id does not exist on MangaDex, it was probably removed
				if (chaptersUUIDsDict[chapterLegacyId] !== undefined) {
					for (const chapterIndex of chaptersIndexList) {
						//console.log("changed index", chapterIndex, " : ", chapterLegacyId, "==>", chaptersUUIDsDict[chapterLegacyId])
						backup.chapterMarkers[chapterIndex].chapter.id = chaptersUUIDsDict[chapterLegacyId]
					}
				} else {
					this.$data.errorsList.push({type: "infoMessage", message: `INFO: Unexisting chapter id ${chapterLegacyId}, skipping`})
					console.log(`Migrator: unexisting chapter id ${chapterLegacyId}, skipping`)
				}
			}

			/* Inject the new MangaDex source and extensions-promises repository  */

			// Add the new MangaDex source
			let newActiveSources = []

			// Only keep non MangaDex sources
			for (const i in backup.activeSources) {
				if (backup.activeSources[i].id !== 'MangaDex') {
					newActiveSources.push(backup.activeSources[i])
				}
			}

			// Add the new MangaDex source
			newActiveSources.push({
				"author": "nar1n",
				"desc": "Extension that pulls manga from MangaDex",
				"website": "https://github.com/nar1n",
				"id": "MangaDex",
				"tags": [{"text":"Recommended","type":"default"},{"text":"Notifications","type":"success"}],
				"repo": "https://paperback-ios.github.io/extensions-promises",
				"websiteBaseURL": "https://mangadex.org",
				"version": "1.0.0",
				"icon": "icon.png",
				"name": "MangaDex"
			})

			backup.activeSources = newActiveSources

			// Search if extensions-promises is in the backup
			var exist = false
			for (const i in backup.sourceRepositories) {
				if (backup.sourceRepositories[i].url === 'https://paperback-ios.github.io/extensions-promises') {
					exist = true
				}
			}
			// Add the extensions-promises repository if it is not in the backup
			if (!exist) {
				backup.sourceRepositories.push({
					"name": "[PROMISES] Additional Sources",
					"url": "https://paperback-ios.github.io/extensions-promises"
				})
			}

			// We save the new backup in this.$data.backup
 			this.$data.backup = backup
			
			console.log("Manga Migration finished")

			// We show step 3
			this.$data.activeStep = 3
		},

		// Step 3 process
		// Called when the user press the "Download" button
		downloadData() {
			/* Tell the browser to start a download operation on a given set of text */

			// The data is in the dictionnary convertedBackupData
			var element = document.createElement('a')

			element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.$data.backup)))
			element.setAttribute('download', 'Md-Migrated-' + this.$data.backupFileName)

			element.style.display = 'none'
			document.body.appendChild(element)
			element.click()
			document.body.removeChild(element)
			}
		},

};

</script>

<style lang="stylus">
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
	text-align center
.buttonContainer
	text-align center
	padding-bottom 1rem
.errorMessage
	color: $dangerColor
.infoMessage
	color $infoColor

</style>
