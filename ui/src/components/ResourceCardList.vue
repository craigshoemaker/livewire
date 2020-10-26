<template>
  <div class="resource-list px-6 py-4">
    <template v-if="!resources">Loading...</template>
    <template v-else v-for="resource in resources">
      <ResourceCard :resource="resource" :key="resource.RowKey" />
    </template>
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
