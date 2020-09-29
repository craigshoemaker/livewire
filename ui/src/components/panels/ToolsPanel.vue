<template>
  <div class="flex">
    <div class="w-1/4">
      <FilterSetting
        title="Categories"
        v-bind:names="facets.categories"
        @facetSelected="handleFacetSelected($event)"
      />
      <FilterSetting
        title="Languages"
        v-bind:names="facets.languages"
        @facetSelected="handleFacetSelected($event)"
      />
      <FilterSetting
        title="Technologies"
        v-bind:names="facets.technologies"
        @facetSelected="handleFacetSelected($event)"
      />
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

const filters = {
  languages: [],
  technologies: [],
  categories: [],
};

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
  methods: {
    handleFacetSelected(e) {
      const { name, type, isAdded } = e;
      if (isAdded) {
        filters[type].push(name);
      } else {
        filters[type] = filters[type].filter(
          (filterText) => filterText !== name
        );
      }
    },
  },
  computed: {
    ...mapGetters("resources", { repositories: "repositories" }),
    ...mapGetters("resources", { facets: "facets" }),
  },
};
</script>
