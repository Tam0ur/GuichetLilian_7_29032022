<template>
        <div>HOME</div>
        <div>test</div>
        <button @click="redirectPost"> + CREATE POST</button>
        <div class="div_post"></div>

</template>

<script>
        import router from '../router'
        export default {
                name : 'HomePage',
                methods : {
                        redirectPost(){
                                router.push('./post')
                        }
                }
        }
</script>

<style>
</style>