<template>
  <div>
    <h2>Twichu(?) 소개 페이지</h2>
    <div v-for="tweet in tweets" v-bind:key="tweet.id">
      <strong>{{ tweet.content }}</strong>, <i>@{{ tweet.author.username }}</i> [{{ tweet.author.fullname }}] {{ tweet.date }}
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
    }
  }
}
</script>
