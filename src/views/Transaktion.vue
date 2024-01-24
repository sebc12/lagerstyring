<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import Menu from "@/components/Menu.vue";
import axios from "axios";
import { ref, reactive } from "vue";

const productID = ref(null);
const serialNumber = ref("");
const fromLocation = ref(null);
const toLocation = ref(null);
const quantity = ref(1);
const message = reactive({
  productID: false,
  fromLocation: false,
  toLocation: false,
  error: false,
  success: false,
});

function checkInput() {
  resetErrors();
  let validated = true;

  if (!productID.value || isNaN(productID.value)) {
    message.productID = true;
    validated = false;
  }
  if (!fromLocation.value || isNaN(fromLocation.value)) {
    message.fromLocation = true;
    validated = false;
  }
  if (!toLocation.value || isNaN(toLocation.value)) {
    message.toLocation = true;
    validated = false;
  }

  return validated;
}

function clearForm() {
  (productID.value = null),
    (fromLocation.value = null),
    (toLocation.value = null),
    (serialNumber.value = ""),
    (quantity.value = 1);
}

function resetErrors() {
  message.productID = false;
  message.fromLocation = false;
  message.toLocation = false;
  message.error = false;
}

let theSerialNumber = ref(false);

function showSerialNumber() {
  theSerialNumber.value = true;
}

function showNoSerialNumber() {
  theSerialNumber.value = false;
}

const transaktion = () => {
  if (!checkInput()) {
    return;
  }
  axios
    .post("http://127.0.0.1:8000/api/move-product", {
      ProductID: productID.value,
      SerialNumber: serialNumber.value,
      FromLocationID: fromLocation.value,
      ToLocationID: toLocation.value,
      QuantityMoved: quantity.value,
    })
    .then((response) => {
      console.log("Product added successfully:", response.data);
      message.success = true;
    })
    .catch((error) => {
      console.error("Error adding product:", error);
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
          Transfer
        </h1>
      </div>
      <form class="flex flex-col border py-5 px-2 mt-16 lg:w-3/4 m-auto gap-2">
        <div class="flex gap-10 m-auto mb-5">
          <button
            @click.prevent="showNoSerialNumber"
            class="border rounded-3xl w-40 p-2 hover:bg-green-500"
            :class="{
              'bg-green-500': !theSerialNumber,
              'bg-gray-400': theSerialNumber,
            }"
          >
            No Serial Number
          </button>
          <button
            @click.prevent="showSerialNumber"
            class="border rounded-3xl w-40 p-2 hover:bg-green-500"
            :class="{
              'bg-green-500': theSerialNumber,
              'bg-gray-400': !theSerialNumber,
            }"
          >
            SerialNumber
          </button>
        </div>
        <label for="ProductID" class="m-auto">Product id</label>
        <input
          v-model="productID"
          required
          type="number"
          class="border border-black p-2 lg:w-1/2 lg:m-auto"
        />
        <p v-if="message.productID" class="text-[#FC3193] m-auto">Error</p>

        <label v-show="theSerialNumber" class="m-auto">SerialNumber</label>
        <input
          v-model="serialNumber"
          v-show="theSerialNumber"
          type="text"
          class="border border-black p-2 lg:w-1/2 lg:m-auto"
        />

        <label class="m-auto">From location</label>
        <input
          v-model="fromLocation"
          required
          type="number"
          class="border border-black p-2 lg:w-1/2 lg:m-auto"
        />
        <p v-if="message.fromLocation" class="text-[#FC3193] m-auto">Error</p>

        <label class="m-auto">To location</label>
        <input
          v-model="toLocation"
          required
          class="border border-black p-2 lg:w-1/2 lg:m-auto"
        />
        <p v-if="message.toLocation" class="text-[#FC3193] m-auto">Error</p>

        <label v-show="!theSerialNumber" class="m-auto">Quantity:</label>
        <input
          v-model="quantity"
          v-show="!theSerialNumber"
          class="border border-black p-2 lg:w-1/2 lg:m-auto"
        />

        <button
          @click.prevent="transaktion"
          type="submit"
          class="border rounded-3xl bg-gray-400 hover:bg-green-500 w-40 m-auto p-2 mt-10"
        >
          Move Product
        </button>
        <p v-if="message.success" class="text-2xl text-green-500 m-auto mt-4">
          Product moved
        </p>
      </form>
    </div>
  </div>
</template>
