<template>
  <div>
    Extensions Panel
    <ResourceList title="Resources" v-bind:resources="data.repositories" />
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
