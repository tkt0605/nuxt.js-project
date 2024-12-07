<template>
    <div>
        <form @submit.prevent="login">
            <input v-model="email" placeholder="メールアドレス"/>
            <input v-model="password" placeholder="パスワード"/>
            <button type="submit">ログイン</button>
        </form>
    </div>
</template>
<script>
export default {
    layout: 'auth',
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