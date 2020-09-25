<template>
  <div>
    <ResourceCardList title="Extensions" v-bind:resources="extensions" />
  </div>
</template>

<script>
import ResourceCardList from "../ResourceCardList";

export default {
  name: "ExtensionsPanels",
  components: { ResourceCardList },
  props: {},
  data() {
    return {
      extensions: [],
    };
  },
};
</script>
