<template>
  <div class="px-6 pb-4">
    <input
      type="text"
      v-model="searchText"
      class="text-lg p-2 shadow-inner border rounded-md mr-2"
      placeholder="Search"
      @input="emitSearchText()"
    />
  </div>
</template>

<script>
export default {
  name: "Search",
  methods: {
    emitSearchText() {
      const { searchText } = this;
      this.$emit("search", {
        searchText,
      });
    },
  },
  data() {
    return {
      searchText: "",
    };
  },
};
</script>
