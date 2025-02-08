<template>
    <div>
      <!-- プロジェクト作成ボタン -->
      <div class="create-project">
        <h2 id="snor-newproject" class="project-title">プロジェクト</h2>
        <span :data-allow-mismatch="closed">
          <button @click="openDialog" aria-label="新しいプロジェクト作成" class="create-project-button">
            <div class="icon-manager">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md">
                <path d="M12 6.00003C12.5523 6.00003 13 6.44775 13 7.00003L13 11L17 11C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13L13 13L13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17L11 13L7 13C6.44771 13 6 12.5523 6 12C6 11.4477 6.44771 11 7 11L11 11L11 7.00003C11 6.44775 11.4477 6.00003 12 6.00003Z" fill="currentColor"/>
              </svg>
            </div>
          </button>
        </span>
      </div>

      <!-- ダイアログ（モーダル） -->
      <div v-if="isDialogOpen" class="modal-overlay">
        <div class="modal-content">
          <h3>新しいプロジェクトを作成</h3>
          <input v-model="projectName" type="text" placeholder="プロジェクト名" class="input-field" />
          <textarea v-model="projectDescription" placeholder="プロジェクトの説明" class="input-field"></textarea>

          <div class="button-group">
            <button @click="createProject" class="create-btn">作成</button>
            <button @click="closeDialog" class="cancel-btn">キャンセル</button>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script setup>
  import { ref } from 'vue';

  // ダイアログの開閉状態
  const isDialogOpen = ref(false);

  // 入力フィールドのデータ
  const projectName = ref('');
  const projectDescription = ref('');

  // ダイアログを開く
  const openDialog = () => {
    isDialogOpen.value = true;
  };

  // ダイアログを閉じる
  const closeDialog = () => {
    isDialogOpen.value = false;
  };

  // プロジェクトを作成（ダミー処理）
  const createProject = () => {
    if (!projectName.value.trim()) {
      alert("プロジェクト名を入力してください");
      return;
    }

    console.log("新しいプロジェクト:", {
      name: projectName.value,
      description: projectDescription.value
    });

    // APIに送信する場合
    // await axios.post('/api/projects', { name: projectName.value, description: projectDescription.value });

    alert("プロジェクトが作成されました！");

    // フォームをリセットし、ダイアログを閉じる
    projectName.value = '';
    projectDescription.value = '';
    closeDialog();
  };
  </script>

  <style scoped>
  /* ボタンデザイン */
  .create-project-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px;
  }

  .icon-manager {
    display: flex;
    align-items: center;
  }

  /* ダイアログの背景 */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* ダイアログのコンテンツ */
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 350px;
    text-align: center;
  }

  .input-field {
    width: 100%;
    padding: 8px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .button-group {
    display: flex;
    justify-content: space-between;
  }

  .create-btn {
    background: #007bff;
    color: white;
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .cancel-btn {
    background: gray;
    color: white;
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
