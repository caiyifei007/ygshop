// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleItemTap(e) {
      var {
        index
      } = e.currentTarget.dataset;
      // console.log(index);
      // 子组件向父组件传值
      this.triggerEvent('tabsItemChange', {
        index
      });
    }
  }
})