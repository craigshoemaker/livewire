<template>
  <div>
    <h1 class="text-4xl">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: "Hero",
  props: {
    title: String,
  },
};
</script>
