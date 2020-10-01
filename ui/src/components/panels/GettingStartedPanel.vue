<template>
  <div>
    <ResourceCardList title="Resources" :resources="recommended" />
  </div>
</template>

<script>
import ResourceCardList from '../ResourceCardList';
import { mapGetters } from 'vuex';

export default {
  name: 'GettingStartedPanel',
  components: {
    ResourceCardList,
  },
  data() {
    return {
      repositories: [],
    };
  },
  computed: {
    ...mapGetters('resources', { recommended: 'recommended' }),
  },
};
</script>
