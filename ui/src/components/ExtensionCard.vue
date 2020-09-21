<template>
<div class="extension-card">
    <div class="tags px-6 py-4">
    <div>
      <span class="font-semibold">RowKey:</span> <span class="extension-tag">{{Extension.RowKey}}</span>
    </div>
    <div>
      <span class="font-semibold">Timestamp:</span> <span class="extension-tag">{{Extension.Timestamp}}</span>
    </div>
    <div>
      <span class="font-semibold">URL:</span> <a :href="Extension.url"><span class="extension-tag">{{Extension.url}}</span></a>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "ExtensionCard",
  props: { 
    Extension: Object
   },

};
</script>