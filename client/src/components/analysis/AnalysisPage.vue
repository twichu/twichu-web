<template>
  <div>
    <div class="card">
      <div class="card-body">
        <h3><i class="fa fa-fw fa-pie-chart mb-2"></i> 나의 트윗을 통한 분석</h3>
        <h5>
          <form class="form-inline">
            <label class="mx-1">나의 최근 트윗 개수</label>
            <input type="number" class="form-control col-md-1 mx-1" v-model="tweet_count">
            <label class="mx-1">개와 최근 리트윗 개수</label>
            <input type="number" class="form-control col-md-1 mx-1" v-model="retweet_count">
            <label class="mx-1">개를</label>
            <div @click="analysis()" class="btn btn-dark mx-1">분석요청</div>
            <label class="mx-1">합니다.</label>

            <b-modal ref="reqCompleteModal" hide-footer title="나의 트윗을 통한 분석">
              <div class="d-block text-center">
                <h3>{{ msg }}</h3>
              </div>
              <b-btn class="mt-3" variant="dark" block @click="hideModal">확인</b-btn>
            </b-modal>
          </form>
        </h5>
      </div>
    </div>
    <br>
    <mini-profile></mini-profile>
  </div>
</template>

<script>
import MiniProfile from '@/components/profile/MiniProfile';

export default {
  data() {
    return {
      tweet_count: 100,
      retweet_count: 100,
      msg: '',
    };
  },
  components: {
    'mini-profile': MiniProfile,
  },
  methods: {
    showModal() {
      this.$refs.reqCompleteModal.show();
    },
    hideModal() {
      this.$refs.reqCompleteModal.hide();
    },
    analysis() {
      this.$http.post('/api/analysis', {
        tweet_count: this.tweet_count,
        retweet_count: this.retweet_count,
      }).then((response) => {
        this.msg = response.data.msg;
        this.showModal();
      });
    },
  },
};
</script>
