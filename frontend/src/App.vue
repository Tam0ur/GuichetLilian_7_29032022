<template>
  <div v-if="userId != null" >
    <nav>
      <router-link to="/"><font-awesome-icon icon="house"/> Accueil</router-link>
      <router-link to="/post"><font-awesome-icon icon="plus"/> Poster</router-link>
      <button @click="fullLogout"><font-awesome-icon icon="right-from-bracket"/> Déconnexion</button>
    </nav>
  </div>

  <div v-else class="div_else">
    <router-link to="/login">Connexion</router-link>
    <router-link to="/signup">S'inscrire</router-link>
    
  </div>
  <router-view />
</template>

<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

library.add(faHouse)
library.add(faPlus)
library.add(faRightFromBracket)

import router from './router'

export default {
		name: 'App',
		computed : mapState({
      userId : state => state.userId
    }),
    methods: {
      ...mapActions(['logout']),
      fullLogout(){
        this.logout();
        router.push('/login')
      }
    },
    components: {
      FontAwesomeIcon
    },
	}
</script>

<style lang="scss">
nav {
  margin-top: 50px;
  background-color: white;
  width: 18%;
  display: flex;
  position: fixed;
  flex-direction: column;


  text-align: center;
  justify-content: center;

  left: 2%;
  justify-content: space-evenly;
  margin-bottom: 30px;

  border-radius: 5px;
  border: 2px solid rgb(55, 150, 90);
  
  button {
    font-weight: bold;
    font-size: 17px;
    height: 60px;
    border: none;
    margin: 0;
    &:hover{
      transition-duration: 0.4s;
      transition-property: background-color, color;
      background-color: #94e1be;
    }
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    height: 60px;

    font-weight: bold;
    color:#2c3e50;
    text-decoration: none;

    border-bottom: 2px solid #b3b3b3;
    &.router-link-exact-active {
      color: #42b983;
    }
    &:hover{
      transition-duration: 0.4s;
      transition-property: background-color, color;
      background-color: #94e1be;
    }
  }
}

.div_else {
  position: absolute;
  top: 5%;
  align-self: center;
  margin: auto;
  a {
    color: black;
    text-decoration: none;
    padding: 20px;
    font-size: 50px;
    border-top: 2px solid rgb(155, 155, 155);
    border-bottom: 2px solid rgb(155, 155, 155);
    &:first-child{
      border-right: 2px solid rgb(155, 155, 155);
      border-radius: 8px 0 0 8px ;
    }
    &:last-child{
      border-radius: 0 8px 8px 0 ;
    }
    &:hover{
      cursor: pointer;
      transition-duration: 0.3s;
      box-shadow: 0px 0px 10px 0px #7bb99d;
    }
    &:active{
      color: #376550;
      transition-duration: 0s;
    }
  }
}
* {
    font-family: Verdana, sans-serif;
  }

#app {
  display: flex;
  flex-flow: column nowrap;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
}
html{
  height: fit-content;
}

body {
  
  background-image: linear-gradient(90deg, #42b983 1%, white 15%, white 85%, #42b983 99%);
  background-position: 50% 100%;
  background-size: cover;
  margin: 0;
}

button {
  border: 1px solid rgba(0, 0, 0, 0.9);
  border-radius: 6px;
  background-color: white;
  margin: 10px;
  padding: 7px;
  cursor: pointer;
  &:hover{
    transition-duration: 0.4s;
    transition-property: background-color, color;
    background-color: #42b983;
  }
}

input {
  border: 1px solid grey;
  border-radius: 3px;
}


</style>
