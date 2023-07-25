
<template>
	<form  class="form_signup" @submit.prevent="signup">
		<div>
				<label for="inputNom">Nom </label>
				<input type="text" id="inputNom" v-model="nom" placeholder="Doe" required v-on:keypress="isLetter($event)">
		</div>
		<div>
				<label for="inputPrenom">Prénom</label>
				<input type="text" id="inputPrenom" v-model="prenom" placeholder="John" required v-on:keypress="isLetter($event)">
		</div>
		<div>
			<label for="inputEmail">E-mail</label>
			<input type="email" id="inputEmail" v-model="email" placeholder="john.doe@example.com" required >
		</div>
		<div>
			<label for="inputMdp" >Mot de passe</label>
			<input type="password" id="inputMdp" minlength="12" v-model="mdp" placeholder="" required>

		</div>

		<button>Valider</button>
	</form>
</template>

<script>
	import axios from 'axios'
	import router from '../router/index'
	export default {
		name: 'SignupForm',
		data (){
			return{
				nom : null,
				prenom : null,
				email : null,
				mdp : null,
			}
		},
		methods : {
			signup(){
				axios.post("http://localhost:3000/api/auth/signup", {
					nom: this.nom,
					prenom : this.prenom,
					email : this.email,
					mdp : this.mdp,
				}).then(response => {
					router.push('/')
					console.log(response)
				}).catch(error => {
					console.log(error)
				})
			},
			isLetter(e) {
				let char = String.fromCharCode(e.keyCode); // Get the character
				if(/^[A-Za-z]+$/.test(char)) return true; // Match with regex 
				else e.preventDefault(); // If not match, don't add to input text
			}
		}
	}

</script>

<!-- HTML !-->
<style lang="scss">
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

	.form_signup {
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
	@media (max-width: 599px) {
    background-color: white;
	width: 85%;
    }
}
</style>