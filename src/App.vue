<template>
  <div class="checkbox">
    <div class="title">
      <h5>如果选择省份,则改省份内所有区域会被选中</h5>
      <h5>如果选择城市,则改城市内所有区域会被选中</h5>
      <h5>点击响应区域内箭头,则可展开对应的区域</h5>
      <h5>如需关闭,则需要点击关闭按钮</h5>
      <h5>点击输出数据,则需要在组件上监听`getElData`事件,获取一个Object对象</h5>
      <h5>Object对象包含三个数组,分别为</h5>
      <div class="text">已选择省份ID: provinceId</div>
      <div class="text">已选择城市ID: cityId</div>
      <div class="text">已选择区县ID: areaId</div>
      <h5>为了达到预览效果则在当前页面中展示所选择的数据,也可以在控制台查看</h5>
    </div>
    <element-china-checkbox ref="checkbox" :Submit="false" :Selected="selectedData">确认</element-china-checkbox>
    <div class="submit">
      <el-button type="primary" plain @click="saveAndBack">输出数据</el-button>
    </div>
    <div class="submit" v-if="showData">
      <div class="text">已选择省份ID: {{JSON.stringify(provinceId)}}</div>
      <div class="text">已选择城市ID: {{JSON.stringify(cityId)}}</div>
      <div class="text">已选择区县ID: {{JSON.stringify(areaId)}}</div>
    </div>
  </div>
</template>

<script>
  // import elementChinaCheckbox from 'element-china-checkbox'
  export default {
    name: 'china-checkbox',
    mounted() {},
    data: () => ({
      provinceId: [],
      selectedData: {
        provinceId: ['110000'],
        cityId: ['110100'],
        areaId: ['110101','110102']
      },
      cityId: [],
      areaId: [],
      showData: false,
      loading: true
    }),
    methods: {
      saveAndBack() {
        this.getFormData()
        this.showData = true
      },

      // 获取当前Form表单内容
      getFormData(data) {
        const checkboxData = this.$refs.checkbox
        this. provinceId = checkboxData.provinceId
        this. cityId = checkboxData.cityId
        this. areaId = checkboxData.areaId
        // const formData = {}

        // Object.keys(data).forEach(key => {
        //   if (key && data[key]) {
        //     formData[key] = data[key]
        //   }
        // })
        // return formData
      }
    }
  }
</script>

<style lang="scss">

.set_num{
  >.el-form-item__content{
    width: 800px!important;
  }
}
.w80{
  display: flex;
  >.el-form-item__content{
    width: auto!important;
    margin-right: 30%;
  }
}
.clear_box{
  span.el-checkbox__input{
    display: none!important;
  }
  span.el-checkbox__label{
    color: #000;
    font-size: 12px;
    padding: 0 5px!important;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 4px;
    padding: 1px 3px;
    display: inline-block;
  }
}
.triangle_box{
  span.el-checkbox__input{
    display: none!important;
  }
}
</style>

<style lang="scss" scoped>
h5{
  margin: 0;
  padding: 5px 0;
}
.title{
  margin-bottom: 20px;
}
.checkbox{
  padding: 0 20%;
  padding-top: 50px;
}
.mini_input{
  width: 150px;
  margin: 0 8px;
}
.ck_box{
  position: relative;
  .c_ck_box{
    width: 500px;
    display: flex;
    display: none;
    flex-wrap: wrap;
    background-color: #fff;
    position: absolute;
    z-index: 99;
    // bottom: 0;
    // left: 0;
    margin-top: 1em;
    border: 2px solid #cff;
    padding: 10px;
    padding-bottom: 5px;
    .a_ck_box{
      width: 500px;
      display: flex;
      display: none;
      flex-wrap: wrap;
      background-color: #fff;
      position: absolute;
      z-index: 299;
      left: -12px;
      margin-top: 1em;
      border: 2px solid #cff;
      padding: 10px;
    }
  }
}
.clear_box {
  width: 100%;
  border: none;
  text-align: right;
  .clear_btn{
    color: #000;
    left: 0;
    bottom: 0;
    font-size: 12px;
    padding: 0 3px;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 4px;
    padding: 1px 3px;
    display: inline-block;
  }
}
.pid_title,.cid_title{
  display: flex;
  align-items: center;
}
.triangle-down {
  cursor:pointer;
  margin-left: 3px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 10px solid #666;
}
.pid_ck_for{
  display: inline-block;
  .ck_box{
    margin-right: 0;
  }
  .triangle_box{
    padding-right: 15px;
    margin-left: -8px;
  }
}
.cid_ck_for{
  display: inline-block;
  .cid_ck_box{
    margin-right: 0;
  }
  .triangle_box{
    padding-right: 15px;
    margin-left: -8px;
  }
}
.submit{
  margin-top: 50px;
  text-align: left;
}
</style>
