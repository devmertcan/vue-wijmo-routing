<template>
  <div class="panel panel-default" style="width: 320px;">
    <div class="panel-body">
      <h2 class="text-center">Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="email"
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
            v-model="password"
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

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Login",
  setup() {
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const router = useRouter();

    const login = () => {
      if (email.value === "user@example.com" && password.value === "password") {
        router.push("/view/list"); // Redirect to list view after successful login
      } else {
        errorMessage.value = "Invalid credentials. Try again.";
      }
    };

    return {
      email,
      password,
      errorMessage,
      login,
    };
  },
});
</script>

