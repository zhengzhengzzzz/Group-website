<template>
  <div class="advisory">
    <div class="news">
      <div class="newstitle">热点新闻</div>
      <div class="newscontainer">
        <div
          class="newsleft"
          :style="{
            backgroundImage: `url(${
              HotNews.records[curIndexnews]?.newsImg || ''
            })`,
          }"
        ></div>
        <div class="newsright">
          <div class="newsrighttop">
            <NuxtLink
              :to="`/articlemd/${item.newsId}`"
              target="_blank"
              :class="`newsitem ${curIndexnews == index ? 'newshover' : ''}`"
              v-for="(item, index) in HotNews.records"
              :key="index"
              @mouseenter="() => changenews(index)"
            >
              <div class="newsposotion">
                <div class="newsitemTime">{{ timereg(item.newsTime) }}</div>
                <div class="newitemContent">{{ item.newsTitle }}</div>
              </div>
              <div class="borderitem"></div>
            </NuxtLink>
          </div>
          <div class="newsrightbootom">
            <div class="bottomPrev" @click="prePage">
              <i class="iconfont icon-xiangxia-copy"></i>
            </div>
            <div class="bottomNext" @click="nextPage">
              <i class="iconfont icon-xiangxia-copy"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { storeToRefs } from "pinia";
import { useHotnews } from "~/store/HotNews";
const Hotnews = useHotnews();
const { HotNews } = storeToRefs(Hotnews);
const curIndexnews = ref(0);
const curPage = ref(1);
const nextPage = () => {
  if (curPage.value >= HotNews.value.pages) {
    return;
  }
  curIndexnews.value = 0;
  curPage.value++;
};
const prePage = () => {
  if (curPage.value <= 1) {
    return;
  }
  curIndexnews.value = 0;
  curPage.value--;
};
watch(curPage, async () => {
  await Hotnews.getHotnews(curPage.value);
});
onMounted(async () => {
  await nextTick();
  await Hotnews.getHotnews(curPage.value);
  loading();
});
function changenews(value: number) {
  curIndexnews.value = value;
}
function loading() {
  const line = gsap.timeline();
  ScrollTrigger.create({
    trigger: ".newscontainer",
    start: "top-=300",
    end: "+=100",
    animation: line.fromTo(
      ".newscontainer",
      {
        // rotateY: 0,
        translateY: 50,
        opacity: 0,
        duration: 0.4,
        scale: 0.9,
      },
      {
        translateY: 0,
        opacity: 1,
        duration: 0.4,
        scale: 1,
      }
    ),
  });
}
function timereg(dateString: string) {
  // 定义日期字符串
  // 定义正则表达式
  const pattern = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
  // 使用正则表达式进行匹配
  const match = dateString.match(pattern);
  // 如果匹配成功，打印结果
  if (match) {
    var year = match[1];
    var month = match[2];
    var day = match[3];
    return `${year}.${month}.${day}`;
  } else {
    return `${2022}.${1}.${1}`;
  }
}
</script>
<style scoped lang="scss">
@media screen and (max-width: 998px) {
  .newsleft {
    display: none !important;
  }
  .newscontainer {
    width: 100% !important;
    display: flex !important;
    justify-content: center !important;
  }
  .news {
    width: 100% !important;
  }
}
.advisory {
  width: 100%;
  min-height: 90vh;
  padding: 1rem 0;
  background-color: #f4f8fb;
  .news {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 11.2rem;
    height: auto;
    margin: auto;
    .newstitle {
      font-size: 0.36rem;
      font-weight: bold;
      text-align: center;
    }
    .newscontainer {
      background-color: white;
      position: relative;
      border-radius: 0.1rem;
      margin-top: 0.5rem;
      overflow: hidden;
      width: 100%;
      height: 4.6rem;
      display: flex;
      flex-direction: row;
      .newsleft {
        background-color: rgb(135, 135, 135);
        width: 60%;
        background-size: cover;
      }
      .newsright {
        width: 4.48rem;
        display: flex;
        flex-direction: column;
        user-select: none;
        .newsrighttop {
          height: 85%;
          display: flex;
          align-items: center;
          flex-direction: column;
          .newshover {
            width: 105% !important;
            background-color: rgb(40, 77, 213);
            color: white;
            height: 30% !important;
          }
          .newsitem {
            opacity: 1;
            cursor: pointer;
            height: 25%;
            margin-inline: 5%;
            display: flex;
            justify-content: right;
            position: relative;
            border-radius: 10px;
            transition-duration: 0.3s;
            transition: 0.4s cubic-bezier(0, 0.7, 0.14, 0.93);

            width: 90%;
            .newsposotion {
              position: relative;
              width: 100%;
              height: auto;
              display: flex;
              flex-direction: row;

              //background-color: saddlebrown;
              .newsitemTime {
                line-height: initial;
                border: none;
                word-break: break-all;
                font-size: 0.18rem;
                padding: 0.15rem;
                padding-top: 0.28rem;
                width: 0.8rem;
              }
              .newitemContent {
                display: flex;
                justify-content: left;
                align-items: center;
                line-height: initial;
                border: none;
                width: 3.2rem;
                font-size: 0.19rem;
                height: 0.505rem;
                margin: auto 0;
                min-height: 0.5rem;
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-all;
              }
            }
            .borderitem {
              position: absolute;
              bottom: -0.01rem;
              width: 90%;
              height: 0.01rem;
              background-color: #e9e9e9;
              margin-inline: 0.2rem;
            }
          }
        }
        .newsrightbootom {
          height: 15%;
          display: flex;
          flex-direction: row;
          .bottomcomment {
            height: 100%;
            display: flex;
            justify-content: center;
            cursor: pointer;
            align-items: center;
            &:hover {
              background-color: rgb(231, 243, 251);
            }
          }
          .bottomPrev {
            @extend .bottomcomment;
            transform: rotateZ(180deg);
            width: 50%;
          }
          .bottomNext {
            @extend .bottomcomment;

            width: 50%;
          }
        }
      }
    }
  }
}
</style>
