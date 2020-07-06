
<template>
  <div class="bg-fff flex_dom hgt_60 l-h-60">
    <div
      v-for="(item,index) in data"
      :key="index"
      :class="activeTab === index ? 'isactive' : '' "
      class="choice"
      @click="activeChange(index)"
    >{{item.label}}</div>
  </div>
</template>
<script>
export default {
  props: {
    activeTabIndex: {
      type: Number
    },
    data: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      activeTab: 0
    };
  },
  methods: {
    activeChange(e) {
      this.$emit("changeTab", e);
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
