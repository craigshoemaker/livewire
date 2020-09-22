<template>
  <div>
    <ResourceList title="Extensions" v-bind:resources="data.extensions" />
  </div>
</template>   

<script>
import ResourceList from "../ResourceList";

export default {
  name: "ExtensionsPanels",
  components: { ResourceList, },
  props: {
    data: Object,
  },
};
</script>
