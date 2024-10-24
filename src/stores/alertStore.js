import { defineStore } from "pinia";
import { ref } from "vue";

export const useAlertStore = defineStore('alert-store', () => {
    // State
    const alert = ref({
        message: '',
        type: 'success'
    })

    const success = (msg) => {
        alert.value = {
            message: msg,
            type: 'success'
        }

        setTimeout(() => {
            reset()
        }, 3000);
    } 

    const warning = (msg) => {
        alert.value = {
            message: msg,
            type: 'warning'
        }

        setTimeout(() => {
            reset()
        }, 3000);
    } 


    const reset = () => {
        alert.value = {
            message: '',
            type: 'success'
        }
    }

    return {
        alert,
        success,
        warning,
        reset
    }
})