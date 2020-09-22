<template>
<div class="card">
    <div class="tags px-6 py-4">
    <div>
      <span class="font-semibold">RowKey:</span> <span class="extension-tag">{{resource.RowKey}}</span>
    </div>
    <div>
      <span class="font-semibold">Timestamp:</span> <span class="extension-tag">{{resource.Timestamp}}</span>
    </div>
    <div>
      <span class="font-semibold">URL:</span> <a :href="resource.url"><span class="extension-tag">{{resource.url}}</span></a>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "ExtensionCard",
  props: { 
    resource: Object
   },

};
</script>