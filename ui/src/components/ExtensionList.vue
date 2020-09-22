<template>
<div class="extension-list">
  <div class="tags px-6 py-4">
    <div :key="extension.id" v-for="extension in extensions">
      <ExtensionCard v-bind:extension="extension" />
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