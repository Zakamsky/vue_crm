import Vue from 'vue'
import Vuelidate from 'vuelidate';
import Paginate from 'vuejs-paginate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import tooltipDirective from './directives/tooltip.derective'
import messagePlugin from '@/utils/message.plugin'
import Loader from "@/components/app/Loader";
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min.js'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import currencyFilter from "./filters/currency.filter";

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.directive('tooltip', tooltipDirective);
Vue.component('Loader', Loader);
Vue.component('Paginate', Paginate)


firebase.initializeApp({
  apiKey: "AIzaSyCYIBrmw_DD7AcW5jevJ6_Cqc4Rn8ctm04",
  authDomain: "vue-crm-ae.firebaseapp.com",
  databaseURL: "https://vue-crm-ae.firebaseio.com",
  projectId: "vue-crm-ae",
  storageBucket: "vue-crm-ae.appspot.com",
  messagingSenderId: "1027418273286",
  appId: "1:1027418273286:web:db093d7f2cebdfd55e7587"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app){
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }

});




