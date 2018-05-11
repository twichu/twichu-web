<template>
  <div>
    <div v-if="isAuthenticated && profile.id_str">
      <div class="card">
        <h4 class="card-header">{{profile.name}}
          <small class="text-muted">(@{{profile.screen_name}})</small>
        </h4>
        <div class="card-body">
          <div class="row">
            <img v-bind:src="profile.profile_image_url" class="my-profile-img col-3">
            <div class="col">
              <h5 class="card-title">
                <span class="badge badge-secondary">{{profile.statuses_count}} 트윗</span>
                <span class="badge badge-secondary">{{profile.friends_count}} 팔로잉</span>
                <span class="badge badge-secondary">{{profile.followers_count}} 팔로워</span>
              </h5>
              <p class="card-text">{{profile.description}}</p>
              <p class="card-text">
                <i class="fa fa-fw fa-map-marker"></i> {{profile.location}}<br>
                <i class="fa fa-fw fa-globe"></i> <a v-bind:href="profile.url">웹사이트</a>
              </p>
            </div>
          </div><br>
          <label><i class="fa fa-fw fa-star-o"></i> 나의 관심사</label>
          <div class="input-group">
            <input type="text" class="form-control text-center"
              v-for="(keyword, index) in profile.keywords" v-bind:key="keyword.id"
              v-model="profile.keywords[index]" :readonly="!isEdited"
              :hidden="!isEdited && keyword==''">
            <div class="input-group-append" :hidden="!isEdited">
              <button @click="push()" class="btn btn-outline-secondary">
                <i class="fa fa-fw fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="card-footer text-right" v-if="!isEdited">
          <div @click="edit()" class="btn btn-dark">수정</div>
        </div>
        <div class="card-footer text-right" v-else>
          <div @click="cancel()" class="btn btn-dark">취소</div>
          <div @click="complete()" class="btn btn-success">확인</div>
        </div>
      </div>
    </div>
    <div v-else-if="!isAuthenticated">
      <h2>로그인이 필요한 기능입니다.</h2>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  created() {
    if (this.$store.state.isAuthenticated) {
      this.getProfile();
    }
  },
  data() {
    return {
      isEdited: false,
      keywords: [],
    };
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
    edit() {
      this.isEdited = true;
      this.keywords = JSON.parse(JSON.stringify(this.profile.keywords));
    },
    cancel() {
      this.isEdited = false;
      this.profile.keywords = JSON.parse(JSON.stringify(this.keywords));
    },
    push() {
      this.profile.keywords.push('');
    },
    complete() {
      let i;
      const keywords = [];
      for (i = 0; i < this.profile.keywords.length; i += 1) {
        if (this.profile.keywords[i] !== '') {
          keywords.push(this.profile.keywords[i]);
        }
      }
      this.profile.keywords = JSON.parse(JSON.stringify(keywords));

      this.$store.dispatch('profileModule/patchProfile', this.profile)
        .then(() => {
          this.isEdited = false;
        });
    },
  },
};
</script>
