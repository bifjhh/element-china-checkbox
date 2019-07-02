# Element UI 中国省市区级联数据-复选框-同时选择

## 安装

  `npm install element-china-checkbox -S`

## 示例

![QQ20190702-220441-HD](/Users/sunkun/Desktop/Code/element-china-checkbox/QQ20190702-220441-HD.gif)


## 使用

```js
import elementChinaCheckbox from 'element-china-checkbox'
```

#### 获取数据
- 监听 `getElData`自定义事件获取一个Object

```js
const checkData = {
  provinceId: this.provinceId, // 省份ID
  cityId: this.cityId, // 城市ID
  areaId: this.areaId, // 区县ID
}
```
## 数据来源

[china-area-data v4.0.0](https://github.com/airyland/china-area-data)

