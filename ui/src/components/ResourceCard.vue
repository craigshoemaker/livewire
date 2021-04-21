<template>
  <div
    :class="{
      card: true,
      'p-6': true,
      repository: isRepository(resource),
      extension: isExtension(resource),
    }"
  >
    <div v-if="!isRepositoryOrExtension(resource)" class="mb-12">
      <h3 class="text-2xl">Unknown Data Type</h3>
      <p>Unknown partition key value: {{ resource.PartitionKey }}</p>
    </div>

    <div v-else>
      <div>
        <div class="title">
          <a :href="resource | url" target="_blank">{{ resource.title }}</a>
        </div>
        <p v-if="resource.description.length > 155" class="text-gray-700 text-base">
          {{ resource.description.slice(0, 155).trim() }}...
        </p>
        <p v-else class="text-gray-700 text-base">
          {{ resource.description }}
        </p>
      </div>

      <div class="text-gray-700">
        <div
          v-if="resource.videoUrl && resource.videoUrl.length > 0"
          class="mt-4"
        >
          <a :href="resource.videoUrl" target="_blank"
            ><font-awesome-icon :icon="['fab', 'youtube']" /> Demo video</a
          >
        </div>

        <div
          v-if="isExtensionWithoutGitHubUrl(resource)"
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

        <template v-if="isRepository(resource)">
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
  filters: {
    url(resource) {
      let value = resource.url;

      if(resource.path && resource.path.length > 0) {
        value = `${value}/tree/${resource.branch}/${resource.path}`
      }

      return value;
    }
},
  methods: {
    isRepository(resource) {
      return /repository/.test(resource.PartitionKey);
    },

    isExtension(resource) {
      return /extension/.test(resource.PartitionKey);
    },

    isRepositoryOrExtension(resource) {
      return this.isRepository(resource) || this.isExtension(resource);
    },

    isExtensionWithoutGitHubUrl(resource) {
      return (
        /extension/.test(resource.PartitionKey) &&
        !/^https:\/\/github/.test(resource.githubUrl)
      );
    },
  },
};
</script>
