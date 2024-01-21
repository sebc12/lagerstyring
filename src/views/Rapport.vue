<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import Menu from "@/components/Menu.vue";
import axios from "axios";
import { ref } from "vue";

interface details {
  ProductID: number;
  SerialNumber: string;
}

interface Product {
  ProductID: number;
  SerialNumber: string;
  LocationID: number;
  Quantity: number;
  details: details;
}

const products = ref<Product[] | null>(null);

const getReport = () => {
  axios
    .get("http://127.0.0.1:8000/api/rapport")
    .then((response) => {
      console.log("response.data", response.data);
      products.value = response.data;
    })
    .catch((error) => {});
};
</script>

<template>
  <div class="flex w-screen">
    <Sidebar />
    <div class="py-10 lg:py-0 w-full px-3 lg:w-4/5">
      <div class="flex pt-10">
        <Menu class="flex items-center lg:hidden" />
        <h1 class="m-auto text-3xl font-semibold flex justify-center">
          Create Product
        </h1>
      </div>
      <div class="flex justify-center mt-24 mb-24">
        <button
          @click="getReport"
          class="border rounded-2xl p-2 px-4 bg-green-500"
        >
          Get Report
        </button>
      </div>
      <div class="pb-10">
        <table
          class="m-auto lg:w-2/4 border-separate border-spacing-2 border border-slate-500"
        >
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Serial Number</th>
              <th>Location ID</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products">
              <td>{{ product.ProductID }}</td>
              <td v-if="product.details">{{ product.details.SerialNumber }}</td>
              <td v-else>N/A</td>
              <td>{{ product.LocationID }}</td>
              <td>{{ product.Quantity }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
