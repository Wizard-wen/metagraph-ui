import { ref } from "vue";

/**
 * @author songxiwen
 * @date  2022/3/17 18:20
 */



export const root = ref<HTMLElement | null>();
export const searchBox = ref<Element>();
export const isSearchListShow = ref(false);
export const searchText = ref('');
export const currentHoverIndex = ref<number>(0);

