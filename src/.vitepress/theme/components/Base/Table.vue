<template>
  <table class="base-table">
    <thead>
      <th v-for="i in head" :key="i.key">{{ i.title }}</th>
    </thead>
    <tbody>
      <tr v-for="(i, index) in data" :key="index">
        <td v-for="j in head" :key="j.key">
          <a v-if="i.link && j.key === 'type'" :href="i.link">{{ i[j.key] }}</a>
          <template v-else-if="j.key === 'require'">
            <Base-RequireIcon :isRequire="i[j.key]"/>
          </template>
          <template v-else>{{ i[j.key] }}</template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "base-table",
  props: {
    head: Array,
    data: Array,
  },
};
</script>

<style lang="stylus" scoped>
.base-table {
  border-spacing: 0;
  empty-cells: show;
  width: 100%;
  font-size: 14px;
  line-height: 1.5;
  font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace;
  border: none;
  margin: 1em 0 0 0;

  th {
    white-space: nowrap;
    color: #5c6b77;
    font-weight: 500;
    background: rgba(0, 0, 0, 0.02);
    text-align: left;
    padding: 14px 16px;
    border: none;
    border-bottom: 2px solid #ebedf0;
  }

  td {
    border: 1px solid #ebedf0;
    text-align: left;
    padding: 8px 12px;
    border-width: 1px 0;
    border-color: #e8e8e8;
  }
}
</style>