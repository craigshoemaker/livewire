<template>
<div class="resource-card">
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">
      <a v-bind:href="url" target="_blank">{{title}}</a>
      </div>
    <p class="text-gray-700 text-base">
      {{description}}
    </p>
  </div>

  <div class="px-6 py-4">
    Video Icon
  </div>

  <div class="tags px-6 py-4">
    <div>
      <span class="font-semibold">Categories:</span> <span class="resource-tag" v-for="category in categories" :key="category">{{category}}</span>
    </div>
    <div>
      <span class="font-semibold">Technologies:</span> <span class="resource-tag" v-for="technology in technologies" :key="technology">{{technology}}</span>
    </div>
    <div>
      <span class="font-semibold">Languages:</span> <span class="resource-tag" v-for="language in languages" :key="language">{{language}}</span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "ResourceCard",
  props: {  },
  data() {
    return {
      title: "Docs Authoring Pack for VS Code",
      url: "url",
      video: "link",
      description: "The Docs Authoring Pack is a collection of VS Code extensions to aid with Markdown authoring for docs.microsoft.com",
      categories: ["Search"],
      languages: ["JavaScript","HTML","CSS"],
      technologies: ["Functions", "Node.js","Vue.js"],
    };
  },  
};
</script>
