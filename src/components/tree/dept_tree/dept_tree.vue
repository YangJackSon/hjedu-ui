<template>
  <div style="width:100%">
    <div class="dept-tree">
      <el-tree
        :data="treeData"
        show-checkbox
        default-expand-all
        node-key="id"
        accordion
        @check-change="handleCheckChangeTree"
        ref="tree"
        highlight-current
        :props="treesProps"
      ></el-tree>
      <div style=" margin-top: 20px;width:100%">
        <div class="m_both30 m-v-20" style="border: 1px solid #e1e1e1; padding:10px;min-height:100px;">
          <el-tag
            v-for="(item,index) in checkArr"
            :key="index"
            closable
            @close="deleCheckPreson(item,index)"
            class="m-t-5 m-l-5"
          >{{item.name}}</el-tag>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    treeData: {
      type: Array,
      default: []
    },
    treesProps: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      // 选中的设置权限或者管理的人
      checkArr: []
    };
  },
  methods: {
    //   接受初始数据
    getData(data) {
      this.checkArr = [];
      this.$nextTick(() => {
        this.$refs.tree.setCheckedNodes(data);
      });
      this.checkArr = data;
    },
    // 删除选中的设置权限或者管理的人
    deleCheckPreson(item, index) {
      this.checkArr.splice(index, 1);
      this.$nextTick(() => {
        this.$refs.tree.setCheckedNodes(this.checkArr);
      });
    },
    // 当选择tree改变的时候获取数据
    handleCheckChangeTree() {
      let newNodeArr = this.$refs.tree.getCheckedNodes().filter(item => {
        if (!item.children) {
          return item;
        }
      });
      let newIds = [];
      let oldIds = [];
      this.checkArr.forEach(item => {
        oldIds.push(item.id);
      });
      newNodeArr.forEach(item => {
        newIds.push(item.id);
      });
      // 添加
      if (newIds.length > oldIds.length) {
        // // 差集-两次选中数据的ID差集
        let differenceIds = Array.from(
          new Set(
            newIds
              .concat(oldIds)
              .filter(v => new Set(newIds).has(v) && !new Set(oldIds).has(v))
          )
        );
        newNodeArr.forEach(item => {
          differenceIds.forEach(id => {
            if (item.id == id) {
              this.checkArr.push(item);
            }
          });
        });
      }
      // 删除
      if (newIds.length < oldIds.length) {
        let differenceIds = Array.from(
          new Set(
            oldIds
              .concat(newIds)
              .filter(v => new Set(oldIds).has(v) && !new Set(newIds).has(v))
          )
        );
        let deleIndex = [];
        differenceIds.forEach(id => {
          this.checkArr.forEach((item, index) => {
            if (item.id == id) {
              deleIndex.push(index);
            }
          });
        });
        deleIndex.forEach(item => {
          this.checkArr.splice(item, 1);
        });
      }
      this.$emit("getCheckData", this.checkArr);
    },
    // 清空
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
      this.checkArr = [];
      this.$emit("getCheckData", this.checkArr);
    }
  }
};
</script>
<style  scoped>
.m-t-5 {
  margin-top: 5px;
}
.m-l-5 {
  margin-left: 5px;
}
.m_both30 {
  margin-left: 30px;
  margin-right: 30px;
}
.m-v-20 {
  margin-top: 20px;
  margin-bottom: 20px;
}
.dept-tree {
  display: flex !important;
  display: -webkit-box !important;
  display: -webkit-flex !important;
  flex-direction: column;
  -webkit-flex-direction: column;
  align-items: center;
  -webkit-align-items: center;
  width: 100%;
}
</style>