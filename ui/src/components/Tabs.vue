<template>
  <div class="container mx-auto">
    <ul class="tabs">
      <li
        v-bind:class="{ selected: panel === 'getting-started' }"
        @click="changeTab('getting-started')"
      >
        Getting Started
      </li>
      <li
        v-bind:class="{ selected: panel === 'tools' }"
        @click="changeTab('tools')"
      >
        Tools
      </li>
      <li
        v-bind:class="{ selected: panel === 'extensions' }"
        @click="changeTab('extensions')"
      >
        VS Code Extensions
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  props: {
    panel: String,
  },
  methods: {
    changeTab(id) {
      this.$emit("panelChanged", id);
    },
  },
};
</script>
