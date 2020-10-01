<template>
  <div class="flex flex-row pt-2">
    <div class="w-4/5 text-right pr-3">
      <span v-if="showDecisionButtons">
        <button class="link" @click="repo()">Repository</button> |
        <button class="link" @click="extension()">Extension</button>
      </span>
      <input
        type="text"
        v-model="url"
        v-if="showExtensionUrlBox"
        class="w-full border rounded-md p-1 shadow-sm"
        placeholder="VS Code Marketplace URL"
      />
      <span v-if="showGitHubUrlBox">
        <input
          type="text"
          v-model="url"
          class="w-3/5 border rounded-md p-1 shadow-sm"
          placeholder="GitHub repository URL"
        />
        <input
          type="text"
          v-model="branch"
          class="w-1/5 border rounded-md p-1 shadow-sm"
          placeholder="branch name"
        />
      </span>
      <span
        v-if="message.length > 0"
        :class="message.length > 0 ? 'fadeout-5sec-delay' : ''"
        class="inline-block mt-1 text-gray-500"
        >{{ message }}</span
      >
    </div>
    <div class="w-1/5">
      <button class="action" v-if="showAddButton" @click="add()">Add</button>
      <span v-if="showSubmitButton">
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
      this.showSubmitButton = false;
      this.showGitHubUrlBox = false;
      this.showExtensionUrlButton = false;
      this.showDecisionButtons = true;
      this.message = '';
    },

    repo() {
      this.showDecisionButtons = false;
      this.showSubmitButton = true;
      this.showGitHubUrlBox = true;
      this.isRepo = true;
      this.isExtension = false;
    },

    extension() {
      this.showDecisionButtons = false;
      this.showSubmitButton = true;
      this.showExtensionUrlBox = true;
      this.isExtension = true;
      this.isRepo = false;
    },

    cancel() {
      this.showAddButton = true;
      this.showSubmitButton = false;
      this.showGitHubUrlBox = false;
      this.showExtensionUrlButton = false;
      this.showExtensionUrlBox = false;
      this.showDecisionButtons = false;
      this.message = '';
    },

    isGitHubURL() {
      return GITHUB_PATTERN.test(this.url);
    },

    isExtensionURL() {
      return VSCODE_MARKETPLACE_PATTERN.test(this.url);
    },

    hasBranchName() {
      return this.branch.length > 0;
    },

    async submit() {
      this.showAddButton = true;
      this.showSubmitButton = false;
      this.showGitHubUrlBox = false;
      this.showExtensionUrlBox = false;

      this.message = '';

      const isValidGitHubURL = this.isGitHubURL() && this.hasBranchName();
      const isValidExtensionURL = this.isExtensionURL();

      if (this.isRepo && !isValidGitHubURL) {
        this.message = 'Enter a GitHub repository URL and branch name.';
      } else if (this.isExtension && !isValidExtensionURL) {
        this.message = 'Enter a VS Code extension marketplace URL.';
      }

      if (this.message.length === 0) {
        try {
          this.message = 'Sending...';
          const response = await api.post('/add', {
            url: this.url,
            branch: this.branch,
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
            this.branch = '';
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

      this.isExtension = false;
      this.isRepo = false;
    },
  },
  data() {
    return {
      url: '',
      branch: '',
      message: '',
      showAddButton: true,
      showSubmitButton: false,
      showGitHubUrlBox: false,
      showExtensionUrlButton: false,
      showExtensionUrlBox: false,
      showDecisionButtons: false,
      isRepo: false,
      isExtension: false,
    };
  },
};
</script>
