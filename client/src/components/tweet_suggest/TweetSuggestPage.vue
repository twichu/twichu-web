<template>
  <div>
    <mini-profile></mini-profile><br>
    <h3><i class="fa fa-fw fa-thumbs-up"></i> 나를 위한 트윗 추천</h3>
    <div v-masonry transition-duration="1s" item-selector=".item" class="row">
      <div v-masonry-tile class="item col-4" v-for="tweet in tweets" v-bind:key="tweet.id">
        <tweet-embed :id="tweet.id_str"></tweet-embed>
      </div>
    </div>
  </div>
</template>
<script>
import Tweet from 'vue-tweet-embed/tweet';
import MiniProfile from '@/components/profile/MiniProfile';

export default {
  created() {
    this.$http.get('/api/suggest/tweets').then((response) => {
      this.tweets = response.data;
    });
    this.timer = setInterval(this.redrawMasonry, 1000);
  },
  data() {
    return {
      tweets: [],
    };
  },
  components: {
    'tweet-embed': Tweet,
    'mini-profile': MiniProfile,
  },
  methods: {
    redrawMasonry() {
      this.$redrawVueMasonry();
    },
  },
};
</script>
