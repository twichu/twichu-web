<template>
  <div id="app">
    <app-navbar/>
    <div class="content-wrapper">
      <div class="container-fluid">
        <router-view/>
        <app-footer/>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap';
import AppNavBar from '@/components/app/AppNavBar';
import AppFooter from '@/components/app/AppFooter';

export default {
  name: 'App',
  components: {
    'app-navbar': AppNavBar,
    'app-footer': AppFooter,
  },
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
