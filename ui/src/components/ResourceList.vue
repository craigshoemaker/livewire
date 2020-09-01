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
    <div>
      <span class="font-semibold">Resource Cards go here:</span> <span class="resource-tag" v-for="category in categories" :key="category">{{category}}</span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "ResourceList",
  props: {  },
  data() {
    return {
      
    };
  },  
};
</script>
