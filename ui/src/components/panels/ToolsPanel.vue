<template>
  <div>
    <Search />
    <FilterSetting title="Categories" v-bind:names="categories" />
    <FilterSetting title="Languages" v-bind:names="languages" />
    <FilterSetting title="Technologies" v-bind:names="technologies" />
    <ResourceCardList title="Resources" v-bind:resources="repositories" />
  </div>
</template>

<script>
import FilterSetting from "../FilterSetting";
import Search from "../Search";
import ResourceCardList from "../ResourceCardList";
import AppDataStore from "../../stores/appDataStore.js";

export default {
  name: "TabPanels",
  components: {
    FilterSetting,
    Search,
    ResourceCardList,
  },
  props: {
    panel: String,
  },
  data() {
    return {
      categories: AppDataStore.data.facets.categories,
      languages: AppDataStore.data.facets.languages,
      technologies: AppDataStore.data.facets.technologies,
      repositories: AppDataStore.data.repositories,
    };
  },
};
</script>
