<template>
  <div>
    <h2>나의 트윗을 통한 분석</h2>
    <form class="form-inline">
      <label class="mr-sm-2">최근 트윗 개수</label>
      <input type="number" class="form-control col-md-1 mr-sm-2" v-model="tweet_count">
      <label class="mr-sm-2">최근 리트윗 개수</label>
      <input type="number" class="form-control col-md-1 mr-sm-2" v-model="retweet_count">
      <div @click="analysis()" class="btn btn-dark">분석요청</div>

      <b-modal ref="reqCompleteModal" hide-footer title="나의 트윗을 통한 분석">
        <div class="d-block text-center">
          <h3>분석 요청 완료</h3>
        </div>
        <b-btn class="mt-3" variant="dark" block @click="hideModal">확인</b-btn>
      </b-modal>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tweet_count: 100,
      retweet_count: 100,
    };
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
      }).then(() => {
        this.showModal();
      });
    },
  },
};
</script>
