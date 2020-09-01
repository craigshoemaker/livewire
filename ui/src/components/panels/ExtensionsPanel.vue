<template>
  <div>Extensions Panel
    <ResourceList />
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
