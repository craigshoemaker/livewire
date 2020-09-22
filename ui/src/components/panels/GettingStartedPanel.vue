<template>
  <div>
    <ResourceList title="Resources" v-bind:resources="data.repositories" />
  </div>
</template>

<script>
import ResourceList from "../ResourceList";

export default {
  name: "GettingStartedPanel",
  components: {
    ResourceList,
  },
  props: {
    data: Object,
  },
};
</script>
