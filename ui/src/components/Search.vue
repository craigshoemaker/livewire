<template>
  <div class="px-6 pb-4">
    <input
      type="text"
      class="text-lg p-2 shadow-inner border rounded-md mr-2 w-full"
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
