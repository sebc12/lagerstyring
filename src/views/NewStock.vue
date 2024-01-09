<script setup lang="ts">
import { ref, reactive } from "vue";
import axios from "axios";
import Sidebar from "@/components/Sidebar.vue";
import Menu from "@/components/Menu.vue";

const ProductID = ref(null);
const SerialNumber = ref("");
const Quantity = ref(1);

const message = reactive({
  productID: false,
  error: false,
  success: false,
});

let theSerialNumber = ref(false);

function showSerialNumber() {
  theSerialNumber.value = true;
}

function showNoSerialNumber() {
  theSerialNumber.value = false;
}

function checkInput() {
  resetErrors();
  let validated = true;

  if (!ProductID.value || isNaN(ProductID.value)) {
    message.productID = true;
    validated = false;
  }

  return validated;
}

function clearForm() {
  (ProductID.value = null), (SerialNumber.value = "");
}

function resetErrors() {
  message.productID = false;
  message.error = false;
}

const addProduct = () => {
  if (!checkInput()) {
    return;
  }

  axios
    .post(`http://127.0.0.1:8000/api/product/${ProductID.value}`, {
      SerialNumber: SerialNumber.value,
      LocationID: 1, // Set LocationID to 1
      Quantity: Quantity.value,
    })
    .then((response) => {
      console.log("Details added successfully:", response.data);
      // Optionally, you can reset the form or perform other actions
      clearForm();

      message.success = true;
    })
    .catch((error) => {
      console.error("Error adding details:", error);
      message.error = true;
    });
};
</script>

<template>
  <div class="flex w-screen">
    <Sidebar />
    <div class="py-8 lg:py-0 w-full m-auto px-3 lg:w-4/5">
      <div class="flex">
        <Menu class="flex items-center lg:hidden" />
        <h1 class="m-auto text-3xl font-semibold flex justify-center">
          New Stock
        </h1>
      </div>

      <form class="flex flex-col border py-5 px-2 mt-16 lg:w-3/4 m-auto gap-2">
        <div class="flex gap-5 lg:gap-10 m-auto mb-5">
          <button
            @click.prevent="showNoSerialNumber"
            class="border rounded-3xl lg:w-40 p-2 lg:hover:bg-green-500"
            :class="{
              'bg-green-500': !theSerialNumber,
              'bg-gray-400': theSerialNumber,
            }"
          >
            No Serial Number
          </button>
          <button
            @click.prevent="showSerialNumber"
            class="border rounded-3xl lg:w-40 p-2 lg:hover:bg-green-500"
            :class="{
              'bg-green-500': theSerialNumber,
              'bg-gray-400': !theSerialNumber,
            }"
          >
            SerialNumber
          </button>
        </div>
        <label class="m-auto">Product id</label>
        <input
          v-model="ProductID"
          type="number"
          class="border border-black p-2 lg:w-1/2 lg:m-auto"
        />
        <p v-if="message.productID" class="text-[#FC3193] m-auto">
          Product ID is required
        </p>

        <label v-show="theSerialNumber" for="SerialNumber" class="m-auto">
          SerialNumber
        </label>
        <input
          v-show="theSerialNumber"
          v-model="SerialNumber"
          id="SerialNumber"
          class="border border-black p-2 lg:w-1/2 lg:m-auto"
        />

        <label v-show="!theSerialNumber" for="Quantity" class="m-auto">
          Quantity
        </label>
        <input
          v-model="Quantity"
          v-show="!theSerialNumber"
          class="border border-black p-2 lg:w-1/2 lg:m-auto"
        />

        <button
          type="submit"
          @click.prevent="addProduct"
          class="border rounded-3xl bg-gray-400 hover:bg-green-500 w-40 m-auto p-2 mt-10"
        >
          Add stock
        </button>
        <p class="text-[#FC3193] m-auto" v-if="message.error">
          Error adding stock
        </p>
        <p v-if="message.success" class="text-2xl text-green-500 m-auto mt-4">
          Product added
        </p>
      </form>
    </div>
  </div>
</template>
