import { defineStore } from "pinia";
import { ref } from "vue";

export const useSaleStore = defineStore('sale', () => {
    const items = ref([])
    const total = ref(0)
    
    const pushItem = (item) => {
        if (items.value.some(i => i.id === item.id)) {
            items.value = items.value.map(i => (i.id === item.id ? item : {...i}))
        } else {
            items.value.push(item)
        }
    }

    const addTotal = (i) => {
        total.value += i
    } 

    return {
        items,
        total,
        pushItem,
        addTotal
    }
})