<template>
  <Header/>
  <div class="bord">
    <div class="todo_list">   
      <div class="item">
        <input type="checkbox" class="checkboxs"/>
        <p class="time">time</p>
        <p class="text">Title</p>
      </div>      
    </div>
    <div class="text-base"> 
      <div class="">
        <div class="form">
          <div class="texter" id="texter">
            <div id="text_keybord" ref="textKeybord" class="text_keybord" contenteditable="true" data-placeholder="あなたのToDOを記入" >
              <p></p>
            </div>
          </div>
          <div class="flex-button">
            <span class="flex-button-span">
              <button type="button" class="submit_button">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-2xl">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z" fill="currentColor"></path>
                </svg>
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import '../assets/css/index.css';
import Header from '../components/Header.vue';
export default {
  layout: 'default',
  components: {
    Header,
  },
  name: 'IndexPage',
  methods: {
    handlePlaceholder(event) {
      const editable = event.target;
      if (event.type === 'focus' && editable.classList.contains('placeholder')) {
        editable.classList.remove('placeholder');
        editable.innerText = '';
      }

      if (event.type === 'blur' && editable.innerText.trim() === '') {
        editable.classList.add('placeholder');
        editable.innerText = editable.getAttribute('data-placeholder');
      }
    },
  },
  mounted() {
    if (process.client){
      const editable = this.$refs.textKeybord; 
      if (!editable) return; 
      this.handlePlaceholder({ type: 'blur', target: editable });
      editable.addEventListener('focus', this.handlePlaceholder);
      editable.addEventListener('blur', this.handlePlaceholder);
    }

  },
  beforeUnmount(){
    const editable = this.$refs.textKeybord;
    if (editable){
        editable.removeEventListener('focus', this.handlePlaceholder);
        editable.removeEventListener('blur', this.handlePlaceholder);
    }
  }
};
</script>
