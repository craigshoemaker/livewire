<template>
  <div class="px-6 pb-4">
    <input
      type="text"
      v-model="searchTerm"
      class="text-lg p-2 shadow-inner border rounded-md mr-2"
      placeholder="Search"
    />
    <button
      class="search font-semibold text-white p-2"
      @click="emitSearchTerm()"
    >
      <img
        src="images/magnifier.png"
        alt="Magnifier icon"
        class="inline-block mr-1"
      />
      <span>Search</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "Search",
  props: {},
  methods: {
    emitSearchTerm() {
      const { searchTerm } = this;
      this.$emit("search", {
        term: searchTerm,
      });
    },
  },
  data() {
    return {
      searchTerm: "",
    };
  },
};
</script>
