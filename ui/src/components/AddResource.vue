<template>
  <div class="flex flex-row pt-2">
    <div class="w-3/4 text-right pr-3">
      <input
        type="text"
        v-if="showSearchBox"
        v-model="url"
        class="w-full border rounded-md p-1 shadow-sm"
        placeholder="GitHub or VS Code Marketplace URL"
      />
      <span
        v-if="showMessage"
        class="inline-block mt-1 text-gray-500"
        :class="showMessage ? 'fadeout-5sec-delay' : ''"
      >{{ message }}</span>
    </div>
    <div class="w-1/4">
      <button class="action" v-if="showAddButton" @click="add()">Add</button>
      <button class="action" v-if="showSubmitButton" @click="submit()">Submit</button>
    </div>
  </div>
</template>

<script>
const GITHUB_PATTERN = /https?:\/\/github\.com\//;
const VSCODE_MARKETPLACE_PATTERN = /https:\/\/marketplace\.visualstudio\.com\/items\?itemName=/;

import { api } from "./api";

export default {
  name: "AddResource",
  props: {},
  methods: {
    add() {
      this.showAddButton = false;
      this.showSubmitButton = true;
      this.showSearchBox = true;
      this.showMessage = false;
    },
    isGitHubURL() {
      return this.url.match(GITHUB_PATTERN);
    },
    isExtensionURL() {
      return this.url.match(VSCODE_MARKETPLACE_PATTERN);
    },
    async submit() {
      this.showAddButton = true;
      this.showSubmitButton = false;
      this.showSearchBox = false;
      this.showMessage = false;
      this.message = "";

      const isValid = this.isGitHubURL() || this.isExtensionURL();

      if (isValid) {
        this.showMessage = true;

        try {
          const response = await api.post("/add", {
            url: this.url
          });

          if (response.status === 200) {
            this.message = "Added";
          } else {
            this.message = response.statusText;
          }
        } catch (ex) {
          this.message = ex.message;
        }

        this.showMessage = true;
      } else {
        this.message = "Enter a GitHub or VS Code extension marketplace URL.";
        this.showMessage = true;
      }

      this.url = "";
    }
  },
  data() {
    return {
      url: "",
      message: "",
      showAddButton: true,
      showSubmitButton: false,
      showSearchBox: false,
      showMessage: false
    };
  }
};
</script>
