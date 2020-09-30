<template>
  <div class="flex">
    <div class="w-1/4">
      <FilterSetting
        title="Categories"
        :names="facets.categories"
        @facetSelected="handleFacetSelected($event)"
      />
      <FilterSetting
        title="Languages"
        :names="facets.languages"
        @facetSelected="handleFacetSelected($event)"
      />
      <FilterSetting
        title="Technologies"
        :names="facets.technologies"
        @facetSelected="handleFacetSelected($event)"
      />
    </div>
    <div class="w-3/4">
      <Search @search="handleSearch($event)" />
      <ResourceCardList :resources="repositoriesFiltered(filters)" />
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
  data() {
    return {
      filters: {
        languages: [],
        technologies: [],
        categories: [],
        searchText: "",
      },
    };
  },
  methods: {
    handleFacetSelected(e) {
      const { name, type, isAdded } = e;
      const { filters } = this;
      if (isAdded) {
        filters[type].push(name);
      } else {
        filters[type] = filters[type].filter(
          (filterText) => filterText !== name
        );
      }
    },

    handleSearch(e) {
      this.filters.searchText = e.searchText;
    },
  },
  computed: {
    ...mapGetters("resources", {
      repositoriesFiltered: "repositoriesFiltered",
      facets: "facets",
    }),
  },
};
</script>
