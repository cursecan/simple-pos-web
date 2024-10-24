<script setup>
import { ref } from 'vue';
import Toast from './components/Toast.vue';

</script>

<template>
    <main>
        <Toast />
        

        <Component :is="$route.meta.layout || 'div'">
            <RouterView />
        </Component>
    </main>
</template>