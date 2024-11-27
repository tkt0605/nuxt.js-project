<template>
  <nav class="bord">
    <ul class="todo_list">   
      <li class="item">
        <input type="checkbox" class="checkboxs"/>
        <div class="time">time</div>
        <div class="text">Title</div>
      </li>      
    </ul>
  </nav>
</template>
<style>
</style>
<script>
export default {
  name: 'IndexPage',
  // layout: 'default',
}
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
  max-height: 350px;
  width: 100%;
  height: 100%;
}
/* Individual items */
.item {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eceff1;
  transition: background-color 0.3s ease;
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
</style>