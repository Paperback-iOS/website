<template>
	<span>
		<a @click="dialogVisible = true" style="cursor:pointer;">{{ button }}</a>

		<el-dialog :title="title" 
		:visible.sync="dialogVisible"
		center
		:width="size">
			<img :src="src"/>
		</el-dialog>
	</span>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			required: true,
		},
		button: {
			type: String,
			required: true,
		},
		src: {
			type: String,
			required: true,
		},
	},
	data() {
		// If the sidebar is present, use width = 65% for the dialog. 
		// Else use width = 90% for a better readability on small screens
		if (screen.width > 767) {
			return {
				dialogVisible: false,
				size: "65%"
			}
		} 
		else {
			return {
				dialogVisible: false,
				size: "90%"
			}
		}
	},
  };
</script>
