<!--
Redirect to the url scheme paperback://addRepo/?displayName=displayName&url=url
The url argument must point to the webpage hosting the `versioning.json` file and must not have a trailing slash e.g. https://paperback-ios.github.io/extensions/main.
-->

<template>
	<div class="succes" v-if="statusSuccess">
		<h1>Adding the Repository</h1>
		<section>
			<p>The repository is being added to your Paperback app.</p>
			<p>You will be redirected to it in just a moment...</p>
		</section>
	</div>
	<div class="error" v-else>
		<h1>Failed to Add the Repository</h1>
		<section>
			<p>Invalid query parameters.</p>
			<p>
				More info regarding this issue can be found
				<a
					href="https://github.com/Paperback-iOS/website/tree/master/src/addRepo/index.md"
					>here</a
				>.
			</p>
		</section>
	</div>
</template>

<script>
export default {
	data() {
		return {
			statusSuccess: false
		};
	},

	beforeMount() {
		const urlParams = new URLSearchParams(window.location.search);
		const name = urlParams.get('name');
		const url = urlParams.get('url');

		if (name && url) {
			this.$data.statusSuccess = true;
			const deeplink = this.constructDeeplink(name, url);
			window.location.replace(deeplink);
		}
	},

	methods: {
		constructDeeplink(name, url) {
			return (
				'paperback://addRepo?displayName=' +
				encodeURI(name) +
				'&url=' +
				encodeURIComponent(url)
			);
		}
	}
};
</script>
