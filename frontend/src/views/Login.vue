<template>
	<div class="form_login">
		<div>
			<label for="inputEmail">E-mail</label>
			<input type="email" id="inputEmail" v-model="email" placeholder="john.doe@example.com" required>
		</div>
		<div>
			<label for="inputMdp">Mot de passe</label>
			<input type="password" id="inputMdp" v-model="mdp" placeholder="" required>
		</div>

		<button @click="login">Valider</button>
		<div id="alerte">
			<p>Mot de passe incorrect !</p>
		</div>
	</div>
	
</template>

<script>
	import axios from 'axios'
	import router from '../router'
	import { mapMutations } from 'vuex'
	export default {
		name: 'LoginForm',
		data (){
			return{
				email : null,
				mdp : null,
			}
		},
		methods : {
			...mapMutations({
				setToken: "SET_TOKEN",
				setUserId: "SET_USERID",
				setIsAdmin: "SET_ISADMIN",
			}),
			login(){
				axios.post("http://localhost:3000/api/auth/login", {
					email : this.email,
					mdp : this.mdp
				}).then(response => {
					this.setToken(response.data.token)
					this.setUserId(response.data.userId)
					this.setIsAdmin(response.data.isAdmin)
					axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
					router.push('/')
				}).catch(error => {
					document.getElementById('alerte').style.display = "block";
					console.log(error)
				})
			}
		}
	}
</script>

<!-- HTML !-->
<button class="button-6" role="button">Button 6</button>



<style lang="scss">


.form_login {
	display: flex;
	flex-direction: column;
	margin-top: 35vh;
	align-self: center;
	justify-content: center;
	text-align: center;
	border: 2px solid rgb(167, 167, 167);
	width: fit-content;
	padding: 10px;
	border-radius: 5px;
	&:hover{
        cursor: pointer;
        transition-duration: 0.3s;
        box-shadow: 0px 0px 10px 0px #7bb99d;
    }
	& div{
		display: flex;
		flex-direction: row;
	}
	& button {
		width: fit-content;
		align-self: center;
	}
}
#alerte{
	color: red;
	display: none;
}
input[type="checkbox"] {
		width: 15px;
	}
	label {
		width: 120px;
		display: inline-flex;
	}
	input{
		width: 200px;
	}
	label, input {
		margin: 5px;
		padding: 3px;
	}
</style>