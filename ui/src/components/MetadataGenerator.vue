<template>
  <section id="generator">
    <div v-if="!showForm" class="text-center p-5">
      <button @click="handleShowForm()" class="text-gray-700">
        Create config file
      </button>
    </div>
    <div v-if="showForm" class="generator-container mt-20 p-4">
      <div class="generator">
        <div class="text-right">
          <font-awesome-icon
            class="cursor-pointer text-gray-700"
            icon="window-close"
            @click="cancel()"
          />
        </div>
        <p class="m-5 text-xl">Enter details about your project:</p>
        <div class="m-5">
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            class="focus:outline-none focus:shadow-outline"
            v-model="name"
            @input="generate()"
          />
        </div>

        <div class="m-5">
          <label for="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            class="focus:outline-none focus:shadow-outline"
            v-model="description"
            @input="generate()"
          />
        </div>

        <div class="m-5">
          <label for="demo">Demonstration Video URL:</label>
          <input
            type="text"
            id="demo"
            name="demo"
            placeholder="Demonstration video URL"
            class="focus:outline-none focus:shadow-outline"
            v-model="videoUrl"
            @input="generate()"
          />
        </div>

        <div class="m-5">
          <label for="categories">
            Categories:
            <span>List of functional categories of the tool.</span>
          </label>
          <input
            type="text"
            id="categories"
            name="categories"
            placeholder="List of categories (comma separated)"
            class="focus:outline-none focus:shadow-outline"
            v-model="categories"
            @input="generate()"
          />
        </div>

        <div class="m-5">
          <label for="languages">
            Languages:
            <span>List of programming languages used in the tool.</span>
          </label>
          <input
            type="text"
            id="languages"
            name="languages"
            placeholder="List of programming languages (comma separated)"
            class="focus:outline-none focus:shadow-outline"
            v-model="languages"
            @input="generate()"
          />
        </div>

        <div class="m-5">
          <label for="technologies">
            Technologies:
            <span
              >List of frameworks, libraries, packages and/or environments used
              in the tool.</span
            >
          </label>
          <input
            type="text"
            id="technologies"
            name="technologies"
            placeholder="List of technologies used in the tool (comma separated)"
            class="focus:outline-none focus:shadow-outline"
            v-model="technologies"
            @input="generate()"
          />
        </div>
        <div class="m-5 mt-12">
          <p class="text-xl">
            Add
            <code class="bg-gray-100 p-1 rounded-md shadow-sm"
              >livewire.config.json</code
            >
            to the root of your repository or project folder in a monorepo:
          </p>
          <pre>{{ json }}</pre>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
function createList(value) {
  let list = /,/.test(value)
    ? `"${value.replace(/, ?/g, '","')}"`
    : `"${value}"`;

  list = list.replace(/,""$/, '');

  return list === '""' ? '' : list;
}

function scrollTo(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

export default {
  name: 'MetadataGenerator',
  data() {
    return {
      showForm: false,
      name: '',
      description: '',
      videoUrl: '',
      categories: '',
      languages: '',
      technologies: '',
      json: '',
    };
  },
  methods: {
    handleShowForm() {
      this.showForm = true;
      this.generate();

      setTimeout(() => {
        scrollTo('generator');
      }, 100);
    },
    cancel() {
      scrollTo('app');

      const component = this;
      setTimeout(() => {
        component.showForm = false;
      }, 1000);
    },
    generate() {
      this.json = `{
  "title": "${this.name}",
  "description": "${this.description}",
  "videoUrl": "${this.videoUrl}",
  "categories": [${createList(this.categories)}],
  "languages": [${createList(this.languages)}],
  "technologies": [${createList(this.technologies)}]
}`;
    },
  },
};
</script>
