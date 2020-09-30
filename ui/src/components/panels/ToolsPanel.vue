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
      <ResourceCardList :resources="repositoriesFiltered" />
    </div>
  </div>
</template>

<script>
import FilterSetting from "../FilterSetting";
import Search from "../Search";
import ResourceCardList from "../ResourceCardList";
import { mapActions, mapGetters } from "vuex";

const filters = {
  languages: [],
  technologies: [],
  categories: [],
  searchText: "",
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
    ...mapActions("resources", ["getFilteredRepositoriesAction"]),
    handleFacetSelected(e) {
      const { name, type, isAdded } = e;
      if (isAdded) {
        filters[type].push(name);
      } else {
        filters[type] = filters[type].filter(
          (filterText) => filterText !== name
        );
      }
      this.getFilteredRepositoriesAction(filters);
    },

    handleSearch(e) {
      filters.searchText = e.searchText;
      this.getFilteredRepositoriesAction(filters);
    },
  },
  computed: {
    ...mapGetters("resources", {
      repositoriesFiltered: "repositoriesFiltered",
    }),
    ...mapGetters("resources", { facets: "facets" }),
  },
};
</script>
