<template>   
   <div>
    <div>
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#">Twichu</a>
        </li>
        <li class="breadcrumb-item active">My Twichu</li>
      </ol>

      <div class="row">
        <div class="col-xl-3 col-sm-6 mb-3">
          <div class="card text-white bg-primary o-hidden h-100">
            <div class="card-body">
              <div class="card-body-icon">
                <i class="fa fa-fw fa-pie-chart"></i>
              </div>
              <div class="mr-5"><strong>나의 트윗을 통한 분석
                </strong>
              </div>
              <br>
              <font size=2>
      트위터 사용자가 트윗 & 리트윗한 <br>데이터를 기반으로<br>
      자신을 분석할 수 있게 하는<br> 기능을 제공하는 웹페이지<br>
      </font>
            </div>
            <router-link class="card-footer text-white clearfix small z-1" :to="{ name: 'AnalysisPage' }">
              <span class="float-left">View Details</span>
              <span class="float-right">
                <i class="fa fa-angle-right"></i>
              </span>
            </router-link>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6 mb-3">
          <div class="card text-white bg-warning o-hidden h-100">
            <div class="card-body">
              <div class="card-body-icon">
                <i class="fa fa-fw fa-cogs"></i>
              </div>
              
              <div class="mr-5"><strong>내 정보 관리</strong></div>
              <font size=2>
                <br>
               관심사는 사용자가 임의로<br>추가 제거 해주는 웹페이지<br><br>
            </font>
            </div>
            <router-link class="card-footer text-white clearfix small z-1" :to="{ name: 'ProfilePage' }">
              <span class="float-left">View Details</span>
              <span class="float-right">
                <i class="fa fa-angle-right"></i>
              </span>
            </router-link>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6 mb-3">
          <div class="card text-white bg-success o-hidden h-100">
            <div class="card-body">
              <div class="card-body-icon">
                <i class="fa fa-fw fa-thumbs-up"></i>
              </div>
              <div class="mr-5"><strong>나를 위한 트윗 추천</strong></div>
              <font size=2><br>
      또한 수집하는 트윗들을 <br>텍스트 마이닝을 통하여 <br>성격을 분류한 후
      분별된 사용자에게<br> 맞춤형 트윗을 제공하는 웹페이지 <br><br> 
              </font>
            </div>
            <router-link class="card-footer text-white clearfix small z-1" :to="{ name: 'TweetSuggestPage' }">
              <span class="float-left">View Details</span>
              <span class="float-right">
                <i class="fa fa-angle-right"></i>
              </span>
            </router-link>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6 mb-3">
          <div class="card text-white bg-danger o-hidden h-100">
            <div class="card-body">
              <div class="card-body-icon">
                <i class="fa fa-fw fa-link"></i>
              </div>
              <div class="mr-5"><strong>관심사 기반 유저 매칭</strong></div>
              <font size=2><br>
      관심사에 맞추어 비슷한 관심을 가진 사용자를 추천해주는 웹페이지<br><br>
      </font>
            </div>
             <router-link class="card-footer text-white clearfix small z-1" :to="{ name: 'UserSuggestPage' }">
              <span class="float-left">View Details</span>
              <span class="float-right">
                <i class="fa fa-angle-right"></i>
              </span>
            </router-link>
          </div>
        </div>
      </div>
<div class="card mb-3">
        <div class="card-header">
          <i class="fa fa-table"></i> Real-time Trend</div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
              <thead>
                <tr>
                  <th>id</th>
                  <th>creatat</th>
                  <th>trend</th>
                  <th>rank</th>
                  <th>locationcode</th>
                  <th>checked</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>id</th>
                  <th>creatat</th>
                  <th>trend</th>
                  <th>rank</th>
                  <th>locationcode</th>
                  <th>checked</th>
                </tr>
              </tfoot>
              <tbody>
                <tr>
                  <td>1160</td>
                  <td>2017-10-17 06:13:02.000</td>
                  <td>#Selena</td>
                  <td>49</td>
                  <td>23424977</td>
                  <td>14</td>
                </tr>
                <tr>
                  <td>1161</td>
                  <td>2017-10-17 06:13:02.000</td>
                  <td>Derrick Henry</td>
                  <td>17</td>
                  <td>23424977</td>
                  <td>14</td>
                </tr>
                <tr>
                  <td>1162</td>
                  <td>2017-10-17 06:13:02.000</td>
                  <td>#LHHH</td>
                  <td>43</td>
                  <td>23424977</td>
                  <td>14</td>
                </tr>
                <tr>
                  <td>1163</td>
                  <td>2017-10-17 06:13:02.000</td>
                  <td>#Colts</td>
                  <td>46</td>
                  <td>23424977</td>
                  <td>15</td>
                </tr>
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$http.get('/api/suggest/tweet').then((response) => {
      this.tweets = response.data;
    });
  },
  data() {
    return {
      tweets: [],
    };
  },
};
</script>
