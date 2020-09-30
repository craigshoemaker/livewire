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
      <div v-for="name in filteredNames" :key="name">
        <label :for="name">
          <input
            type="checkbox"
            @click="selectFacet($event, name)"
            :id="name"
            class="checkbox"
            :value="name"
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
    title: { type: String, default: () => "" },
    names: { type: Array, default: () => [] },
  },
  computed: {
    filteredNames() {
      const { filterText, names } = this;

      if (filterText === "") return names;

      return names.filter((name) => {
        const regex = new RegExp(filterText, "i");
        return regex.test(name);
      });
    },
  },
  methods: {
    selectFacet($event, name) {
      const { title } = this;
      this.$emit("facetSelected", {
        type: title.toLowerCase(),
        name,
        isAdded: $event.currentTarget.checked,
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
