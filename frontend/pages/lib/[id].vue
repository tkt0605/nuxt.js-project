<template>
  <Header />
  <div class="lib-main-bord">
    <div class="sub-bord">
      <button class="svg-pro" @click="createToken">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-folder"
          viewBox="0 0 16 16"
        >
          <path
            d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 1H2.826a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139q.323-.119.684-.12h5.396z"
          />
        </svg>
      </button>
      <div class="lib-name">{{ library?.name }}</div>
    </div>
    <div class="text-bord-lib">
      <div class="form_id-lib">
        <div class="texter-lib" id="texter">
          <div
            id="text_keybord"
            class="text_keybord-lib"
            ref="textKeybord"
            :contenteditable="true"
            :class="{ placeholder: isPlaceholderVisible }"
            @focus="handleFocus"
            @blur="handleBlur"
          >
            <p v-if="isPlaceholderVisible">{{ placeholderText }}</p>
          </div>
        </div>
        <div class="flex-button-lib">
          <span class="flex-button-span-lib">
            <button
              type="button"
              class="submit_button-lib"
              @click="submitLibTodo(library.id)"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="icon-2xl"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </span>
        </div>
      </div>
    </div>
    <div class="info-bord">
      <button class="members_bord" @click="openJoinDialog">
        <div class="mem-exp">
          <div>
            <div class="name-current">参加済み</div>
            <div class="current-mem">
              <div class="expsss">現在のメンバー</div>
              <div class="svg-mem" @click="openJoinDialog">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-person-add"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"
                  />
                  <path
                    d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"
                  />
                </svg>
              </div>
            </div>
            <div class="current">
              {{ library?.members?.length || 0 }}人参加中
            </div>
          </div>
        </div>
      </button>
      <div v-if="JoinDialogOpen" class="modal-overlay-join">
        <div class="modal-content-join">
          <div class="flex-closed-btn">
            <h3>🚀 ライブラリに参加</h3>
            <button
              @click="closedJoinDialog"
              class="closed-button"
              data-textid="close-button"
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
          <div class="join-form">
            <div class="exp-join">
              <p>
                🔐
                ライブラリ・トークンを入力して、ライブラリに参加してください。
              </p>
            </div>
            <input
              v-model="tokenInput"
              placeholder="トークンを入力"
              class="input-field"
            />
            <div class="join-btn">
              <button class="join-button" @click="joinLibrary">
                <div class="asdas">参加する</div>
              </button>
              <button class="join-cancel" @click="closedJoinDialog">
                <div class="asdas">キャンセル</div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <button class="main-inst" @click="openDialog">
        <div class="sub-inst">
          <div>
            <div class="name-current">目標</div>
            <div class="inst">
              <div class="expsss">このプロジェクトの目標を載せる。</div>
              <div class="svg-edit" @click="openDialog">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-feather"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M15.807.531c-.174-.177-.41-.289-.64-.363a3.8 3.8 0 0 0-.833-.15c-.62-.049-1.394 0-2.252.175C10.365.545 8.264 1.415 6.315 3.1S3.147 6.824 2.557 8.523c-.294.847-.44 1.634-.429 2.268.005.316.05.62.154.88q.025.061.056.122A68 68 0 0 0 .08 15.198a.53.53 0 0 0 .157.72.504.504 0 0 0 .705-.16 68 68 0 0 1 2.158-3.26c.285.141.616.195.958.182.513-.02 1.098-.188 1.723-.49 1.25-.605 2.744-1.787 4.303-3.642l1.518-1.55a.53.53 0 0 0 0-.739l-.729-.744 1.311.209a.5.5 0 0 0 .443-.15l.663-.684c.663-.68 1.292-1.325 1.763-1.892.314-.378.585-.752.754-1.107.163-.345.278-.773.112-1.188a.5.5 0 0 0-.112-.172M3.733 11.62C5.385 9.374 7.24 7.215 9.309 5.394l1.21 1.234-1.171 1.196-.027.03c-1.5 1.789-2.891 2.867-3.977 3.393-.544.263-.99.378-1.324.39a1.3 1.3 0 0 1-.287-.018Zm6.769-7.22c1.31-1.028 2.7-1.914 4.172-2.6a7 7 0 0 1-.4.523c-.442.533-1.028 1.134-1.681 1.804l-.51.524zm3.346-3.357C9.594 3.147 6.045 6.8 3.149 10.678c.007-.464.121-1.086.37-1.806.533-1.535 1.65-3.415 3.455-4.976 1.807-1.561 3.746-2.36 5.31-2.68a8 8 0 0 1 1.564-.173"
                  />
                </svg>
              </div>
            </div>
            <div class="goal-font">
              {{ library?.goal }}
            </div>
          </div>
        </div>
      </button>
      <div v-if="isDialogOpen" class="modal-overlay">
        <div class="modal-content">
          <div class="flex-closed-btn">
            <h3>目標</h3>
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
            <div class="exp">
              ここでは、ライブラリを進めていく中での最終目標を指定する。
            </div>
            <textarea
              id="create-goal"
              v-model="Goal"
              type="text"
              placeholder="ライブラリの目標"
              class="textarea-field"
            >
            </textarea>
            <div class="btn-line">
              <button @click="createGoals" class="btn-keep">
                <div class="asdas">保存する</div>
              </button>
              <button @click="closeDialog" class="btn-cancel">
                <div class="asdas">キャンセル</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="lib-main-todo"
      v-if="library.members?.includes(currentUser.id) || isLibraryMember"
    >
      <div class="lib-todo-exp">このライブラリのToDO</div>
      <div v-for="data in libtodos" :key="data.id">
        <div class="lib-todo-list" @click="PushTodoPage(data.id)">
          <div class="todo-info-show">
            <div class="list-todo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-list-task"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM3 3H2v1h1z"
                />
                <path
                  d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1z"
                />
                <path
                  fill-rule="evenodd"
                  d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5zM2 7h1v1H2zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm1 .5H2v1h1z"
                />
              </svg>
            </div>
            <div class="sub-group">
              <div class="some-info">
                <div class="name" v-if="data.title === ''">
                  {{ formatDate(data.created_at) }}
                </div>
                <div class="name" v-else>{{ data.title }}</div>
                <div class="first-todo">{{ data.todo }}</div>
              </div>
              <div class="option">
                <button class="oprion-icon" @click.stop="openOption(data.id)">
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
          </div>
          <div class="modal-overlay-option-lib" v-if="isDialogOption">
            <div class="modal-content-lib">
              <div class="flex-option-lib">
                <div class="option-menu">
                  <div class="option-title-bord">
                    <p class="option-title">オプション</p>
                    <button
                      @click.stop="closedOption"
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
                    @click.stop="openEditDialog(selectTodoId)"
                  >
                    <div class="button-in">タイトルを変更</div>
                  </button>
                  <button
                    class="option-feature-delete"
                    @click.stop="openDeleteDialog(selectTodoId)"
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
          </div>
          <div class="modal-overlay-delete" v-if="isDialogDelete">
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
                      <button class="cancel" @click.stop="closedDeleteDialog">
                        <div class="litery">キャンセルする</div>
                      </button>
                      <button class="delete" @click.stop="deleteToDO(item.id)">
                        <div class="litery">削除する</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-overlay-edit" v-if="isDialogEdit">
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
                        <div v-if="item.title.length > 17">
                          {{ item.title.slice(0, 17) + "..." }}/タイトルの編集。
                        </div>
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
                        @click.stop
                      />
                    </div>
                    <div class="action-bord">
                      <button class="cancel-edit" @click.stop="closedEditDialog">
                        <div class="litery-edit">キャンセルする</div>
                      </button>
                      <button class="save" @click.stop="editTitle(item.id)">
                        <div class="litery">保存する</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Header from "../components/Header.vue";
import { useRoute, useRouter } from "nuxt/app";
import { useAuthStore } from "../../store/auth";
import { useLibraryStore } from "../../store/libraryStore";
import "../assets/css/pages/lib-id.css";
import { ref, onMounted, computed } from "vue";
import { nextTick } from "vue";
const library = ref([]);
const libtoken = ref([]);
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const libraryStore = useLibraryStore();
const placeholderText = ref("このライブラリの新しいToDO");
const isPlaceholderVisible = ref(true);
const openOptions = ref(null);
const Goal = ref("");
const tokenInput = ref("");
const ismouse = ref(false);
const currentUser = computed(() => authStore.currentUser);
const libtodos = ref([]);
const EditTitle = ref([]);
const handleFocus = () => {
  if (isPlaceholderVisible.value) {
    isPlaceholderVisible.value = false;
  }
};
const handleBlur = (event) => {
  if (!event.target.innerText.trim()) {
    isPlaceholderVisible.value = true;
  }
};
const isDialogOption = ref(false);
const isDialogEdit = ref(false);
const isDialogDelete = ref(false);
const selectTodoId = ref(null);
const isDialogOpen = ref(false);
const JoinDialogOpen = ref(false);
const openOption = (todoId) => {
  selectTodoId.value = todoId;
  isDialogOption.value = true;
};
const closedOption = () => {
  isDialogOption.value = false;
};
const openEditDialog = (todoId) => {
  selectTodoId.value = todoId;
  isDialogEdit.value = true;
};
const closedEditDialog = () => {
  isDialogEdit.value = false;
  closedOption();
};
const openDeleteDialog = (todoId) => {
  selectTodoId.value = todoId;
  isDialogDelete.value = true;
};
const closedDeleteDialog = () => {
  isDialogDelete.value = false;
  closedOption();
};
const openDialog = () => {
  isDialogOpen.value = true;
};
const closeDialog = () => {
  isDialogOpen.value = false;
};
const openJoinDialog = () => {
  JoinDialogOpen.value = true;
};
const closedJoinDialog = () => {
  JoinDialogOpen.value = false;
};
onMounted(async () => {
  try {
    await authStore.restoreSession();
    console.log("セッション復元成功");
    const routeId = route.params.id;
    //引数goalのみをＡＰＩで取得しているfetchLibraryId()という関数を持ってくる。
    const LibraryGoal = await libraryStore.fetchId(routeId);
    library.value = await libraryStore.fetchId(routeId);
    const todos = await libraryStore.getLibraryTodo();
    if (Array.isArray(todos)) {
      // addtodo.value = todos.filter((addtodo) => addtodo.todo_tag === routeId);
      libtodos.value = todos
        .filter((libtodos) => libtodos.tag === routeId)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else {
      console.error("追加todoの取得に失敗しました。", error);
    }
    // libtoken.value = await libraryStore.getLibraryToken(routeId);
    //v-modelとして定義したGoalと、APIでLibraryの引数Goalを取得するよう定義したLibraryGoalの引数goalを結びつける。
    Goal.value = LibraryGoal.goal || "";
  } catch (error) {
    console.error("Libraryの取得に失敗しました。", error);
    throw new error();
  }
});
const props = defineProps({
  libtodos: {
    type: Array,
    default: () => [],
  },
  library: {
    type: Array,
    default: () => null,
  },
});
const isLibraryMember = computed(() => {
  const isMember = library?.members?.includes(currentUser?.id);
  return isMember;
});
const getTodoActions = computed(()=> {
  const routeId = route.params.id;
  const getLibTodo = libtodos.value.filter((item) => item.id === selectTodoId.value && item.tag === routeId);
  return getLibTodo;
});
const createGoals = async () => {
  const routeId = route.params.id;
  const Cotentgoal = Goal.value.trim();
  try {
    const createGoal = await libraryStore.LibraryCreategoal(
      routeId,
      Cotentgoal
    );
    console.log("目標の作成成功", createGoal);
    window.location.reload();
    closeDialog();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const createToken = async () => {
  const routeId = route.params.id;
  try {
    const libtokens = await libraryStore.libraryToken();
    // URLのidに該当するIDをもつLibraryを取得する。
    const libtoken = await libtokens.find((item) => item.tag === routeId);
    if (currentUser.id === library.owner && (!libtoken.token || !libtoken)) {
      const createtoken = await libraryStore.CreateLibraryToken(routeId);
      alert("トークン作成完了");
      console.log("token作成完了");
      return createtoken;
    } else {
      alert("あなたは作成権限がありません");
      throw new Error();
    }
  } catch (error) {
    console.error("トークン作成エラー:", error);
    throw new Error(error);
  }
};
const joinLibrary = async () => {
  const routeId = route.params.id;
  const inputtoken = tokenInput.value.trim();
  const add_member = authStore.user?.id;
  try {
    const libtokens = await libraryStore.libraryToken();
    const libtoken = libtokens.find((item) => item.tag === routeId);
    if (library?.members?.includes(add_member)) {
      alert("⚠️ あなたは既にメンバーです。");
      return;
    }
    if (
      libtoken.token === inputtoken &&
      !library?.members?.includes(add_member)
    ) {
      const joinlibrary = await libraryStore.joinToLibrary(routeId, add_member);
      alert("🎉 正常に追加出来ました！！");
      console.log("追加成功！", joinlibrary);
      closeDialog();
    } else {
      alert("🚫 参加に失敗しました。");
      throw new Error();
    }
  } catch (error) {
    console.error("Error!!:", error);
    throw new Error("エラーの詳細内容", error);
  }
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
const submitLibTodo = async (libId) => {
  const todoElement = document.getElementById("text_keybord");
  const todoContent = todoElement.innerText.trim();
  const now = new Date();
  const auther = authStore.user?.id;
  if (!todoContent || todoContent === "このライブラリの新しいToDO") {
    console.log("ToDoの内容が空です。");
    return;
  }
  try {
    const createTodo = await libraryStore.CreateTodo(
      libId,
      todoContent,
      auther
    );
    libtodos.value = await libraryStore.getLibraryTodo();
    todoElement.innerText = "";
    console.log("正常に作成");
    await nextTick();
    router.push(`/lib/${createTodo.library}/t/${createTodo.id}`);
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};
const PushTodoPage = async (todoId) => {
  try{
    const routeId = route.params.id;
    router.push(`/lib/${routeId}/t/${todoId}`);
  }catch(error){
    console.error("アクセス失敗:", error);
    throw new Error;
  }
};
const editTitle = async(todoId)=>{
  const newTitle = EditTitle.value.trim();
  if(!newTitle)return;
  try{
    const Edittitle = await authStore.editTitleId(todoId, newTitle);
    console.log("タイトル更新の完了", Edittitle);
    closeDialog();
  }catch(error){
    console.error(error);
    throw new Error;
  }
}
</script>
