<template>
  <div>
    ToolsPanel
    <Search />
    <FilterSetting title="Categories" v-bind:names="data.facets.categories" />
    <FilterSetting title="Languages" v-bind:names="data.facets.languages" />
    <FilterSetting title="Technologies" v-bind:names="data.facets.technologies" />
  </div>
</template>

<script>
import FilterSetting from "../FilterSetting";
import Search from "../Search";

export default {
  name: "TabPanels",
  components: {
    FilterSetting,
    Search,
  },
  props: {
    panel: String,
    data: Object,
  },
};
</script>
