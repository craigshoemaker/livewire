<template>
  <div>
    <Search @search="handleSearch($event)" />
    <ResourceCardList :resources="extensions(filters)" />
  </div>
</template>

<script>
import ResourceCardList from '../ResourceCardList';
import Search from '../Search';
import { mapGetters } from 'vuex';

export default {
  name: 'ExtensionsPanels',
  components: { ResourceCardList, Search },
  props: {},
  data() {
    return {
      filters: {
        searchText: '',
      },
    };
  },
  methods: {
    handleSearch(e) {
      this.filters.searchText = e.searchText;
    },
  },
  computed: {
    ...mapGetters('resources', { extensions: 'extensionsFiltered' }),
  },
};
</script>
