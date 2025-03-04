<template>
  <layout>
    <template #home-hero-before>
      <t-home></t-home>
    </template>

    <template #home-features-after>
      <t-container />
    </template>

    <!-- page布局 -->
    <template #page-top>
      <t-container layout="archives" />
    </template>

    <template #doc-after>
      <twikoo></twikoo>
    </template>
  </layout>
</template>

<script setup>
import DefaultTheme from "vitepress/theme";
import THome from "./THome.vue";
import TContainer from "./TContainer.vue";
import Twikoo from "./Twikoo.vue";

const { Layout } = DefaultTheme;
</script>