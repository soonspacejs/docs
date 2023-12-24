<template>
	<div class="docs-table">
		<BaseTable :head="head" :data="data" />
	</div>
</template>

<script>
import BaseTable from "../Base/Table.vue";
export default {
	name: "docs-table",
	components: {
		BaseTable,
	},
	data() {
		return {
			head: [
				{ title: "属性", key: "prop" },
				{ title: "描述", key: "desc" },
				{ title: "类型", key: "type" },
				{ title: "必填", key: "require" },
				{ title: "默认值", key: "default" },
			],
		};
	},
	props: {
		data: Array,
	},
};
</script>

<style lang="stylus">
.docs-table
  td
    word-break keep-all
    white-space pre-wrap

</style>
