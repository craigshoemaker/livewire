<template>
  <div class="tabs-panel-container mt-3 p-8">
    <div class="container mx-auto">
      <div v-if="panel === 'getting-started'">
        Getting Started
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
export default {
  name: "TabPanels",
  props: {
    panel: String,
  },
};
</script>
