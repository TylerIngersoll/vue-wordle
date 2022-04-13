<template>
  <div class="upper container">
    <header>
      <h1 class="first-heading center">Wordle Clone</h1>
    </header>
    <main>
      <WordleClone />
    </main>
  </div>
  <footer class="container">
    <p>
      Visit
      <a
        href="https://tyleringersoll.com/projects"
        target="_blank"
        ref="noopener noreferrer"
        >tyleringersoll.com/projects</a
      >
      for more info about this Vue.js 3 project.
    </p>
  </footer>
</template>

<script setup>
import { default as WordleClone } from "@/views/WordleClone.vue";
</script>

<style lang="scss">
* {
  font-family: "Roboto Condensed", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  background-color: $gray6;
  color: $gray0;
  font-size: 100%;
  line-height: 1.2;

  &.menu-open {
    overflow-y: hidden;
  }
}

h1,
h2,
h3,
h4,
h5 {
  margin: 0;
  transition: all 0.3s;

  &:focus-visible {
    outline-offset: 0.2rem;
  }
}

h1 {
  font-size: 2.5rem;
  color: $gray0;
}

h2 {
  margin-bottom: 2rem;
  font-size: 1.75rem;
  color: $highlight3;

  &.first-heading {
    @media screen and (max-width: $md) {
      padding-top: 2rem;
      border-top: 2px solid $highlight3;
    }
  }
}

p {
  line-height: 1.5;
}

a {
  color: $highlight1;
  transition: all 0.3s;

  &:hover {
    color: $highlight2;
  }

  &:focus-visible {
    outline-offset: 2px;
  }
}

.container {
  max-width: 768px;
  width: 100%;
  padding: 10px 24px;
  margin: 0 auto;
}

.center {
  text-align: center;
}

.justified {
  text-align: justify;
}

.visually-hidden {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

:focus-visible {
  outline: $highlight5 solid 2px;
  border-radius: 2px;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.5s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.upper {
  flex: 1 0 auto;
}

header {
  padding-bottom: 1rem;
  border-bottom: 1px solid $gray0;
}

footer.container {
  margin-top: 4rem;
  flex-shrink: 0;
  padding: 1rem 0;
  border-top: 1px solid $gray0;
}
</style>
