<template>
  <div class="container mx-auto mt-8 mb-8">
    <h1 class="text-4xl font-semibold">{{ title }}</h1>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: "Hero",
  props: {
    title: String,
    msg: String,
  },
};
</script>
