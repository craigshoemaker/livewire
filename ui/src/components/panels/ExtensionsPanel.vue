<template>
  <div>
    <ExtensionList title="Extensions" v-bind:extensions="data.extensions" />
  </div>
</template>   

<script>
import ExtensionList from "../ExtensionList";

export default {
  name: "ExtensionsPanels",
  components: { ExtensionList, },
  props: {
    data: Object,
  },
};
</script>
