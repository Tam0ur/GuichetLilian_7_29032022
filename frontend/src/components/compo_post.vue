<template lang="">
    <div>
        <p>{{ post.texte }}</p>
        <h4>User :{{ post.utilisateur }}</h4>
        <img v-if="post.image != null" src={{ post.image }} >
        <p>Date : {{ post.date_Creation }}</p>
    </div>
</template>

<script>
    export default {
        name:'component_post',
        props: {
            texte: String
        }
    }
</script>


<style lang="">
    
</style>



