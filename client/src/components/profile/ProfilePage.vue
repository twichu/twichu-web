<template>
  <div>
    <div v-if="isAuthenticated && profile.id_str">
      <div class="card">
        <h4 class="card-header">{{profile.name}}
          <small class="text-muted">(@{{profile.screen_name}})</small>
        </h4>
        <div class="card-body">
          <div class="row">
            <img v-bind:src="profile.profile_image_url_https" class="my-profile-img col-3">
            <div class="col">
              <h5 class="card-title">
                <span class="badge badge-secondary">{{profile.statuses_count}} 트윗</span>
                <span class="badge badge-secondary">{{profile.friends_count}} 팔로잉</span>
                <span class="badge badge-secondary">{{profile.followers_count}} 팔로워</span>
              </h5>
              <p class="card-text" v-if="profile.description">{{profile.description}}</p>
              <p class="card-text">
                <span v-if="profile.location">
                  <i class="fa fa-fw fa-map-marker"></i> {{profile.location}}<br>
                </span>
                <span v-if="profile.url">
                  <i class="fa fa-fw fa-globe"></i> <a v-bind:href="profile.url">웹사이트</a><br>
                </span>
              </p>
              <h5 v-if="profile.is_analyzing"><span class="badge badge-info">분석중</span></h5>
            </div>
          </div><br>
          <label><i class="fa fa-fw fa-star-o"></i> 나의 관심사</label><br>
          <button @click="pop(keyword)" class="btn btn-outline-dark btn-sm mx-1 my-1"
            v-for="keyword in profile.keywords" v-bind:key="keyword.id">
            {{keyword}}
          </button>
          <button @click="push(keyword)" class="btn btn-outline-secondary btn-sm mx-1 my-1"
            v-for="keyword in allKeywords" v-if="profile.keywords.indexOf(keyword) === -1"
            v-bind:key="keyword.id" :hidden="!isEdited">
            {{keyword}}
          </button>
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
      this.$http.get('/api/suggest/keywords').then((response) => {
        this.allKeywords = response.data;
      });
    }
  },
  data() {
    return {
      isEdited: false,
      allKeywords: [],
      prevKeywords: [],
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
      this.prevKeywords = JSON.parse(JSON.stringify(this.profile.keywords));
    },
    cancel() {
      this.isEdited = false;
      this.profile.keywords = JSON.parse(JSON.stringify(this.prevKeywords));
    },
    push(keyword) {
      this.profile.keywords.push(keyword);
    },
    pop(keyword) {
      if (this.isEdited) {
        const index = this.profile.keywords.indexOf(keyword);
        if (index !== -1) this.profile.keywords.splice(index, 1);
      }
    },
    complete() {
      this.$store.dispatch('profileModule/patchProfile', this.profile)
        .then(() => {
          this.isEdited = false;
        });
    },
  },
};
</script>
