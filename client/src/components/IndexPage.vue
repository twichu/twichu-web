<template>
  <div>
    <router-link :to="{ name: 'HelloWorld' }">Go To HelloWorld</router-link>
    <!-- <p>
    {{ user_data }} {{ user_timeline }}
    </p> -->
    <div v-for="tweet in tweets" class="tweet">
      <img v-bind:src="tweet.poster" class="poster">
      <div>
        <strong>{{ tweet.content }}</strong>, <i>@{{ tweet.author.username }}</i> [{{ tweet.author.fullname }}] {{ tweet.date }}
        <!-- <router-link :to="{ name: 'show', params: { id: tweet.id }}">더보기</router-link> -->
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
    }
  }
}
</script>
