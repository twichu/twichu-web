<template>
  <ul class="navbar-nav navbar-sidenav">
    <li class="nav-item">
      <a class="nav-link" href="tweetforme.html">
        <i class="fa fa-fw fa-pie-chart"></i>
        <span class="nav-link-text">나의 트윗을 통한 분석</span>
      </a>
    </li>
    <li class="nav-item">
      <router-link  class="nav-link" :to="{ name: 'ProfilePage' }">
        <i class="fa fa-fw fa-cogs"></i>
        <span class="nav-link-text">내 정보 관리</span>
      </router-link>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="tweetforme.html">
        <i class="fa fa-fw fa-thumbs-up"></i>
        <span class="nav-link-text">나를 위한 트윗 추천</span>
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="charts.html">
        <i class="fa fa-fw fa-link"></i>
        <span class="nav-link-text">관심사 기반 유저 매칭</span>
      </a>
    </li>
  </ul>
</template>
