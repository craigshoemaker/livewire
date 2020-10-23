<template>
  <div class="filter-setting">
    <h2 class="font-semibold mb-2">{{ title }}</h2>
    <input
      type="text"
      v-model="filterText"
      class="hidden sm:flex rounded-sm p-1 shadow-xs w-full"
      placeholder="Filter"
    />
    <div v-for="name in filteredNames" :key="name" class="options mt-2">
      <label :for="name">
        <input
          type="checkbox"
          class="checkbox"
          @click="selectFacet($event, name)"
          :id="name"
          :value="name"
        />
        {{ name }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterSetting',
  props: {
    title: { type: String, default: () => '' },
    names: { type: Array, default: () => [] },
  },
  computed: {
    filteredNames() {
      const { filterText, names } = this;

      if (filterText === '') return names;

      return names.filter((name) => {
        const regex = new RegExp(filterText, 'i');
        return regex.test(name);
      });
    },
  },
  methods: {
    selectFacet($event, name) {
      const { title } = this;
      this.$emit('facetSelected', {
        type: title.toLowerCase(),
        name,
        isAdded: $event.currentTarget.checked,
      });
    },
  },
  data() {
    return {
      filterText: '',
    };
  },
};
</script>
