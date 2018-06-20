<template>
  <div>
    <mini-profile></mini-profile><br>
    <h3><i class="fa fa-fw fa-link"></i> 관심사 기반 유저 매칭</h3>
    <div v-masonry transition-duration="1s" item-selector=".item" class="row">
      <div v-masonry-tile class="item col-3" v-for="user in users" v-bind:key="user.id">
        <div class="card">
          <img class="card-img-top" v-bind:src="user.profile_image_url_https" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">{{ user.name }}
              <small class="text-muted">@{{ user.screen_name }}</small>
            </h5>
            <p class="card-text">{{ user.description }}<br>
              <small class="text-muted">{{ user.location }}</small>
            </p>
          </div>
          <div class="card-footer">
            <small class="text-muted">
              {{ user.statuses_count }} 트윗 |
              {{ user.friends_count }} 팔로잉 |
              {{ user.followers_count }} 팔로워
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MiniProfile from '@/components/profile/MiniProfile';

export default {
  created() {
    this.$http.get('/api/suggest/users').then((response) => {
      this.users = response.data;
    });
  },
  data() {
    return {
      users: [],
    };
  },
  components: {
    'mini-profile': MiniProfile,
  },
};
</script>
