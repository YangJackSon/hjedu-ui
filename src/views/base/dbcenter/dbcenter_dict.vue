
<template>
  <my-drawer :visible="isShowDialog" size="400px" title="请假类型" direction="rtl">
    <div class="wid_100">
      <div class="m_both30">
        <p class="text-center color-333 m-b-20 font16 m-t-30">请假类型</p>
        <div v-for="(item,index) in dataList" :key="index" class="between-center list-item">
          <div class="flex_1">
            <p v-show="!item.isEdit">{{item.label}}</p>
            <input
              type="text"
              v-model="item.label"
              v-show="item.isEdit"
              class="border-e1 hgt30 inputDefault wid200 p_both10"
            />
          </div>
          <img
            src="@/assets/slice/stop.png"
            width="20"
            class="m-l-10"
            @click="item.statu=0"
            v-show="item.statu==1&&!item.isEdit"
          />
          <img
            src="@/assets/slice/start.png"
            width="20"
            class="m-l-10"
            @click="item.statu=1"
            v-show="item.statu==0&&!item.isEdit"
          />
          <img
            src="@/assets/slice/save.png"
            width="20"
            class="m-l-10"
            @click="item.isEdit=false"
            v-show="item.statu==1&&item.isEdit"
          />
          <img
            src="@/assets/slice/edit.png"
            @click="editItem(index,item)"
            class="m-l-10"
            v-show="item.statu==1&&item.isEdit==0"
          />
          <img
            src="@/assets/slice/edit1.png"
            width="18"
            class="m-l-10"
            v-show="item.statu==0&&item.isEdit==0"
          />
          <img
            src="@/assets/slice/back.png"
            width="20"
            v-show="item.isEdit"
            @click="cancleItem(index,item)"
            class="m-l-10"
          />
        </div>
        <div class="m-t-20">
          <el-button icon="el-icon-plus" round size="mini" @click="addItem">新增</el-button>
        </div>
      </div>
    </div>
  </my-drawer>
</template>
<script>
export default {
  props: ["isShowDialog"],
  data() {
    return {
      dataList: [
        {
          label: "事假",
          statu: 1,
          isEdit: false
        },
        {
          label: "出差",
          statu: 1,
          isEdit: false
        }
      ]
    };
  },
  methods: {
    // 编辑数据
    editItem(index, item) {
      item.oldLabel = item.label;
      item.isEdit = true;
    },
    // 取消编辑
    cancleItem(index, item) {
      if (item.oldLabel) {
        item.label = item.oldLabel;
        delete item.oldLabel;
        item.isEdit = false;
      } else {
        this.dataList.splice(index, 1);
      }
    },
    // 添加数据
    addItem() {
      this.dataList.push({
        label: "",
        statu: 1,
        isEdit: true
      });
    }
  }
};
</script>

<style  scoped>
.list-item {
  height: 50px;
  border-bottom: 1px solid #e1e1e1;
}
</style>
