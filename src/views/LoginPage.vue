<script setup>
import { ref } from "vue";
import { useAuthStore } from '../stores/authStore'
import TextInput from "@/components/Form/TextInput.vue";

const form = ref({
    username: '',
    password: ''
})

const authStore = useAuthStore()

</script>


<template>
    <div class="h-screen flex items-center justify-center">
        <div class="max-w-xl w-full bg-white overflow-hidden rounded-xl">
            <div class="p-6">
                <form @submit.prevent="authStore.login(form)" action="" class="space-y-8">
                    <TextInput label="Username" v-model="form.username" placeholder="admin" />
                    <TextInput label="Password" v-model="form.password" type="password" placeholder="*****" />
                    <div class="">
                        <button class="btn primary w-full">Login</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>