<script setup lang="ts">
import axios from "axios";
import { reactive, ref, computed } from "vue";
import Sidebar from "@/components/Sidebar.vue";
import Menu from "@/components/Menu.vue";

interface Location {
  LocationID: number;
  LocationName: string;
}

interface Inventory {
  InventoryID: number;
  LocationID: string;
  Quantity: number;
  location: Location;
}

interface ProductDetails {
  SerialNumber: string;
  inventory: Inventory;
}

interface Product {
  ProductID: number;
  ProductName: string;
  Price: number;
  Color: string;
  Storage: number;
  details: ProductDetails[];
  inventory: Inventory[];
}

const isModalOpen = ref(false);
const selectedProduct = ref<Product | null>(null);
const searchIdQuery = ref("");
const searchNameQuery = ref("");
const searchSnQuery = ref("");
const message = reactive({
  error: false,
});
const products = ref<Product[]>([]);

const openModal = (product: Product) => {
  isModalOpen.value = true;
  selectedProduct.value = product;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedProduct.value = null;
};

const resetInput = () => {
  searchIdQuery.value = "";
  searchNameQuery.value = "";
  searchSnQuery.value = "";
  message.error = false;
};

const search = () => {
  axios
    .get("http://127.0.0.1:8000/api/search", {
      params: {
        id: searchIdQuery.value,
        name: searchNameQuery.value,
        serialNumber: searchSnQuery.value,
      },
    })
    .then((response) => {
      console.log("response.data", response.data);
      products.value = response.data.products || [];
      resetInput();
    })
    .catch((error) => {
      console.error("error", error);
      message.error = true;
    });
};
</script>

<template>
  <div class="flex w-screen lg:w-full">
    <Sidebar />

    <div class="py-8 lg:py-0 m-auto w-full px-3 lg:w-4/5">
      <div class="flex mb-16 lg:pt-10">
        <Menu class="flex items-center lg:hidden" />
        <h1 class="m-auto text-3xl font-semibold flex justify-center">
          Lagerstyring
        </h1>
      </div>

      <div class="border py-5">
        <div class="flex flex-col mb-16 m-auto lg:w-2/4">
          <div class="flex flex-col mb-5 px-2 gap-2">
            <div class="flex flex-col">
              <label class="font-semibold">id</label>
              <input
                v-model="searchIdQuery"
                type="text"
                placeholder="ID"
                class="border border-black p-2 placeholder:text-black"
              />
            </div>
            <label class="font-semibold">Name</label>
            <input
              v-model="searchNameQuery"
              type="text"
              placeholder="Name"
              class="border border-black p-2 placeholder:text-black"
            />
            <label class="font-semibold">Serial Number</label>
            <input
              v-model="searchSnQuery"
              type="text"
              placeholder="Serial Number"
              class="border border-black p-2 placeholder:text-black"
            />
          </div>

          <button
            @click="search"
            class="border rounded-3xl w-2/4 p-2 lg:w-1/5 lg:h-10 m-auto bg-green-500"
          >
            Search
          </button>
          <p v-if="message.error" class="text-[#FC3193] m-auto">
            Produkt ikke fundet
          </p>
        </div>

        <table
          class="m-auto lg:w-2/4 mb-20 border-separate border-spacing-2 border border-slate-500"
        >
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Color</th>
              <th>Storage</th>
            </tr>
          </thead>
          <tbody>
            <tr @click="openModal(product)" v-for="product in products">
              <td>{{ product.ProductID }}</td>
              <td>{{ product.ProductName }}</td>
              <td>{{ product.Price }}</td>
              <td>{{ product.Color }}</td>
              <td>{{ product.Storage }}</td>
            </tr>
          </tbody>
          <div class="mx-auto">
            <div v-if="isModalOpen" class="fixed inset-0 overflow-y-auto">
              <div class="flex items-center justify-center min-h-screen">
                <div class="w-full lg:w-3/4 p-4">
                  <div class="bg-white rounded-lg shadow-md overflow-hidden">
                    <div class="flex justify-end p-4">
                      <button
                        @click="closeModal"
                        class="text-gray-500 hover:text-gray-700 p-2 text-3xl"
                      >
                        &times;
                      </button>
                    </div>
                    <div class="p-3">
                      <div v-if="selectedProduct" class="modal">
                        <div>
                          <div
                            class="flex flex-col lg:flex-row items-center justify-center text-2xl mb-10"
                          >
                            <p class="lg:border-r-2 lg:border-black pr-2">
                              {{ selectedProduct.ProductName }}
                            </p>
                            <p class="lg:border-r-2 lg:border-black px-2">
                              Price: {{ selectedProduct.Price }}
                            </p>
                            <p class="lg:border-r-2 lg:border-black px-2">
                              Color: {{ selectedProduct.Color }}
                            </p>
                            <p class="lg:pl-2">
                              Storage: {{ selectedProduct.Storage }}
                            </p>
                          </div>

                          <div v-if="selectedProduct.details">
                            <div
                              class="flex justify-center gap-10 mb-5 text-2xl"
                              v-for="detail in selectedProduct.details"
                            >
                              <p class="border">
                                Serial Number:
                                {{ detail.SerialNumber || "N/A" }}
                              </p>
                              <p class="border">
                                Location:
                                {{
                                  detail.inventory.location.LocationName ||
                                  "N/A"
                                }}
                              </p>
                            </div>
                          </div>
                          <div
                            v-else
                            v-for="inventory in selectedProduct.inventory"
                            class="flex justify-center gap-10 mb-5 text-2xl"
                          >
                            <p>
                              Location:
                              {{ inventory.location.LocationName }}
                            </p>
                            <p>
                              Quantity:
                              {{ inventory.Quantity }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </table>
      </div>
    </div>
  </div>
</template>
