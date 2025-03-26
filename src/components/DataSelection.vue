<template>
    <div>
      <wj-tree-view v-for="directory in directories" :key="directory.directoryId">
        <span @click="toggleExpand(directory.directoryId)" class="toggle-icon">
          <i :class="expanded[directory.directoryId] ? 'wj-glyph-down' : 'wj-glyph-right'"></i>
        </span>
        <strong>{{ directory.directoryName }}</strong>
        <ul v-show="expanded[directory.directoryId]">
          <wj-tree-view v-for="dataset in directory.datasets" :key="dataset.datasetId">
            <input type="checkbox" :value="dataset.datasetId" @change="toggleSelection(dataset)" />
            {{ dataset.datasetLabel}}
          </wj-tree-view>
          <DataSelection v-if="directory.children.length" :directories="directory.children" @selected="emit('selected', $event)" />
        </ul>
      </wj-tree-view>
    </div>
    <button class="btn mt-3" @click="handleSelect">Select</button>
</template>

<script setup lang="ts">
  import { ref, defineEmits} from "vue";
  import DataSelection from "../components/DataSelection.vue";

  interface Dataset {
    datasetId: string;
    datasetLabel: string;
  }
  interface Directory {
    directoryId: string;
    directoryName: string;
    datasets: Dataset[];
    children: Directory[];
  }
  const props = defineProps<{ directories: Directory[] }>();
  const emit = defineEmits(["selected"]);
  const expanded = ref<{ [key: string]: boolean }>({});
  const selectedDatasets = ref<Set<string>>(new Set());

  // Toggle selection of datasets
  const toggleSelection = (dataset: string) => {
    if (selectedDatasets.value.has(dataset)) {
      selectedDatasets.value.delete(dataset);
    } else {
      selectedDatasets.value.add(dataset);
    }
  };
  // Emit selected datasets
  const handleSelect = () => {
    emit("selected", Array.from(selectedDatasets.value));
  };

  // Toggle expand/collapse state
  const toggleExpand = (directoryId: string) => {
    expanded.value[directoryId] = !expanded.value[directoryId];
  };
</script>

<style scoped>
  .tree-list {
    list-style: none;
    padding-left: 10px;
  }
  .toggle-icon {
    cursor: pointer;
    margin-right: 5px;
  }
  button {
    margin-top: 10px;
    color: white;
    background-color: #111b26;
  }
</style>
