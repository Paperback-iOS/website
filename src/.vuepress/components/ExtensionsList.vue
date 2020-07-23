<!--
Create a coma separated list of name of sources from the repo.
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
				{{ extension.name }}
			</li>
		</ul>

	</div>
</template>

<script>
import axios from "axios";

export default {
	props: {
		url: {
			type: String,
			required: true,
		},
	},

	data() {
		return {
			extensions: [],
			last_id: "",			// id of the last source. Used to removed the last coma
		};
	},

	async beforeMount() {
		const { data } = await axios.get(this.$props.url + "/versioning.json");
		this.$data.extensions = data["sources"];
		this.$data.last_id = data["sources"][data["sources"].length - 1];
	},
methods: {
		iconUrl(extensionId, fileName) {
			//https://paperback-ios.github.io/extensions/${extension_id}/includes/${file_name}
			return this.$props.url + "/" + extensionId + "/includes/" + fileName;
		},

	},

};
</script>

<style lang="stylus">
div
	// Left align the extensions list
	text-align left
</style>
