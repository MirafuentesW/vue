<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 ml-2">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/task/create">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/task">Task</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <nav></nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
