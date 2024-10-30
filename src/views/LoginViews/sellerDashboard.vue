<template>
    <div class="dashboard-container">
        <aside class="sidebar">
            <img class="logo" src="@/assets/Amason_Black.svg" alt="Logo AMASON" />
            <nav class="menu">
                <button @click="view = 'create'" :class="{ active: view === 'create' }">
                    Crear Tienda
                </button>
                <button @click="view = 'manage'" :class="{ active: view === 'manage' }">
                    Gestionar Tiendas
                </button>
                <button class="logout" @click="logout">Cerrar Sesión</button>
            </nav>
        </aside>

        <main class="content">
            <addStores v-if="view === 'create'" :stores="stores" @update-stores="updateStores" />
            <manageStores v-if="view === 'manage'" :stores="stores" @update-stores="updateStores"
                @change-view="view = $event" />
            <SellerProduct v-if="view === 'SellerProduct'" @open-create-product="openCreateProductModal" />

        </main>
    </div>
</template>

<script>
import addStores from "../../components/controlPanelComponents/addStores.vue";
import manageStores from "../../components/controlPanelComponents/manageStores.vue";
import SellerProduct from "@/components/MenuComponents/SellerProductlist/SellerProduct.vue";
import { logoutUser } from "../../../api/auth";


export default {
    components: { addStores, manageStores, SellerProduct },
    data() {
        return {
            view: "create",
            stores: [],
            showCreateProductModal: false, 
        };
    },
    methods: {
        updateStores(store, deleteStore = false) {
            if (deleteStore) {
                this.stores.splice(store, 1);
            } else {
                this.stores.push(store);
            }
        },
        logout() {
            const confirmLogout = confirm("¿Estás seguro de que deseas cerrar sesión?");
            if (confirmLogout) {
                // Si el usuario confirma, cierra sesión
                logoutUser();
                this.$router.push('/login');
            }

        },
        openCreateProductModal() {
            this.showCreateProductModal = true;
        },
        closeCreateProductModal() {
            this.showCreateProductModal = false; 
        }
    },
};
</script>

<style scoped>
.dashboard-container {
    display: flex;
    height: 100vh;
    background-color: #f0f4f8;
}

.sidebar {
    width: 250px;
    background-color: #90cae9;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

.logo {
    width: 200px;
    margin-bottom: 40px;
}

.menu button {
    width: 100%;
    margin-bottom: 15px;
    padding: 10px;
    background-color: transparent;
    border: none;
    color: white;
    cursor: pointer;
    text-align: left;
    font-size: 18px;
}

.menu button.active {
    background-color: #0096c7;
    border-radius: 5px;
}

.logout {
    margin-top: auto;
    background-color: #ff4d4d;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}

.logout:hover {
    background-color: #e60000;
}

.content {
    flex: 1;
    padding: 40px;
}
</style>
