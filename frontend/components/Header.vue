<template>
    <div>
        <div class="header">
            <div class="headerline">
                <div class="container">
                    <a class="logo">
                        ToDO<small class="logo_small"> By Typewriter</small>
                    </a>
                </div>
            </div>
        </div>
        <aside>
            <ul>
                <li class="create_todo">New Todo</li>
                <li class="log_todo">2024/11/25-NewToDO</li>
                <li class="log_todo">2024/11/25-NewToDO</li>
                <li class="log_todo">2024/11/25-NewToDO</li>
                <li class="log_todo">2024/11/25-NewToDO</li>
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
}
.headerline{
    padding-left: 20px;
    padding-right: 20px;
}
.container{
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}
.logo{
    font-size: 20px;
    font-weight: bold;
    padding: 15px 15px;
    align-items: center;
}
.header{
    background: rgb(230, 230, 230);
    /* padding: 1.5rem; */
    position: fixed;
    width: 100%;
}
ul{
    padding: 30px;
}
li .create_todo{
    padding: 15px;
    font-size: 15px;
}
li .log_todo{
    padding: 10px;
    margin: 10px;
}
</style>