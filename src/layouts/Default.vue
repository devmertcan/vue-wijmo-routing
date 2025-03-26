<template>
  <nav class="navbar navbar-default navbar-fixed-top nav-shadow" style="background-color: #0a476f;">
    <div class="container">
      <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbarCollapse">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand header-content" href="#" style="color: #f37319;">Optrak Strategic</a>
      </div>
      <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="nav navbar-nav navbar-right">
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="/view/list">CurrencyTable</a></li>
              <li><a href="/view/nav">DataTable</a></li>
              <!-- <li><a href="/view/pivot">PivotTable</a></li> -->
              <!-- <li><a href="/view/map">MapView</a></li> -->
              <!-- <li><a href="/view/side">Side by Side</a></li> -->
              <li><a href="/manage/tags">Tag Management</a></li>
              <li><a href="/">Logout</a></li>
          </ul>
      </div>
    </div>
  </nav>

  <!-- Main Content Section -->
  <div class="container-fluid" style="padding-top: 7rem; ">
    <div class="row">
      <div class="col-md-12">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-content{
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}
.nav-shadow{
  filter: drop-shadow(2px 5px 3px gray);
}
</style>