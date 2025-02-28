import "@mescius/wijmo.touch";
import * as wjCore from "@mescius/wijmo";
import { InputDate, InputTime } from "@mescius/wijmo.input";
import { DataMap, FlexGrid } from "@mescius/wijmo.grid";
import { CellMaker, SparklineMarkers } from "@mescius/wijmo.grid.cellmaker";
import { Country, DataService, KeyValue } from "@/data/data";
import { ref, watch, onMounted, defineComponent } from "vue";

export default defineComponent({
  name: "WijmoTable",
  setup() {
    const isDarkMode = ref(false);
    const options = [5, 50, 500, 5000, 50000, 100000];
    const itemsCount = ref(50);
    const dataService = ref(new DataService());
    const flex = ref(null);
    const groupPanel = ref(null);
    const search = ref(null);
    const _lastId = ref(itemsCount.value);
    const colorMap = ref(new DataMap(dataService.value.getColors(), "id", "value"));
    const productMap = ref(new DataMap(dataService.value.getProducts(), "id", "name"));
    const countryMap = ref(new DataMap(dataService.value.getCountries(), "id", "name"));
    const editors = ref({
      inputDate: new InputDate(document.createElement("div"), { format: "MM/dd/yyyy", isRequired: false }),
      inputTime: new InputTime(document.createElement("div"), { format: "HH:mm", isRequired: false }),
    });

    // Dark Mode Toggle Function
    // function toggleDarkMode() {
    //   isDarkMode.value = !isDarkMode.value;
    //   localStorage.setItem("darkMode", isDarkMode.value.toString());
    //   document.body.classList.toggle("dark-mode", isDarkMode.value);
    // }

    onMounted(() => {
      const savedTheme = localStorage.getItem("darkMode");
      if (savedTheme === "true") {
        isDarkMode.value = true;
        document.body.classList.add("dark-mode");
        document.body.classList.remove("light-mode");
      } else {
        isDarkMode.value = false;
        document.body.classList.add("light-mode");
        document.body.classList.remove("dark-mode");
      }
    });

    watch(itemsCount, (newItemsCount) => {
      if (flex.value !== null) {
        (flex.value as FlexGrid).itemsSource.collectionChanged.removeAllHandlers();
      }
      _lastId.value = newItemsCount;
      if (flex.value !== null) {
        (flex.value as FlexGrid).itemsSource = _createItemsSource(newItemsCount);
      }
    });

    watch(isDarkMode, (newValue) => {
      if (newValue) {
        document.body.classList.add("dark-mode");
        document.body.classList.remove("light-mode");
        localStorage.setItem("darkMode", "true");
      } else {
        document.body.classList.add("light-mode");
        document.body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "false");
      }
    });

    // Search Bar Initialization
    function searchInitialized(ctl: null) {
      search.value = ctl;
      if (search.value) {
        search.value.grid = flex.value;
      }
    }

    // Group Panel Initialization
    function groupPanelInitialized(ctl: null) {
      groupPanel.value = ctl;
      if (groupPanel.value) {
        groupPanel.value.grid = flex.value;
      }
    }

    // Grid Initialization
    function gridInitialized(ctl: null) {
      flex.value = ctl;
      if (flex.value !== null) {
        (flex.value as FlexGrid).itemsSource = _createItemsSource(itemsCount.value);
      }
      if (groupPanel.value) {
        groupPanel.value.grid = flex.value;
      }
      if (search.value) {
        search.value.grid = flex.value;
      }
    }

    // Get Country Function
    function getCountry(item: { countryId: any; }) {
      const country = countryMap.value.getDataItem(item.countryId);
      return country ? country : Country.NotFound;
    }

    // Get Color Function
    function getColor(item: { colorId: any; }) {
      const color = colorMap.value.getDataItem(item.colorId);
      return color ? color : KeyValue.NotFound;
    }

    // Get Change Class for Styling
    function getChangeCls(value: number) {
      if (wjCore.isNumber(value)) {
        return value > 0 ? "change-up" : value < 0 ? "change-down" : "";
      }
      return "";
    }

    // Currency Formatting Helper
    function safeCurrency(value: number | null | undefined) {
      if (wjCore.isNumber(value)) {
        return wjCore.Globalize.formatNumber(value, "c");
      }
      return value !== null && value !== undefined ? String(value) : "";
    }

    // History Cell Template
    const historyCellTemplate = ref(CellMaker.makeSparkline({
      markers: SparklineMarkers.High | SparklineMarkers.Low,
      maxPoints: 25,
      label: "price history",
    }));

    // Rating Cell Template
    const ratingCellTemplate = ref(CellMaker.makeRating({
      range: [1, 5],
      label: "rating",
    }));

    // Create Grid Data Source
    function _createItemsSource(counter: number) {
      const data = dataService.value.getData(counter);
      const view = new wjCore.CollectionView(data, {
        getError: function (item: any, prop: any) {
          const displayName = (flex.value as unknown as FlexGrid).columns.getColumn(prop).header;
          return dataService.value.validate(item, prop, displayName);
        },
      });

      view.collectionChanged.addHandler((s, e) => {
        if (e.action === wjCore.NotifyCollectionChangedAction.Add) {
          e.item.history = dataService.value.getHistoryData();
          e.item.id = counter++;
        }
      });

      return view;
    }

    return {
      isDarkMode,
      options,
      itemsCount,
      colorMap,
      productMap,
      countryMap,
      editors,
      flex,
      groupPanel,
      search,
      searchInitialized,
      groupPanelInitialized,
      gridInitialized,
      getCountry,
      getColor,
      getChangeCls,
      safeCurrency,
      historyCellTemplate,
      ratingCellTemplate,
    };
  },
});
