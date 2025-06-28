<template>
  <div class="t-comments">
    <h3>最新评论💬</h3>
    <div v-for="item in newComments" class="comment">
      <div class="left">
        <a :href="item.url">
          <img class="avatar" :src="item.avatar" />
        </a>
      </div>
      <div class="right">
        <div class="top"><a :href="item.url">{{ item.commentText }}</a></div>
        <div class="bottom">{{ item.nick }} / {{ item.relativeTime }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useData } from 'vitepress'

const { theme } = useData()

// 获取最新评论
const newComments = ref()
const getNewCommetns = async () => {
  try { 
  const envId = theme.value.twikoo?.envId ?? "";
  const twikoo = await import('twikoo')
  const res = await twikoo.getRecentComments({
    envId,
    pageSize: 6
  })
  newComments.value = res || []
  } catch (e) {
    console.log(e);
  }
}
getNewCommetns()
</script>

<style>
.t-comments {
  width: 100%;
  padding: 1em;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: var(--vp-c-bg);
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
}

.comment {
  display: flex;
  margin: 10px 0;
}

.comment > .left {
  margin-right: 5%;
  flex-shrink: 0;
}

.comment > .left > a img {
  width: 60px;
}

.comment > .right {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.comment > .right > .top {
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;

  height: 40px;
  line-height: 20px;
  font-size: 14px;
}

.comment > .right > .bottom {
  font-size: 12px;
  color: gray;
}
</style>