<!--
Create a bulleted list of sources from the external repository url.
The component get the sources from the `versioning.json` file of the repo.
The url argument must be of the form "https://paperback-ios.github.io/extensions" without a trailing slash.
-->

<template>
	<table>
		<thead>
			<tr>
				<th><b>{{ name }}</b></th>
				<th>{{ url }}</th>
				<th><a :href="encodedURL()">Add to Paperback</a></th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td colspan="3">
					{{ description }}
				</td>
			</tr>
			<tr>
				<td colspan="3">
					<ul id="v-for-object" class="extensionList">
						<li
							v-for="extension in extensions"
							:id="extension.name"
							:key="extension.id"
						>
						
							<ElTooltip placement="bottom" v-if="extension.tags.length > 0">
								<template #content>
									<div>
										<span
											v-for="tag in extension.tags"
											:key="tag.text"
										>
											<el-tag
												:type="tag.type"
												size="mini"
												effect="dark"
											>
												{{ tag.text }}
											</el-tag>
										</span>
									</div>
								</template>
								<span><b>•</b> {{ getName(extension.name) }}</span>
							</ElTooltip>
							<span v-else><b>•</b> {{ getName(extension.name) }}</span>
						</li>
					</ul>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<style lang="stylus" scoped>
table
	width 100%
	display table
	thead
		th
			text-align left
			&:last-child
				text-align center

.extensionList
	padding 0
	margin 0
	li
		display inline-block
		vertical-align top
		padding-right 10px
		p
			margin 0

span
	margin-right 5px
	&:last-child
		margin-right 0
</style>

<script>
import axios from "axios";

export default {
	props: {
		// Url of the extensions repo
		url: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		description: {
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
			return sourceName.replace(/[[|(][^(|[]+[\]|)]/g, "").trim();
		},
		encodedURL() {
			return (
				"paperback://addRepo?displayName=" +
				encodeURI(this.$props.name) +
				"&url=" +
				encodeURI(this.$props.url)
			);
		},
	},
};
</script>
