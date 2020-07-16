<template>
  <div id="app">
    <Header />
    <Hero title="Getting started" />
    <Tabs />
    <TabPanels />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Hero from "./components/Hero.vue";
import Tabs from "./components/Tabs.vue";
import TabPanels from "./components/TabPanels.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Hero,
    Tabs,
    TabPanels,
    Footer,
  },
};
</script>
