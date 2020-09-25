<template>
  <div>
    <ResourceCardList title="Extensions" v-bind:resources="extensions" />
  </div>
</template>   

<script>
import ResourceCardList from "../ResourceCardList";
import AppDataStore from "../../stores/appDataStore.js";

export default {
  name: "ExtensionsPanels",
  components: { ResourceCardList },
  props: {},
  data() {
    return {
      extensions: AppDataStore.data.extensions,
    };
  },
};
</script>
