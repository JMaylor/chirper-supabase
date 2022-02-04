<script lang="ts" setup>
import { Ref } from "vue";
import { api } from "@/services/axios";

interface Article {
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
}

const news: Ref<Article[]> = ref([]);

api
  .get("company-news", {
    params: {
      symbol: "AAPL",
    },
  })
  .then(({ data }) => (news.value = data));
</script>
<template>
  <div class="grid grid-cols-4 gap-4">
    <div
      v-for="article in news"
      class="flex flex-col gap-2 rounded bg-white p-4 shadow transition-all dark:bg-black dark:shadow-none"
    >
      <h2 class="text-sm uppercase">{{ article.source }}</h2>
      <h3 class="truncate font-medium dark:text-white">
        {{ article.headline }}
      </h3>
      <img
        :src="
          article.image ||
          'https://www.industry.gov.au/sites/default/files/August%202018/image/news-placeholder-738.png'
        "
        alt=""
        srcset=""
      />
      <p class="mt-auto text-sm line-clamp-3">{{ article.summary }}</p>
    </div>
  </div>
</template>
