<script setup lang="ts">
import router from "@/router";

function logout() {
  localStorage.clear();

  router.push({ name: "login" });
}
</script>

<template>
  <button
    @click="logout"
    class="border border-black rounded-2xl py-1 px-4 hover:bg-red-500"
  >
    Logout
  </button>
</template>
