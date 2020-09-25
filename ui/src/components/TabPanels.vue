<template>
  <div class="tabs-panel-container mt-3 p-8">
    <div class="container mx-auto">
      <div v-if="panel === 'getting-started'">
        <GettingStartedPanel />
      </div>
      <div v-if="panel === 'tools'">
        <ToolsPanel />
      </div>
      <div v-if="panel === 'extensions'">
        <ExtensionsPanel />
      </div>
    </div>
  </div>
</template>

<script>
import GettingStartedPanel from "./panels/GettingStartedPanel";
import ToolsPanel from "./panels/ToolsPanel";
import ExtensionsPanel from "./panels/ExtensionsPanel";

export default {
  name: "TabPanels",
  components: {
    ExtensionsPanel,
    GettingStartedPanel,
    ToolsPanel,
  },
  props: {
    panel: String,
  },
};
</script>
