<template>
  <div class="tabs-panel-container mt-3 p-8">
    <div class="container mx-auto">
      <div v-if="panel === 'getting-started'">
        Getting Started
        <ResourceCard />
      </div>
      <div v-if="panel === 'tools'">
        Tools
      </div>
      <div v-if="panel === 'vscode-extensions'">
        VS Code extensions
      </div>
    </div>
  </div>
</template>

<script>
import ResourceCard from "./ResourceCard.vue";

export default {
  name: "TabPanels",
  components: { 
    ResourceCard
  },
  props: {
    panel: String,
  },
};
</script>
