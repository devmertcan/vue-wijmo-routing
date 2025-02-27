<!-- <template>
  <div>
    <div class="row">
      <div class="col-md-4">
        <div class="panel panel-default">
          <div class="panel-body">
            <wj-tree-view
              :items-source="treeData"
              display-member-path="header"
              child-items-path="items"
            ></wj-tree-view>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <h4>Selected Dataset ID:</h4>
        <div v-if="selectedDatasetId">
          <p>{{ selectedDatasetId }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "NavView",
  setup() {
    const treeData = ref([]);
    const selectedDatasetId = ref(null);
    // Function to fetch and transform dataset into TreeView format
    const fetchData = async () => {
      try {
        const response = await fetch("https://office.optrak.com/dev/strategic/d/tenant"); // Update with your API path
        const jsonData = await response.json();
        treeData.value = transformData(jsonData.projects[0].directories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Transform JSON data into TreeView format
    const transformData = (directories) => {
      return directories.map((dir) => ({
        header: dir.directoryName,
        items: [
          ...dir.datasets.map((dataset) => ({
            header: dataset.datasetLabel,
            datasetId: dataset.datasetId, // Store datasetId for retrieval
          })),
          ...transformData(dir.children), // Recursively process subdirectories
        ],
      }));
    };

    const onNodeClick = (treeView, e) => {
      console.log("TreeView Instance:", treeView);
      console.log("Event Object:", e);

      // Access datasetId from `wj-Data-Item`
      const clickedNode = e.srcElement?.['$WJ_TV_NODE']; // Get the Wijmo node object
      if (clickedNode && clickedNode['wj-Data-Item']) {
        selectedDatasetId.value = clickedNode['wj-Data-Item'].datasetId || null;
        console.log("Selected Dataset ID:", selectedDatasetId.value);
      } else {
        selectedDatasetId.value = null;
      }
    };

    onMounted(fetchData);

    return {
      treeData,
      selectedDatasetId,
      onNodeClick,
    };
  },
});
</script> -->
