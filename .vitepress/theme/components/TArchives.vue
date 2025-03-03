<template>
  <div class="t-page-container">
    <!-- 标签 -->
    <div
      class="t-tags"
      v-if="$frontmatter?.pageType === 'tags'"
      :class="['t-tags', isDark ? 'dark' : '']"
    >
      <div
        v-for="tag in Object.keys(allTags)"
        class="t-tag"
        :key="tag"
        :style="{
          fontSize: `${
            allTags[tag] / theme.blogs.blogInfos.length + 0.9 > 1.3
              ? 1.3
              : allTags[tag] / theme.blogs.blogInfos.length + 0.9
          }em`,
        }"
        @click="getBlogs(tag)"
      >
        <span>{{ tag }}</span>
        <span>{{ allTags[tag] }}</span>
      </div>
    </div>
    <div v-if="blogs.length" :class="['t-archives', isDark ? 'dark' : '']">
      <div class="t-archives-title">
        <span class="">{{ selectTag }}</span>
      </div>
      <!-- 列表 -->
      <ul>
        <li v-for="blog in blogs" :key="blog.path">
          <div class="cover">
            <a :href="withBase('/' + blog.path)">
              <img :src="withBase(blog.frontmatter.cover)"
            /></a>
          </div>
          <div class="info">
            <span>🕒 {{ blog.frontmatter.date }}</span>
            <h2>
              <a :href="withBase('/' + blog.path)">
                {{ blog.frontmatter.title }}
              </a>
            </h2>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useData, withBase } from "vitepress";
import { ref, onMounted, watch } from "vue";

const { theme, isDark, frontmatter } = useData();

// 全部文章数据
const allBlogs = [...theme.value.blogs.blogInfos];

// 全部标签数据
const allTags = theme.value.blogs.tags;

// 已选择的标签
const selectTag = ref("");

// 当前页面数据
const blogs = ref([]);

// 全部文章按时间排序
const blogSortedByTime = (blogs) => {
  blogs.sort((a, b) => {
    if (!a.frontmatter.date) {
      return 1;
    }
    if (!b.frontmatter.date) {
      return -1;
    }
    if (a.frontmatter.date > b.frontmatter.date) {
      return -1;
    } else if (a.frontmatter.date < b.frontmatter.date) {
      return 1;
    } else {
      return 0;
    }
  });
};

// 生成文章
const getBlogs = (tag) => {
  if (!tag) {
    blogs.value = allBlogs;
  } else {
    selectTag.value = tag;
    blogs.value = allBlogs.filter((blog) => {
      if (blog.frontmatter.tags.includes(tag)) {
        return true;
      }
    });
  }
};

watch(
  frontmatter,
  () => {
    if (frontmatter.value.pageType === "archives") {
      selectTag.value = "归档";
      getBlogs();
    } else {
      blogs.value = [];
    }
  },
  { immediate: true }
);

onMounted(() => {
  blogSortedByTime(allBlogs);
});
</script>

<style>
.t-page-container {
  display: flex;
  flex-direction: column;
}

.t-tags {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 1em;
  border-radius: 8px;
  background: var(--vp-c-bg);
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
  margin-bottom: 20px;
}

.t-tags.dark {
  box-shadow: 0 3px 8px 6px rgba(236, 239, 242, 0.2);
}

.t-tags > .t-tag {
  margin: 1em;
  cursor: pointer;
  position: relative;
}

.t-tags > .t-tag > span:nth-child(2) {
  position: absolute;
  top: -3px;
  font-size: 0.9em;
}

.t-archives {
  width: 100%;
  display: flex;
  padding: 2em;
  flex-direction: column;
  border-radius: 8px;
  background: var(--vp-c-bg);
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
}

.t-archives.dark {
  box-shadow: 0 3px 8px 6px rgba(236, 239, 242, 0.2);
}

.t-archives > .t-archives-title {
  font-size: 2em;
  margin-bottom: 30px;
  text-align: center;
}

.t-archives > ul {
  display: flex;
  flex-direction: column;
  transition: all 0.6s ease;
  max-height: 100vh;
  overflow-y: scroll;
}

.t-archives > ul::-webkit-scrollbar {
  width: 6px;
}

.t-archives > ul::-webkit-scrollbar-track {
  background: rgb(239, 239, 239);
  border-radius: 2px;
}

.t-archives > ul::-webkit-scrollbar-thumb {
  background: #40a0ff66;
  border-radius: 10px;
}

.t-archives > ul::-webkit-scrollbar-thumb:hover {
  background: #40a0ff88;
}

.t-archives.dark > ul::-webkit-scrollbar-track {
  background: #3e3e3e;
}

.t-archives.dark > ul::-webkit-scrollbar-thumb {
  background: #8f8f8f66;
}

.t-archives.dark > ul::-webkit-scrollbar-thumb:hover {
  background: #8f8f8f88;
}

.t-archives > ul > li {
  display: flex;
  padding: 10px;
}

.t-archives > ul > li > .cover {
  width: 20%;
}

.t-archives > ul > li > .cover > a > img {
  border-radius: 5px;
  cursor: pointer;
}

.t-archives > ul > li > .info {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.t-archives > ul > li > .info > h2 {
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .t-archives {
    padding: 2em 0.5em;
  }
  .t-archives > ul > li > .cover {
    width: 35%;
  }
  .t-archives > ul > li > .info {
    font-size: 0.8rem;
  }
  .t-archives > ul > li > .info > h2 {
    font-size: 0.9rem;
  }
}
</style>
