<template>
  <div>
    <mini-profile></mini-profile><br>
    <h2>TweetSuggestPage</h2>
    <div v-for="tweet in tweets" v-bind:key="tweet.id">
      <b>키워드 - {{ tweet.keyword }}</b><br>
      ({{ tweet.user.profile_image_url_https }})<br>
      <strong>{{ tweet.user.name }}</strong>,
      <i>@{{ tweet.user.screen_name }}</i>
      [{{ tweet.text }}] ({{ tweet.created_at }})<br>
      리트윗 수 {{ tweet.retweet_count }} / 라이크 수 / {{ tweet.favorite_count }}
      <br><br>
    </div>
  </div>
</template>

<script>
import MiniProfile from '@/components/profile/MiniProfile';

export default {
  created() {
    this.$http.get('/api/suggest/tweets').then((response) => {
      this.tweets = response.data;
    });
  },
  data() {
    return {
      tweets: [],
    };
  },
  components: {
    'mini-profile': MiniProfile,
  },
};
</script>
