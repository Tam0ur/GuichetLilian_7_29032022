Vue.component('home_post',{
    props: ['posts'],
    template:
    `<p>{{ post.texte }}</p>
    <h4>User :{{ post.utilisateur }}</h4>
    <img v-if="post.image != null" src="{{ post.image }}" >
    <p>Date : {{ post.date_Creation }}</p>`
})




