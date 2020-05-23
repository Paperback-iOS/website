<template>
	<span>
        <a @click="dialogVisible = true" style="cursor:pointer;">{{ button }}</a>

		<el-dialog :title="title" 
		:visible.sync="dialogVisible"
		center
		width="65%">
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
      return {
        dialogVisible: false,
      };
    }
  };
</script>
