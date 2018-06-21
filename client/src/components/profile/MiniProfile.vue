<template>
  <div>
    <div v-if="isAuthenticated && profile.id_str">
      <div class="card">
        <div class="card-body">
          <div class="form-inline">
            <img v-bind:src="profile.profile_image_url_https" class="mini-profile-img">
            <h4 class="card-text">{{profile.name}}
              <small class="text-muted">(@{{profile.screen_name}})</small>
            </h4>
            <div class="col">
              <h5 v-if="profile.is_analyzing"><span class="badge badge-info">분석중</span></h5>
            </div>
          </div>
          <div class="mt-3" v-if="profile.keywords.length">
            <button class="btn btn-outline-dark btn-sm mx-1 my-1"
              v-for="keyword in profile.keywords" v-bind:key="keyword.id">
              {{keyword}}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('profileModule', ['profile']),
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },
};
</script>
