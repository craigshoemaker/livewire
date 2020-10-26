<template>
  <div class="hidden sm:block container mx-auto mt-8 mb-8">
    <h1 class="text-4xl font-semibold">{{ panels[panel].title }}</h1>
    <p>{{ panels[panel].description }}</p>
  </div>
</template>

<script>
export default {
  name: 'Hero',
  props: {
    panel: { type: String, default: () => '' },
    panels: { type: Object, default: () => {} },
  },
};
</script>
