<script setup lang="ts">
import { ref, reactive } from "vue";
import axios from "axios";
import Sidebar from "@/components/Sidebar.vue";
import Menu from "@/components/Menu.vue";

const ProductID = ref(null);
const ProductName = ref("");
const Price = ref(null);
const Color = ref("");
const Storage = ref(null);
const message = reactive({
  productID: false,
  productName: false,
  price: false,
  error: false,
  success: false,
});

function checkInput() {
  resetErrors();
  let validated = true;

  if (!ProductID.value || isNaN(ProductID.value)) {
    message.productID = true;
    validated = false;
  }

  if (!ProductName.value.trim()) {
    message.productName = true;
    validated = false;
  }
  if (Price.value === null || isNaN(Price.value)) {
    message.price = true;
    validated = false;
  }

  return validated;
}

function clearForm() {
  (ProductID.value = null),
    (ProductName.value = ""),
    (Price.value = null),
    (Color.value = ""),
    (Storage.value = null);
}

function resetErrors() {
  message.productID = false;
  message.productName = false;
  message.price = false;
  message.error = false;
}

const addProduct = () => {
  if (!checkInput()) {
    return;
  }

  axios
    .post("http://127.0.0.1:8000/api/product", {
      ProductID: ProductID.value,
      ProductName: ProductName.value,
      Price: Price.value,
      Color: Color.value,
      Storage: Storage.value,
    })
    .then((response) => {
      console.log("Product added successfully:", response.data);
      // Optionally, you can reset the form or perform other actions
      clearForm();
      message.success = true;
    })
    .catch((error) => {
      console.error("Error adding product:", error);

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
          Create Product
        </h1>
      </div>
      <form class="flex flex-col border py-5 px-2 mt-16 lg:w-3/4 m-auto gap-2">
        <label for="ProductID" class="m-auto">Product id*</label>
        <input
          v-model="ProductID"
          id="ProductID"
          type="number"
          class="border border-black p-2 lg:w-1/2 lg:m-auto"
        />
        <p v-if="message.productID" class="text-[#FC3193] m-auto">Error</p>

        <label for="ProductName" class="m-auto">Product Name*</label>
        <input
          v-model="ProductName"
          id="ProductName"
          type="text"
          class="border border-black p-2 lg:w-1/2 lg:m-auto"
        />
        <p v-if="message.productName" class="text-[#FC3193] m-auto">Error</p>

        <label for="productPrice" class="m-auto">Product Price*</label>
        <input
          v-model="Price"
          id="productPrice"
          required
          type="number"
          class="border border-black p-2 lg:w-1/2 lg:m-auto"
        />
        <p v-if="message.price" class="text-[#FC3193] m-auto">Error</p>
        <label class="m-auto">Product Color:</label>
        <input
          v-model="Color"
          id="Color"
          required
          class="border border-black p-2 lg:w-1/2 lg:m-auto"
        />

        <label class="m-auto">Product Storage:</label>
        <input
          v-model="Storage"
          id="Stroage"
          required
          class="border border-black p-2 lg:w-1/2 lg:m-auto"
        />

        <button
          type="submit"
          @click.prevent="addProduct"
          class="border rounded-3xl bg-gray-400 hover:bg-green-500 w-40 m-auto p-2 mt-10"
        >
          Add Product
        </button>
        <p class="text-[#FC3193] m-auto" v-if="message.error">Error</p>
        <p v-if="message.success" class="text-2xl text-green-500 m-auto mt-4">
          Product added
        </p>
      </form>
    </div>
  </div>
</template>
