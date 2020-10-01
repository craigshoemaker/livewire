<template>
  <header class="border-b-1">
    <div class="container mx-auto">
      <div class="flex flex-row sm:p-0 sm:pb-3">
        <div class="w-1/4">
          <img src="images/microsoft-logo.png" alt="Microsoft" class="inline" />
          <span class="text-gray-600 text-2xl ml-3 mr-3">|</span>
          <img src="images/livewire-logo.png" alt="Livewire" class="inline" />
        </div>
        <div class="w-3/4">
          <AddResource />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import AddResource from './AddResource';

export default {
  name: 'Header',
  components: {
    AddResource,
  },
};
</script>
