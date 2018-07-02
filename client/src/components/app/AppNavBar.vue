<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
    <router-link class="navbar-brand" :to="{ name: 'Index' }">
      <img class="nav-logo" src="@/assets/logo.png"> Twichu
    </router-link>
    <div class="collapse navbar-collapse">
      <app-nav-menu/>
      <app-nav-header/>
    </div>
  </nav>
</template>

<script>
import AppNavMenu from '@/components/app/AppNavMenu';
import AppNavHeader from '@/components/app/AppNavHeader';

export default {
  components: {
    'app-nav-menu': AppNavMenu,
    'app-nav-header': AppNavHeader,
  },
};
</script>
