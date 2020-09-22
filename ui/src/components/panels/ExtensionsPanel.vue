<template>
  <div>
    <ResourceCardList title="Extensions" v-bind:resources="data.extensions" />
  </div>
</template>   

<script>
import ResourceCardList from "../ResourceCardList";

export default {
  name: "ExtensionsPanels",
  components: { ResourceCardList, },
  props: {
    data: Object,
  },
};
</script>
