<template>
	<span>

		<!-- Successful Backup Conversion Dialog -->
		<el-dialog title="Successful backup conversion" :visible.sync="successDialogVisible" center width="80%">
			<!-- Download Button -->
			<div class="downloadBackup">
		  		<el-button type="primary" plain @click="downloadData">Download {{ convertedBackupData.type }} backup <i class="el-icon-download"></i></el-button>
			</div>

			<!-- Unresolved items list -->
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
		</el-dialog>

		<!-- Page content -->
		<p class="instruction">
			Provide a <!--Tachiyomi <code>.gz</code>--> Backup
		</p>

		<!--
			ref="upload" is used to call clearFiles()
		-->
		<Backup-Uploader :loading="loading" :uploadRequestCallback="sendFile"/>

	</span>
</template>

<script>

const converter = require('./bundle.js')
console.log(converter)

export default {
	data() {
		return {
			loading:false,					// Put the uploader in loading mode
			successDialogVisible: false,	// Show the Successful Backup Conversion Dialog
			convertedBackupData: {			// Will countain data of the converted backup
				filename: "",
				text: [],					// JSON countaining the converted backup
				noConverted: []
				},
				type: "Paperback"
		};
	},
	
	methods: {
		// The function that will be called when a backup is submitted
        sendFile(data) {

			// Mask the uploader
            this.$data.loading = true
			
			// Save the file name
			//this.$data.convertedBackupData.filename = data.file.name

			// Call the async file handler
            this.handleFile(data)
				.then( (res) => {
					console.log("Finished")
					console.log(result)
					const type = res[0]
					const result = res[1]
					//this.$data.backup = result

					let title = new Date().toDateString() + "-PaperbackConversion.json"

					// Save returned data to be able to display it from the dialog and download button
					this.$data.convertedBackupData.filename = title
					this.$data.convertedBackupData.text = result
					//this.$data.convertedBackupData.noConverted = response.data.noConvert

					//console.log("Filename:", this.$data.convertedBackupData.filename, "Paperback backup:", this.$data.convertedBackupData.text, "Unresolved items:", this.$data.convertedBackupData.noConverted)

					// Show the dialog allowing the user to download its backup
					this.$data.successDialogVisible = true

					this.$data.loading = false

					this.$data.convertedBackupData.type = type


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

				const paperbackBackup = backupManager.exportBackup()

				const conversionManager = new converter.PaperToTachiBackupConverter(paperbackBackup)

				const tachiyomiBackup = await conversionManager.conversion()
				
				const tachiyomiBackupManager = new converter.TachiyomiBackupManager()
				tachiyomiBackupManager.loadBackup(tachiyomiBackup)

                return ['Tachiyomi', tachiyomiBackupManager.exportProtoGz()]

			} else if (data.file.type === 'application/x-gzip') {
                // It's a Tachiyomi backup

				const protoGzFile = await data.file.arrayBuffer()

				const tachiyomiBackupManager = new converter.TachiyomiBackupManager()

				tachiyomiBackupManager.loadProtoGz(protoGzFile)

				const tachiyomiBackup = tachiyomiBackupManager.exportBackup()

				const conversionManager = new converter.TachiToPaperBackupConverter(tachiyomiBackup)

				const paperbackBackup = await conversionManager.conversion()

                return ['Paperback', paperbackBackup]
            }
            else {
                // It's not a supported format
                throw new Error(`Unsupported file format: ${data.file.type}`)
            }


        },
	
 	downloadData() {

		if (this.$data.convertedBackupData.type === 'Tachiyomi') {
			var blob = new Blob([this.$data.convertedBackupData.text], {type: "application/x-gzip"});
			var link = document.createElement("a");
			link.href = window.URL.createObjectURL(blob);
			link.download = "myFileName.proto.gz";
			link.click();
		} else {
			/* Tell the browser to start a download operation on a given set of text */

			// The data is in the dictionnary convertedBackupData
			var element = document.createElement('a')

			element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.$data.convertedBackupData.text)))
			element.setAttribute('download', this.$data.convertedBackupData.filename)

			element.style.display = 'none'
			document.body.appendChild(element)
			element.click()
			document.body.removeChild(element)
		}

		

		return
		
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
