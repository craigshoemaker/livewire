<template>
  <div class="resource-list">
    <div class="px-6 py-4">
      <div v-if="!resources">Loading...</div>
      <template v-else v-for="resource in resources">
        <ResourceCard :resource="resource" :key="resource.RowKey" />
      </template>
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
