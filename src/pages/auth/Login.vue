<template>
  <div class="panel panel-default auth" style="width: 320px;">
    <div class="panel-body">
      <h2 class="text-center">Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="loginData.email"
            placeholder="Enter Email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="loginData.password"
            placeholder="Enter password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary btn-block">Login</button>
        <p v-if="errorMessage" class="text-danger text-center mt-2">
          {{ errorMessage }}
        </p>
      </form>
      <p class="text-center" style="margin-top: 10px;">
        <a href="#">Forgot password?</a>
      </p>
    </div>
  </div>
</template>
<script lang="ts" src="./Login.ts"></script>
<style scoped>
.auth{
  box-shadow: black;
}
</style>


