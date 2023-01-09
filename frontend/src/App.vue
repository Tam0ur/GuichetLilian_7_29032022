<template>
  <nav>
    <router-link to="/">HOME</router-link>
    <router-link to="/post">Post</router-link>
    <router-link to="/login">Login</router-link>
    <router-link to="/signup">Signup</router-link>
  </nav>
  <router-view />
</template>

<script>
</script>

<style lang="scss">
#app {
  display: flex;
  flex-flow: column wrap;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  justify-content: center;
  color: #2c3e50;
}

body {
  margin: 0;
}

button {
  border: 1px solid rgba(0, 0, 0, 0.9);
  border-radius: 6px;
  background-color: white;
  margin: 10px;
  padding: 7px;
  cursor: pointer;

}

button:hover {
  transition-duration: 0.4s;
  transition-property: background-color, color;
  background-color: #42b983;

}

nav {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 30px;
  background-color: #1f1f1f;

  * {
    font-family: Verdana, sans-serif;
  }


  a {
    display: grid;
    align-items: center;
    width: 25%;
    height: 60px;
    font-weight: bold;
    border-right: 1px solid rgb(80, 80, 80);

    color: #ffffff;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  a:last-child {
    border-right: none;
  }
}
</style>
