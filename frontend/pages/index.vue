<template>
  <nav class="bord">
    <div class="todo_list">   
      <article class="item">
        <input type="checkbox" class="checkboxs"/>
        <div class="time">time</div>
        <div class="text">Title</div>
      </article>      
    </div>
    <div class="form">
      <div id="text_keybord" class="text_keybord" contenteditable="true" data-placeholder="あなたのToDOを記入">
      </div>
      <!-- <textarea id="text_keybord" class="text_keybord" placeholder="あなたのToDOを記入" @input="adjustHeight"></textarea> -->
      <button type="button" class="submit_button">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-2xl">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z" fill="currentColor"></path>
        </svg>
      </button>
    </div>
    <div class="small">
      <small>ToDO By Typewriterは、オープンのテキストエディタです。</small>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'IndexPage',
  methods: {

    handlePlaceholder(event){
      const editable = event.target;
      if (event.type == 'focus' && editable.classList.contains('placeholder')) {
        editable.classList.remove('placeholder');
        editable.innerText = '';
      }

      if (event.type == 'blur' && editable.innerText.trim() === ''){
        editable.classList.add('placeholder');
        editable.innerText = editable.getAttribute('data-placeholder');
      }
    },
  },
  mounted() {
    const editable = document.getElementById('text_keybord');
    // イベントリスナーを設定
    this.handlePlaceholder({type: 'blur', target: editable});
    editable.addEventListener('focus', this.handlePlaceholder);
    editable.addEventListener('blur', this.handlePlaceholder);

    this.$once('hook:beforeDestory', () => {
      editable.removeEventListener('focus', this.handlePlaceholder);
      editable.removeEventListener('blur', this.handlePlaceholder);
    })
  }

};
</script>
<style>
.bord{
  background: rgb(226, 226, 226);
  padding: 1.0rem;
  position: fixed;
  top: 100px;
  left: 450px; 
  width: calc(100% - 450px); 
  z-index: 0;
}
.todo_list{
  background-color: white;
  /* padding: 20px; */
  border-radius: 10px;
  border: 1px solid #ccc;
  box-shadow: inset;
  max-width: 680px;
  max-height: 380px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  align-items: center;
  justify-content: center;
  /* margin-bottom: 375px; */
}
/* Individual items */
.item {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eceff1;
  transition: background-color 0.3s ease;
  justify-content: center;
}

.item:last-child {
  border-bottom: none;
}

/* Hover effect for items */
.item:hover {
  background-color: #f1f5f9;
}

/* Checkbox styling */
.checkboxs {
  margin-right: 15px;
  width: 20px;
  height: 20px;
  accent-color: #007bff; /* Modern browsers */
  cursor: pointer;
}

/* Time styling */
.time {
  font-size: 14px;
  color: #6c757d;
  margin-right: 20px;
  flex-shrink: 0;
}

/* Text styling */
.text {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  flex-grow: 1;
  word-wrap: break-word;
}

/* Completed task (when checkbox is checked) */
.checkboxs:checked + .time + .text {
  text-decoration: line-through;
  color: #6c757d;
}

/* Add some padding around the list */
.todo_list {
  padding: 10px 0;
}
.form{
  max-width: 680px;
  width: 100%;
  height: auto;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  position: fixed;
  z-index: 10;
}
 .text_keybord{
  /* white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
  max-width: 680px;
  width: 100%;
  min-height: 40px;
  padding: 20px;
  border-radius: 5px;
  border: 2px solid #ffffff;
  border-bottom: none; 
  outline: none;
  transition: none;  */
  width: 100%;
  max-width: 680px; 
  min-height: 40px; 
  max-height: 200px; /* 最大高さを指定 */
  padding: 10px;
  border: 1px solid #ffffff;
  border-radius: 5px;
  font-size: 16px;
  line-height: 1.5;
  transition: none;
  border-bottom: none; 
  outline: none;
  overflow: none;
  white-space: pre-wrap; 
  word-wrap: break-word;
  overflow-y: hidden; /* スクロールバーを非表示 */
  margin-bottom: .5rem;
  margin-top: .5rem;
  align-items: center;
 }
.text_keybord:focus{
  border-color: #ffffff; /* フォーカス時も通常時と同じ色 */
  overflow: auto;
}
.post_icon{
}
.submit_button{
  /* padding: 10px; */
  stroke-width: 1.5;
  flex-shrink: 0;
  height: 2rem;
  width: 2rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 20px;
  transition: background-color 0.3s ease;
  font-weight: 800;
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  margin-right: 10px;
}
.small{
  text-align: center;
}
</style>