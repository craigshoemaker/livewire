<template>
  <div class="tabs-panel-container mt-3 p-8">
    <div class="container mx-auto">
      <div v-if="panel === 'getting-started'">
        Getting Started
        <ResourceCard />
      </div>
      <div v-if="panel === 'tools'">
        <FilterSetting title="Categories" v-bind:names="data.facets.categories" />
        <FilterSetting title="Languages" v-bind:names="data.facets.languages" />
        <FilterSetting title="Technologies" v-bind:names="data.facets.technologies" />
      </div>
      <div v-if="panel === 'vscode-extensions'">VS Code extensions</div>
    </div>
  </div>
</template>

<script>
import ResourceCard from "./ResourceCard.vue";
import FilterSetting from "./FilterSetting";

export default {
  name: "TabPanels",
  components: {
    ResourceCard,
    FilterSetting,
  },
  props: {
    panel: String,
    data: Object,
  },
};
</script>
