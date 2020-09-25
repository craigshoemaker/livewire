<template>
  <div>
    <ResourceCardList title="Resources" v-bind:resources="repositories" />
  </div>
</template>

<script>
import ResourceCardList from "../ResourceCardList";

export default {
  name: "GettingStartedPanel",
  components: {
    ResourceCardList,
  },
  props: {},
  data() {
    return {
      repositories: [],
    };
  },
};
</script>
