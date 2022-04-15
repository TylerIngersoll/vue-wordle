<template>
  <div class="wordle-stats">
    <h2>Statistics</h2>
    <ul class="stats">
      <li class="col">
        <span class="stat" v-html="props.stats.gamesPlayed" />
        <span class="label">Played</span>
      </li>
      <li class="col">
        <span class="stat" v-html="props.stats.winPercent" />
        <span class="label">Win %</span>
      </li>
      <li class="col">
        <span class="stat" v-html="props.stats.currentStreak" />
        <span class="label">Current Streak</span>
      </li>
      <li class="col">
        <span class="stat" v-html="props.stats.maxStreak" />
        <span class="label">Max Streak</span>
      </li>
    </ul>

    <h2>Guess distribution</h2>
    <div class="guess-share-container">
      <div class="guess-distribution">
        <div
          v-for="(guess, index) in props.stats.guessDistribution"
          :class="['guess', distributionClass(index)]"
          :key="index"
        >
          <span class="attempts" v-html="index.replace('guess', '')" />
          <span class="bar-container">
            <span
              v-if="guess > 0"
              class="bar"
              :style="`width: ${getWidth(guess)}%`"
              >{{ guess }}</span
            >
          </span>
        </div>
      </div>

      <!-- <button
        class="share-button"
        type="button"
        title="Share your attempt"
        aria-label="Click this button to share your attempt!"
        @click="onShare"
        v-html="shareIcon"
      /> -->
    </div>
    <!-- <br /><br />
    <button type="button" @click="onClearStats">
      Clear stats (debug tool)
    </button> -->
  </div>
</template>

<script setup>
import { defineProps, reactive, onMounted } from "vue";

// const shareIcon =
//   '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" enable-background="new 0 0 50 50"><path d="M30.3 13.7L25 8.4l-5.3 5.3-1.4-1.4L25 5.6l6.7 6.7z"/><path d="M24 7h2v21h-2z"/><path d="M35 40H15c-1.7 0-3-1.3-3-3V19c0-1.7 1.3-3 3-3h7v2h-7c-.6 0-1 .4-1 1v18c0 .6.4 1 1 1h20c.6 0 1-.4 1-1V19c0-.6-.4-1-1-1h-7v-2h7c1.7 0 3 1.3 3 3v18c0 1.7-1.3 3-3 3z"/></svg>';

const props = defineProps({
  stats: {
    type: Object,
    default: () => {},
  },
  attempt: {
    type: Number,
    default: -1,
  },
  success: {
    type: Boolean,
    default: false,
  },
  statisticsButtonClicked: {
    type: Boolean,
    default: false,
  },
  shareableTiles: {
    type: String,
  },
});

const distributionClass = (index) => {
  let className = null;

  if (isNaN(Number(index.replace("guess", ""))) && !props.success) {
    className = "fails";
  } else if (props.statisticsButtonClicked) {
    className = null;
  } else {
    className =
      props.attempt === Number(index.replace("guess", "")) ? "current" : null;
  }
  return className;
};

const wordle = reactive({
  largestDist: 0,
});

const getWidth = (guess) => {
  return (guess / wordle.largestDist) * 100;
};

// const onShare = () => {
//   const shareText = props.shareableTiles;

//   alert(navigator.canShare());

//   !(navigator.userAgent.toLowerCase().indexOf("firefox") > -1) &&
//   navigator.canShare &&
//   navigator.canShare(shareText)
//     ? navigator.share(shareText)
//     : navigator.clipboard.writeText(props.shareableTiles);
// };

// const onClearStats = () => {
//   window.localStorage.clear();
// };

onMounted(() => {
  const obj = props.stats.guessDistribution;
  wordle.largestDist = 0;

  for (const el in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(el)) {
      wordle.largestDist =
        obj[el] > wordle.largestDist ? obj[el] : wordle.largestDist;
    }
  }
});
</script>

<style lang="scss" scoped>
.wordle-stats {
  position: relative;
}

h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.stats {
  list-style: none;
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0 0 2rem;
}

.col {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.stat {
  display: block;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  line-height: 1;

  @media screen and (min-width: 376px) {
    font-size: 1.5rem;
  }
}

.label {
  text-align: center;
  font-size: 0.6rem;
  line-height: 1;

  @media screen and (min-width: 376px) {
    font-size: 0.8rem;
  }
}

.guess {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0;
}

.attempts {
  font-size: 1rem;
  font-weight: bold;
  padding: 0 0.4rem 0 0;
}

.bar {
  height: 1.35rem;
  background-color: gray;
  padding: 0 0.5rem;
  line-height: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.8rem;

  .current & {
    background-color: #538d4e;
  }

  .fails & {
    background-color: #a52a2a;
  }

  &-container {
    display: flex;
    justify-content: flex-start;
    width: 100%;
  }
}

.value {
  padding: 0.5rem 0;
}

/* .guess-share-container {
  display: flex;
  flex-direction: row;
  align-items: center;
} */

/* .guess-distribution {
  flex: 2;
  padding-right: 1rem;
  border-right: 1px solid white;

  @media screen and (min-width: $md) {
    flex: 3;
  }
} */

/* button.share-button {
  display: flex;
  justify-content: flex-end;
  flex: 1;
  height: 100%;
  padding: 0;
  width: 4rem;
  height: 4rem;
  border: 0;
  outline: 0;
  background: transparent;

  &:hover {
    cursor: pointer;
  }

  &:focus-visible {
    outline-offset: 0.3rem;
    outline-color: $highlight5;
    outline-width: 0.2rem;
    outline-style: solid;
    border-radius: 50%;
  }
} */
</style>

<style lang="scss">
/* .share-button {
  svg {
    width: 4rem;
    height: 4rem;
    fill: white;
  }

  &:hover {
    svg {
      fill: $highlight1;
    }
  }
} */
</style>
