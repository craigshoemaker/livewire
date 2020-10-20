<template>
  <div class="card p-6">
    <div>
      <div class="title">
        <a :href="resource.url" target="_blank">{{ resource.title }}</a>
      </div>
      <p class="text-gray-700 text-base">
        {{ resource.description }}
      </p>
    </div>

    <div v-if="resource.videoURL" class="mt-4">
      <a :href="resource.videoURL" target="_blank">Demo video</a>
    </div>

    <div v-if="/repository/.test(resource.PartitionKey)">
      <div class="mt-4">
        <div class="flex">
          <div class="facet-label">Categories</div>
          <div class="facet-list">
            <span
              class="resource-tag"
              v-for="category in resource.categories"
              :key="category"
              >{{ category }}</span
            >
          </div>
        </div>

        <div class="flex">
          <div class="facet-label">Technologies</div>
          <div class="facet-list">
            <span
              class="resource-tag"
              v-for="technology in resource.technologies"
              :key="technology"
              >{{ technology }}</span
            >
          </div>
        </div>

        <div class="flex">
          <div class="facet-label">Languages</div>
          <div class="facet-list">
            <span
              class="resource-tag"
              v-for="language in resource.languages"
              :key="language"
              >{{ language }}</span
            >
          </div>
        </div>
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
