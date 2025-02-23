<template>
  <layout>
    <template #layout-top>
      <t-home></t-home>
    </template>
  </layout>
</template>

<script setup>
import DefaultTheme from "vitepress/theme";
import THome from "./THome.vue";

const { Layout } = DefaultTheme;
</script>