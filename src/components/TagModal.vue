<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="panel panel-default" style="width: 500px; border-radius: 10px;">
      <div class="panel-body">
        <button class="close" @click="closeModal">&times;</button>
        <h2 class="text-center">Tag Management</h2>

        <!-- Input field to add a tag -->
        <div class="form-group">
          <div class="col-sm-10" style="padding-bottom: 2rem;">
            <label for="email">Select DatasetID:</label>
              <select class="form-control" v-model="selectedDatasetId" @change="fetchSummaries">
                  <option disabled value="">Select a DatasetID</option>
                  <option v-for="dataset in datasets" :key="dataset.datasetId" :value="dataset.datasetId">
                      {{ dataset.datasetId || "No Data" }}
                  </option>
              </select>
          </div>
          <div class="col-sm-10">
            <label for="email">Add Tag:</label>
            <input class="form-control" v-model="tagName" placeholder="Add Tag" />
          </div>
          <div class="col-sm-2">
            <label></label>
            <button class="btn btn-primary btn-block" @click="handleAddTag">+</button>
          </div>
        </div>

        <!-- Displaying the tag list -->
        <div class="form-group">
          <div class="col-sm-12"  style="padding-top: 3rem;">
            <ul class="row" v-if="tags.length > 0 " v-for="(tag, index) in tags" 
              :key="index" style="background-color: #f8f9fa; filter: drop-shadow(1px 5px 4px gray); border-radius: 10px; padding: 6px 5px 6px;">
              <label class="col-sm-11">
                {{ tag || "No Tags" }}
              </label>
              <button class="col-sm-1 btn btn-danger" @click="handleDeleteTag(tag)" style="width: 35px; height: 25px; padding: 0;">🗑</button>
            </ul>
            <ul v-else>No Tags</ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { ADD_TAG, DELETE_TAG } from "@/graphql/graphqltag";
import apolloClient from "@/apollo/apollotrip"; // Import Apollo client
import { GET_SUMMARIES } from "@/graphql/graphqlsummaries";

  export default {
  name: "TagModal",
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      tags: [],
      datasets: [],
      tagName: "",
      selectedDatasetId: ""
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    async fetchDatasets() {
      try {
        const response = await fetch("/api", {
          headers: {
            Authorization: "Basic " + btoa("strategic:EcP4YFUEIvZC")
          }
        });
        const jsonData = await response.json();
        this.datasets = jsonData?.projects?.flatMap((project) =>
          project.directories?.flatMap((directory) => directory.datasets)
        ) || [];
      } catch (error) {
        console.error("Error fetching datasets:", error);
      }
    },
    
    async fetchSummaries() {
      if (!this.selectedDatasetId) return;
      const datasetIds = this.selectedDatasetId;
      try {
        const response = await apolloClient.query({
          query: GET_SUMMARIES,
          variables: { datasetIds }
        });
        const summaries = response?.data?.summaries || [];
        console.log(summaries)
        if (summaries.length > 0) {
          const tagsForDataset = summaries[0].tags || [];
          this.tags = tagsForDataset;
        } else {
          console.log(`No summaries found for datasetId: ${datasetId}`);
        }
      } catch (error) {
        console.error("Error fetching summaries:", error);
      }
    },
    async handleAddTag() {
      if (!this.tagName.trim()) return;
      if (!this.selectedDatasetId) {
        console.error("Dataset ID is missing!");
        return;
      }
      try {
        await apolloClient.mutate({
          mutation: ADD_TAG,
          variables: {
            tag: this.tagName,
            datasetId: [this.selectedDatasetId]
          },
          refetchQueries: [{
            query: GET_SUMMARIES,
            variables: { datasetIds: this.selectedDatasetId }
          }]
        });
        if (!Array.isArray(this.tags)) {
          this.tags = [];  // Initialize it as an empty array if it's not an array
        }
        if (Object.isFrozen(this.tags)) {
          console.warn("tags.value was frozen, replacing it with a new array.");
          this.tags = [...this.tags]; // Create a new mutable array
        }
        this.tags.push(this.tagName);
        this.tagName = "";
      } catch (error) {
        console.error("Error adding tag:", error);
      }
    },
    async handleDeleteTag(tagToDelete) {
      try {
        await apolloClient.mutate({
          mutation: DELETE_TAG,
          variables: {
            datasetId: this.selectedDatasetId,
            tag: tagToDelete
          },
          refetchQueries: [{
            query: GET_SUMMARIES,
            variables: { datasetId: this.selectedDatasetId }
          }]
        });
        this.tags = this.tags.filter(tag => tag !== tagToDelete);
      } catch (err) {
        console.error("Error deleting tag:", err);
      }
    }
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.fetchDatasets();
      }
    },
    selectedDatasetId(newVal) {
      if (newVal) {
        this.fetchSummaries();
      }
    }
  },
  mounted() {
    if (this.isOpen) {
      this.fetchDatasets();
    }
  }
  };

</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); /* Ensure background darkens */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* Ensure it's above other elements */
}
@media (min-width: 200px) {
   .modal-overlay{
    flex: 1 1 45%;
    width: 100vw;
   } 
}
</style>
