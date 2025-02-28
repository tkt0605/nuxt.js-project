<template>
  <div>
    <div class="header" v-if="isAsideOpen">
      <div class="headerline">
        <div class="container">
          <a class="logo">Privatia</a>
          <div v-if="isAuthenticated" class="account_form">
            <div class="icon_bord">
              <img
                v-if="currentUser"
                :src="currentUser.avatar"
                class="icon_img"
                alt="User Avatar"
              />
            </div>
            <button class="logout" type="button" @click="logout">
              <b>ログアウト</b>
            </button>
          </div>
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
    <div class="header_down" v-else>
      <div class="headerline_down">
        <div class="container_down">
          <div class="line_down">
            <button class="icon_down" @click="toggleAsideTag">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-layout-text-window-reverse"
                viewBox="0 0 16 16"
              >
                <path
                  d="M13 6.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5m0 3a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5m-.5 2.5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1z"
                />
                <path
                  d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zM2 1a1 1 0 0 0-1 1v1h14V2a1 1 0 0 0-1-1zM1 4v10a1 1 0 0 0 1 1h2V4zm4 0v11h9a1 1 0 0 0 1-1V4z"
                />
              </svg>
            </button>
            <NuxtLink to="/" class="create_icon_color">
              <button class="create_icon_down">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                  />
                </svg>
              </button>
            </NuxtLink>
            <a class="logo_down">Privatia</a>
          </div>
          <div v-if="isAuthenticated" class="account_form">
            <div class="icon_bord">
              <img
                v-if="currentUser"
                :src="currentUser.avatar"
                class="icon_img"
                alt="User Avatar"
              />
            </div>
            <button class="logout" type="button" @click="logout">
              <b>ログアウト</b>
            </button>
          </div>
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
    <aside :class="{ open: isAsideOpen }">
      <!--  -->
      <ul class="mains">
        <div class="button_line">
          <button class="icon" @click="toggleAsideTag">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-layout-text-window-reverse"
              viewBox="0 0 16 16"
              style="background-color: rgb(230, 230, 230)"
            >
              <path
                d="M13 6.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5m0 3a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5m-.5 2.5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1z"
              />
              <path
                d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zM2 1a1 1 0 0 0-1 1v1h14V2a1 1 0 0 0-1-1zM1 4v10a1 1 0 0 0 1 1h2V4zm4 0v11h9a1 1 0 0 0 1-1V4z"
              />
            </svg>
          </button>
          <NuxtLink to="/" class="create_icon_color">
            <button class="create_icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path
                  d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                />
                <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                />
              </svg>
            </button>
          </NuxtLink>
        </div>
        <li class="create_todo">
          <div class="todo-item">
            <NuxtLink to="/" class="todo_id">
              <p class="todo-title-new">新しいToDO</p>
            </NuxtLink>
          </div>
        </li>
        <div class="create-project">
          <h2 id="snor-newproject" class="project-title">マイ・ライブラリ</h2>
          <span class :data-allow-mismatch="closed">
            <button
              aria-label="新しいライブラリ作成"
              class="create-project-button"
              @click="openDialog"
            >
              <div class="icon-manager">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon-md"
                >
                  <path
                    d="M12 6.00003C12.5523 6.00003 13 6.44775 13 7.00003L13 11L17 11C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13L13 13L13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17L11 13L7 13C6.44771 13 6 12.5523 6 12C6 11.4477 6.44771 11 7 11L11 11L11 7.00003C11 6.44775 11.4477 6.00003 12 6.00003Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </button>
          </span>
        </div>
        <div class="lib-fields">
          <ul class="lib-menu">
            <li v-for="library in libraries" :key="library.id" class="lib-line">
              <div
                v-if="
                  library?.owner === currentUser.id ||
                  library?.members.includes(currentUser.id)
                "
                class="lib-tmp"
              >
                <NuxtLink :to="`/lib/${library.id}`" class="lib-turn-page">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-folder"
                    viewBox="0 0 16 16"
                    style="font-weight: bold; font-size: large;"
                  >
                    <path
                      d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139q.323-.119.684-.12h5.396z"
                    />
                  </svg>
                  {{ library?.name }}
                </NuxtLink>
              </div>
            </li>
          </ul>
        </div>
        <div v-if="isDialogOpen" class="modal-overlay">
          <div class="modal-content">
            <div class="flex-closed-btn">
              <h3>ライブラリ名</h3>
              <button
                @click="closeDialog"
                data-textid="close-button"
                class="closed-button"
                aria-label="閉じる"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon-md"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.63603 5.63604C6.02656 5.24552 6.65972 5.24552 7.05025 5.63604L12 10.5858L16.9497 5.63604C17.3403 5.24552 17.9734 5.24552 18.364 5.63604C18.7545 6.02657 18.7545 6.65973 18.364 7.05025L13.4142 12L18.364 16.9497C18.7545 17.3403 18.7545 17.9734 18.364 18.364C17.9734 18.7545 17.3403 18.7545 16.9497 18.364L12 13.4142L7.05025 18.364C6.65972 18.7545 6.02656 18.7545 5.63603 18.364C5.24551 17.9734 5.24551 17.3403 5.63603 16.9497L10.5858 12L5.63603 7.05025C5.24551 6.65973 5.24551 6.02657 5.63603 5.63604Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
            </div>
            <div class="create-form">
              <input
                id="createName"
                v-model="libraryName"
                type="text"
                placeholder="ライブラリ名"
                class="input-field"
              />
              <div class="exlplain-bord">
                <div class="explain-svg">
                  <div class="sub-svg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-fire"
                      viewBox="0 0 16 16"
                      style="
                        stroke-width: 1.5;
                        flex-shrink: 0;
                        height: 18px;
                        width: 18px;
                      "
                    >
                      <path
                        d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <strong class="strong">ライブラリとは？</strong>
                  <p class="explain">
                    ライブラリは、秘密鍵を持つユーザーのみが参加できる特別な空間です。
                    高いプライバシーとデータの完全性を実現します
                  </p>
                </div>
              </div>
            </div>
            <div class="button-group">
              <button @click="createLibrary" class="create-button">
                <div class="">ライブラリを作成する</div>
              </button>
              <button @click="closeDialog" class="cancel-button">
                <div>キャンセル</div>
              </button>
            </div>
          </div>
        </div>
        <div v-if="isAuthenticated && categorizedTodos" class="lists">
          <li>
            <h5>今日の予定</h5>
            <ul class="aside-todo-padding">
              <li v-for="todo in categorizedTodos.today" :key="todo.id">
                <div
                  class="all-todo-bord"
                  v-if="todo.auther === currentUser.id"
                >
                  <NuxtLink
                    :to="`/t/${todo.id}`"
                    class="todo_id"
                    @click="navigateToTodo(todo.id)"
                  >
                    <div class="todo-title">
                      <span v-if="todo.title === ''">{{
                        formatDate(todo.created_at)
                      }}</span>
                      <span v-else>
                        <div v-if="todo.title.length > 13">
                          {{ todo.title.slice(0, 13) + "..." }}
                        </div>
                        <div v-else>{{ todo.title }}</div>
                      </span>
                    </div>
                  </NuxtLink>
                  <div class="opeion-wrapper">
                    <button
                      class="oprion-icon"
                      @click.stop="openOption(todo.id)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-three-dots-vertical"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </li>

          <li>
            <h5>昨日</h5>
            <ul class="aside-todo-padding">
              <li v-for="todo in categorizedTodos.yesterday" :key="todo.id">
                <div
                  class="all-todo-bord"
                  v-if="todo.auther === currentUser.id"
                >
                  <NuxtLink
                    :to="`/t/${todo.id}`"
                    class="todo_id"
                    @click="navigateToTodo(todo.id)"
                  >
                    <div class="todo-title">
                      <span v-if="todo.title === ''">{{
                        formatDate(todo.created_at)
                      }}</span>
                      <span v-else>
                        <div v-if="todo.title.length > 13">
                          {{ todo.title.slice(0, 13) + "..." }}
                        </div>
                        <div v-else>{{ todo.title }}</div>
                      </span>
                    </div>
                  </NuxtLink>
                  <div class="opeion-wrapper">
                    <button
                      class="oprion-icon"
                      @click.stop="openOption(todo.id)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-three-dots-vertical"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </li>

          <li>
            <h5>過去7日間</h5>
            <ul class="aside-todo-padding">
              <li v-for="todo in categorizedTodos.lastsevendays" :key="todo.id">
                <div
                  class="all-todo-bord"
                  v-if="todo.auther === currentUser.id"
                >
                  <NuxtLink
                    :to="`/t/${todo.id}`"
                    class="todo_id"
                    @click="navigateToTodo(todo.id)"
                  >
                    <div class="todo-title">
                      <span v-if="todo.title === ''">{{
                        formatDate(todo.created_at)
                      }}</span>
                      <span v-else>
                        <div v-if="todo.title.length > 13">{{ todo.title.slice(0, 13)+"..." }}</div>
                        <div v-else>{{ todo.title }}</div>
                      </span>
                    </div>
                  </NuxtLink>
                  <div class="opeion-wrapper">
                    <button
                      class="oprion-icon"
                      @click.stop="openOption(todo.id)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-three-dots-vertical"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </li>

          <li>
            <h5>それ以前</h5>
            <ul class="aside-todo-padding">
              <li v-for="todo in categorizedTodos.older" :key="todo.id">
                <div
                  class="all-todo-bord"
                  v-if="todo.auther === currentUser.id"
                >
                  <NuxtLink
                    :to="`/t/${todo.id}`"
                    class="todo_id"
                    @click="navigateToTodo(todo.id)"
                  >
                    <div class="todo-title">
                      <span v-if="todo.title === ''">{{
                        formatDate(todo.created_at)
                      }}</span>
                      <span v-else>
                        <div v-if="todo.title.length > 13">{{ todo.title.slice(0, 13)+"..." }}</div>
                        <div v-else>{{ todo.title }}</div>
                      </span>
                    </div>
                  </NuxtLink>
                  <div class="opeion-wrapper">
                    <button
                      class="oprion-icon"
                      @click.stop="openOption(todo.id)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-three-dots-vertical"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
              <div class="modal-overlay-option" v-if="OptionDialogOpen">
                <div class="modal-content-option">
                  <div class="option-menu">
                    <div class="option-title-bord">
                      <p class="option-title">オプション</p>
                      <button
                        @click="closedOption"
                        data-textid="close-button"
                        class="closed-button"
                        aria-label="閉じる"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon-md"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5.63603 5.63604C6.02656 5.24552 6.65972 5.24552 7.05025 5.63604L12 10.5858L16.9497 5.63604C17.3403 5.24552 17.9734 5.24552 18.364 5.63604C18.7545 6.02657 18.7545 6.65973 18.364 7.05025L13.4142 12L18.364 16.9497C18.7545 17.3403 18.7545 17.9734 18.364 18.364C17.9734 18.7545 17.3403 18.7545 16.9497 18.364L12 13.4142L7.05025 18.364C6.65972 18.7545 6.02656 18.7545 5.63603 18.364C5.24551 17.9734 5.24551 17.3403 5.63603 16.9497L10.5858 12L5.63603 7.05025C5.24551 6.65973 5.24551 6.02657 5.63603 5.63604Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <button
                      class="option-feature-edit"
                      @click="openEditDialog(selectTodoId)"
                    >
                      <div class="button-in">タイトルを変更</div>
                    </button>
                    <button
                      class="option-feature-delete"
                      @click="openDeleteDialog(selectTodoId)"
                    >
                      <div class="button-design">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-trash"
                          viewBox="0 0 16 16"
                          style="font-weight: bold; color: red"
                        >
                          <path
                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                          />
                          <path
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                          />
                        </svg>
                        <div class="button-in-dele">削除する</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <div class="modal-overlay-delete" v-if="Deleteconfirmation">
                <div class="modal-content-delete">
                  <div class="flex-delete">
                    <div v-for="item in getTodoActions" :key="item.id">
                      <div class="main-header">このToDOを削除しますか？</div>
                      <div class="some-info-bord">
                        <div class="delete-exp">
                          <div class="lib-name-del" v-if="item.title === ''">
                            {{ formatDate(item.created_at) }}を削除します。
                          </div>
                          <div class="lib-name-del" v-else>
                            {{ item.title }}を削除します。
                          </div>
                          <div class="lib-exp-font">
                            ⚠️ 一度ToDOを削除すると復元することは出来ません。
                          </div>
                        </div>
                        <div class="action-bord">
                          <button class="cancel" @click="closedDeleteDialog">
                            <div class="litery">キャンセルする</div>
                          </button>
                          <button class="delete" @click="deleteToDO(item.id)">
                            <div class="litery">削除する</div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-overlay-edit" v-if="EditDialogOpen">
                <div class="modal-content-edit">
                  <div class="flex-delete">
                    <div v-for="item in getTodoActions" :key="item.id">
                      <div class="main-header">タイトルの編集をします。</div>
                      <div class="some-info-bord">
                        <div class="exp-header">
                          <div class="lib-name-del" v-if="item.title === ''">
                            {{ formatDate(item.created_at) }}/タイトルの編集。
                          </div>
                          <div class="lib-name-del" v-else>
                            <div v-if="item.title.length > 17">{{ item.title.slice(0, 17)+"..." }}/タイトルの編集。</div>
                            <div v-else>{{ item.title }}/タイトルの編集</div>
                          </div>
                        </div>
                        <div class="exp">
                          ⚠️ 見返してもわかりやすいタイトルにしてください。
                        </div>
                        <div class="edit-area">
                          <input
                            id="edit-title"
                            v-model="EditTitle"
                            class="input-field"
                            type="text"
                            placeholder="タイトルの編集"
                          />
                        </div>
                        <div class="action-bord">
                          <button class="cancel-edit" @click="closedEditDialog">
                            <div class="litery-edit">キャンセルする</div>
                          </button>
                          <button class="save" @click="editTitle(item.id)">
                            <div class="litery">保存する</div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ul>
          </li>

          <li
            v-if="todolist.length === 0 && isAuthenticated"
            class="empty-message"
          >
            <p>ToDOを作成してください。</p>
          </li>
        </div>
      </ul>
    </aside>
  </div>
</template>
<script setup>
import "../assets/css/components/header.css";
import { defineNuxtLink, useRouter } from "nuxt/app";
import { useAuthStore } from "../store/auth";
import { useLibraryStore } from "../store/libraryStore";
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  callWithErrorHandling,
} from "vue";
const router = useRouter();
const authStore = useAuthStore();
const libraryStore = useLibraryStore();
const todolist = ref([]);
const libraryName = ref([]);
const EditTitle = ref([]);
const libraries = ref([]);
const user = ref(null);
const isAsideOpen = ref(true);
const userMap = ref({});
const openOptions = ref(null);
const isAuthenticated = computed(() => authStore.isAuthenticated);
const currentUser = computed(() => authStore.currentUser);
onMounted(async () => {
  try {
    await authStore.restoreSession();
    console.log("セッション復元成功。");
    //カスタムユーザーによる情報
    checkWindow();
    window.addEventListener("resize", checkWindow);
    if (authStore.isAuthenticated) {
      try {
        user.value = await authStore.getUserInfo();
        console.log("ユーザー情報取得:", user.value);
      } catch (error) {
        console.error("ユーザー情報取得:", error);
        throw error;
      }
    }
    libraries.value = await libraryStore.fetchLibraries();
    todolist.value = await authStore.AsideTitle();
    todolist.value.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    const categorized = categorizeTodos(todolist.value);
    categorizedTodos.value =
      { ...categorized } && categorizeTodos(todolist.value);
    console.log(categorizedTodos.value);
  } catch (error) {
    console.error("初期データのロードに失敗しました。", error);
  }
});
onBeforeUnmount(async () => {
  window.removeEventListener("resize", checkWindow);
});
const OptionDialogOpen = ref(false);
const Deleteconfirmation = ref(false);
const EditDialogOpen = ref(false);
const isDialogOpen = ref(false);
const selectTodoId = ref(null);
const navigateToTodo = (todoId) => {
  if (this.openOptions !== todoId) {
    this.$router.push(`/t/${todoId}`);
  }
};
const openOption = (todoId) => {
  selectTodoId.value = todoId;
  OptionDialogOpen.value = true;
};
const closedOption = () => {
  OptionDialogOpen.value = false;
};
const openDeleteDialog = (todoId) => {
  selectTodoId.value = todoId;
  Deleteconfirmation.value = true;
};
const closedDeleteDialog = () => {
  Deleteconfirmation.value = false;
};
const openEditDialog = (todoId) => {
  selectTodoId.value = todoId;
  EditDialogOpen.value = true;
};
const closedEditDialog = () => {
  EditDialogOpen.value = false;
};
const openDialog = () => {
  isDialogOpen.value = true;
};
const closeDialog = () => {
  isDialogOpen.value = false;
};

const createLibrary = async () => {
  const libname = libraryName.value.trim();
  if (!libname) {
    alert("ライブラリ名を入力してください。");
    return;
  }
  const owner = authStore.user?.id;
  const members = authStore.user?.id ? [authStore.user?.id] : [];
  try {
    const createLib = await libraryStore.createLibrary(libname, owner, members);
    console.log("作成成功:", createLib);
    libraries.value = await libraryStore.fetchLibraries();
    closeDialog();
  } catch (error) {
    console.error("ライブラリ作成失敗", error);
    alert("ライブラリ作成の失敗。");
    throw error;
  }
};
const props = defineProps({
  todolist: {
    type: Array,
    default: () => [],
  },
});
const editTitle = async (todoId) => {
  const newTitle = EditTitle.value.trim();
  if (!newTitle) {
    alert("タイトルを入力してください。");
    return;
  }
  const todo = props.todolist.find((todo) => todo.id === todoId);
  if (todo) return;
  if (!newTitle || newTitle.trim() === "") return;
  try {
    const EditToDO = await authStore.editTitleId(todoId, newTitle);
    console.log("タイトルの変更", EditToDO);
    closeDialog();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const deleteToDO = async (todoId) => {
  if (!props.todolist) {
    console.error("todolist が未定義です。");
    return;
  }
  const todo = props.todolist.findIndex((todo) => todo.id === todoId);
  if (!todo) return;
  try {
    await authStore.deleteTodoId(todoId);
    console.log("削除の命令・実行");
    closeDialog();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const getTodoActions = computed(() => {
  const fetchtodo = todolist.value.filter(
    (todo) => todo.id === selectTodoId.value
  );
  return fetchtodo;
});

const checkWindow = () => {
  if (window.innerWidth < 768) {
    isAsideOpen.value = false;
  } else {
    isAsideOpen.value = true;
  }
};
const toggleAsideTag = () => {
  isAsideOpen.value = !isAsideOpen.value;
};
const logout = async () => {
  try {
    await authStore.logout();
    console.log("ログアウト成功");
    router.push("/auth/login");
  } catch (error) {
    console.error("ログアウト失敗", error);
    alert("ログアウトに失敗しました。時間をおいて再試行してください。");
  }
};
const gotoLogin = () => {
  router.push("/auth/login");
};

const gotoSignup = () => {
  router.push("/auth/signup");
};
function formatDate(date) {
  if (!date) return "日付不明";
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hour12: true,
    minute: "2-digit",
  };
  return new Date(date).toLocaleDateString("ja-jp", options);
}
const categorizeTodos = (todolist) => {
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const startOfYesterday = new Date(
    startOfToday.getTime() - 24 * 60 * 60 * 1000
  );
  const startOfLastSevenDays = new Date(
    startOfToday.getTime() - 7 * 24 * 60 * 60 * 1000
  );
  return {
    today: todolist
      .filter((todo) => new Date(todo.created_at) >= startOfToday)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),

    yesterday: todolist
      .filter(
        (todo) =>
          new Date(todo.created_at) >= startOfYesterday &&
          new Date(todo.created_at) < startOfToday
      )
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),

    lastsevendays: todolist
      .filter(
        (todo) =>
          new Date(todo.created_at) >= startOfLastSevenDays &&
          new Date(todo.created_at) < startOfYesterday
      )
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),

    older: todolist
      .filter((todo) => new Date(todo.created_at) < startOfLastSevenDays)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
  };
};

const categorizedTodos = ref({
  today: [],
  yesterday: [],
  lastsevendays: [],
  older: [],
});
</script>
