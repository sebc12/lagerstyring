<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import router from "@/router";

const email = ref("");
const password = ref("");
const message = ref("");

const signin = () => {
  axios
    .post("http://127.0.0.1:8000/api/login", {
      email: email.value,
      password: password.value,
    })
    .then((response) => {
      console.log("response.data", response.data);

      localStorage.setItem("token", response.data.token);

      router.push({ name: "home" });
    })
    .catch((error) => {
      console.error("Error:", error);
      message.value = "Failed to sign in";
    });
};
</script>

<template>
  <div>
    <h1 class="flex justify-center pt-10 text-3xl mb-20">Login</h1>
    <form class="flex flex-col items-center border w-1/4 py-16 m-auto gap-4">
      <label>Email</label>
      <input
        type="email"
        v-model="email"
        class="border border-black rounded p-1"
      />
      <label for="">Password</label>
      <input
        type="password"
        v-model="password"
        class="border border-black rounded p-1 mb-6"
      />

      <button
        @click.prevent="signin"
        class="border bg-green-500 rounded-2xl p-1 px-6 mb-6"
      >
        Signin
      </button>
      <p>{{ message }}</p>
      <router-link class="border rounded-2xl p-1 px-6" to="signup"
        >Signup</router-link
      >
    </form>
  </div>
</template>
