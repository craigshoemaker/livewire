<template>
  <div>
    <ResourceCardList title="Resources" v-bind:resources="repositories" />
  </div>
</template>

<script>
import ResourceCardList from "../ResourceCardList";
import AppDataStore from "../../stores/appDataStore";

export default {
  name: "GettingStartedPanel",
  components: {
    ResourceCardList,
  },
  props: {},
  data() {
    return {
      repositories: AppDataStore.data.repositories,
    };
  },
};
</script>
