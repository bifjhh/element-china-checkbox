import Vue from 'vue'
import { CheckboxGroup, Checkbox, Button, Loading } from "element-ui";
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
// import elementChinaCheckbox from './elementChinaCheckbox'
import elementChinaCheckbox from 'element-china-checkbox'

Vue.use(elementChinaCheckbox)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Button)
Vue.use(Loading)

new Vue({
  el: '#app',
  render: h => h(App)
})
