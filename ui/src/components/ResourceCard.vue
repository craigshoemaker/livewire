<template>
  <div
    :class="{
      card: true,
      'p-6': true,
      repository: /repository/.test(resource.PartitionKey),
      extension: /extension/.test(resource.PartitionKey),
    }"
  >
    <div
      v-if="!/repository|extension/.test(resource.PartitionKey)"
      class="mb-12"
    >
      <h3 class="text-2xl">Unknown Data Type</h3>
      <p>Unknown partition key value: {{ resource.PartitionKey }}</p>
    </div>

    <div v-else>
      <div>
        <div class="title">
          <a :href="resource.url" target="_blank">{{ resource.title }}</a>
        </div>
        <p class="text-gray-700 text-base">
          {{ resource.description }}
        </p>
      </div>

      <div class="text-gray-700">
        <div v-if="resource.videoUrl" class="mt-4">
          <a :href="resource.videoUrl" target="_blank"
            ><font-awesome-icon :icon="['fab', 'youtube']" /> Demo video</a
          >
        </div>

        <div
          v-if="
            /extension/.test(resource.PartitionKey) &&
            !/^https:\/\/github/.test(resource.githubUrl)
          "
          class="italic text-gray-500 mt-10 text-sm"
        >
          No GitHub information available.
        </div>

        <div v-else class="stats grid grid-cols-1 sm:grid-cols-2">
          <div v-if="resource.forks" class="label">
            <font-awesome-icon icon="code-branch" /> Forks
          </div>
          <div>{{ resource.forks }}</div>

          <div class="label">
            <font-awesome-icon icon="info-circle" /> Issues
          </div>
          <div>{{ resource.issues }}</div>

          <div class="label"><font-awesome-icon icon="star" /> Stars</div>
          <div>{{ resource.stars }}</div>

          <div class="label"><font-awesome-icon icon="eye" /> Watchers</div>
          <div>{{ resource.watchers }}</div>
        </div>

        <template v-if="/repository/.test(resource.PartitionKey)">
          <div class="facets grid grid-cols-1 sm:grid-cols-2">
            <div class="label">Categories</div>
            <div>
              <span
                v-for="category in resource.categories"
                :key="category"
                class="resource-tag"
              >
                {{ category }}
              </span>
            </div>

            <div class="label">Languages</div>
            <div>
              <span
                v-for="language in resource.languages"
                :key="language"
                class="resource-tag"
              >
                {{ language }}
              </span>
            </div>

            <div class="label">Technologies</div>
            <div>
              <span
                v-for="technology in resource.technologies"
                :key="technology"
                class="resource-tag"
              >
                {{ technology }}
              </span>
            </div>
          </div>
        </template>
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
