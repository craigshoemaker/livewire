<template>
<div class="extension-card">
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
      <span class="font-semibold">RowKey:</span> <span class="extension-tag">{{RowKey}}</span>
    </div>
    <div>
      <span class="font-semibold">Timestamp:</span> <span class="extension-tag">{{Timestamp}}</span>
    </div>
    <div>
      <span class="font-semibold">URL:</span> <span class="extension-tag">{{url}}</span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "ExtensionCard",
  props: { 
    RowKey:String,
    url:String,
    Timestamp:String,
   },

};
</script>
