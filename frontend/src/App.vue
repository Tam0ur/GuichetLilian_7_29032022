<template>
  <div class="div_nav" v-if="userId != null" >
    <nav>
      <router-link to="/">HOME</router-link>
      <router-link to="/post">Post</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/signup">Signup</router-link>
    </nav>
  </div>

  <div v-else class="div_else">
    <router-link to="/login">Login</router-link>
    <router-link to="/signup">Signup</router-link>
  </div>
  <router-view />
</template>

<script>
import { mapState } from 'vuex';
export default {
		name: 'App',
		computed : mapState({
      userId : state => state.userId
    })
	}
</script>

<style lang="scss">


.div_else {
  position: absolute;
  top: 40%;
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
  }
}
* {
    font-family: Verdana, sans-serif;
  }

#app {
  display: flex;
  flex-flow: column ;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  justify-content: center;
  color: #2c3e50;
}
html{
  height: fit-content;
}

body {
  width: 100%;
  
  background-image: linear-gradient(90deg, #42b983 1%, white 15%, white 85%, #42b983 99%);
  background-position: 50% 100%;
  background-repeat: no-repeat;
  margin: 0;
  margin-top: 50px;
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

nav {
  margin-top: 50px;
  background-color: white;
  width: 20%;
  display: flex;
  position: fixed;
  flex-direction: column;
  top: 0;
  left: 2%;
  justify-content: space-evenly;
  margin-bottom: 30px;
  a {
    display: grid;
    align-items: center;
    
    width:80%;
    height: 60px;

    font-weight: bold;
    color:#2c3e50;
    text-decoration: none;

    border-bottom: 2px solid #b3b3b3;
    &.router-link-exact-active {
      color: #42b983;
    }
    &:nth-child(4){
      border-bottom: 0px;
    }
    &:hover{
      transition-duration: 0.4s;
      transition-property: background-color, color;
      background-color: #94e1be;
    }
  }

}
</style>
