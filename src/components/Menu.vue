<script setup lang="ts">
import { store } from "@/stores/menu";
</script>

<template>
  <header>
    <h3 class="text-3xl" @click.prevent="store.sidebarIsOpen = true">☰</h3>
  </header>
</template>
