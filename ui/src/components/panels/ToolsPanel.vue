<template>
  <div>
    <Search />
    <FilterSetting title="Categories" v-bind:names="data.facets.categories" />
    <FilterSetting title="Languages" v-bind:names="data.facets.languages" />
    <FilterSetting title="Technologies" v-bind:names="data.facets.technologies" />
    <ResourceCardList title="Resources" v-bind:resources="data.repositories" />

  </div>
</template>

<script>
import FilterSetting from "../FilterSetting";
import Search from "../Search";
import ResourceCardList from "../ResourceCardList";

export default {
  name: "TabPanels",
  components: {
    FilterSetting,
    Search,
    ResourceCardList
  },
  props: {
    panel: String,
    data: Object,
  },
};
</script>
