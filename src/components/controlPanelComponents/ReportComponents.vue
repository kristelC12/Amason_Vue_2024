<template>
  <div class="report-container">
    <button class="back-button" @click="goBack">
       <img src="@/assets/images/Volver.png" alt="Icono Volver" class="icon-volver" />
    Volver a la Lista de Tiendas
</button>
    <img class="logo" src="@/assets/Amason_Black.svg" alt="Logo AMASON" />
    <h1>Reporte de Productos Más Vendidos</h1>
    
    <div class="report-content">
      <!-- Filtro de Fechas -->
      <div class="date-filter">
        <label for="start-date">Fecha de Inicio:</label>
        <input type="date" v-model="startDate" id="start-date" />

        <label for="end-date">Fecha de Fin:</label>
        <input type="date" v-model="endDate" id="end-date" />

        <button @click="generateReport">Generar Reporte</button>
      </div>

      <div v-if="topSellingProducts.length" class="top-selling-products">
        <div class="header">
          <h3>Productos Más Vendidos</h3>
<button @click="generatePDF" class="export-pdf-button">
  <img src="@/assets/images/descargar-pdf.png" alt="Icono PDF" class="icon-pdf" />
  Exportar a PDF
</button>
        </div>
        <ul>
          <li v-for="product in topSellingProducts" :key="product.product_id">
            <span class="product-name">{{ product.name }}</span>
            <span class="product-sold">Vendidos: {{ product.total_sold }}</span>
            <span class="product-description">{{ product.description }}</span>
          </li>
        </ul>
      </div>

      <div v-else class="no-products-message">
        <p>No hay productos vendidos en el período seleccionado.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../../services/api';

export default {
  data() {
    return {
      productsData: [],
      startDate: "",
      endDate: "",
      topSellingProducts: [],
      storeId: null,
    };
  },
  methods: {
    goBack() {
    this.$router.push('/sellerDashboard'); // Ruta que corresponde a la lista de tiendas
  },
    generateReport() {
      this.storeId = this.$route.params.storeId;

      const today = new Date();
      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);

      // Validaciones de fechas
      if (startDate > today || endDate > today) {
        alert("No se pueden ingresar fechas futuras. Por favor, selecciona fechas válidas.");
        return;
      }
      if (startDate > endDate) {
        alert("La fecha de inicio no puede ser posterior a la fecha de fin.");
        return;
      }

      axios
        .get(`/stores/${this.storeId}/top-selling-products`, {
          params: {
            start_date: startDate,
            end_date: endDate,
          },
        })
        .then((response) => {
          this.topSellingProducts = response.data;
        })
        .catch((error) => {
          console.error("Error al generar el reporte:", error);
        });
    },
    generatePDF() {
      this.storeId = this.$route.params.storeId;

      const today = new Date();
      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);

      // Validaciones de fechas
      if (startDate > today || endDate > today) {
        alert("No se pueden ingresar fechas futuras. Por favor, selecciona fechas válidas.");
        return;
      }
      if (startDate > endDate) {
        alert("La fecha de inicio no puede ser posterior a la fecha de fin.");
        return;
      }

      // Generar PDF
      axios
        .get(`/stores/${this.storeId}/top-selling-products-pdf`, {
          params: {
            start_date: startDate,
            end_date: endDate,
          },
          responseType: "blob",
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `TopSellingProducts_${this.startDate}_${this.endDate}.pdf`);
          document.body.appendChild(link);
          link.click();
          link.remove();
        })
        .catch((error) => {
          console.error("Error al generar el PDF:", error);
        });
    },
  },
};
</script>

<style scoped>
.report-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 5px;
  width: 100%;
  max-width: 1200px;
  margin: 10px auto;
}

h1 {
  margin-top: 20px;
  color: #0077b6;
  text-align: center;
}

.report-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin-top: 20px;
  flex-direction: row;
}

.date-filter {
  width: 100%;
  max-width: 300px;
  background-color: #90cae9;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0 10px;
}

.top-selling-products {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 1px;
  flex: 1;
}

.top-selling-products .header {
  display: flex;
  justify-content: space-between; /* Coloca los elementos en extremos opuestos */
  align-items: center; /* Alinea verticalmente */
  margin-bottom: 10px; /* Espacio entre la cabecera y la lista */
}

.no-products-message {
  text-align: center;
  color: #f00;
}

.date-filter label {
  display: block;
  margin-top: 10px;
}

.date-filter input,
.date-filter button {
  width: 100%;
  margin-top: 10px;
}

.top-selling-products h3,
.no-products-message p {
  margin-top: 0;
  font-size: 1.2em;
  color: #333;
}

.logo {
  display: block;
  margin: 0 auto 20px;
  max-width: 15%;
  height: auto;
}

.top-selling-products ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.top-selling-products li {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.top-selling-products li:last-child {
  border-bottom: none;
}

.product-name {
  font-weight: bold;
  color: #0077b6;
}

.product-sold {
  color: #555;
  font-size: 0.9em;
}

.product-description {
  color: #777;
  font-size: 0.9em;
  margin-top: 5px;
}
.back-button {
  background-color: #0077b6;
  color: white;
  border: none;
  align-self: flex-start;
  border-radius: 5px;
  padding: 10px 20px;
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 1em;
}

.back-button:hover {
  background-color: #005f86;
}
.export-pdf-button {
  display: flex; /* Para alinear contenido */
  align-items: center; /* Centra verticalmente ícono y texto */
  justify-content: center; /* Centra horizontalmente */
  background-color: #0077b6;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  padding: 10px 20px;
}

.export-pdf-button i {
  margin-right: 8px; /* Espacio entre ícono y texto */
  font-size: 1.2em; /* Asegúrate de que el ícono tenga el tamaño correcto */
}

  @media (max-width: 768px) {
  .report-content {
    flex-direction: column;
    align-items: center;
  }

  .date-filter,
  .top-selling-products {
    width: 100%;
    max-width: 100%;
    margin: 10px 0;
  }
}
</style>
