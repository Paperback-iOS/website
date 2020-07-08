<!--
Create a bulleted list of sources from the external repository url.
The component get the sources from the `versioning.json` file of the repo.
The url argument must be of the form "https://paperback-ios.github.io/extensions" without a trailing slash.
-->

<template>
	<div>
		<ul id="v-for-object">
			<li v-for="extension in extensions"
			:id="extension.name"
			:key="extension.id"
			>
				{{ getName(extension.name) }}
				<span v-for="tag in extension.tags"> <el-tag :type="tag.type" size="mini" effect="dark">{{ tag.text }}</el-tag> </span>
			</li>
		</ul>		
	</div>
</template>

<script>
import axios from "axios";

export default {
	props: {
		// Url of the extensions repo
		url: {
			type: String,
			required: true,
		},
	},

	data() {
		return {
			// List of available sources
			extensions: [],
		};
	},

	async beforeMount() {
		// Get the versioning.json file of the repo
		const { data } = await axios.get(this.$props.url + "/versioning.json");
		this.$data.extensions = data["sources"];
	},
	methods: {
		getName(sourceName) {
			// Return sourceName without the intext badges (18+, Country-Proof...)
			return sourceName.replace(" (18+)", "").replace(" (Country-Proof)", "").replace("[FR] ", "")
		},
	},
};
</script>

<style lang="stylus">
div
	// Left align the extensions list
	text-align left
.el-tag
	margin-left 2px
	margin-right 2px
</style>
