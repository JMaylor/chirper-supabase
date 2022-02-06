<script lang="ts" setup></script>
<template>
  <div class="bg-fixed bg-no-repeat bg-left-top paper-background flex h-full min-h-full items-center">
    <div
      class="dark:bg-text-slate-50 mx-auto max-h-full rounded-lg bg-slate-200 py-8 px-4 text-slate-900 dark:bg-slate-700 dark:text-slate-50 sm:px-6 md:p-8 lg:p-12"
    >
      <div class="flex flex-col items-start">
        <h1 class="mx-auto mb-4 text-4xl font-bold">Chirper</h1>
        <BrandLogo class="mx-auto mb-8 h-32 w-32" />

        <router-view />
      </div>
    </div>
  </div>
</template>

<style>
.paper-background {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='88' y1='88' x2='0' y2='0'%3E%3Cstop offset='0' stop-color='%23993700'/%3E%3Cstop offset='1' stop-color='%23dd6e02'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='75' y1='76' x2='168' y2='160'%3E%3Cstop offset='0' stop-color='%2300658f'/%3E%3Cstop offset='0.09' stop-color='%23007ea9'/%3E%3Cstop offset='0.18' stop-color='%23008eba'/%3E%3Cstop offset='0.31' stop-color='%23009ac7'/%3E%3Cstop offset='0.44' stop-color='%2313a3d1'/%3E%3Cstop offset='0.59' stop-color='%2326abd8'/%3E%3Cstop offset='0.75' stop-color='%2331b0de'/%3E%3Cstop offset='1' stop-color='%2337B4E2'/%3E%3C/linearGradient%3E%3Cfilter id='c' x='0' y='0' width='200%25' height='200%25'%3E%3CfeGaussianBlur in='SourceGraphic' stdDeviation='12' /%3E%3C/filter%3E%3C/defs%3E%3Cpolygon fill='url(%23a)' points='0 174 0 0 174 0'/%3E%3Cpath fill='%23000' fill-opacity='.5' filter='url(%23c)' d='M121.8 174C59.2 153.1 0 174 0 174s63.5-73.8 87-94c24.4-20.9 87-80 87-80S107.9 104.4 121.8 174z'/%3E%3Cpath fill='url(%23b)' d='M142.7 142.7C59.2 142.7 0 174 0 174s42-66.3 74.9-99.3S174 0 174 0S142.7 62.6 142.7 142.7z'/%3E%3C/svg%3E");
}
</style>
