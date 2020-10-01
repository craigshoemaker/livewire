<template>
  <div class="card">
    <div class="tags px-6 py-4">
      <div>
        <span class="font-semibold"><a :href="resource.url" target="_blank" rel="noopener noreferrer">{{resource.title}}</a></span>
      </div>
      <div>
        <span class="extension-tag">{{ resource.description }}</span>
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
