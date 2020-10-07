<template>
  <div class="card">
    <div class="tags px-6 py-4">
      <div>
        <span class="title"><a :href="resource.url" target="_blank" rel="noopener noreferrer">{{resource.title}}</a></span>
      </div>
      <div>
        <p>{{ resource.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExtensionCard',
  props: {
    resource: { type: Object, default: () => {} },
  },
};
</script>
