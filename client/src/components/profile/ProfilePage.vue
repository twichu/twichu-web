<template>
  <div>
    <div v-if="isAuthenticated">
      <img v-bind:src="profile.profile_image_url">
      {{profile.name}}
      @{{profile.screen_name}}
      {{profile.statuses_count}} 트윗 / 
      {{profile.friends_count}} 팔로잉 / 
      {{profile.followers_count}} 팔로워
      <p>나의 키워드</p>
      ...
    </div>
    <div v-else>
      로그인이 필요합니다.
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  created () {
    this.getProfile()
  },
  computed: {
    ...mapGetters('profileModule', ['profile']),
    isAuthenticated: function () {
      return this.$store.state.isAuthenticated
    },
  },
  methods: {
    ...mapActions({
      logout: 'logout',
      getProfile: 'profileModule/getProfile',
    }),
  }
}
</script>
