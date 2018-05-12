<template>
    <div>
        <center>
        <img src="./경고.png" height="150" width="150">
        <h5>
        <br>
        이용에 <strong>불편을 드려</strong> 죄송합니다.
        <br>
        요청하신 페이지를 찾을 수 없습니다.
        </h5>
        <br>
        <br>
        찾고계시는 페이지가 존재하지 않거나 잘못된 링크를 사용하셨습니다.
        <br> 다시한번 확인해 주시고 이용하여 주시기 바랍니다.
        <br>
        <br>
        감사합니다.
        <br>
        <hr>
        <router-link  class="nav-link nav-menu" :to="{ name: 'Index' }">
           
            <span class="nav-link-text">메인페이지</span>
        </router-link>
        </center>
    </div>
</template>
