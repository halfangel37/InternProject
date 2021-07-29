<template>
    <v-text-field
    v-model="search"
    append-icon="mdi-magnify"
    label="Search"
    outlined
    hide-details
    :search="search"
  ></v-text-field> 
</template>

<script>
export default {
    data() {
        return {
            search: "",
        }
    }
}
</script>