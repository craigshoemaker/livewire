<template>
  <div class="container mx-auto">
    <ul class="tabs">
      <li
        v-for="tab in tabs"
        :key="tab.id"
        :class="{ selected: panel === tab.id }"
        @click="changeTab(tab.id)"
      >
        {{ tab.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
    panel: { type: String, default: () => '' },
  },
  data() {
    return {
      tabs: [
        { title: 'Getting Started', id: 'getting-started' },
        { title: 'Tools', id: 'tools' },
        { title: 'VS Code Extensions', id: 'extensions' },
      ],
    };
  },
  methods: {
    changeTab(id) {
      this.$emit('panelChanged', id);
    },
  },
};
</script>
