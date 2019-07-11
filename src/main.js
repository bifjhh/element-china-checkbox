import Vue from 'vue'
import { CheckboxGroup, Checkbox, Button, Loading, Form, FormItem, Input } from "element-ui";
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
// import elementChinaCheckbox from '../element-china-checkbox/src/app'
import elementChinaCheckbox from 'element-china-checkbox'

Vue.use(elementChinaCheckbox)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Button)
Vue.use(Loading)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

new Vue({
  el: '#app',
  render: h => h(App)
})
