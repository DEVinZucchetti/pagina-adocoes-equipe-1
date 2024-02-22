<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-if="pet" class="main-content">
    <h1 class="name-animal">{{ pet.name }}</h1>
    <div class="div-container">
      <div class="content-left">
        <ul class="custom-list">
          <li>Raça: {{ pet.race.name }}</li>
          <li>Espécie: {{ pet.specie.name }}</li>
          <li>IDADE: {{ pet.age }} ANO(S)</li>
          <li>Peso: {{ pet.weight }} KG</li>
          <li>Porte: {{ pet.size }}</li>
        </ul>
      </div>
      <div class="content-right">
        <img src="https://encurtador.com.br/pryO8" alt="img-do-dog" width="350px">
      </div>
    </div>
    <div>
      <div class="form-content">
        <form class="form" @submit.prevent="handleSubmit">
          <p class="name-description">Poucos passos para adotar</p>
          <div class="input-form">
            <label>Nome</label>
            <input v-model="name" data-test="name" />
          </div>
          <div class="input-form">
            <label>Contato</label>
            <input v-model="contact" data-test="contact" />
          </div>
          <div class="input-form">
            <label>Email</label>
            <input v-model="email" type="email" data-test="email" />
          </div>
          <div class="input-form">
            <label>Fale um pouco sobre a sua motivação de adotar esse pet:</label>
            <textarea v-model="observations" data-test="observations" />
          </div>
          <button type="submit" class="button-action" data-test="submit-button">Cadastrar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import PetService from '@/services/PetService';

export default {
  data() {
    return {
      pet: null,
      name: '',
      email: '',
      contact: '',
      observations: ''
    }
  },
  methods: {
    handleSubmit() {
      PetService.adoptPet({
        name: this.name,
        email: this.email,
        contact: this.contact,
        observations: this.observations,
      })

        .then(() => {
          alert("Cadastrado com sucesso")
        })
        .catch(() => {
          alert("Cadastrado com sucesso: fake")
        })
    }
  },
  mounted() {
    const id = this.$route.params.id
    PetService.getOnePet(id)
      .then((data) => {
        this.pet = data
      })
  }
}


</script>

<style scoped>
.name-animal {
  font-size: 28px;
  font-weight: bold;
  margin-left: 40px;
  color: rgb(236, 99, 19);
}

.name-description {
  font-size: 28px;
  font-weight: bold;
  color: rgb(236, 99, 19);
}

.main-content {
  width: 70%;
  margin: 2% auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.div-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.content-left {
  width: 70%;
}

.content-right {
  width: 70%;
}

.content-right img {
  box-shadow: 0 3px 10px rgb(0 0 0 / 1);
  border-radius: 1%;
}

.form-content {
  width: 90%;
  margin: 0% auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.button-action {
  width: 100px;
  height: 34px;
  margin-top: 10px;
  background: rgb(225, 73, 18);
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
}

.form {
  display: flex;
  flex-direction: column;
}

.form input {
  width: 30%;
  height: 32px;
}

.input-form {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 10px;
}

textarea {
  height: 100px;
}


.custom-list {
  list-style-type: none;
  width: 50%;
}

.custom-list li {
  background-color: #f0f0f0;
  margin-bottom: 8px;
  padding: 10px;
  border-radius: 5px;

}

.custom-list li:hover {
  background-color: #e0e0e0;

}</style>