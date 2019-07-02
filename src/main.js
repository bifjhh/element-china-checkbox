import Vue from 'vue'
import { CheckboxGroup, Checkbox, Button, Loading } from "element-ui";
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Button)
Vue.use(Loading)

new Vue({
  el: '#app',
  render: h => h(App)
})
