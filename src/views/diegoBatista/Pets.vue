<template>
  <div class="main-content">
    <h1 class="title">Encontre seu melhor amigo</h1>
    <div class="pet-list">
      <div class="pet-item" v-for="pet in pets" :key="pet.id" @click="redirectToProfile(pet.id)">
        <img
          src="https://encurtador.com.br/ckA59" alt="img-pet">
        <span class="name-description">{{pet.pet_name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default{

  data(){
    return{
      pets:[]
    }
  },
  methods:{
    redirectToProfile(petId){
      this.$router.push(`/pets-adocao/${petId}/perfil`)
    }
  },

  mounted(){
    axios.get("http://localhost:8000/api/pets/adocao")
    .then((response)=>{
      this.pets = response.data
      console.log(response.data)
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
.main-content{
width:80%;
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

.pet-item:hover{
  box-shadow: 0 3px 10px rgb(0 0 0 / 2);
}

.pet-item img {
  width: 200px;
  border: 1.5px solid; 
  border-radius: 50%;
  margin-top: 20px;
  
}
</style>