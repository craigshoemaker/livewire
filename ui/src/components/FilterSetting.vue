<template>
  <div class="filter-setting">
    <h2 class="font-semibold mb-2">{{ title }}</h2>
    <input
      type="text"
      v-model="filterText"
      class="rounded-sm p-1 shadow-xs w-full"
      placeholder="Filter"
    />
    <div class="options mt-2">
      <div v-for="name in filteredNames" v-bind:key="name">
        <label v-bind:for="name">
          <input
            type="checkbox"
            @click="selectFacet(name)"
            v-bind:id="name"
            class="checkbox"
            v-bind:value="name"
          />
          {{ name }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterSetting",
  props: {
    title: String,
    names: Array,
  },
  computed: {
    filteredNames: function () {
      const { filterText, names } = this;

      if (filterText == "") return names;

      return names.filter((name) => {
        const regex = new RegExp(filterText, "i");
        return regex.test(name);
      });
    },
  },
  methods: {
    selectFacet(name) {
      const { title } = this;
      this.$emit("facetSelected", {
        type: title.toLowerCase(),
        name,
      });
    },
  },
  data() {
    return {
      filterText: "",
    };
  },
};
</script>
