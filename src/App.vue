<template>
  <header class="container">
    <h1 class="first-heading center">Tyler's Vue.js Wordle</h1>
    <button
      class="statistics"
      type="button"
      title="Statistics"
      aria-label="View the Wordle Clone statistics"
      @click="onStatOpen"
      v-html="statisticsIcon"
    />
  </header>
  <main>
    <VueWordle :statistics="data.openStatistics" />
  </main>
</template>

<script setup>
import { default as VueWordle } from "@/views/VueWordle.vue";
import { nextTick, reactive } from "vue";

const data = reactive({
  openStatistics: false,
});

const onStatOpen = () => {
  data.openStatistics = true;

  nextTick(() => {
    data.openStatistics = false;
  });
};

const statisticsIcon =
  '<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="300.000000pt" height="300.000000pt" viewBox="0 0 300.000000 300.000000" preserveAspectRatio="xMidYMid meet"><metadata><rdf:rdf xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#" xmlns:dc="http://purl.org/dc/elements/1.1/">   <rdf:description dc:title="statistics graph icon" dc:publisher="Hiox" dc:date="2015-03-14" dc:format="image/svg+xml" dc:language="en">     <dc:creator><rdf:bag><rdf:li>svgimages.com</rdf:li></rdf:bag></dc:creator></rdf:description></rdf:rdf></metadata><g class="bar" transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)" stroke="none"><path d="M1899 2208 c-1 -222 0 -415 1 -430 1 -14 -3 -29 -9 -33 -6 -3 -68 38 -138 91 -218 166 -335 255 -418 318 -44 34 -82 63 -85 66 -10 10 -331 253 -346 263 -7 4 -39 -30 -82 -86 -130 -172 -313 -412 -325 -427 -7 -8 -58 -76 -115 -150 -56 -74 -164 -217 -241 -316 l-139 -182 50 -37 c27 -21 52 -34 57 -29 23 28 89 112 101 131 8 12 101 133 205 269 355 464 397 519 447 587 27 37 52 67 55 67 6 0 156 -112 510 -381 110 -85 262 -200 337 -257 l135 -103 1 -495 0 -495 187 0 188 0 3 608 2 608 293 293 c160 160 295 292 299 292 5 0 8 -27 8 -60 l0 -60 58 0 57 0 -3 175 -3 175 -179 0 -180 0 0 -57 0 -58 65 2 c35 1 66 -1 69 -5 5 -8 -25 -41 -273 -301 -97 -101 -180 -190 -184 -197 -23 -39 -27 5 -29 299 l-3 312 -187 3 -188 2 -1 -402z" id="node1" class="node"></path><path d="M820 1205 c0 -338 1 -618 3 -621 1 -4 199 -7 325 -5 l22 1 0 620 0 620 -175 0 -175 0 0 -615z" id="node2" class="node"></path><path d="M2618 1703 l-188 -3 0 -560 0 -559 190 -3 190 -3 0 568 c0 312 -1 566 -2 565 -2 -2 -87 -4 -190 -5z" id="node3" class="node"></path><path d="M1363 1463 c-10 -4 -13 -102 -13 -444 l0 -439 175 0 175 0 0 440 0 440 -149 0 c-82 0 -155 2 -163 4 -7 3 -19 2 -25 -1z" id="node4" class="node"></path><path d="M240 855 l0 -275 23 -1 c12 0 98 0 190 -1 l169 -1 1 277 2 276 -192 0 -193 0 0 -275z" id="node5" class="node"></path></g><g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)" stroke="none"></g></svg>';
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
  font-size: 1rem;
  color: $gray0;

  @media screen and (min-width: 376px) {
    font-size: 1.4rem;
  }
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

header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 28rem;
  width: 100%;
  padding-bottom: 1rem;
  border-bottom: 1px solid $gray0;

  button.statistics {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.4rem;
    padding: 0;
    width: 2rem;
    height: 2rem;
    border: 0;
    outline: 0;
    background: transparent;
    transition: all 0.3s;

    &:focus-visible {
      outline-offset: 0.3rem;
      outline-color: $highlight5;
      outline-width: 0.2rem;
      outline-style: solid;
      border-radius: 50%;
    }

    svg {
      width: 2rem;
      height: 2rem;

      .bar .node {
        fill: white;
      }
    }

    &:hover {
      cursor: pointer;

      .bar .node {
        fill: $highlight1;
      }
    }
  }
}

main {
  height: 100%;
}
</style>
