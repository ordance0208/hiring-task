<template>
  <div class="audio-recorder">
    <button :disabled="startRecordingDisabled" @click="handleStartRecording">
      Record Audio {{ id }}
    </button>
    <button
      class="secondary-button"
      :disabled="stopRecordingDisabled"
      @click="handleStopRecording"
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

const startRecordingDisabled = computed(
  () =>
    props.recordingId === props.id ||
    (props.recordingId !== null && props.recordingId !== props.id) ||
    props.audio
);

const stopRecordingDisabled = computed(
  () =>
    props.recordingId === null ||
    (props.recordingId !== null && props.recordingId !== props.id)
);

const handleStartRecording = () => {
  emit('startRecording', props.id);
};

const handleStopRecording = () => {
  emit('stopRecording');
};
</script>
