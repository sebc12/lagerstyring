<script setup lang="ts">
import { useRouter } from "vue-router";
import { store } from "@/stores/menu";
import Logout from "../components/Logout.vue";

const router = useRouter();
</script>

<template>
  <div
    v-click-away="() => (store.sidebarIsOpen = false)"
    :class="{ '-translate-x-full transition': !store.sidebarIsOpen }"
    class="h-screen w-2/3 bg-gray-500 lg:h-auto fixed top-0 left-0 lg:basis-2/12 lg:transform-none lg:static overflow-auto"
  >
    <div
      class="h-screen flex flex-col justify-center items-center text-2xl gap-10"
    >
      <router-link @click="store.sidebarIsOpen = false" :to="{ name: 'home' }"
        >Search</router-link
      >

      <router-link
        @click="store.sidebarIsOpen = false"
        :to="{ name: 'newStock' }"
        >New stock</router-link
      >
      <router-link
        @click="store.sidebarIsOpen = false"
        :to="{ name: 'transaktion' }"
        >Transfer</router-link
      >
      <router-link
        @click="store.sidebarIsOpen = false"
        :to="{ name: 'createProduct' }"
        >Create Product</router-link
      >
      <router-link
        @click="store.sidebarIsOpen = false"
        :to="{ name: 'rapport' }"
        class="mb-24"
        >Report</router-link
      >
      <logout class="text-xl" />
    </div>
  </div>
</template>
