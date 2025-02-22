<template>
    <div>
        <div>Hello</div>
        <ul>
            <li>LibraryID:{{ libraryId }}</li>
            <li>todoId: {{ todoId }}</li>
            <li></li>
        </ul>
    </div>
</template>
<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const libraryId = route.params.libraryId;
const todoId = route.params.id;
</script>
