# Element UI 中国省市区级联数据-复选框-同时选择

## 安装

  `npm install element-china-checkbox -S`

## 示例

[点击查看在线DEMO,初次打开会比较慢](http://www.bifjhh.com/element-china-checkbox/index.html)


### 图片示例
##### 默认状态

![默认状态](https://img.kemanyun.com/qianhuituan/2019-07-02/69_1562082398_f1Vyx1avCm.png)



#### 点击展开下拉菜单

![点击展开下拉菜单](<https://img.kemanyun.com/qianhuituan/2019-07-02/69_1562082398_A44J559Ot9.png>)

#### 选中对应城市所有区域(全选)

![选择区域](<https://img.kemanyun.com/qianhuituan/2019-07-02/69_1562082398_Btk9uRMtGF.png>)

###### 再次点击则可以取消全选

#### 关闭下拉菜单

![关闭下拉菜单](https://img.kemanyun.com/qianhuituan/2019-07-02/69_1562082398_7N0LTkgATf.png)

#### 获取数据

- 通过监听 `getElData`事件获取一个Object

  ![获取数据](<https://img.kemanyun.com/qianhuituan/2019-07-02/69_1562082398_zwWRRD9VRv.png>)

```js
// 数据格式如下
const checkData = {
  provinceId: this.provinceId, // 省份ID
  cityId: this.cityId, // 城市ID
  areaId: this.areaId, // 区县ID
}
```

## 使用

```js
// 引入组件
import elementChinaCheckbox from 'element-china-checkbox'
// 注册组件
components: {
  elementChinaCheckbox
}
```
```html
<!-- 使用组件并监听事件 getElData-->
<element-china-checkbox @getElData="getElData">
  确认选择
  <!-- 使用slot 可以传入自定义内容来替换默认文字 -->
</element-china-checkbox>
```

#### 使用this.$refs来获取数据
- 如果觉得按钮对整体风格有所影响,则可以通过传入 `Submit=false` 来控制是否显示按钮以及自定义事件
```html
<element-china-checkbox :Submit="false"> </element-china-checkbox>
```
- 使用`this.$refs`来获取数据
```js
  const checkboxData = this.$refs.xxxx
  const province_id = checkboxData.provinceId
  const city_id = checkboxData.cityId
  const region_id = checkboxData.areaId
```
#### 传入已选择的数据
```html
<element-china-checkbox :Submit="false" :Selected="selectedData"> </element-china-checkbox>
```

```js
/* 注意,数组内ID为String类型 */
const selectedData = {
  provinceId: [] // 已选择的省份
  cityId: [] // 已选择市级区域
  areaId: [] // 已选择的区县
}

```

## 数据来源

[china-area-data v4.0.0](https://github.com/airyland/china-area-data)

- 请确保使用了`china-area-data`依赖包,否则将会缺少数据源

## GitHub地址

- 前往GitHub [点击前往](https://github.com/bifjhh/element-china-checkbox)

- 如果改进之处,欢迎点击[提交issues](https://github.com/bifjhh/element-china-checkbox/issues)


