<template>
  <div class="filelist">
    <el-table
      v-loading="Loading"
      ref="multipleTableRef"
      :data="Filelist.dataList"
      style="width: 100%"
    >
      <el-table-column label="文件名" min-width="70" show-overflow-tooltip>
        <template #default="scope">
          <svg class="icon" aria-hidden="true">
            <use
              :xlink:href="`#${iconfontType(filetype(scope.row.name))}`"
            ></use>
          </svg>
          {{ scope.row.name }}</template
        >
      </el-table-column>
      <el-table-column property="uploadDate" label="时间" min-width="60" />
      <el-table-column
        property="uploadName"
        min-width="30"
        label="上传者"
        show-overflow-tooltip
      />
      <el-table-column
        property="fileSize"
        min-width="30"
        label="文件大小"
        show-overflow-tooltip
      />
      <el-table-column
        min-width="30"
        property="collections"
        label="收藏数量"
        show-overflow-tooltip
      />
      <el-table-column
        property="address"
        label="操作"
        show-overflow-tooltip
        min-width="80"
      >
        <template #default="scope">
          <ElButton
            type="primary"
            plain
            @click="() => downFile(scope.row.url, scope.row.name)"
            >下载</ElButton
          >
          <ElButton
            type="info"
            @click="() => copyToClipboard(scope.row.url)"
            plain
            >分享</ElButton
          >
          <ElButton type="warning" @click="() => openPrew(scope.row.id)" plain
            >预览</ElButton
          >
          <ElButton
            style="width: 0.7rem"
            @click="() => Favoritefilesend(scope.row.id)"
            type="warning"
            :color="`${
              scope.row.is_collection == 1
                ? 'rgb(241,243,248)'
                : 'rgb(40,77,213)'
            }`"
          >
            {{ scope.row.is_collection == 1 ? "已收藏" : "收藏" }}
          </ElButton>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 0.2rem"
      v-model:current-page="curIndex"
      v-model:page-size="Pagesize"
      :page-sizes="[5, 10, 20]"
      background
      layout="sizes, prev, pager, next"
      :total="Filelist.count"
    />
    <DownCom />
  </div>
</template>
<script setup lang="ts">
import { Favoritefile } from "~/service/homeApi";
import { storeToRefs } from "pinia";
import { useDiskstore } from "~/store/disk";
import { unCollectionFile } from "~/service/disk";
const diskstore = useDiskstore();
const { openPrew } = usePrew();
const { Filelist, Pagesize, Loading, curIndex, down } = storeToRefs(diskstore);
//收藏防抖
const Favoritefilesend = Mythrottle(async (id: number) => {
  const res = await Favoritefile(id);
  if (res.data.value.code === 20000) {
    diskstore.changeUncomment(id);
    ElMessage({ message: res.data.value.message, type: "success" });
  }
  if (res.data.value.code === 51000) {
    //取消收藏，并且在本地切换收藏状态
    diskstore.changeUncomment(id);
    const res = await unCollectionFile({ fileId: id });
    if (res.data.value.code == 20000) {
      ElMessage({ message: "取消收藏", type: "info" });
    }
  }
}, 1000);

// 下载文件
function downFile(url: string, name: string) {
  down.value.isOpen = true;
  exportFile(
    url,
    name,
    (progress, spend) => {
      down.value.downSpend = Math.floor(spend / 1024) + " kb/s";
      diskstore.changeProgress(progress);
      down.value.downProgress = Math.floor(progress);
      if (progress >= 100) {
        down.value.isOpen = false;
      }
    },
    //文件大小
    (size) => {
      down.value.downSize = size;
    }
  );
}
</script>
<style scoped lang="scss">
.filelist {
  display: flex;
  width: 100%;
  max-height: 80vh;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
