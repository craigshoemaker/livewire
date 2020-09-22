<template>
  <div>
    <ResourceCardList title="Resources" v-bind:resources="data.repositories" />
  </div>
</template>

<script>
import ResourceCardList from "../ResourceCardList";

export default {
  name: "GettingStartedPanel",
  components: {
    ResourceCardList,
  },
  props: {
    data: Object,
  },
};
</script>
