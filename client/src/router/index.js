import Vue from 'vue';
import Router from 'vue-router';
import IndexPage from '@/components/IndexPage';
import AnalysisPage from '@/components/analysis/AnalysisPage';
import ProfilePage from '@/components/profile/ProfilePage';
import TweetSuggestPage from '@/components/tweet_suggest/TweetSuggestPage';
import UserSuggestPage from '@/components/user_suggest/UserSuggestPage';
import NotFound from '@/components/app/NotFound';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Index', component: IndexPage },
    { path: '/analysis', name: 'AnalysisPage', component: AnalysisPage },
    { path: '/profile', name: 'ProfilePage', component: ProfilePage },
    { path: '/suggest/tweets', name: 'TweetSuggestPage', component: TweetSuggestPage },
    { path: '/suggest/users', name: 'UserSuggestPage', component: UserSuggestPage },
    { path: '*', component: NotFound },
  ],
});
