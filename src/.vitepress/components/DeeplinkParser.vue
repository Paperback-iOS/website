<!--
Redirect to the url scheme paperback://addRepo?displayName=name&url=url
The url argument must point to the webpage hosting the `versioning.json` file and must not have a trailing slash EX:https://paperback-ios.github.io/extensions.
-->

<template>
	<div id="status">
		{{status}}
	</div>
</template>

<script>

export default {
	data() {
		return {
			status: "Please wait"
		}
	},
	beforeMount() {
		const urlParams = new URLSearchParams(window.location.search);
		const name = urlParams.get('name');
		const url = urlParams.get('url');
		console.log(window.location)
		if (name && url) {
			const deeplink = this.constructDeeplink(name, url)
        	window.location.replace(deeplink)
			this.$data.status = "Opening Paperback"
		} else {
			this.$data.status = "Invalid query parameters"
		}
	},
	methods: {
		constructDeeplink(name, url) {
			return (
				"paperback://addRepo?displayName=" +
				encodeURI(name) +
				"&url=" +
				encodeURIComponent(url)
			);
		},
	}
};
</script>
