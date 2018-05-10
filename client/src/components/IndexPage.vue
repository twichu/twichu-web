<template>
  <div class="fixed-nav sticky-footer">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
      <router-link class="navbar-brand" :to="{ name: 'Index' }">
        <img class="nav-logo" src="../assets/logo.png"/>
        Twichu
      </router-link>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav navbar-sidenav">
          <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
            <a class="nav-link" href="tweetforme.html">
              <i class="fa fa-fw fa-pie-chart"></i>
              <span class="nav-link-text">나의 트윗을 통한 분석</span>
            </a>
          </li>
          <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
            <a class="nav-link" href="tweetforme.html">
              <i class="fa fa-fw fa-cogs"></i>
              <span class="nav-link-text">내 정보 관리</span>
            </a>
          </li>
          <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
            <a class="nav-link" href="tweetforme.html">
              <i class="fa fa-fw fa-thumbs-up"></i>
              <span class="nav-link-text">나를 위한 트윗 추천</span>
            </a>
          </li>
          <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Charts">
            <a class="nav-link" href="charts.html">
              <i class="fa fa-fw fa-link"></i>
              <span class="nav-link-text">관심사 기반 유저 매칭</span>
            </a>
          </li>
        </ul>
        
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <img v-bind:src="user_data.profile_image_url" style="height:25px;margin-top:5px;">
          </li>
          <li class="nav-item">
            <span class="nav-link">
              {{user_data.statuses_count}} 트윗 / 
              {{user_data.friends_count}} 팔로잉 / 
              {{user_data.followers_count}} 팔로워
            </span>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="modal" data-target="#exampleModal" href="/api/auth/twitter">
              <i class="fa fa-fw fa-sign-out"></i>LogIn</a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="content-wrapper">
      <div class="container-fluid">
        <router-link :to="{ name: 'HelloWorld' }">Go To HelloWorld</router-link>
        <button @click="authenticate('twitter')">auth Twitter</button>
        <p>
        {{ user_data }} {{ user_timeline }}
        </p>
        <div v-for="tweet in tweets" class="tweet">
          <img v-bind:src="tweet.poster" class="poster">
          <div>
            <strong>{{ tweet.content }}</strong>, <i>@{{ tweet.author.username }}</i> [{{ tweet.author.fullname }}] {{ tweet.date }}
            <!-- <router-link :to="{ name: 'show', params: { id: tweet.id }}">더보기</router-link> -->
          </div>
        </div>
        <footer class="sticky-footer">
          <div class="container">
            <div class="text-center">
              <small>Twichu © 2018</small>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.$http.get('/api/tweets')
    .then((response) => {
      this.tweets = response.data
    })
  },
  data () {
    return {
      tweets: [],
      user_data: {},
      user_timeline: {},
    }
  },
  methods: {
    authenticate: function (provider) {
      var this_ = this;
      this.$auth.authenticate(provider).then(function (response) {
        this_.user_data = response.data;
        // Execute application logic after successful social authentication
        this_.$http.get('/api/profile')
        .then((response) => {
          this_.user_timeline = response;
        })
      })
    }
  }
}
</script>
