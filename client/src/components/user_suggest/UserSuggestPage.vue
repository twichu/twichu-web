<template>
  <div>
    <h2>UserSuggestPage</h2>
    <div v-for="user in users" v-bind:key="user.id">
      <strong>{{ user.name }}</strong>,
      <i>@{{ user.screen_name }}</i>
      [{{ user.id_str }}] {{ user.profile_image_url_https }}
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$http.get('/api/suggest/user').then((response) => {
      this.users = response.data;
    });
  },
  data() {
    return {
      users: [],
    };
  },
};
</script>
