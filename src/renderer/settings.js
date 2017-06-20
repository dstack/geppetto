import Vue from 'vue'
import SettingsApp from './components/SettingsApp'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  components: { SettingsApp },
  template: '<SettingsApp/>'
}).$mount('#app')
