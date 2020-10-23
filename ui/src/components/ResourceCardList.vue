<template>
  <div class="sm:px-6 py-4 flex flex-wrap">
    <div v-if="!resources">Loading...</div>
    <template v-else v-for="resource in resources" class="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
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
