<template>
	<span>

		<!-- Successful Backup Conversion Dialog -->
		<el-dialog title="Successful backup conversion" :visible.sync="successDialogVisible" center width="80%">
			<!-- Download Button -->
			<div class="downloadBackup">
		  		<el-button type="primary" plain @click="downloadData">Download the {{ conversionResult.type }} backup <i class="el-icon-download"></i></el-button>
			</div>

			<!-- Unresolved items list -->
			<div v-if="conversionResult.unconverted.length > 0">
				<p>The conversion was successful but {{ conversionResult.unconverted.length }} items could not be resolved</p>
				<table>
					<thead>
						<tr>
							<th>Source Id</th>
							<th>Manga Title</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in conversionResult.unconverted" :key="item.sourceId + '-' + item.mangaId">
							<td class="sourceId">{{ item.sourceId }}</td>
							<td>{{ item.mangaTitle }} <span class="mangaId">- {{ item.mangaId }}</span></td>
						</tr>
					</tbody>
			</table>
			</div>
		</el-dialog>

		<!-- Page content -->
		<p class="instruction">
			Provide a backup
		</p>

		<Backup-Uploader :loading="loading" :uploadRequestCallback="sendFile"/>

		<div class="guide">
			<p class="title">Supported Sources</p>

			Because Tachiyomi and Paperback both work with community-created sources, the backup conversion process can only use sources which both Paperback and Tachiyomi share.
			<br/><br/>
			Below is a list of sources which this tool is able to handle.<br/>

			<ul>
				<li v-for="converterName in converterNames" :key="converterName"> {{ converterName }} </li>
			</ul>

			<div class="custom-block aside">
				<p>
					Contact us if you need additional sources support.
				</p>
			</div>
		</div>

	</span>
</template>

<script>

const converter = require('./backupConverter.js')

export default {
	data() {
		return {
			converterNames: converter.getConversionSourcesNames(),
			loading: false,					// Put the uploader in loading mode
			successDialogVisible: false,	// Show the Successful Backup Conversion Dialog
			conversionResult: {
				type: "Paperback",			// Type of the converted backup
				unconverted: [],			// List of unconverted titles
				filename: "",				// the filename of the converted backup
				backupData: null			// The data of the converted backup, can be a string or a Uint8Array/Buffer
			},
		}
	},
	
	methods: {
		// The function that will be called when a backup is submitted
        sendFile(data) {

			// Block the uploader
            this.$data.loading = true

			// Call the async file handler
            this.handleFile(data)
				.then( (conversionResult) => {
					// Save the result, it will be used by the dialog to show unconverted titles and by the downloader to access the backup
					this.$data.conversionResult = conversionResult

					// Show the dialog allowing the user to download its backup
					this.$data.successDialogVisible = true

					// Allow the user to upload an other backup
					this.$data.loading = false
            	})
				.catch((error) => {
					console.error(error)
					this.$message({
						type: 'error',
						message: error
					})
					// Show the uploader again
					this.$data.loading = false
				})
        },

		// An async function that handle the submitted file. Return an object used for `$data.conversionResult`
        handleFile: async(data) => {

            // Check the file type of the submited file
			if (data.file.type === 'application/json') {
                // It's a paperback backup

				const filename = data.file.name.replace(".json", "-TachiyomiConversion.proto.gz")

                // We don't need to check if the backup format is supported, it done by the converter in `loadText()`
                // The converter only accept backupSchemaVersion 3

				// Get the content of the file as a string
                const backupString = await data.file.text()
                
				// Transform this string into a PaperbackBackup.Backup object
                const backupManager = new converter.PaperbackBackupManager()
				backupManager.loadText(backupString)
				const paperbackBackup = backupManager.exportBackup()

				// Convert the backup object
				const conversionManager = new converter.PaperToTachiBackupConverter(paperbackBackup) // The converter needs a PaperbackBackup.Backup object
				const conversionResult = await conversionManager.conversion()
				
				// Encode and gzip the converted Tachiyomi backup
				const tachiyomiBackup = conversionResult.backupObject
				const tachiyomiBackupManager = new converter.TachiyomiBackupManager()
				tachiyomiBackupManager.loadBackup(tachiyomiBackup)

                return {
					type: "Tachiyomi",
					unconverted: conversionResult.unconverted,
					filename: filename,
					backupData: tachiyomiBackupManager.exportProtoGz()	// backupData is an encoded, gziped, .proto.gz Buffer
				}

			} else if (data.file.type === 'application/x-gzip') {
                // It's a Tachiyomi backup

				let filename = data.file.name.replace(".proto.gz", "-PaperbackConversion.json")

				// Get the content of the file as a Buffer
				const protoGzFile = await data.file.arrayBuffer()

				// Inflate and decode the Tachiyomi backup into a TachiyomiModel.Backup object
				const tachiyomiBackupManager = new converter.TachiyomiBackupManager()
				tachiyomiBackupManager.loadProtoGz(protoGzFile)
				const tachiyomiBackup = tachiyomiBackupManager.exportBackup()

				// Convert the backup object
				const conversionManager = new converter.TachiToPaperBackupConverter(tachiyomiBackup) // The converter needs a TachiyomiModel.Backup object
				const conversionResult = await conversionManager.conversion()

                return  {
					type: "Paperback",
					unconverted: conversionResult.unconverted,
					filename: filename,
					backupData: JSON.stringify(conversionResult.backupObject)	// backupData is a string
				}
            }
            else {
                // It's not a supported format
                throw new Error(`Unsupported file format: ${data.file.type}`)
            }
        },
	
		downloadData() {
			if (this.$data.conversionResult.type === "Tachiyomi") {
				var blob = new Blob([this.$data.conversionResult.backupData], {type: "application/x-gzip"})
				var link = document.createElement("a")
				link.href = window.URL.createObjectURL(blob)
				link.download = this.$data.conversionResult.filename
				link.click()
			} 
			else if (this.$data.conversionResult.type === "Paperback") {
				/* Tell the browser to start a download operation on a given set of text */

				var element = document.createElement('a')

				element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(this.$data.conversionResult.backupData))
				element.setAttribute('download', this.$data.conversionResult.filename)

				element.style.display = 'none'
				document.body.appendChild(element)
				element.click()
				document.body.removeChild(element)
			} else {
				throw new Error(`Unsupported converted type: ${this.$data.conversionResult.type}`)
			}
		}
	}
}
</script>

<style scoped lang="stylus">
// Drop a backup page
.instruction
	font-size 1.65rem
	font-weight 600
	line-height 1.25
// Result dialog
.downloadBackup
	text-align center
	padding-bottom 1rem
table
	display table
	width 100%
	table-layout auto
	.sourceId
		text-align center
	.mangaId
		font-weight lighter
		font-size smaller

</style>
