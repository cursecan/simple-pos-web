import { defineStore } from "pinia";
import axios from "axios";

import router from "@/router";
import { ref } from "vue";

import { useAlertStore } from "./alertStore";

export const useAuthStore = defineStore('auth', () => {
    // State
    const user = ref(JSON.parse(localStorage.getItem('user')))

    // Login
    const login = async (form) => {
        await axios.post('api/token/', form).then(async (res) => {
            localStorage.setItem('token', res.data.access)
            // Get profile
            await axios.get('api/user/profile/', {
                headers: {
                    Authorization: 'Bearer ' + res.data.access
                }
            }).then(res => {
                setUser(res.data)
                localStorage.setItem('user', JSON.stringify(res.data))
    
                router.push('/')
            })
        }).catch(err => {
            const alertStore = useAlertStore()
            alertStore.warning(err)
        })
    }

    // Set user
    const setUser = (i) => {
        user.value = i
    }
    
    // Logout
    const logout = () => {
        localStorage.clear()
        user.value = null
    }

    return {
        user,
        login,
        logout,
        setUser,
    }
})