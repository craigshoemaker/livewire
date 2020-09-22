<template>
<div class="resource-list">
  <div class="px-6 py-4">
    <div v-for="resource in resources" :key="resource.RowKey">

      <RepositoryCard v-if="resource.PartitionKey==='repository'" :resource="resource" />
      <ExtensionCard v-if="resource.PartitionKey==='extension'" :resource="resource" />

    </div>
  </div>
</div>
</template>

<script>
import RepositoryCard from "./RepositoryCard";
import ExtensionCard from "./ExtensionCard";

export default {
  name: "ResourceCardList",
  components: { 
    RepositoryCard,
    ExtensionCard
    },
  props: { resources : Array },
};
</script>