<template>
  <ul class="navbar-nav ml-auto">
    <li class="nav-item" v-if="isAuthenticated && profile.id_str">
      <router-link  class="nav-link" :to="{ name: 'ProfilePage' }">
        <img class="nav-profile-img" v-bind:src="profile.profile_image_url_https">
        <b>{{profile.name}}</b> <small class="text-muted">(@{{profile.screen_name}})</small>
        <span class="nav-profile-info">
          | {{profile.statuses_count}} 트윗 |
          {{profile.friends_count}} 팔로잉 |
          {{profile.followers_count}} 팔로워 |
        </span>
      </router-link>
    </li>
    <li class="nav-item" v-if="isAuthenticated">
      <a class="nav-link" @click="logout()">
        <i class="fa fa-fw fa-sign-out"></i>LogOut</a>
    </li>
    <li class="nav-item" v-else>
      <a class="nav-link" @click="authenticate('twitter')">
        <i class="fa fa-fw fa-sign-in"></i>LogIn</a>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  created() {
    if (this.$store.state.isAuthenticated) {
      this.getProfile();
    }
  },
  computed: {
    ...mapGetters('profileModule', ['profile']),
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },
  methods: {
    ...mapActions({
      logout: 'logout',
      getProfile: 'profileModule/getProfile',
    }),
    authenticate(provider) {
      this.$store.dispatch('authenticate', provider);
    },
  },
};
</script>
