<template>
  <aside class="wordle-stats">
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

    <button type="button" @click="onShare">Share</button>
    <button type="button" @click="onClearStats">Clear stats</button>
  </aside>
</template>

<script setup>
import { defineProps, reactive, onMounted } from "vue";

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

  if (isNaN(Number(index.replace("guess", "")))) {
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

const onShare = () => {
  console.log(props.shareableTiles);
};

const onClearStats = () => {
  window.localStorage.clear();
};

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
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1;
}

.label {
  text-align: center;
  font-size: 0.8rem;
  line-height: 1;
}

.guess {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0;
  /* padding: 0 0.25rem 0 0; */
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
</style>
