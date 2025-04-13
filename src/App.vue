<template>
  <div>
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/wrbt">Wrbt Fams</router-link>
      <router-link to="/pygn">Pygn Fams</router-link>
    </nav> -->
    <router-view />
  </div>
</template>


<script>
  import WrbtFams from './components/WrbtFams.vue'
  import PygnFams from './components/PygnFams.vue'

  export default {
      name: 'app',
      components: {
          WrbtFams,
          PygnFams
      }
  }
</script>

<style>
  #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      /* margin-top: 60px; */
  }

  html, body {
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
      overflow: hidden;
      font-family: Helvetica;
  }

  #tree {
      width: 100%;
      height: 100vh;
  }
</style>