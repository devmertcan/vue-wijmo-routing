import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Login",
  setup() {
    const loginData = reactive({
      email: "",
      password: ""
    });
    // const email = ref("");
    // const password = ref("");
    const errorMessage = ref("");
    const router = useRouter();

    const login = () => {
      if (loginData.email === "user@example.com" && loginData.password === "password") {
        sessionStorage.removeItem("jsonData");
        router.push("/view/nav"); // Redirect to list view after successful login
      } else {
        errorMessage.value = "Invalid credentials. Try again.";
      }
    };

    return {
      loginData,
      errorMessage,
      login,
    };
  },
});