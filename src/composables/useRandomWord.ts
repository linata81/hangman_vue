import { onMounted, ref } from 'vue';
import { getRandomName } from '../api/gerRandomName';

export const useRandomWord = () => {
  const word = ref('');
  const getRandomWord = async () => {
    try {
      const name = await getRandomName();
      word.value = name.toLowerCase();
    } catch (error) {
      console.log(error);
      word.value = '';
    }
  }
  
  onMounted(() => {
    getRandomWord();    
  })
  
  return {
    word,
    getRandomWord
  }
}