<template>
        <div>
                <button @click="redirectPost"> + CREATE POST</button>
        </div>
        <div>
                <button @click="getAll"> DISPLAY POST</button>
        </div>
        
        <template>
                <posts class="display_posts" v-for="post in posts" :key="post.id"></posts>
        </template>

</template>

<script>
        import axios from 'axios'
        import router from '../router'
        import posts from '../components/post'
        export default {
                name : 'HomePage',
                data() {
                return {
                                posts: '',
                        }
                },
                methods : {
                        redirectPost(){
                                router.push('./post')
                        },
                        getAll(){
                                
                                axios.get("http://localhost:3000/api/post/getAllPosts", {
                                }).then(res => {
                                        this.posts = res.data.result
                                }).catch(error => {
                                        console.log(error)
                                })
                        }
                }
        }
</script>

<style>
.display_posts {
        border: 1px solid black;
        margin: 10px;
}
img{
        width: 500px;
        height: auto;
}
</style>