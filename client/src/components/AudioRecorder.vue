<template>
  <div class="audio-recorder">
    <button :disabled="disabled" @click="startRecording">
      Record Audio {{ id }}
    </button>
    <button
      class="secondary-button"
      :disabled="disabledStopButton"
      @click="stopRecording"
    >
      Stop recording
    </button>
    <p>{{ audio && audio.name }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const emit = defineEmits(['startRecording', 'stopRecording']);

const props = defineProps({
  id: Number,
  recordingId: Number,
  audio: Object,
});

const disabled = computed(
  () =>
    props.recordingId === props.id ||
    (props.recordingId !== null && props.recordingId !== props.id) ||
    props.audio
);

const disabledStopButton = computed(
  () =>
    props.recordingId === null ||
    (props.recordingId !== null && props.recordingId !== props.id)
);

const startRecording = () => {
  emit('startRecording', props.id);
};

const stopRecording = () => {
  emit('stopRecording');
};
</script>
