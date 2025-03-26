 <template>
  <div>
    <div class="row">
      <div class="col-md-4">
        <h1 class="text-center mb-4">📂 Dataset Selection</h1>
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link" 
              :class="{
                active: selectionMode === 'tree', 
                'custom-tree-class': selectionMode === 'tree'  // Add custom class when 'tree' is selected
              }"
              @click="handleSelectionModeChange('tree')"
            >
              Tree
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" 
              :class="{ 
                active: selectionMode === 'tag', 
                'custom-tag-class': selectionMode === 'tag'  // Add custom class when 'tag' is selected
              }"
              @click="handleSelectionModeChange('tag')"
            >
              Tag
            </a>
          </li>
        </ul>

        <div class="panel panel-default">
          <div class="panel-body">
            <h1 class="text-center mb-4" v-if="loading">Fetching Dataset...</h1>
            <DataSelection
              v-if= "selectionMode === 'tree' && jsonData"
              :directories="jsonData.projects[0].directories"
              @selected="handleSelection"
            />
            <div v-if="selectionMode === 'tag'">
              <label for="tagSelect">Tags:</label>
              <select id="tagSelect" class="form-control" v-model="selectedTag">
                <option disabled value="">Choose a tag</option>
                <option v-for="tag in tagsList" :key="tag" :value="tag">
                  {{ tag }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div v-if="selectionMode !== 'tag'" style="display: flex; justify-content: center">
          <button
            class="btn btn-success ml-3"
            style="width: 300px"
            @click="navigateToSummary"
          >
            Fetch Data
          </button>
        </div>
      </div>
      <div class="col-md-8">
        <h2 class="text-center">📋 Dataset Table</h2>
        <div class="table-responsive">
          <wj-flex-grid
            ref="gridRef"
            :items-source="computedData"
            :autoGenerateColumns="false"
            :allowAddNew="false"
            :allowDelete="true"
            :allowDragging="'Both'"
            :allowResizing="'Columns'"
            :allowPinning="'SingleColumn'"
            :newRowAtTop="true"
            :showMarquee="true"
            :selectionMode="'MultiRange'"
            :validateEdits="true"
            @loaded-rows="restoreColumnSettings"
          >
            <wj-flex-grid-filter :filterColumns="columnsFiltering" />
            <wj-flex-grid-column
              :width="242"
              v-for="column in columns"
              :key="column.binding"
              :header="column.header"
              :binding="column.binding"
            ></wj-flex-grid-column>
          </wj-flex-grid>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from "vue-router";
  import DataSelection from "@/components/DataSelection.vue";
  import { computed, nextTick, onMounted, ref, watch, watchEffect } from "vue";
  import DatasetLabel from '@/script/DatasetLabel';
  import { useQuery } from "@vue/apollo-composable";
  import { GET_TAGS } from "@/graphql/graphqlsummaries";

  const router = useRouter();
  const columns = DatasetLabel.columns;
  const columnsFiltering = DatasetLabel.columnsFiltering;
  const jsonData = ref<any>(null);
  const availableDatasetIds = ref<string[]>([]);
  const selectedDatasetIds = ref<string[]>([]);
  const tagsList = ref([]);
  const selectedTag = ref("");
  const loading = ref(false);
  const gridRef = ref<any>(null);
  const selectionMode = ref<'tree' | 'tag'>('tree');
  
  // Fetch data function
  const fetchData = async () => {
    const cachedData = sessionStorage.getItem("jsonData");
    if (cachedData) {
      jsonData.value = JSON.parse(cachedData);
      return;
    }
    loading.value = true;
    try {
      const response = await fetch("/api", {
        headers: {
          Authorization: "Basic " + btoa("strategic:EcP4YFUEIvZC"),
        },
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      jsonData.value = await response.json();
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      loading.value = false;
    }
  };

  const computedData = computed(() =>
    (availableDatasetIds.value || []).slice(0, 100000).map((item, index) => ({
      id: index, // Auto-incrementing ID column
      ...(typeof item === 'object' && item !== null ? item : {}),
    }))
  );

  // Fetch tag function
  const fetchTag = async() => {  
    const { result } = useQuery(GET_TAGS, () => ({ where: "" }));
    watchEffect(() => {
      if (result.value) {
        tagsList.value = result.value.tags.map((t: { tag: any; }) => t.tag);
      }
    });
  }
 
  // Handle dataset selection
  const handleSelection = (selectedIds: string[]) => {
    availableDatasetIds.value = selectedIds;
    selectedDatasetIds.value = availableDatasetIds.value;
    // Construct GraphQL Query
    const graphqlQuery = `
      query {
        getDatasets(ids: [${selectedIds.map((id) => `"${id}"`).join(", ")}]) {
          datasetId
          datasetLabel
          createdAt
          createdBy
          lastModified
        }
      }
    `;
    console.log("Generated GraphQL Query:", graphqlQuery);
  };
  
  const saveColumnSettings = () => {
    if (!gridRef.value) return;
    const grid = gridRef.value.control;
    if (!grid) return;
    
    const columnSettings = grid.columns.map((col: { binding: any; width: any; }) => ({
      binding: col.binding,
      width: col.width,
      index: grid.columns.indexOf(col),
    }));
    
    localStorage.setItem("gridColumnSettings", JSON.stringify(columnSettings));
  };
  
  const restoreColumnSettings = async () => {
    if (!gridRef.value) {
      setTimeout(restoreColumnSettings, 500); // Retry if grid not ready
      return;
    }
    const grid = gridRef.value.control;
    if (!grid) return;
    const storedSettings = localStorage.getItem("gridColumnSettings");
    if (!storedSettings) return;
    const columnSettings = JSON.parse(storedSettings);
    // Restore column width
    columnSettings.forEach((setting: { binding: any; width: any; }) => {
      const column = grid.columns.find((col: { binding: any; }) => col.binding === setting.binding);
      if (column) column.width = setting.width;
    });
    // Restore column order
    columnSettings.sort((a: { index: number; }, b: { index: number; }) => a.index - b.index).forEach((setting: { binding: any; }, index: any) => {
      const column = grid.columns.find((col: { binding: any; }) => col.binding === setting.binding);
      if (column) grid.columns.moveElement(grid.columns.indexOf(column), index);
    });
    grid.selectionMode = 'MultiRange';
  };

  // Navigate to summary
  const navigateToSummary = () => {
    sessionStorage.setItem("jsonData", JSON.stringify(jsonData.value)); // Store data

    const datasetIds = selectedDatasetIds.value.map((dataset) => dataset.datasetId);
    console.log(datasetIds)
    if (datasetIds.length > 0) {
      router.push(`/view/summary/${datasetIds.join(",")}`);
    }
  };

  const handleSelectionModeChange = (mode : any) => {
    selectionMode.value = mode
  }

  onMounted(async () => {
    fetchData();
    fetchTag();
    handleSelectionModeChange('tree')
    await nextTick(); 
    if (!gridRef.value || !gridRef.value.control) {
      console.warn("⚠️ GridRef is not ready, retrying...");
      setTimeout(() => {
        if (gridRef.value && gridRef.value.control) {
          initializeGrid(gridRef.value.control);
        }
      }, 500);
      return;
    }
    initializeGrid(gridRef.value.control);
  });
  const initializeGrid = (grid: any) => {
    grid.selectionMode = 'MultiRange';
    grid.resizedColumn.addHandler(saveColumnSettings);
    grid.draggedColumn.addHandler(saveColumnSettings);
    restoreColumnSettings(); 
  };

</script>

<style scoped>
.custom-tree-class {
  background-color: #f7f7f7;  /* Green background for Tree tab */
  color: rgb(0, 0, 0);  /* White text color */
  font-weight: bold;  /* Bold text */
}

.custom-tag-class {
  background-color: #f2f4f7;  /* Blue background for Tag tab */
  color: rgb(0, 0, 0);  /* White text color */
  font-weight: bold;  /* Bold text */
}
.nav-tabs>li>a{
  cursor: pointer;
}
</style>