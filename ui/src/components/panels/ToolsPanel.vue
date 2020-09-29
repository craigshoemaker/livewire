<template>
  <div class="flex">
    <div class="w-1/4">
      <FilterSetting title="Categories" v-bind:names="facets.categories" />
      <FilterSetting title="Languages" v-bind:names="facets.languages" />
      <FilterSetting title="Technologies" v-bind:names="facets.technologies" />
    </div>
    <div class="w-3/4">
      <Search />
      <ResourceCardList title="Resources" v-bind:resources="repositories" />
    </div>
  </div>
</template>

<script>
import FilterSetting from "../FilterSetting";
import Search from "../Search";
import ResourceCardList from "../ResourceCardList";
import { mapGetters } from "vuex";

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
    return {};
  },
  computed: {
    ...mapGetters("resources", { repositories: "repositories" }),
    ...mapGetters("resources", { facets: "facets" }),
  },
};
</script>
