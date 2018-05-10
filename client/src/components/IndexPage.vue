<style src="./vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet"></style>
<style src="./vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"></style>
<style src="./vendor/datatables/dataTables.bootstrap4.css" rel="stylesheet"></style>
<style src="./css/sb-admin.css" rel="stylesheet"></style>

<template>
  <div class="tweets">

  <div class="fixed-nav sticky-footer bg-dark" id="page-top">
  <!-- Navigation-->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
    <a class="navbar-brand" href="index.html">OPTwitter</a>
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarResponsive">
      <ul class="navbar-nav navbar-sidenav" id="exampleAccordion">
        <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Components">
          <a class="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseComponents" data-parent="#exampleAccordion">
            <i class="fa fa-fw fa-wrench"></i>
            <span class="nav-link-text">나는 누구인가</span>
          </a>
          <ul class="sidenav-second-level collapse" id="collapseComponents">
            <li>
              <a href="analyze.html">트윗을 통한 분석</a>
            </li>
            <li>
              <a href="manage.html">내 정보 관리</a>
            </li>
          </ul>
        </li>
        <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
          <a class="nav-link" href="tweetforme.html">
            <i class="fa fa-fw fa-dashboard"></i>
            <span class="nav-link-text">나를 위한 트윗</span>
          </a>
        </li>
        <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Charts">
          <a class="nav-link" href="charts.html">
            <i class="fa fa-fw fa-area-chart"></i>
            <span class="nav-link-text">유저 매칭 서비스</span>
          </a>
        </li>
      </ul>
      <ul class="navbar-nav sidenav-toggler">
        <li class="nav-item">
          <a class="nav-link text-center" id="sidenavToggler">
            <i class="fa fa-fw fa-angle-left"></i>
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
    <!-- Breadcrumbs-->
    <br><br><br>
    <router-link :to="{ name: 'HelloWorld' }">Go To HelloWorld</router-link>
    <router-link :to="{ name: 'ItemList' }">Go To ItemList</router-link>
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
    <center><br>기존 트위터 검색의 불편함을 해결하기 위해서 만들었습니다. <br>
      검색 API의 한계로 현재로부터 10일 전까지의 트윗만 검색됩니다.<br>

      너무 많은 결과수 혹은 너무 자주 이용하면 API 리밋에 걸릴 수 있습니다.<br> 리밋은 15분단위로 초기화 됩니다. <br><br><br></center> 

    <footer class="sticky-footer">
      <div class="container">
        <div class="text-center">
          <small>Copyright © Your Website 2018</small>
        </div>
      </div>
    </footer>
    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
      <i class="fa fa-angle-up"></i>
    </a>
    <!-- Logout Modal-->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
          <div class="modal-footer">
            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
            <a class="btn btn-primary" href="login.html">Logout</a>
          </div>
        </div>
      </div>
    </div>
    <!-- Bootstrap core JavaScript-->
    </div>
  </div>
  </div>
  </div>
</template>

<script src="./vendor/jquery/jquery.min.js"></script>
<script src="./vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="./vendor/jquery-easing/jquery.easing.min.js"></script>
<script src="./vendor/chart.js/Chart.min.js"></script>
<script src="./vendor/datatables/jquery.dataTables.js"></script>
<script src="./vendor/datatables/dataTables.bootstrap4.js"></script>
<script src="./js/sb-admin.min.js"></script>
<script src="./js/sb-admin-datatables.min.js"></script>
<script src="./js/sb-admin-charts.min.js"></script>
<script>
export default {
  created () {
    this.$http.get('/api/tweets')
    .then((response) => {
      this.tweets = response.data
    })

    this.$http.get('/api/profile')
    .then((response) => {
      this.user_data = response.data.user
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
