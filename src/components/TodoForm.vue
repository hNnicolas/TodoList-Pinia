<script lang="ts" setup>
import { ref } from 'vue';


const props = defineProps<{
    content: string
}>();

const input = ref<string>(props.content);

const emit = defineEmits<{
    (e: 'cancel'): void
    (e: 'update', updatedContent: string): void
}>()


</script>
<template>
    <div class="d-flex flex-row flex-fill">
        <input v-model="input" class="mr-20 flex-fill" type="text" />
        <button @click="emit('cancel')" class="mr-20 btn btn-danger">Annuler</button>
        <button @click="emit('update', input)" class="btn btn-primary">Sauvegarder</button>
    </div>
</template>
<style lang="scss"></style>