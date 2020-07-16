<template>
  <div class="container mx-auto mt-8 mb-8">
    <h1 class="text-4xl font-semibold">{{ panels[panel].title }}</h1>
    <p>{{ panels[panel].description }}</p>
  </div>
</template>

<script>
export default {
  name: "Hero",
  props: {
    panel: String,
    panels: Object,
  },
};
</script>
