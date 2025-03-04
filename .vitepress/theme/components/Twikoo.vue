<template>
  <div class="comment-container vp-raw" v-if="theme.twikoo?.envId">
    <!-- KaTeX -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css"
      integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X"
      crossorigin="anonymous"
    />
    <component
      :is="'script'"
      defer
      src="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.js"
      integrity="sha384-g7c+Jr9ZivxKLnZTDUhnkOnsh30B4H0rpLUpJ4jAIKs4fnJI+sEnkvrMWph2EDg4"
      crossorigin="anonymous"
    ></component>
    <component
      :is="'script'"
      defer
      src="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/contrib/auto-render.min.js"
      integrity="sha384-mll67QQFJfxn0IYznZYonOWZ644AWYC+Pt2cHqMaRhXVrursRwvLnLaebdGIlYNa"
      crossorigin="anonymous"
    ></component>

    <!-- lightGallery -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/lightgallery@2.1.8/css/lightgallery.css"
      integrity="sha384-U8ohOXEVyF0NGY2LQnH83V4wGxOmFhim4U5xhfE/WDCHdPO2iUKPPYkhpDl9U/Yf"
      crossorigin="anonymous"
    />
    <component
      :is="'script'"
      src="https://cdn.jsdelivr.net/npm/lightgallery@2.1.8/lightgallery.min.js"
      integrity="sha384-l5lFB9srHFAyvfCoHya9X1JwGGTNPvDtikieqZp7qu/bomCw0e0+yoyiL0f7UXLD"
      crossorigin="anonymous"
    ></component>

    <!-- Twikoo -->
    <div id="twikoo"></div>
    <component
      :is="'script'"
      src="https://cdn.jsdelivr.net/npm/twikoo@1.6.41/dist/twikoo.min.js"
      crossorigin="anonymous"
      ref="twikooJs"
    ></component>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useData, useRouter } from "vitepress";

const { theme } = useData();

const envId = theme.value.twikoo?.envId ?? "";
const twikooJs = ref(null);
const router = useRouter();

const initTwikoo = () => {
  try {
    twikoo.init({
      envId,
      onCommentLoad: initLightGallery,
    });
  } catch (e) {}
};

const initLightGallery = () => {
  let commentContents = [
    ...document.getElementsByClassName("vp-doc"),
    ...document.getElementsByClassName("tk-content"),
  ];
  for (let i = 0; i < commentContents.length; i++) {
    let commentItem = commentContents[i];
    let imgEls = commentItem.getElementsByTagName("img");
    if (imgEls.length) {
      for (let j = 0; j < imgEls.length; j++) {
        let imgEl = imgEls[j];
        if (imgEl.parentElement.tagName === "A") continue;
        let aEl = document.createElement("a");
        aEl.setAttribute("class", "tk-lg-link");
        aEl.setAttribute("href", imgEl.getAttribute("src"));
        aEl.setAttribute("data-src", imgEl.getAttribute("src"));
        aEl.appendChild(imgEl.cloneNode(false));
        imgEl.parentNode.insertBefore(aEl, imgEl.nextSibling);
        imgEl.remove();
      }
      lightGallery(commentItem, {
        selector: ".tk-lg-link",
        share: false,
      });
    }
  }
};

const initJs = () => {
  if (twikooJs.value) {
    twikooJs.value.onload = initTwikoo;
    router.onAfterRouteChanged = onRoute;
  }
};

const onRoute = (to) => {
  if (to) setTimeout(initTwikoo, 1000);
};

onMounted(() => {
  initTwikoo();
  initJs();
});
</script>