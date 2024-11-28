<template>
    <div>
        <div class="header">
            <div class="headerline"> 
                <div class="container">
                    <a class="logo">ToDO<small class="logo_small"> By Typewriter</small></a>
                    <div class="account_form">
                        <button class="login">ログイン</button>
                        <button class="signup">サインアップ</button>
                    </div>
                </div>
            </div>
        </div>
        <aside>
            <ul>
                <li class="create_todo">
                    <NuxtLink class="new_todo" to="/">New ToDO</NuxtLink>
                </li>
                <li class="log_todo">
                    <NuxtLink class="todo_tab" to="/">2024/11/26 ToDO 1</NuxtLink>
                </li>
                <li class="log_todo">
                    <NuxtLink class="todo_tab" to="/">2024/11/26 ToDO 1</NuxtLink>
                </li>
                <li class="log_todo">
                    <NuxtLink class="todo_tab" to="/">2024/11/26 ToDO 1</NuxtLink>
                </li>
                <li class="log_todo">
                    <NuxtLink class="todo_tab" to="/">2024/11/26 ToDO 1</NuxtLink>
                </li>
            </ul>
        </aside>
    </div>
</template>
<style>
*{
    margin: 0;
    padding: 0;
    font-family: 'Courier New', Courier, monospace;
    box-sizing: border-box;
}
body{
    background: rgb(226, 226, 226);

}
aside{
    background: rgb(230, 230, 230);
    max-width: 255px;
    width: 100%;
    height: 100%;
    margin: 0;
    position: fixed;
    border-right: 1px solid #ccc;
}
.headerline{
    padding-left: 20px;
    padding-right: 20px;
}
.container{
    padding-right: 20px;
    padding-left: 20px;
    margin-right: auto;
    margin-left: auto;
    display: flex;
    justify-content: space-between;
}
.logo{
    font-size: 20px;
    font-weight: bold;
    padding: 15px 15px;
    align-items: center;
}
.header{
    background: rgb(226, 226, 226);
    padding: 1.0rem;
    position: fixed;
    top: 0;
    left: 255px; 
    width: calc(100% - 255px); 
    z-index: 10;
}
ul{
    padding: 30px 20px;
    padding-left: 0;
    font-weight: bold;
}
li{
    margin-bottom: 20px;
    margin: 20px 20px 20px 20px;
    list-style: none;
}
li .create_todo{
    font-size: 15px;
    align-items: center;
    margin-left: 15px;
}
.new_todo{
    padding: 10px 10px;
    border-radius: 5px;
    color: black;
    text-decoration: none;
}
.new_todo:hover{
    background-color: #ccc
}
.todo_tab{
    padding: 10px 10px;
    border-radius: 5px;
    color: black;
    text-decoration: none;
}
.todo_tab:hover{
    background-color: #ccc;
}
li .log_todo{
    padding: 10px;
    margin: 10px;
    list-style: none;
}
.login{
    background-color: black;
    padding: 10px;
    margin: 10px;
    color: white;
    border-radius: 20px;
    border: 1px solid rgb(226, 226, 226);
    width: 100px;
}
.signup{
    padding: 10px;
    margin: -10px;
    border-radius: 20px;
    border: 1px solid rgb(226, 226, 226);
    width: 120px;
}
.account_form{
    left: 150px;
    top: 0;
    margin-left: 20px;
    gap: 15px;
}
</style>