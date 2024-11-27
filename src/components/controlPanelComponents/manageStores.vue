<template>
    <div class="store-container">
        <h2 class="store-title">Listado de mis Tiendas</h2>
        <table v-if="stores.length" class="store-table">
            <thead>
                <tr>
                    <th>Nombre de Tienda</th>
                    <th>Descripción</th>
                    <th>Email</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(store, index) in stores" :key="store.Id">
                    <td data-label="Nombre de Tienda" class="store-name">{{ store.store_name }}</td>
                    <td data-label="Descripción" class="store-description">{{ store.description }}</td>
                    <td data-label="Email" class="store-email">{{ store.email }}</td>
                    <td data-label="Acciones" class="store-actions">
                        <button 
    class="btn btn-products" 
    @click="$emit('select-store', store.Id)" 
    title="Productos">
    <i class="fas fa-box-open"></i>
</button>
                        <button class="btn btn-report" @click="generateTopSellingReport(index)" title="Más Vendidos">
                            <i class="fas fa-chart-line"></i>
                        </button>
                        <button class="btn btn-edit" @click="editStore(index)" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-delete" @click="deleteStore(store.Id)" title="Eliminar">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-else class="empty-text">Aún no tienes tiendas creadas.</p>

        <!-- Ventana emergente para confirmar eliminación -->
        <div v-if="showAlert" class="popup">
            <div class="popup-content">
                <img :src="alertImage" alt="Alerta" class="popup-image" />
                <h3 class="popup-title">¡Atención!</h3>
                <p class="popup-message">¿Seguro que deseas eliminar la tienda?</p>
                <div class="button-group">
                    <button @click="confirmDelete" class="popup-close">Eliminar</button>
                    <button @click="closeAlert" class="popup-close">Cancelar</button>
                </div>
            </div>
        </div>
           <!-- Ventana emergente para editar tienda -->
           <div v-if="showEditPopup" class="popup">
            <div class="popup-edit-content">
                <h2 class="popup-title">Editar Tienda</h2>
                <form @submit.prevent="updateStore">
                    <div class="form-group">
                        <label>Nombre de Tienda:</label>
                        <input type="text" v-model="selectedStore.store_name" required class="form-input" />
                    </div>
                    <div class="form-group">
                        <label>Descripción:</label>
                        <textarea v-model="selectedStore.description" required class="form-input"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Email:</label>
                        <input type="email" v-model="selectedStore.email" required class="form-input" />
                    </div>
                    <div class="button-group">
                        <button type="button" @click="closeEditPopup" class="popup-close">Cancelar</button>
                        <button type="submit" class="popup-close">Guardar cambios</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Mensaje de éxito -->
        <div v-if="successMessage" class="success-message">
            <p>{{ successMessage }}</p>
            <button @click="closeSuccessMessage" class="close-success">Cerrar</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        stores: Array,
        updateStores: Function,
    },
    data() {
        return {
            showAlert: false,
            showEditPopup: false,
            successMessage: "",
            alertImage: "https://cdn-icons-png.flaticon.com/512/753/753345.png",
            storeToDelete: null,
            selectedStore: {}
        };
    },
    methods: {
        editStore(index) {
            this.selectedStore = { ...this.stores[index] };
            this.showEditPopup = true;
        },
        async updateStore() {
            try {
                await axios.patch(`http://127.0.0.1:8000/api/store/${this.selectedStore.Id}`, {
                    store_name: this.selectedStore.store_name,
                    description: this.selectedStore.description,
                    email: this.selectedStore.email
                });
                this.successMessage = "¡Tienda actualizada exitosamente!";

                const updatedStores = this.stores.map(store =>
                    store.Id === this.selectedStore.Id ? this.selectedStore : store
                );

                this.$emit("update-stores", updatedStores);
            } catch (error) {
                console.error("Error al actualizar la tienda:", error);
            } finally {
                this.closeEditPopup();
            }
        },
        deleteStore(storeId) {
            this.storeToDelete = storeId;
            this.showAlert = true;
        },
        async confirmDelete() {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/store/${this.storeToDelete}`);
                this.successMessage = "¡Tienda eliminada exitosamente!";
                const updatedStores = this.stores.filter(store => store.Id !== this.storeToDelete);
                this.$emit("update-stores", updatedStores);
            } catch (error) {
                console.error("Error al eliminar la tienda:", error);
            } finally {
                this.closeAlert();
            }
        },
        closeAlert() {
            this.showAlert = false;
            this.storeToDelete = null;
        },
        closeEditPopup() {
            this.showEditPopup = false;
            this.selectedStore = {};
        },
        closeSuccessMessage() {
            this.successMessage = "";
        },
        methods: {
    manageProducts(index) {
        const selectedStoreId = this.stores[index].Id;
        this.$emit("change-view", "SellerProduct", selectedStoreId); // Pasar el storeId seleccionado
        }
    },
        generateTopSellingReport(index) {
            const storeId = this.stores[index].Id;
            this.$router.push({ path: `/report/${storeId}` });
        }
    }
};
</script>
<style scoped>
.store-container {
    text-align: center;
    padding: 20px;
}

.store-title {
    font-size: 2em;
    color: #004aad;
    margin-bottom: 20px;
}

.store-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
    border-radius: 8px;
    overflow: hidden;
}

.store-table th,
.store-table td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
}

.store-table th {
    background-color: #004aad;
    color: #ffffff;
    text-transform: uppercase;
    font-weight: bold;
}

.store-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-start;
}

.store-actions .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: white;
    font-size: 1.2em;
    transition: background-color 0.3s ease;
}

.btn-products {
    background-color: #0077b6;
}

.btn-products:hover {
    background-color: #005f8a;
}

.btn-report {
    background-color: #00b5ad;
}

.btn-report:hover {
    background-color: #008a85;
}

.btn-edit {
    background-color: #ffd700;
    color: black;
}

.btn-edit:hover {
    background-color: #e0b800;
}

.btn-delete {
    background-color: #ff4d4d;
}

.btn-delete:hover {
    background-color: #cc0000;
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
    margin-bottom: 15px;
}

.button-group {
    display: flex;
    gap: 10px;
}

.popup-close {
    background-color: #0096c7;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

.success-message {
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 1001;
}

.close-success {
    background-color: #0096c7;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
}

.popup-content {
    background: #ffffff;
    padding: 20px;
    border-radius: 10px;
    text-align: left;
    width: 400px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.form-group {
    margin-bottom: 15px;

}

.form-input {
    width: 100%;

    padding: 10px;

    border: 1px solid #ccc;

    border-radius: 5px;

}

.button-group {
    display: flex;
    justify-content: flex-end;
   
    gap: 10px;

}

.popup-close {
    background-color: #0077b6;

    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
   
}

.popup-close:hover {
    background-color: #005f8a;
  
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

.popup-edit-content {
    background: #f9f9f9;
    padding: 40px;
    border-radius: 10px;
    text-align: center;
    width: 450px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    border-top: 5px solid #0077b6;
}

.popup-title {
    font-size: 1.8em;
    color: #0077b6;
    margin-bottom: 15px;
}

.form-group {
    margin-bottom: 15px;
}

.form-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1em;
}

.button-group {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-top: 20px;
}

.popup-close {
    background-color: #0096c7;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s;
}

.popup-close:hover {
    background-color: #0077b6;
}
</style>
