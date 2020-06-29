<!--
Create a coma separated list of name of sources from the repo.
The component get the sources from the `versioning.json` file of the repo.
The url argument must be of the form "https://paperback-ios.github.io/extensions" without a trailing slash.
-->

<template>
	<div>
		<span v-for="extension in extensions"
		:id="extension.name"
		:key="extension.id"
		class="anchor"
		>
			<span v-if="extension.id == last_id.id">
				{{extension.name}}
			</span>
			<span v-else>
				{{extension.name}},
			</span>
		</span>

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
		iconUrl(extension_id, file_name) {
			//https://paperback-ios.github.io/extensions/${extension_id}/includes/${file_name}
			return this.$props.url + "/" + extension_id + "/includes/" + file_name;
		},

	},

};
</script>
