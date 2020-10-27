<template>
  <div class="flex flex-grow flex-row-reverse sm:flex-row pt-2">
    <div class="w-4/5 pl-3 sm:text-right sm:pr-3">
      <span v-if="showUrlBox">
        <input
          type="text"
          v-model="url"
          class="w-full"
          placeholder="GitHub repository or VS Code marketplace URL"
          @focus="stopAutoCancel()"
        />
      </span>
      <span
        v-if="message.length > 0"
        :class="message.length > 0 ? 'fadeout-5sec-delay' : ''"
        class="inline-block mt-1 text-gray-500"
        >{{ message }}</span
      >
    </div>
    <div class="w-1/5 flex flex-row-reverse sm:flex-row">
      <button class="action" v-if="showAddButton" @click="add()">Add</button>
      <span
        v-if="showSubmitButton"
        class="flex flex-row-reverse flex-wrap sm:flex-row"
      >
        <button class="action" @click="submit()">Submit</button>
        <button class="link" @click="cancel()">Cancel</button>
      </span>
    </div>
  </div>
</template>

<script>
const GITHUB_PATTERN = /https?:\/\/github\.com\//;
const VSCODE_MARKETPLACE_PATTERN = /https:\/\/marketplace\.visualstudio\.com\/items\?itemName=/;

import { api } from './api';

export default {
  name: 'AddResource',
  methods: {
    add() {
      this.showAddButton = false;
      this.showSubmitButton = true;
      this.showUrlBox = true;
      this.message = '';
      this.timer = setTimeout(() => {
        this.cancel();
      }, 10000);
    },

    stopAutoCancel() {
      clearTimeout(this.timer);
    },

    cancel() {
      this.showUrlBox = false;
      this.showAddButton = true;
      this.showSubmitButton = false;
      this.message = '';
    },

    isGitHubURL() {
      return GITHUB_PATTERN.test(this.url);
    },

    isExtensionURL() {
      return VSCODE_MARKETPLACE_PATTERN.test(this.url);
    },

    async submit() {
      this.showAddButton = true;
      this.showSubmitButton = false;

      this.message = '';

      const isValidGitHubURL = this.isGitHubURL();
      const isValidExtensionURL = this.isExtensionURL();

      if (!isValidGitHubURL && !isValidExtensionURL) {
        this.message = 'Enter a GitHub repository or VS Code marketplace URL.';
      }

      if (this.message.length === 0) {
        try {
          this.showUrlBox = false;
          this.message = 'Sending...';
          const response = await api.addResource({
            url: this.url,
          });

          const responseState = {
            added: response.status === 200 && !response.data.innerStatus,
            config404:
              response.status === 200 &&
              response.data.innerStatus &&
              response.data.innerStatus === 404,
            request404: response.status === 404,
          };

          if (responseState.added) {
            this.message = 'Added';
            this.url = '';
            this.showAddButton = true;
            this.showUrlBox = false;
            this.showSubmitButton = false;
          }

          if (responseState.config404) {
            this.message = 'Repository requires a livewire.config.json file.';
          }

          if (responseState.request404) {
            this.message = response.data.message;
          }
        } catch (ex) {
          if (ex.data && ex.data.message) {
            this.message = ex.data.message;
          } else {
            this.message = ex.message;
          }
        }
      }
    },
  },
  data() {
    return {
      url: '',
      message: '',
      showAddButton: true,
      showSubmitButton: false,
      showUrlBox: false,
    };
  },
};
</script>
