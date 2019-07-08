<template>
<div class="china_checkbox" v-if="JSON.stringify(REGION_DATA) != '{}'"> 
  <el-checkbox-group
    @change="pidChange"
    v-model="provinceId">
    <!-- 此处渲染省级 -->
    <div class="pid_ck_for" v-for="(pname, pid) in REGION_DATA[86]" :key="pid">
      <el-checkbox class="ck_box" :label="pid"><span  class="pid_title" :class="'pid'+pid">{{pname}}</span>
        <el-checkbox-group class="c_ck_box" v-model="cityId"  @change="checked=>cidChange(checked,pid)">
          <!-- 此处渲染市级 -->
          <div class="cid_ck_for" v-for="(cname, cid) in REGION_DATA[pid]" :key="cid" >
            <el-checkbox class="cid_ck_box" :label="cid"><span class="cid_title" :class="'cid'+cid">{{cname}}</span></span>
              <el-checkbox-group class="a_ck_box" v-model="areaId" @change="checked=>aidChange(checked,pid,cid)">
                <!-- 此处渲染区县 -->
                <el-checkbox v-for="(aname, aid) in REGION_DATA[cid]" :key="aid" :label="aid"><span class="aid_title" :class="'aid'+aid">{{aname}}</span></el-checkbox>
                <div class="clear_box">
                  <!-- 此处关闭下拉菜单 -->
                  <el-checkbox @click.native.prevent="clearBox('.cid'+cid)">关闭</el-checkbox>
                </div>
              </el-checkbox-group>
            </el-checkbox>
            <!-- 此处开启下拉菜单 -->
            <el-checkbox :class="'triangle_box'" @click.native.prevent="changeStyle(('.cid'+cid), '.a_ck_box')"><div class="triangle-down"></div></el-checkbox>
          </div>
          <!-- 此处关闭下拉菜单 -->
          <div class="clear_box">
            <el-checkbox @click.native.prevent="clearBox('.pid'+pid)">关闭</el-checkbox>
          </div>
        </el-checkbox-group>
      </el-checkbox>
      <!-- 此处开启下拉菜单 -->
      <el-checkbox :class="'triangle_box'" @click.native.prevent="changeStyle(('.pid'+pid), '.c_ck_box')"><div class="triangle-down"></div></el-checkbox>
    </div>
  </el-checkbox-group>
  <div class="submit" v-if="Submit">
    <el-button type="primary" plain @click="saveAndBack">
      <slot>确认选择</slot>
    </el-button>
  </div>
</div>
</template>

<script>
  import chinaData from 'china-area-data'
  export default {
    name: 'element-china-checkbox',
    created() {
     setTimeout(() => {
       this.REGION_DATA = chinaData
     }, 0)
      this.provinceId = this.old_provinceId = this.Selected.provinceId || []
      this.cityId = this.old_cityId = this.Selected.cityId || []
      this.areaId = this.old_areaId = this.Selected.areaId || []
    },
    props: {
      Submit: {
        type: Boolean,
        default: true
      },
      Selected: {
        type: Object,
        default: () => {}
      }
    },
    data: () => ({
      REGION_DATA: {},
      provinceId: [],
      cityId: [],
      areaId: [],
      old_provinceId: [],
      old_cityId: [],
      old_areaId: [],
      showData: false
    }),
    methods: {
      saveAndBack() {
        this.showData = true
        const checkData = {
          provinceId: this.provinceId,
          cityId: this.cityId,
          areaId: this.areaId,
        }
        this.$emit('getElData',checkData)
      },

      // 匹配省级变动
      pidChange(v) {
        const change = this.isRemove(this.old_provinceId, v, 'cityId', 'areaId', 'provinceId')

        if (change.length) this.old_provinceId = [...v]
        change.forEach(e => {
          const keys = Object.keys(this.REGION_DATA[e])
          this.setCk('cityId', keys, 'areaId')
        })
      },

      // 匹配市级变动
      cidChange(v, pid) {
        const change = this.isRemove(this.old_cityId, v, 'areaId', null, 'cityId')
        if (!change.length) return
        this.old_cityId = [...v]
        if (!~this.provinceId.indexOf(pid)) this.provinceId.push(pid)
        change.forEach(e => {
          const keys = Object.keys(this.REGION_DATA[e])
          this.setCk('areaId', keys, null)
        })
      },

      // 匹配区县级变动
      aidChange(v, pid, cid) {
        if (typeof v !== 'object') return 
        if (v.length > this.old_areaId.length) {
          if (!~this.provinceId.indexOf(pid)) this.provinceId.push(pid)
          if (!~this.cityId.indexOf(cid)) this.cityId.push(cid)
          if (!~this.old_provinceId.indexOf(pid)) this.provinceId.push(pid)
          if (!~this.old_cityId.indexOf(cid)) this.cityId.push(cid)
        }
        this.old_areaId = v
      },

      // 删除元素
      remove(name, keys, nextName) {
        this[name] = this.difference(this[`old_${name}`], keys)
        this[`old_${name}`] = this[name]
        if (name === 'areaId') return false
        keys.forEach(e => {
          const key = Object.keys(this.REGION_DATA[e] || {})
          if (nextName && key.length > 1) this.remove(nextName, key)
        })
      },

      // 增加元素
      setCk(name, keys, nextName) {
        keys.forEach(e => {
          this[name].push(e)
          const key = Object.keys(this.REGION_DATA[e] || {})
          if (nextName && key.length > 1) this.setCk(nextName, key)
        })
        this[name] = [...new Set(this[name])]
        // 数据同步
        this[`old_${name}`] = this[name]
      },

      /**
       * 获取新旧数据差集
       *
       * @param {Array} oldData 旧的数据
       * @param {Array} newData 新的数据
       * @returns {Array} 返回一个数组
       */
      difference(oldData, newData) {
        const differenceSet = []
        oldData.forEach(v => {
          if (!~newData.indexOf(v)) {
            differenceSet.push(v)
          }
        })
        return differenceSet
      },

      /**
       * 判断是新增还是减少
       *
       * @param {Array} oldData 旧的数据
       * @param {Array} newData 新的数据
       * @param {String} name 这次需要修改的数据name
       * @param {String} nextName 下次遍历需要的数据名称
       * @param {String} thisName 当前调用者自身的name
       * @returns {Array} 返回一个数组
       */
      isRemove(oldData, newData, name, nextName, thisName) {
        let change = []
        if (typeof oldData !== 'object' || typeof newData !== 'object') return change

        if (oldData.length > newData.length) {
          change = this.difference(oldData, newData)
          change.forEach(e => {
            const keys = Object.keys(this.REGION_DATA[e])
            this.remove(name, keys, nextName)
          })
          this[`old_${thisName}`] = newData
          return []
        }
        change = this.difference(newData, oldData)

        return change
      },

      // 设置class样式
      changeStyle(key, nextKey) {
        // 获取当前菜单盒子
        const boxDOM = document.querySelector(key).offsetParent.querySelector(nextKey)
        // 获取所有盒子列表项
        const list = document.querySelectorAll(nextKey)
        list.forEach(e => {
          e.style.display = 'none'
        })
        boxDOM.style.display = 'flex'
      },

      // 关闭下级出菜单
      clearBox(key) {
        const boxDOM = document.querySelector(key).offsetParent.querySelector('.el-checkbox-group')
        boxDOM.style.display = 'none'
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
.checkbox{
  padding: 0 20%;
  padding-top: 200px;
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
  text-align: right;
}
</style>
