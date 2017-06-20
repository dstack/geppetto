import Vue from 'vue'
import PosOri from './components/PosOriApp'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  components: { PosOri },
  template: '<PosOri/>'
}).$mount('#app')
