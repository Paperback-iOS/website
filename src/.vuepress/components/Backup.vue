<template>
	<span>

		<el-button type="text" @click="successDialogVisible = true">open a Table nested Dialog</el-button>


		<!-- Successful Backup Conversion Dialog -->
		<el-dialog title="Successful backup conversion" :visible.sync="successDialogVisible" center>
			<!-- Download Button -->
			<div style="text-align: center">
		  		<el-button type="primary" plain @click="downloadData">Download Paperback backup</el-button>
			</div>

			<!-- Unresolved items list -->
			<div v-if="convertedBackupData.noConverted.length != 0">
				<p>The conversion was successful but {{convertedBackupData.noConverted.length}} items could not be resolved</p>
				<el-table :data="convertedBackupData.noConverted">
					<el-table-column property="sourceId" label="Source Id" ></el-table-column>
					<el-table-column property="mangaTitle" label="Manga Title" ></el-table-column>
				</el-table>
			</div>
		</el-dialog>


		<!-- Page content -->
		<div class="custom-block warning">
			<p class="custom-block-title">Warning</p>
			<p> Recently Tachiyomi updated their backup formatting from <code>.json</code> to a <code>.gz</code>
			extension using Protocol Buffers. This tool will only work
			on the new version of backups. Legacy backups are unsupported.</p>
		</div>

		<h2 class="ui header">
			Provide a Tachiyomi <code>.gz</code> Backup
		</h2>

		<!--
			ref="upload" is used to call clearFiles()
		-->
		<el-upload
			ref="upload"
			class="upload-backup"
			drag
			action="#"
			:http-request="sendRequest"
			v-loading="loading"
		>
			<i class="el-icon-upload"></i>
			<div class="el-upload__text">Drop backup here or <em>click to upload</em></div>
			<div class="el-upload__tip" slot="tip">Upload a Tachiyomi <code>.proto.gz</code> backup</div>
		</el-upload>

		</br>

		<div class="sourcelist">

			<h2 class="ui header">
				Supported Sources
			</h2>

			<p>
				Because Tachiyomi and Paperback both work with community-created sources, the backup conversion process can only use
        		sources which both Paperback and Tachiyomi share. 
			</p>
			<p>
				Below is a list of Tachiyomi sources which this tool is able to handle.
			</p>

			<ul>
				<li>Manganelo</li>
				<li>MangaDex</li>
				<li>MangaLife</li>
				<li>Mangasee</li>
				<li>MangaReader</li>
				<li>Guya</li>
			</ul>

			<p class="subtitle">
				Additional source functionality will be added in the near future
			</p>
		</div>

	</span>
</template>

<script>
// Axios is used to make the POST request to the converter
import axios from "axios";

const remoteEndpoint = "https://convert.stormcloud.host" // Where we do send files for conversion

export default {
	data() {
		return {
			loading:false,					// Put the uploader in loading mode
			successDialogVisible: false,	// Show the Successful Backup Conversion Dialog
			convertedBackupData: {			// Will countain data of the converted backup
				filename: "",
				text: [],
				noConverted: []
				},
		};
	},
	
	methods: {
		sendRequest(data) {
			/* Send a conversion request and manage the server response */
			console.log("Sending the backup to the server");

			// First, read the file contents
			console.log("File:");
			console.log(data.file);

			var form = new FormData()
			form.append("backupFile", data.file, data.file.name)

			// Send this in for processing
			var settings = {
				"url": remoteEndpoint,
				"method": "POST",
				"timeout": 0,
				"mimeType": "multipart/form-data",
				"contentType": false,
				"processData": false,
				"data": form
			};

			console.log("Settings:")
			console.log(settings)
			
			// Show the user hs backup is being processed and prevent him from uploading a second one
			this.$data.loading = true
			
			// Send the request
			axios(settings)
				.then((response) => {
					console.log("Success")
					console.log(response);
					// Generate a filename and queue a download operation'
					let title = new Date().toDateString() + "-PaperbackConversion.json"

					// Save returned data to be able to display it from the dialog and download button
					this.$data.convertedBackupData.filename = title
					this.$data.convertedBackupData.text = response.data.paperbackBackup
					this.$data.convertedBackupData.noConverted = response.data.noConvert

					console.log("Filename:", this.$data.convertedBackupData.filename, "Paperback backup", this.$data.convertedBackupData.text, "Unresolved items", this.$data.convertedBackupData.noConverted)

					// Show the dialog allowing the user to download its backup
					this.$data.successDialogVisible = true

					this.$data.loading = false

				}, (error) => {
					console.log("Error")
					console.log(error.response.data)
					// Show and error alert
					this.$alert(error.response.data, 'The conversion failed', {
						confirmButtonText: 'Cancel',
						type: 'warning'
						}).then(() => {
						this.$message({
							type: 'error',
							message: 'Conversion failed'
						});    
						})
			
					this.$data.loading = false
				});

				// Remove the file from the upload list
				this.$refs.upload.clearFiles();

	},
	
 	downloadData() {
		/* Tell the browser to start a download operation on a given set of text */

		// The data is in the dictionnary convertedBackupData
		var element = document.createElement('a')
		element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(this.$data.convertedBackupData.text))
		element.setAttribute('download', this.$data.convertedBackupData.filename)

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
	text-align: center;
.el-upload-dragger
	background-color: #fbfdff;
	border: 1.2px dashed #d9d9d9;
.sourcelist
	/* Element
	background-color: #fbfdff;
	padding: 1rem;
	border: 1.2px #d9d9d9;
	border-radius: 6px;
	*/
	// Tachi
	background-color: #f0f4f8;

	border-radius: .4rem;
	margin: 1rem 0;
	padding: 0.2rem 2rem;

	h2
		//margin-top: 0px;
	.subtitle
		color: rgba(0,0,0,.4);
		font-size: .9rem;
</style>
