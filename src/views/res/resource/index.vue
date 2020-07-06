<template>
  <div>
    <my-tabs :activeTabIndex="0" :data="tabsData" @changeTab="activeChange"></my-tabs>
    <div class="border-eee bg-fff p-t-20">
    <resource-upload v-show="activeTab==0"></resource-upload>
    </div>
  </div>
</template>
<script>
import resourceUpload from "./resource_upload";
export default {
  components: {
    resourceUpload
  },
  data() {
    return {
      activeTab: 0,
      tabsData: [
        {
          label: "我上传的资源"
        },
        {
          label: "我审批的资源"
        },
        {
          label: "我浏览的资源"
        }
      ]
    };
  },
  methods: {
    activeChange(e) {
      this.activeTab = e;
    }
  }
};
</script>

<style scoped>
.isactive {
  border-bottom: 2px solid var(--theme-color);
}
.choice {
  margin: 0 40px;
}
</style>
