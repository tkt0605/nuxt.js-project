<template>
    <div class="login-container">
        <div class="login-base">
            <h1 class="title">お帰りなさい</h1>
        </div>
        <form @submit.prevent="login" class="login-form">
            <input v-model="email" placeholder="メールアドレス" class="form-input" />
            <input v-model="password" type="password" placeholder="パスワード" class="form-input" />
            <button type="submit" class="form-button">ログイン</button>
        </form>
    </div>
</template>
<script>
import '../../assets/css/login.css'
export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        async login() {
            try{
                await this.$auth.loginWith('local', {
                    data: {email: this.email, password: this.password},
                });
                this.$router.push('/');
            }catch(error){
                console.error(error);
            }
        }
    }
}

</script>