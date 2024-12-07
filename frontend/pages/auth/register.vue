<template>
    <div>
      <h1>アカウント作成</h1>
      <form>
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" />
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" />
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" />
        <button type="submit">Create Account</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    layout: 'auth', // 専用レイアウトを指定
    name: 'register'
  };
  </script>
  