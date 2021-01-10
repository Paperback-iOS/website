<!--
Create a table representing an external repository.
The component gets the sources from the `versioning.json` file of the repo.
The url argument must point to the webpage hosting the `versioning.json` file and must not have a trailing slash EX:https://paperback-ios.github.io/extensions.
-->

<template>
	<table>
		<thead>
			<tr>
				<th><b>{{ name }}</b></th>
				<th class="hidden-md-and-down">{{ url }}</th>
				<th><a :href="encodedURL()">Add to Paperback</a></th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td colspan="3" class="hidden-lg-and-up"><b>{{ url }}</b></td>
			</tr>
			<tr>
				<td colspan="3">{{ description }}</td>
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
	width 100% !important
	display table
	thead
		th
			text-align left
			&:last-child
				text-align center
				max-width 100px

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
import 'element-ui/lib/theme-chalk/display.css';

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
