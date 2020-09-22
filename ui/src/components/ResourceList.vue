<template>
<div class="resource-list">
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">
      <a v-bind:href="url" target="_blank">{{title}}</a>
      </div>
    <p class="text-gray-700 text-base">
      {{description}}
    </p>
  </div>

  <div class="tags px-6 py-4">
    <div v-for="resource in resources" :key="resource">
      <ResourceCard :resource="resource" />
    </div>
  </div>
</div>
</template>

<script>
import ResourceCard from "./ResourceCard";

export default {
  name: "ResourceList",
  components: { ResourceCard},
  props: { resources : Array },
};
</script>