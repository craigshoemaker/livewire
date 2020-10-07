<template>
  <div class="card">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">
        <a :href="resource.url" target="_blank">{{ resource.title }}</a>
      </div>
      <p class="text-gray-700 text-base">
        {{ resource.description }}
      </p>
    </div>

    <div class="px-6 py-4">
      <a :href="resource.url" target="_blank">Video Icon</a>
    </div>

    <div class="tags px-6 py-4">
      <div>
        <span
          class="resource-tag"
          v-for="category in resource.categories"
          :key="category"
          >{{ category }}</span
        >
        <span
          class="resource-tag"
          v-for="technology in resource.technologies"
          :key="technology"
          >{{ technology }}</span
        >
        <span
          class="resource-tag"
          v-for="language in resource.languages"
          :key="language"
          >{{ language }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResourceCard',
  props: {
    resource: { type: Object, default: () => {} },
  },
};
</script>
