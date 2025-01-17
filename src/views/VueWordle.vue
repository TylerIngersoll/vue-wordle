<template>
  <div class="wordle">
    <div class="game-wrapper" :key="data.instance">
      <div
        v-for="row in 6"
        :key="row"
        :ref="
          (el) => {
            rowRefs[`row${row}`] = el;
          }
        "
        :class="['row', `row-${row}`]"
      >
        <div
          v-for="tile in 5"
          :key="tile"
          :ref="
            (el) => {
              tileRefs[`row${row}-tile${tile}`] = el;
            }
          "
          :class="['tile', `tile-${tile}`, 'empty']"
        >
          {{ getLetter(row, tile) }}
        </div>
      </div>

      <transition name="fade" mode="out-in">
        <Modal
          :modalOpen="data.modalOpen"
          maxWidth="34rem"
          @modal-close="onModalClose"
        >
          <template v-if="data.success">
            <h2 class="modal-heading">You win! 🎉</h2>
          </template>
          <template v-else-if="data.fail">
            <h2 class="modal-heading description">You lose! 🤡</h2>
            <p class="modal-heading-description">
              The word was: <span class="highlight">{{ data.baseWord }}</span>
            </p>
          </template>
          <template v-else-if="data.infoButtonClicked">
            <h2 class="modal-heading description">
              About Tyler's Vue.js Wordle
            </h2>
            <p>
              This is a game with the same rules as the original Wordle except
              everybody gets a different word on each play, and you can play as
              many times as you would like each day.
            </p>
            <h2 class="secondary-heading">Objective</h2>
            <p>Solve the five-letter word within six attempts.</p>
            <h2 class="secondary-heading">Color key</h2>
            <p>
              You will receive the following feedback after submitting a word:
            </p>
            <ul class="no-list">
              <li>
                <span class="color-tile">🟩</span>
                <span class="color-tile-info"
                  >This letter is in the correct position in the word.</span
                >
              </li>
              <li>
                <span class="color-tile">🟨</span>
                <span class="color-tile-info"
                  >This letter is in the word, but in the wrong position.</span
                >
              </li>
              <li>
                <span class="color-tile">⬛</span>
                <span class="color-tile-info"
                  >This letter is not in the word.</span
                >
              </li>
            </ul>
            <p>
              <a
                href="https://github.com/tyleringersoll/vue-wordle"
                target="_blank"
                >Github</a
              >
            </p>
          </template>
          <Results
            v-if="data.statisticsButtonClicked || data.success || data.fail"
            :stats="data.stats"
            :attempt="data.row"
            :success="data.success"
            :fail="data.fail"
            :statisticsButtonClicked="data.statisticsButtonClicked"
            :shareableTiles="data.shareableTiles"
          /> </Modal
      ></transition>
    </div>
    <Keyboard :keyClass="data.keyClasses" @key-event="onKeyEvent" />
  </div>
</template>

<script setup>
import { defineProps, reactive, computed, ref, onMounted, watch } from "vue";
import { library, words } from "@/data/library";

const rowRefs = ref([]);
const tileRefs = ref([]);

const props = defineProps({
  info: {
    type: Boolean,
    default: false,
  },
  statistics: {
    type: Boolean,
    default: false,
  },
});

const data = reactive({
  library: library,
  baseWord: "",
  word: [],
  guess: "",
  shareableTiles: "",
  inputValue: "",
  row: 1,
  tiles: [],
  instance: 0,
  keyClasses: [],
  modalOpen: false,
  modalContent: "",
  modalComponent: {},
  success: false,
  fail: false,
  stats: {},
  infoButtonClicked: false,
  statisticsButtonClicked: false,
});

const dictionary = computed(() => {
  return data.library.concat(words);
});

const notInDictionary = computed(() => {
  return data.guess.length === 5 && !dictionary.value.includes(data.guess);
});

const getLetter = (row, tile) => {
  let letter = "";
  if (data.tiles[row - 1]) {
    letter = data.tiles[row - 1][tile - 1];
  }
  return letter;
};

const splitWord = (string) => {
  return string.split("");
};

const getWord = () => {
  data.baseWord = data.library[Math.floor(Math.random() * data.library.length)];
  data.word = splitWord(data.baseWord);
  console.log(data.baseWord);
};

const onReset = () => {
  data.inputValue = "";
  data.row = 1;
  data.tiles = [];
  data.guess = "";
  data.instance = data.instance + 1;
  data.modalContent = "";
  data.success = false;
  data.fail = false;
  data.keyClasses = [];
  data.stats = {};
  data.statisticsButtonClicked = false;
  data.shareableTiles = "";

  getWord();
  getStats();
};

const onKeyEvent = (key) => {
  if (data.guess.length === 5 && key === "Enter") {
    if (data.success) return;
    handleKeyEvent();
    onSubmit();
  } else if (data.guess.length !== 0 && key === "Backspace") {
    data.guess = data.guess.slice(0, -1);
    handleKeyEvent();
  } else if (key === "Reset") {
    onReset();
  } else if (data.guess.length === 5) {
    data.guess = data.guess.slice(0, -1);
    data.guess = data.guess + key;
    handleKeyEvent();
  } else if (key !== "Backspace" && key !== "Enter") {
    data.guess = data.guess + key;
    handleKeyEvent();
  }
};

const handleKeyEvent = () => {
  splitGuess();
  checkForBadWord();
};

const checkForBadWord = () => {
  const rowEl = rowRefs.value[`row${data.row}`];
  if (notInDictionary.value) {
    rowEl.classList.add("bad-word");
  } else {
    rowEl.classList.remove("bad-word");
    if (data.guess.length === 4) {
      rowEl.classList.add("bad-word-transition");
    } else {
      rowEl.classList.remove("bad-word-transition");
    }
  }
};

const splitGuess = () => {
  data.tiles[data.row - 1] = splitWord(data.guess);
};

const getMatches = () => {
  let matches = [];
  for (let i = 0; i < data.word.length; i++) {
    if (data.tiles[data.row - 1][i] === data.word[i]) {
      matches.push(data.tiles[data.row - 1][i]);
    }
  }
  return matches;
};

const getOccurance = (dataProp, letter) => {
  let occurance = 0;
  for (let j = 0; j < data.word.length; ++j) {
    if (dataProp[j] == letter) occurance++;
  }
  return occurance;
};

const setClasses = () => {
  const matches = getMatches();

  let presents = [];

  for (let i = 0; i < data.word.length; i++) {
    const tileLetter = data.tiles[data.row - 1][i];
    const tileEl = tileRefs.value[`row${data.row}-tile${i + 1}`];

    const occuranceInWord = getOccurance(data.word, tileLetter);
    const occuranceInMatches = getOccurance(matches, tileLetter);

    if (tileLetter === data.word[i]) {
      tileEl.classList.add("match");
      data.keyClasses = [
        ...data.keyClasses,
        { key: data.word[i], class: "match" },
      ];
    } else if (data.word.includes(tileLetter)) {
      presents.push(tileLetter);
      const occuranceInPresents = getOccurance(presents, tileLetter);

      if (occuranceInPresents + occuranceInMatches > occuranceInWord) {
        tileEl.classList.add("miss");
      } else {
        tileEl.classList.add("present");
        data.keyClasses = [
          ...data.keyClasses,
          { key: tileLetter, class: "present" },
        ];
      }
    } else {
      tileEl.classList.add("miss");
      data.keyClasses = [
        ...data.keyClasses,
        { key: tileLetter, class: "miss" },
      ];
    }
  }
};

const buildShareString = () => {
  let shareString =
    "Tyler's Wordle Game\nhttps://vue-wordle-tyleringersoll.netlify.app/\n";

  shareString += `The word was: ${data.baseWord}\n\n`;

  data.keyClasses.forEach((word, index) => {
    const className = word.class;

    if (className === "match") {
      shareString += "🟩";
    } else if (className === "miss") {
      shareString += "⬛";
    } else if (className === "present") {
      shareString += "🟨";
    }

    if ((index + 1) % 5 === 0) {
      shareString += "\n";
    }
  });

  data.shareableTiles = shareString;
};

const onSubmit = () => {
  if (data.row > 6) return;

  if (dictionary.value.includes(data.guess)) {
    setClasses();

    if (data.word.join("") === data.guess) {
      onSuccess();
    } else if (data.row === 6) {
      onFail();
    } else {
      data.row = data.row + 1;
      data.guess = "";
    }
  } else {
    rowRefs.value[`row${data.row}`].classList.add("oops");

    setTimeout(() => {
      rowRefs.value[`row${data.row}`].classList.remove("oops");
    }, 800);
  }
};

const onSuccess = () => {
  data.success = true;
  rowRefs.value[`row${data.row}`].classList.add("success");
  buildShareString();
  setStats();

  setTimeout(() => {
    data.modalOpen = true;
    data.keyClasses = [];
  }, 4000);
};

const onFail = () => {
  data.fail = true;
  rowRefs.value[`row${data.row}`].classList.add("failure");
  buildShareString();
  setStats();

  setTimeout(() => {
    data.modalOpen = true;
    data.keyClasses = [];
  }, 2400);
};

const onModalClose = () => {
  data.modalOpen = false;
  data.infoButtonClicked = false;
  data.statisticsButtonClicked = false;

  if (data.success || data.fail) {
    onReset();
  } else {
    data.guess = "";
  }
};

const getStats = () => {
  const statsJSON = window.localStorage.getItem("wordleStats");

  if (statsJSON) {
    data.stats = JSON.parse(statsJSON);
  } else {
    data.stats = {
      gamesPlayed: 0,
      totalWins: 0,
      winPercent: 0,
      currentStreak: 0,
      maxStreak: 0,
      guessDistribution: {
        guess1: 0,
        guess2: 0,
        guess3: 0,
        guess4: 0,
        guess5: 0,
        guess6: 0,
        guessX: 0,
      },
    };
  }
};

const setStats = () => {
  if (data.success) {
    data.stats.gamesPlayed++;
    data.stats.totalWins++;
    data.stats.currentStreak++;
    data.stats.maxStreak =
      data.stats.currentStreak >= data.stats.maxStreak
        ? data.stats.currentStreak
        : data.stats.maxStreak;
    data.stats.winPercent = (
      (data.stats.totalWins / data.stats.gamesPlayed) *
      100
    ).toFixed();
    data.stats.guessDistribution[`guess${data.row}`]++;

    window.localStorage.setItem("wordleStats", JSON.stringify(data.stats));
  } else {
    data.stats.gamesPlayed++;
    data.stats.currentStreak = 0;
    data.stats.winPercent = (
      (data.stats.totalWins / data.stats.gamesPlayed) *
      100
    ).toFixed();
    data.stats.guessDistribution["guessX"]++;

    window.localStorage.setItem("wordleStats", JSON.stringify(data.stats));
  }
};

onMounted(() => {
  getWord();
  getStats();
});

watch(
  () => props.statistics,
  () => {
    if (props.statistics === true && data.modalOpen === false) {
      data.modalOpen = true;
      data.statisticsButtonClicked = true;
    }
  }
);

watch(
  () => props.info,
  () => {
    if (props.info === true && data.modalOpen === false) {
      data.modalOpen = true;
      data.infoButtonClicked = true;
    }
  }
);
</script>

<style lang="scss">
.wordle {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.game-wrapper {
  max-width: 28rem;
  width: 100%;
  margin: 2rem auto 0.5rem;

  @media screen and (min-width: $md) {
    margin: 4rem auto 2rem;
  }
}

.highlight {
  text-transform: uppercase;
  font-weight: bold;
  color: $highlight1;
}

.modal-heading {
  margin-bottom: 2rem;

  &.description {
    margin-bottom: 0;
    padding-right: 2.15rem;
  }

  &-description {
    margin-bottom: 2rem;
  }
}

.row {
  display: flex;
  justify-content: center;
  gap: 0.375rem;
  margin: 0 6px 6px;

  &.oops {
    animation-name: shake;
    animation-duration: 0.125s;
    animation-iteration-count: 3;
  }
}

.tile {
  margin: 0; // 6px 0 0;
  max-width: 72px;
  width: 100%;
  height: 52px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2rem;
  line-height: 1;
  font-weight: bold;
  vertical-align: middle;
  box-sizing: border-box;
  text-transform: uppercase;
  user-select: none;
  border: 0;
  transition: background-color 0.5s ease-out;

  @media screen and (min-width: $md) {
    height: 62px;
  }

  @media screen and (max-height: 700px) {
    font-size: 1.2rem;
    height: 42px;
  }

  &.empty {
    border: 2px solid gray;
  }

  &.miss {
    border: 0;
    background-color: black;
  }

  &.present {
    border: 0;
    background-color: #b59f3b;
  }

  &.match {
    border: 0;
    background-color: #538d4e;
  }

  &-1 {
    transition-delay: 0;
  }

  &-2 {
    transition-delay: 0.25s;
  }

  &-3 {
    transition-delay: 0.5s;
  }

  &-4 {
    transition-delay: 0.75s;
  }

  &-5 {
    transition-delay: 1s;
  }
}

.success {
  .tile {
    animation: celebrate 0.25s linear 5;

    &-1 {
      animation-delay: 1.5s;
    }

    &-2 {
      animation-delay: 1.6s;
    }

    &-3 {
      animation-delay: 1.7s;
    }

    &-4 {
      animation-delay: 1.8s;
    }

    &-5 {
      animation-delay: 1.9s;
    }
  }
}

.failure .tile {
  background-color: #a52a2a;
  animation-name: shake;
  animation-duration: 0.125s;
  animation-iteration-count: 16;
}

.bad-word {
  .tile {
    background-color: #a52a2a;
    transition-delay: 0s;
  }
}

.bad-word-transition {
  .tile {
    transition-delay: 0s;
  }
}

@keyframes celebrate {
  0% {
    transform: translateY(0);
  }
  25% {
    border: 2px solid black;
    transform: translateY(-15px);
  }
  50% {
    transform: translateY(0);
  }
  75% {
    border: 2px solid black;
    transform: translateY(15px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-10px);
  }
  50% {
    transform: translateX(0);
  }
  75% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>

<style lang="scss">
.wordle {
  ul.no-list {
    list-style: none;
    padding-left: 0;

    li {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      margin-bottom: 1rem;

      .color {
        &-tile {
          height: 42px;
          font-size: 1.2rem;
          margin-right: 1rem;

          &-info {
            display: inline-block;
          }
        }
      }
    }
  }

  h2.secondary-heading {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
}
</style>
