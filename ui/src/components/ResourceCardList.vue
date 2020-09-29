<template>
  <div class="resource-list">
    <div class="px-6 py-4">
      <div v-for="resource in resources" :key="resource.RowKey">
        <RepositoryCard
          v-if="resource.PartitionKey === 'repository'"
          :resource="resource"
        />
        <ExtensionCard
          v-else-if="resource.PartitionKey === 'extension'"
          :resource="resource"
        />

        <div class="mb-12" v-else>
          <h3 class="text-2xl">Unknown Data Type</h3>
          <p>Unknown partition key value: {{ resource.PartitionKey }}</p>
        </div>
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
    ExtensionCard,
  },
  props: { resources: Array },
};
</script>
