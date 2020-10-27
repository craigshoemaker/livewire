<template>
  <div class="pt-4 sm:px-6 sm:pb-4">
    <input
      type="text"
      class="text-lg sm:mr-2 w-full"
      placeholder="Search"
      v-model="searchText"
      @input="emitSearchText()"
    />
  </div>
</template>

<script>
export default {
  name: 'Search',
  methods: {
    emitSearchText() {
      const { searchText } = this;
      this.$emit('search', {
        searchText,
      });
    },
  },
  data() {
    return {
      searchText: '',
    };
  },
};
</script>
