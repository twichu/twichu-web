<template>
  <ul class="navbar-nav ml-auto">
    <li class="nav-item" v-if="isAuthenticated">
      <img v-bind:src="user_data.profile_image_url" style="height:25px;margin-top:7px;">
    </li>
    <li class="nav-item" v-if="isAuthenticated">
      <span class="nav-link">
        {{user_data.statuses_count}} 트윗 / 
        {{user_data.friends_count}} 팔로잉 / 
        {{user_data.followers_count}} 팔로워
      </span>
    </li>
    <li class="nav-item" v-if="isAuthenticated">
      <a class="nav-link" @click="logout()">
        <i class="fa fa-fw fa-sign-out"></i>LogOut</a>
    </li>
    <li class="nav-item" v-else>
      <a class="nav-link" @click="authenticate('twitter')">
        <i class="fa fa-fw fa-sign-out"></i>LogIn</a>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  created () {
    this.loadProfile()
  },
  data () {
    return {
      user_data: {}
    }
  },
  computed: {
    isAuthenticated: function () {
      return this.$store.state.isAuthenticated
    }
  },
  methods: {
    ...mapActions({
      logout: 'logout'
    }),
    authenticate: function (provider) {
      this.$store.dispatch('authenticate', provider);
    },
    loadProfile () {
      this.$http.get('/api/profile')
        .then((response) => {
          this.user_data = response.data;
        })
    },
  }
}
</script>