<template>
  <div>
    <div>
      <div class="row">
        <div class="col-xl-3 col-sm-6 mb-3">
          <div class="card text-white bg-primary h-100">
            <div class="card-body">
              <div class="card-body-icon">
                <i class="fa fa-fw fa-pie-chart"></i>
              </div>
              <p class="mb-4" size="3">
                <b>나의 트윗을 통한 분석</b>
              </p>
              <font size="2">
                사용자의 최근 트윗과 리트윗<br>
                데이터를 기반으로<br>
                관심사를 분석하는 요청을<br>
                보내는 페이지
              </font>
            </div>
            <router-link class="card-footer text-white small" :to="{ name: 'AnalysisPage' }">
              <span class="float-left"><i class="fa fa-fw fa-globe"></i> 바로가기</span>
              <span class="float-right">
                <i class="fa fa-angle-right"></i>
              </span>
            </router-link>
          </div>
        </div>

        <div class="col-xl-3 col-sm-6 mb-3">
          <div class="card text-white bg-warning h-100">
            <div class="card-body">
              <div class="card-body-icon">
                <i class="fa fa-fw fa-cogs"></i>
              </div>
              <p class="mb-4" size="3">
                <b>내 정보 관리</b>
              </p>
              <font size="2">
                사용자의 정보를 확인하고<br>
                임의로 관심사를 수정할 수 있는<br>
                관리 페이지
              </font>
            </div>
            <router-link class="card-footer text-white small" :to="{ name: 'ProfilePage' }">
              <span class="float-left"><i class="fa fa-fw fa-globe"></i> 바로가기</span>
              <span class="float-right">
                <i class="fa fa-angle-right"></i>
              </span>
            </router-link>
          </div>
        </div>

        <div class="col-xl-3 col-sm-6 mb-3">
          <div class="card text-white bg-success h-100">
            <div class="card-body">
              <div class="card-body-icon">
                <i class="fa fa-fw fa-thumbs-up"></i>
              </div>
              <p class="mb-4" size="3">
                <b>나를 위한 트윗 추천</b>
              </p>
              <font size="2">
                수집된 트윗들 중<br>
                사용자의 관심사에 맞는 트윗을<br>
                추천해 주는 페이지
              </font>
            </div>
            <router-link class="card-footer text-white small" :to="{ name: 'TweetSuggestPage' }">
              <span class="float-left"><i class="fa fa-fw fa-globe"></i> 바로가기</span>
              <span class="float-right">
                <i class="fa fa-angle-right"></i>
              </span>
            </router-link>
          </div>
        </div>

        <div class="col-xl-3 col-sm-6 mb-3">
          <div class="card text-white bg-danger h-100">
            <div class="card-body">
              <div class="card-body-icon">
                <i class="fa fa-fw fa-link"></i>
              </div>
              <p class="mb-4" size="3">
                <b>관심사 기반 유저 매칭</b>
              </p>
              <font size="2">
                사용자의 관심사와<br>
                비슷한 관심사를 가진<br>
                다른 사용자를 추천해주는 페이지
              </font>
            </div>
            <router-link class="card-footer text-white small" :to="{ name: 'UserSuggestPage' }">
              <span class="float-left"><i class="fa fa-fw fa-globe"></i> 바로가기</span>
              <span class="float-right">
                <i class="fa fa-angle-right"></i>
              </span>
            </router-link>
          </div>
        </div>
      </div>

      <div v-masonry transition-duration="1s" item-selector=".item" class="row">
        <div v-masonry-tile class="item col-4" v-for="tweet in tweets" v-bind:key="tweet.id">
          <tweet-embed :id="tweet.id_str"></tweet-embed>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tweet from 'vue-tweet-embed/tweet';

export default {
  created() {
    this.$http.get('/api/suggest/trends').then((response) => {
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
  },
  methods: {
    redrawMasonry() {
      this.$redrawVueMasonry();
    },
  },
};
</script>
