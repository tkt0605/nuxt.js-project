<template>
    <div>
      <!-- 共通のヘッダー -->
      <header>
        <nav>
          <ul>
            <li><nuxt-link to="/">Home</nuxt-link></li>
            <li><nuxt-link to="/about">About</nuxt-link></li>
            <li><nuxt-link to="/contact">Contact</nuxt-link></li>
          </ul>
        </nav>
      </header>
  
      <!-- ページごとの内容 -->
      <main>
        <nuxt />
      </main>
  
      <!-- 共通のフッター -->
      <footer>
        <p>&copy; 2024 My Website</p>
      </footer>
    </div>
  </template>
  
  <style>
  header {
    background-color: #333;
    color: white;
    padding: 1rem;
  }
  nav ul {
    list-style: none;
    padding: 0;
    display: flex;
  }
  nav li {
    margin-right: 1rem;
  }
  </style>
  