<template>
  <div class="flex-wrap sm:flex">
    <div class="block sm:w-1/4">
      <div v-for="setting in filterSettings" :key="setting">
        <FilterSetting
          :title="setting | capitalizeFirstCharacter"
          :names="facets[setting]"
          @facetSelected="handleFacetSelected($event)"
        />
      </div>
    </div>
    <div class="block sm:w-3/4">
      <Search @search="handleSearch($event)" />
      <ResourceCardList :resources="repositories(filters)" />
    </div>
  </div>
</template>

<script>
import FilterSetting from '../FilterSetting';
import Search from '../Search';
import ResourceCardList from '../ResourceCardList';
import { mapGetters } from 'vuex';
import filters from '../filters';

export default {
  name: 'TabPanels',
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
        searchText: '',
      },
      filterSettings: ['categories', 'languages', 'technologies'],
    };
  },
  filters: {
    capitalizeFirstCharacter: (value) =>
      filters.capitalizeFirstCharacter(value),
  },
  methods: {
    handleFacetSelected(e) {
      const { name, type, isAdded } = e;
      const { filters } = this;
      if (isAdded) {
        filters[type].push(name);
      } else {
        filters[type] = filters[type].filter(
          (filterText) => filterText !== name,
        );
      }
    },

    handleSearch(e) {
      this.filters.searchText = e.searchText;
    },
  },
  computed: {
    ...mapGetters('resources', {
      repositories: 'repositoriesFiltered',
      facets: 'facets',
    }),
  },
};
</script>
