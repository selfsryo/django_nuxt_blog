<template>
  <header>
    <div class="header">

      <nuxt-link to="/">
        <p class="header-logo">blog</p>
      </nuxt-link>

      <ul class="header-link">
        <li><a href="">Twitter</a></li>
        <li><a href="">GitHub</a></li>
        <li><a href="">Mail</a></li>
      </ul>

    </div>
  </header>
</template>

<style scoped>
.header {
  width: 900px;
  margin: 0 auto 20px;
}
.header-logo {
  color: #000;
  position: absolute;
  font-size: 36px;
  top: 12px;
  left: 30px;
}
.header-link {
  display: flex;
  list-style: none;
  position: absolute;
  top: 30px;
  right: 30px;
}
.header-link a {
  color: #000;
  font-size: 16px;
  font-weight: bold;
  margin-left: 10px;
  text-decoration: none;
}
</style>
