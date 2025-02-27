<template>
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
      <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbarCollapse">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Optrak Strategic</a>
      </div>
      <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="nav navbar-nav navbar-right">
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="/view/list">CurrencyTable</a></li>
              <li><a href="/view/nav">DataTable</a></li>
              <li><a href="/view/pivot">PivotTable</a></li>
              <li><a href="/view/map">MapView</a></li>
              <li><a href="/">Login</a></li>
          </ul>
      </div>
    </div>
  </nav>

  <!-- Main Content Section -->
  <div class="container" style="margin-top: 64px; width: 1620px;">
    <div class="row">
      <div class="col-md-12">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>