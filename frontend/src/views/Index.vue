<template>
        <button class="user" @click="redirectUser"><font-awesome-icon icon="fa-solid fa-user" /></button>
        <component_post class="style_posts" v-for="post in posts" :key="post.id" :post="post"></component_post>
</template>

<script>
        import { library } from '@fortawesome/fontawesome-svg-core'
        import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
        import { faUser } from '@fortawesome/free-solid-svg-icons'

        library.add(faUser)

        import axios from 'axios'
        import router from '../router'
        import component_post from '../components/component_post.vue'
        export default {
                name : 'HomePage',
                data() {
                        return {
                                        posts: '',
                                }
                        },
                components: {
                        component_post,
                        FontAwesomeIcon
                },
                methods : {
                        redirectUser(){
                                router.push('./user')
                        },
                        getAllPosts(){
                                axios.get("http://localhost:3000/api/post/getAllPosts", {
                                }).then(res => {
                                        console.log(res)
                                        this.posts = res.data.result
                                }).catch(error => {
                                        console.log(error)
                                })
                        },
                        deletePost(id){
                                axios.delete(`http://localhost:3000/api/post/deletePost/${id}`, {
                                }).then(res => {
                                        const index = this.posts.findIndex( e => e.id === id )
                                        this.posts.splice(index, 1 )
                                        console.log(res)
                                }).catch(error => {
                                        console.log(error)
                                })
                        },
                },
                mounted() {
                        this.getAllPosts();
                },
        }
</script>

<style lang="scss">
.style_posts {
        background-color: white;
        position: relative;
        width: 500px;
        border: 2px solid rgb(159, 159, 159);
        border-radius: 5px;
        margin: 0 auto;
        margin-top: 20px;
        padding: 15px;

        display: flex;
        flex-flow: column nowrap;
        &:hover{
                cursor: pointer;
                transition-duration: 0.3s;
                box-shadow: 0px 0px 10px 0px #7bb99d;
        }
        p {
                margin-bottom: 0;
        }
        @media ( max-width: 899px) {
                width: 75%;
        }
}
.button_post{
        position: absolute;
        bottom: 15px;
        right: 10px;
        width: fit-content;
}


.user{
        position: absolute;
        right: 10px;
        top: 10px;
        width: fit-content;
}
img{
        width: 500px;
        height: auto;   
        @media ( max-width: 899px) {
                width: 100%;
        }
}

</style>