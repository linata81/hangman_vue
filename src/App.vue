<script setup lang="ts">
import GameFigure from './components/GameFigure.vue';
import GameHeader from './components/GameHeader.vue';
import GameWrongLetters from './components/GameWrongLetters.vue';
import GameWord from './components/GameWord.vue';
import GamePopup from './components/GamePopup.vue';
import GameNotification from './components/GameNotification.vue';
import { ref, watch } from 'vue';
import { useRandomWord } from './composables/useRandomWord';
import { useLetters } from './composables/useLetters';

const {word, getRandomWord} = useRandomWord();
const {letters, correctLetters, wrongLetters, isLose, isWin, addLetter} = useLetters(word);

const notification = ref<InstanceType<typeof GameNotification> | null>(null);
const popup = ref<InstanceType<typeof GamePopup> | null>(null);
  
watch(wrongLetters, () => {
  if(isLose.value) {
    popup.value?.open('lose');
  }
})
  
watch(correctLetters, () => {
  if(isWin.value) {
    popup.value?.open('win');    
  }
})
  

window.addEventListener('keydown', ({key}) => {
  if(isLose.value || isWin.value) {
    return
  }
  
  //проверка на задвоение букв
  if(letters.value.includes(key)) {
    notification.value?.open();
    setTimeout(() => notification.value?.close(), 2000);
    return
  }
  
  addLetter(key);
})

const restart = async () => {
  await getRandomWord();
  letters.value = [];
  popup.value?.close();
}
</script>

<template>
  <GameHeader/>
  <div class="game-container">
    <GameFigure :wrong-letters-count="wrongLetters.length"/>
    <GameWrongLetters :wrong-letters="wrongLetters"/>
    <GameWord :word="word" :correct-letters="correctLetters"/>
  </div>

  <GamePopup ref="popup" :word="word" @restart="restart"/>
  <GameNotification ref="notification"/>
</template>