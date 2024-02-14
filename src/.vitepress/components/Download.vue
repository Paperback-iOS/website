<template>
	<a :href="this.$data.browserDownloadUrl || this.$data.fallbackDownloadUrl"
		><span>{{ text }}</span></a
	>
</template>

<script>
const RELEASE_URL =
	"https://api.github.com/repos/Paperback-iOS/app/releases/latest";

const LATEST_RELEASE = "https://github.com/Paperback-iOS/app/releases/latest";

export default {
	props: {
		text: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			tagName: "",
			browserDownloadUrl: "",
			fallbackDownloadUrl: "",
		};
	},
	async mounted() {
		const { data } = await fetch(RELEASE_URL);
		// Maybe eventually some release has more than the ipa in assets.
		const ipaAsset = data.assets.find((a) => a.name.includes(".ipa"));
		// Set the values.
		this.$data.tagName = data.tag_name;
		this.$data.browserDownloadUrl = ipaAsset.browser_download_url;
		// In case the release were to fail.
		this.$data.fallbackDownloadUrl = LATEST_RELEASE;
	},
};
</script>
