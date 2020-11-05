<template>
  <div class="sm:px-6 py-4 flex flex-wrap">
    <div
      class="italic text-xl text-gray-600"
      v-if="!resources || resources.length < 1"
    >
      Loading...
    </div>
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
