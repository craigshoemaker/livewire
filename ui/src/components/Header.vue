<template>
  <header class="border-b-1">
    <div class="container mx-auto">
      <div class="flex flex-row justify-between flex-wrap items-start sm:p-0 sm:pb-3">
        <div class="flex flex-row flex-no-wrap items-center w-250">
          <img src="images/microsoft-logo.png" alt="Microsoft" />
          <span class="text-gray-600 text-2xl ml-3 mr-3">|</span>
          <img src="images/livewire-logo.png" alt="Livewire" />
        </div>
        <div class="w-3/4 sm:w-1/2">
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
  data() {
    return {
      isOpen: false,
    }
  }
};
</script>
