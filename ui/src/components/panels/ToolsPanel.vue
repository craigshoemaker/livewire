<template>
  <div>
    ToolsPanel
    <Search />
    <FilterSetting title="Categories" v-bind:names="data.facets.categories" />
    <FilterSetting title="Languages" v-bind:names="data.facets.languages" />
    <FilterSetting title="Technologies" v-bind:names="data.facets.technologies" />
    <ResourceList title="Resources" v-bind:resources="data.repositories" />

  </div>
</template>

<script>
import FilterSetting from "../FilterSetting";
import Search from "../Search";
import ResourceList from "../ResourceList";

export default {
  name: "TabPanels",
  components: {
    FilterSetting,
    Search,
    ResourceList
  },
  props: {
    panel: String,
    data: Object,
  },
};
</script>
