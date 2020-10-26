<template>
  <section>
    <div class="container mx-auto tabs">
      <span
        v-for="tab in tabs"
        :key="tab.id"
        :class="{ selected: panel === tab.id, tab: true }"
        @click="changeTab(tab.id)"
      >
        {{ tab.title }}
      </span>
    </div>
    <hr class="tabs-divider" />
  </section>
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
