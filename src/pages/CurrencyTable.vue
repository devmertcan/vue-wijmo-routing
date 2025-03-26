<template>
  <div>
    <div :class="{ 'dark-mode': isDarkMode }">
      <div class="row" style="display: flex; justify-content: center; padding-top: 5rem">
        <div class="toolbar-item col-sm-3 col-md-5">
          <wj-flex-grid-search
            placeholder="Search"
            cssMatch=""
            :initialized="searchInitialized"
            style="padding: 2px"
          />
        </div>
        <div class="toolbar-item col-sm-3 col-md-3">
          <div class="input-group">
            <span class="input-group-addon">Items:</span>
            <select class="form-control" v-model="itemsCount">
              <option v-for="option in options" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <wj-group-panel
          :class="{ 'dark-mode': isDarkMode }"
          :placeholder="'Drag columns here to create groups'"
          :initialized="groupPanelInitialized"
        >
          <div class="toggle-container">
            <label class="switch">
              <input type="checkbox" v-model="isDarkMode" />
              <span class="slider"></span>
            </label>
            <span>{{ isDarkMode ? "Dark Mode" : "Light Mode" }}</span>
          </div>
        </wj-group-panel>
      </div>

      <wj-flex-grid
        :autoGenerateColumns="false"
        :allowAddNew="true"
        :allowDelete="true"
        :allowPinning="'SingleColumn'"
        :newRowAtTop="true"
        :showMarquee="true"
        :selectionMode="'MultiRange'"
        :validateEdits="false"
        :initialized="gridInitialized"
      >
        <wj-flex-grid-filter
          :filterColumns="[
            'id',
            'date',
            'time',
            'countryId',
            'productId',
            'colorId',
            'price',
            'change',
            'discount',
            'rating',
            'active',
          ]"
        />

        <wj-flex-grid-column binding="id" header="ID" :width="70" :isReadOnly="true" />
        <wj-flex-grid-column
          binding="date"
          header="Date"
          format="MMM d yyyy"
          :isRequired="false"
          :width="130"
          :editor="editors.inputDate"
        >
        </wj-flex-grid-column>
        <wj-flex-grid-column
          binding="countryId"
          header="Country"
          :dataMap="countryMap"
          :width="145"
        >
          <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
            <span :class="'flag-icon flag-icon-' + getCountry(cell.item).flag"></span>
            {{ getCountry(cell.item).name }}
          </wj-flex-grid-cell-template>
        </wj-flex-grid-column>
        <wj-flex-grid-column
          binding="price"
          header="Price"
          format="c"
          :isRequired="false"
          :width="100"
        />
        <wj-flex-grid-column
          binding="history"
          header="History"
          :width="180"
          align="center"
          :allowSorting="false"
          :cellTemplate="historyCellTemplate"
        >
        </wj-flex-grid-column>
        <wj-flex-grid-column binding="change" header="Change" align="center" :width="115">
          <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
            <span :class="getChangeCls(cell.item.change)">
              {{ safeCurrency(cell.item.change) }}
            </span>
          </wj-flex-grid-cell-template>
        </wj-flex-grid-column>
        <wj-flex-grid-column
          binding="rating"
          header="Rating"
          :width="180"
          align="center"
          cssClass="cell-rating"
          :cellTemplate="ratingCellTemplate"
        >
        </wj-flex-grid-column>
        <wj-flex-grid-column
          binding="time"
          header="Time"
          format="HH:mm"
          :isRequired="false"
          :width="95"
          :editor="editors.inputTime"
        >
        </wj-flex-grid-column>
        <wj-flex-grid-column
          binding="colorId"
          header="Color"
          :dataMap="colorMap"
          :width="145"
        >
          <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
            <span
              class="color-tile"
              :style="{ background: getColor(cell.item).value }"
            ></span>
            {{ getColor(cell.item).value }}
          </wj-flex-grid-cell-template>
        </wj-flex-grid-column>
        <wj-flex-grid-column
          binding="productId"
          header="Product"
          :dataMap="productMap"
          :width="145"
        />
        <wj-flex-grid-column
          binding="discount"
          header="Discount"
          format="p0"
          :width="130"
        />
        <wj-flex-grid-column binding="active" header="Active" :width="100" />
      </wj-flex-grid>
    </div>
  </div>
</template>
<script lang="ts" src="@/script/WijmoTable"></script>
<style scoped src="../css/wijmotable.css"></style>
