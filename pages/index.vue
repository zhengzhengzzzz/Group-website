<template>
  <div class="smooth-wrapper">
    <!-- 首页第一屏 -->
    <Wrapper />
    <!-- 第二屏 -->
    <GroupIntroduction />
    <!-- 第三屏 -->
    <Adviser />
    <!-- 第四屏 -->
    <ProjectDisplay />
    <!-- 第五屏 -->
    <Advisory />
  </div>
</template>
<script setup lang="ts">
import { useHomestore } from "~/store/home";
const usehomestore = useHomestore();
usehomestore.ChangeisRequireanim(true);
</script>
<style lang="scss">
.vvhan-com-denglong-c {
  font-size: 0.24rem !important;
}
.smooth-wrapper {
  height: auto;
  width: 100%;
}
</style>
