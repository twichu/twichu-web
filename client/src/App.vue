<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import 'bootstrap';

export default {
  name: 'App',
};
</script>

<style>
@import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
@import '../node_modules/font-awesome/css/font-awesome.min.css';
@import './assets/css/template.css';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
