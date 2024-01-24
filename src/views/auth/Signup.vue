<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import router from "@/router";

const email = ref("");
const password = ref("");
const LocationID = ref(null);
const message = ref("");

const signup = () => {
  axios
    .post("http://127.0.0.1:8000/api/register", {
      email: email.value,
      password: password.value,
      LocationID: LocationID.value,
    })
    .then((response) => {
      console.log("response.data", response.data);
      message.value = response.data.message;
      router.push({ name: "login" });
    })
    .catch((error) => {
      console.error("Error:", error);
      message.value = "Failed to signup";
    });
};
</script>

<template>
  <div>
    <h1 class="flex justify-center pt-10 text-3xl mb-20">Signup</h1>
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
        class="border border-black rounded p-1"
      />
      <label for="">Workplace</label>
      <select v-model="LocationID" class="border border-black rounded mb-16">
        <option value="">Select</option>
        <option value="1">Warehouse</option>
        <option value="2">Store 1</option>
      </select>
      <button
        @click.prevent="signup"
        class="border bg-green-500 rounded-2xl p-1 px-6"
      >
        Signup
      </button>
      <p>{{ message }}</p>
    </form>
  </div>
</template>
