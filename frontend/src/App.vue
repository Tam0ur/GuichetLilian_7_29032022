<template>
  <nav>
    <router-link to="/">HOME</router-link> |
    <router-link to="/post">Post</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/signup">Signup</router-link> |
  </nav>
  <router-view/>
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

nav {
  *{
    font-family: Verdana, sans-serif;
  }
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
