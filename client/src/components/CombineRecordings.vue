<template>
  <div class="combine-recordings">
    <div>
      <button @click="handleCombineAudio" :disabled="combineAudioDisabled">
        Combine
      </button>
    </div>
    <div>
      <button @click="handlePlayCombinedAudio" :disabled="!combinedAudio">
        Play Combined Audio
      </button>
    </div>
    <audio ref="audioElement"></audio>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { combineAudio } from '../endpoints/audio';

const props = defineProps({
  firstAudio: Object,
  secondAudio: Object,
});

const loading = ref(false);
const combinedAudio = ref(null);
const audioElement = ref(null);
const combineAudioDisabled = computed(
  () =>
    !props.firstAudio ||
    !props.secondAudio ||
    combinedAudio.value ||
    loading.value
);

const handlePlayCombinedAudio = () => {
  if (audioElement.value.paused) {
    audioElement.value.src = combinedAudio.value;
    audioElement.value.play();
  }
};

const handleCombineAudio = async () => {
  const formData = new FormData();

  formData.append('audio1', props.firstAudio);
  formData.append('audio2', props.secondAudio);
  try {
    loading.value = true;
    const data = await combineAudio(formData);

    const url = URL.createObjectURL(data);
    combinedAudio.value = url;
  } catch (err) {
  } finally {
    loading.value = false;
  }
};
</script>
