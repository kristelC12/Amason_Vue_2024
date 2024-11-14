<template>
    <div class="dashboard-container">
      
        <aside :class="['sidebar', { collapsed: isCollapsed }]">
            <img class="logo" v-if="!isCollapsed" src="@/assets/Amason_Black.svg" alt="Logo AMASON" />
            <button class="collapse-toggle" @click="toggleSidebar">
                <i v-if="isCollapsed" class="expand-icon">⮞</i>
                <i v-else class="collapse-icon">⮜</i>
            </button>
            <nav class="menu">
                <button @click="view = 'create'" :class="{ active: view === 'create' }">
                    <i class="icon-store">🏪</i>
                    <span v-if="!isCollapsed">Crear Tienda</span>
                </button>
                <button @click="view = 'manage'" :class="{ active: view === 'manage' }">
                    <i class="icon-manage">📋</i>
                    <span v-if="!isCollapsed"> Gestionar Tiendas </span>
                </button>
                <button class="logout" @click="logout">
                    <i class="icon-logout">🔒</i>
                    <span v-if="!isCollapsed">Cerrar Sesión</span>
                </button>
            </nav>
        </aside>

       
        <main class="content">
            <addStores v-if="view === 'create'" @store-added="handleStoreAdded" />
            <manageStores 
                v-if="view === 'manage'" 
                :stores="stores" 
                @store-deleted="handleStoreDeleted"
                @update-stores="updateStores"
                @change-view="view = $event"
            />
            <SellerProduct v-if="view === 'SellerProduct'" @open-create-product="openCreateProductModal" />
        </main>

   
        <div v-if="showLogoutPopup" class="popup">
            <div class="popup-content">
                <img src="https://cdn-icons-png.flaticon.com/512/1828/1828479.png" alt="Cerrar sesión" class="popup-image" />
                <h3 class="popup-title">¿Estás seguro de que deseas cerrar sesión?</h3>
                <p class="popup-message">Si cierras sesión, tendrás que ingresar tus credenciales nuevamente para acceder.</p>
                <button @click="confirmLogout" class="popup-close">Cerrar Sesión</button>
                <button @click="cancelLogout" class="popup-cancel">Cancelar</button>
            </div>
        </div>
    </div>
</template>

<script>
import addStores from "../../components/controlPanelComponents/addStores.vue";
import manageStores from "../../components/controlPanelComponents/manageStores.vue";
import SellerProduct from "@/components/MenuComponents/SellerProductlist/SellerProduct.vue";
import axios from "axios";
import { logoutUser } from "../../../api/auth";

export default {
    components: { addStores, manageStores, SellerProduct },
    data() {
        return {
            view: "create",
            stores: [],
            showCreateProductModal: false,
            isCollapsed: false,
            showLogoutPopup: false,
        };
    },
    methods: {
        toggleSidebar() {
            this.isCollapsed = !this.isCollapsed;
        },
        async loadStores() {
            const sellerId = localStorage.getItem("pivotId");
            if (!sellerId) {
                this.showAlertMessage(
                    "Error: No se encontró un ID de vendedor. Inicia sesión nuevamente.",
                    "https://cdn-icons-png.flaticon.com/512/753/753345.png"
                );
                return;
            }

            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/store/${sellerId}`);
                this.stores = response.data;
            } catch (error) {
                console.error("Error al cargar las tiendas:", error);
                this.showAlertMessage("Ocurrió un error al cargar las tiendas.", "https://cdn-icons-png.flaticon.com/512/753/753345.png");
            }
        },
        updateStores() {
            this.loadStores(); 
        },
        handleStoreAdded(newStore) {
            this.stores.push(newStore); 
        },
        handleStoreDeleted(storeId) {
            this.stores = this.stores.filter(store => store.id !== storeId); // Filtrar la tienda eliminada
        },
        logout() {
            this.showLogoutPopup = true;
        },
        confirmLogout() {
            logoutUser();
            this.$router.push('/login');
        },
        cancelLogout() {
            this.showLogoutPopup = false;
        },
        openCreateProductModal() {
            this.showCreateProductModal = true;
        },
        closeCreateProductModal() {
            this.showCreateProductModal = false;
        }
    },
    watch: {
        view(newView) {
            if (newView === "manage") {
                this.loadStores();
            }
        }
    }
};
</script>

<style scoped>
.dashboard-container {
    display: flex;
    height: 100vh;
    background-color: #f0f4f8;
    overflow: hidden;
}

.sidebar {
    width: 250px;
    background-color: #90cae9;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    transition: width 0.3s;
}

.sidebar.collapsed {
    width: 80px;
}

.logo {
    width: 200px;
    margin-bottom: 40px;
    transition: opacity 0.3s;
}

.collapse-toggle {
    background: transparent;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    margin-bottom: 20px;
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
    display: flex;
    align-items: center;
}

.menu button i {
    font-size: 20px;
    margin-right: 10px;
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
    display: flex;
    align-items: center;
}

.logout:hover {
    background-color: #e60000;
}

.content {
    flex: 1;
    padding: 40px;
    overflow-y: auto;
}

.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.popup-content {
    background: #f9f9f9;
    padding: 30px;
    border-radius: 10px;
    text-align: center;
    width: 350px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    animation: slideIn 0.4s ease-in-out;
    border-top: 5px solid #0077b6;
}

.popup-image {
    width: 80px;
    height: 80px;
    margin-bottom: 15px;
}

.popup-title {
    font-size: 1.5em;
    color: #0077b6;
    margin-bottom: 10px;
}

.popup-message {
    font-size: 1.1em;
    color: #333;
}

.popup-close {
    background-color: #0096c7;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 15px;
}

.popup-close:hover {
    background-color: #0077b6;
}

.popup-cancel {
    background-color: #ccc;
    color: #333;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 15px;
    margin-left: 10px;
}

.popup-cancel:hover {
    background-color: #bbb;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .dashboard-container {
        flex-direction: column;
    }

    .sidebar {
        width: 100%;
        height: auto;
        flex-direction: row;
        justify-content: space-between;
        padding: 10px;
    }

    .sidebar.collapsed {
        width: 100%;
        flex-direction: row;
        justify-content: space-around;
    }

    .menu button {
        font-size: 16px;
        padding: 5px;
    }

    .content {
        padding: 20px;
    }
}
</style>