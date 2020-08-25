<template>
  <div>
    Getting Started Panel
    <ResourceCard />
  </div>
</template>

<script>
import ResourceCard from "../ResourceCard";

export default {
  name: "GettingStartedPanel",
  components: {
    ResourceCard,
  },
  props: {
    data: Object,
  },
};
</script>
