<template>
  <div class="resource-list">
    <div class="px-6 py-4">
      <div v-if="!resources">Loading...</div>
      <div v-else v-for="resource in resources" :key="resource.RowKey">
        <ResourceCard
          v-if="/repository|extension/.test(resource.PartitionKey)"
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
import ResourceCard from './ResourceCard';

export default {
  name: 'ResourceCardList',
  components: {
    ResourceCard,
  },
  props: {
    resources: { type: Array, default: () => [] },
  },
};
</script>
