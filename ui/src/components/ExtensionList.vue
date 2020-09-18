<template>
<div class="extension-list">
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">
      <a v-bind:href="url" target="_blank">{{RowKey}}</a>
      </div>
    <p class="text-gray-700 text-base">
      {{url}}
    </p>
  </div>

  <div class="tags px-6 py-4">
    <div v-for="extension in extensions" :key="extension">
      <ExtensionCard :title="extension.RowKey" />
    </div>
  </div>
</div>
</template>

<script>
import ExtensionCard from "./ExtensionCard";

export default {
  name: "ExtensionList",
  components: { ExtensionCard},
  props: { extensions : Array },
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
-->