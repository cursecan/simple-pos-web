<script setup>
import TopHeader from './TopHeader.vue'
</script>

<template>
    <div class="">
        <!-- Header -->
         <TopHeader />

        <!-- Content -->
        <slot />

        <!-- Footer -->
    </div>
</template>