<template>
  <div id="app" class="w-full">
    <Header />
    <Hero :panel="selectedPanel" :panels="panels" @panelChanged="panelChanged($event)" />
    <Tabs :panel="selectedPanel" :panels="panels" @panelChanged="panelChanged($event)" />
    <TabPanels
      :panel="selectedPanel"
      :panels="panels"
      :data="appData"
      @panelChanged="panelChanged($event)"
    />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Hero from "./components/Hero.vue";
import Tabs from "./components/Tabs.vue";
import TabPanels from "./components/TabPanels.vue";
import Footer from "./components/Footer.vue";
import { api } from "./components/api";

export default {
  name: "App",
  components: {
    Header,
    Hero,
    Tabs,
    TabPanels,
    Footer,
  },
  props: {},
  async created() {
    const response = await api.get("/get");
    this.appData = response.data;
  },
  data() {
    return {
      appData: {},
      selectedPanel: this.$route.name,
      panels: {
        "getting-started": {
          title: "Getting Started",
          description: "Get started with Microsoft internal content tools.",
        },
        "tools": {
          title: "Tools",
          description:
            "Find tools that help keep you productive while writing and managing content.",
        },
        "extensions": {
          title: "VS Code Extensions",
          description:
            "Use a series of VS Code extensions to help author and maintain Microsoft content.",
        },
      },
    };
  },
  methods: {
    panelChanged(e) {
      this.$router.push(e)
          .catch(()=>{}); // catch DuplicateNavigation
    },
  },
  watch: {
    '$route' (to) {
      this.selectedPanel = to.name;
    }
  }
};
</script>
