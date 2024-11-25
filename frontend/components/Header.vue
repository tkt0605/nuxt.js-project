<template>
    <div>
        <header>
            <div class="logo">ToDo<small class="logo_small">By Typewriter</small></div>
        </header>
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
    font-family: Arial, Helvetica, sans-serif;
}
body{
    background: rgb(226, 226, 226);
}
aside{
    background: rgb(230, 230, 230);
    max-width: 300px;
    width: 100%;
}
div .logo{

}
header {
    background: rgb(230, 230, 230);
    padding: 1rem;
    
}
ul{
    /* margin: 10px; */
    padding: 30px;
}
li .create_todo{
    padding: 15px;
}
li .log_todo{
    padding: 10px;
    margin: 10px;
}
</style>