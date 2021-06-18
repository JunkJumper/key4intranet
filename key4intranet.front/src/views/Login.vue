<template>
<div id="loginContainer">
<body class="login background-visuel background-visuel-A">

	<div class="wrapper">


		<!-- Header --> 

		<header>
			<h1 class="text-center"><svg class="logo white" viewBox="0 0 200 54"><use xlink:href="../../public/assets/images/sprites.svg#logo-key4events" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></h1>
		</header>


		<!-- Sélecteur de langue --> 

		<ul class="lang-selector list-unstyled text-right p-0">
			<li><a href="javascript:;" class="active" data-toggle="tooltip" data-placement="top" title="Français">FR</a></li>
			<li><a href="javascript:;" data-toggle="tooltip" data-placement="top" title="English">EN</a></li>
		</ul>


		<!-- Boîte de connexion --> 

		<div class="card">
			<h2 class="line mb-4">Connexion <span class="d-none d-sm-inline">à votre espace</span></h2>
			<form class="mt-3 bg-white" @submit.prevent="handleLogin">
				<div class="form-group">
					<label class="d-none">Identifiant</label>
					<div class="input-group input-group-lg input-group-icon icon-right">
						<input type="text" class="form-control" placeholder="Identifiant" v-model="user.username">
						<i class="icon icon-md"><svg><use xlink:href="../../public/assets/images/sprites.svg#icon-user" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></i>
					</div>
				</div>
				<div class="form-group">
					<label class="d-none">Mot de passe</label>
					<div class="input-group input-group-lg input-group-icon icon-right">
						<input type="password" class="form-control" placeholder="Mot de passe" v-model="user.password">
						<i class="icon icon-md"><svg><use xlink:href="../../public/assets/images/sprites.svg#icon-unlock" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></i>
						<div class="invalid-feedback">
							Votre identifiant et/ou votre mot de passe est incorrect.
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-12 mb-4 mb-md-5 text-right">
						<a href="javascript:;">Mot de passe oublié ?</a>
					</div>
					<div class="col-12 col-md-6 order-1 order-md-12 mb-3 text-center text-md-right">
						<button type="submit" class="btn btn-lg btn-primary bg-gradient">S'identifier</button>
					</div>
					<div class="col-12 col-md-6 order-12 order-md-1 pt-2">
						Vous n’avez pas de compte ?<br>
						<a href="javascript:;">Inscrivrez-vous !</a>
                        <div v-if="message" class="alert py-2 mt-4 alert-danger">{{message}}</div>
					</div>
				</div>
			</form>
		</div>


		<!-- Symbole logo (fond) --> 

		<svg class="logo-bg primary-dark d-none d-md-block" viewBox="0 0 42 36"><use xlink:href="images/sprites.svg#logo-key4" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg>

	</div>


	<!-- Footer --> 

	<footer>
		<div class="row">
			<div class="col-lg-5 col-xl-6">
				<span class="copy">
					<svg class="logo white float-left float-xxl-none" viewBox="0 0 42 50"><use xlink:href="../../public/assets/images/sprites.svg#logo-key4" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg>
					<span class="d-inline-block mt-1"><strong>©2021 key4events.</strong> Tous droits réservés.</span>
				</span>
				<span class="links d-block d-xxl-inline ml-5">
					<a href="javascript:;" class="link-under">Marques</a> <span>|</span> <a href="javascript:;" class="link-under">Déclaration de confidentialité des informations</a> 
				</span>
			</div>
			<div class="col-lg-7 col-xl-6 mt-3 mt-lg-2 ml-3 pl-5 ml-lg-0 pl-lg-0 text-left text-lg-center menu-reminder">
				<a href="javascript:;" class="link-under">Support technique</a>
				<a href="javascript:;" class="link-under">Nos conditions de vente</a>
				<a href="javascript:;" class="link-under">Mentions légales</a>
			</div>
		</div>
	</footer>

</body>
</div>
</template>
<script>
import User from '../models/user';

export default {
    name:'Login',
    data:function(){
        return{
            user: new User('',''),
            message:''
        };
    },
    methods: {
        handleLogin: function(){
            if(this.user.username && this.user.password){
                this.$store.dispatch('auth/login',this.user).then(
                    () => {
                        this.$router.replace({ name : 'Download'});
                        
                    },
                    () => {
                        this.message = 'authentication failed !';
                    }
                );
            }
            else{
                this.message = 'missing user or password !';
            }
        }
    }
}
</script>
