<template>
  <div class="main-content">
    <h1 class="title">Encontre seu melhor amigo</h1>
    <!-- input para filtro-->
    <div class="filter-section">
      <input v-model="filter.name" placeholder="Nome" type="text" >
      <input v-model="filter.specie" placeholder="Espécie" type="text" >
      <input v-model="filter.age" placeholder="Idade" type="number" >
      <select v-model="filter.size" >
        <option value="" selected>Tamanho</option>
        <option value="SMALL">SMALL</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="LARGE">LARGE</option>
        <option value="EXTRA_LARGE">EXTRA_LARGE</option>        
      </select>
      <button class="button-action" @click="applyFilter">Filtrar</button>
    </div>
    <div class="pet-list">
      <div class="pet-item" v-for="pet in pets" :key="pet.id" @click="redirectToProfile(pet.id)" data-test="item-pet">
        <img src="https://encurtador.com.br/ckA59" alt="img-pet">
        <span class="name-description">{{ pet.pet_name }}</span>
      </div>
    </div>
  </div>
</template>

<script>

import PetService from '../../services/PetService'
import axios from 'axios'

export default {

  data() {
    return {
      pets: [],
      filter: {
        name: '',
        specie: '',
        age: null,
        size: '',
      }
    }
  },
  methods: {
    redirectToProfile(petId) {
      this.$router.push(`/pets-adocao/${petId}/perfil`)
    },
    applyFilter() {
    axios.get("http://localhost:8000/api/pets/adocao", {
      params: this.filter // Passa os filtros como parâmetros de consulta
    })
    .then((response) => {
      this.pets = response.data;
    })
    .catch(error => console.error("Erro ao aplicar filtros", error));
  }
  },

  mounted() {
    PetService.getAllPets()
      .then((data) => {
        this.pets = data
    
      })
  }
}
</script>

<style scoped>
.title {
  font-size: 44px;
  color: rgb(236, 99, 19);
}

.name-description {
  font-size: 18px;
  font-weight: bold;
  color: rgb(236, 99, 19);
}

.main-content {
  width: 80%;
  margin: 0% auto;
}

.pet-list {
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.pet-item {
  border: 1px solid;
  padding: 5px;
  width: 300px;
  height: 200px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.3);
}

.pet-item:hover {
  box-shadow: 0 3px 10px rgb(0 0 0 / 2);
}

.pet-item img {
  width: 200px;
  border: 1.5px solid;
  border-radius: 50%;
  margin-top: 20px;

}
/* css para inputs dos filtros */

.filter-section{
  display: flex;  
  flex-direction: row;
  align-items: flex-start;  
  gap: 5px; 
  justify-content: center; 
}

.filter-section input[type="text"],
.filter-section input[type="number"],
.filter-section select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  line-height: 10px;
  width: 100%; 
}

.filter-section input[type="text"]:focus,
.filter-section input[type="number"]:focus,
.filter-section select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.filter-section button {
  padding: 5px 20px;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  text-decoration: none;
}

.filter-section button:hover {
  background-color: #0056b3;
}
</style>