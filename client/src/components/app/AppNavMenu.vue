<template>
  <ul class="navbar-nav navbar-sidenav">
    <li class="nav-item">
      <router-link  class="nav-link nav-menu" :to="{ name: 'AnalysisPage' }">
        <i class="fa fa-fw fa-pie-chart"></i>
        <span class="nav-link-text">나의 트윗을 통한 분석</span>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link  class="nav-link nav-menu" :to="{ name: 'ProfilePage' }">
        <i class="fa fa-fw fa-cogs"></i>
        <span class="nav-link-text">내 정보 관리</span>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link  class="nav-link nav-menu" :to="{ name: 'TweetSuggestPage' }">
        <i class="fa fa-fw fa-thumbs-up"></i>
        <span class="nav-link-text">나를 위한 트윗 추천</span>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link  class="nav-link nav-menu" :to="{ name: 'UserSuggestPage' }">
        <i class="fa fa-fw fa-link"></i>
        <span class="nav-link-text">관심사 기반 유저 매칭</span>
      </router-link>
    </li>
    <Adsense
      data-ad-client="ca-pub-3397336129295247"
      data-ad-slot="4467819708">
    </Adsense>
  </ul>
</template>
