<template>
    <div>
      <!-- ヘッダー -->
      <div class="header_down">
        <div class="headerline_down">
          <div class="container_down">
            <div class="line_down">
              <div>
                <svg
                  width="225"
                  height="50"
                  viewBox="0 0 512 128"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <text
                    x="10"
                    y="85"
                    font-family="Inter, sans-serif"
                    font-size="64"
                    font-weight="700"
                    fill="#212121"
                    letter-spacing="2"
                  >
                    ISTJ
                  </text>
                  <circle cx="185" cy="75" r="6" fill="#4FC3F7" />
                  <text
                    x="200"
                    y="85"
                    font-family="Inter, sans-serif"
                    font-size="48"
                    font-weight="500"
                    fill="#4FC3F7"
                  >
                    com
                  </text>
                </svg>
              </div>
            </div>

            <!-- 認証済みユーザー用 -->
            <div v-if="isAuthenticated" class="account_form">
              <div>
                <button @click="searchFieldOpen()" class="search-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-search" viewBox="0 0 16 16">
                    <path
                      d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                </button>
              </div>
              <div class="icon_bord">
                <img
                  v-if="currentUser"
                  :src="currentUser.avatar"
                  class="icon_img"
                  alt="User Avatar"
                  @click="userInfoShow(currentUser?.id)"
                />
              </div>
            </div>

            <!-- 未ログイン -->
            <div v-else class="account_form">
              <button class="login" type="button" @click="gotoLogin">
                <b>ログイン</b>
              </button>
              <button class="signup" type="button" @click="gotoSignup">
                <b>サインアップ</b>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="main">
        <div></div>
      </div>
    </div>
</template>
<style lang="css">
</style>
