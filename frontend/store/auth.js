export const state = () => ({
    user: null,
    accessToken: null,
    refreshToken: null,
})
export const mutations =  {
    SET_USER(state, user) {
        state.user = user
    },
    SET_TOKENS(state, {access, refresh}) {
        state.access = access,
        state.refresh = refresh
    },
    CLEAR_AUTH(state) {
        state.user = null,
        state.accessToken = null,
        state.refreshToken = null
    }
}

export const actions = {
    async login({commit}, {email, password}) {
        const {data} = await this.$axios.post('/login/', {email, password})
        commit('SET_USER', data.user)
        commit('SET_TOKENS', {'access': data.access, 'refresh': data.refresh})
    },
    async logout({commit, state}) {
        await this.$axios.post('/logout/', {'refresh': state.refreshToken})
        commit('CLEAR_AUTH')
    } 
}