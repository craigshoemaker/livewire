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
    <div v-for="resource in resources" :key="resource">
      <ResourceCard :title="resource.title" />
    </div>
  </div>
</div>
</template>

<script>
import ResourceCard from "../ResourceCard";

export default {
  name: "ResourceList",
  components: { ResourceCard},
  props: { resources : Array },
};
</script>
<!--
      title: "Docs Authoring Pack for VS Code",
      url: "url",
      video: "link",
      description: "The Docs Authoring Pack is a collection of VS Code extensions to aid with Markdown authoring for docs.microsoft.com",
      categories: ["Search"],
      languages: ["JavaScript","HTML","CSS"],
      technologies: ["Functions", "Node.js","Vue.js"],
->