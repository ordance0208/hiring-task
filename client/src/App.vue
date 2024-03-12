<template>
  <AudioRecorder
    v-if="recorder"
    :id="1"
    :recordingId="recordingId"
    :audio="firstAudio"
    @startRecording="startRecording"
    @stopRecording="stopRecording"
  />
  <AudioRecorder
    v-if="recorder"
    :id="2"
    :recordingId="recordingId"
    :audio="secondAudio"
    @startRecording="startRecording"
    @stopRecording="stopRecording"
  />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import AudioRecorder from './components/AudioRecorder.vue';
import './assets/style.css';

const audioStream = ref(null);
const recorder = ref(null);

const recordingId = ref(null);
const recordedAudio = ref([]);

const firstAudio = ref(null);
const secondAudio = ref(null);

const startRecording = (id) => {
  recorder.value.start();
  recordingId.value = id;
};

const stopRecording = () => {
  recorder.value.stop();
};

onMounted(async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioStream.value = stream;
    recorder.value = new MediaRecorder(stream);
    recorder.value.ondataavailable = (e) => {
      recordedAudio.value.push(e.data);
    };
    recorder.value.onstop = saveFile;
    console.log('User granted audio stream access!');
  } catch (err) {
    console.log(
      `An error occurred while trying to access user media: ${err.message}`
    );
  }
});

const saveFile = () => {  
  const file = new File(recordedAudio.value, `recording${recordingId.value}`, {
    type: 'audio/mp3; codecs=opus',
  });

  if(recordingId.value === 1) {
    firstAudio.value = file;
  } else {
    secondAudio.value = file;
  }
  
  recordingId.value = null;

  // const anchor = document.createElement('a');

  // const url = URL.createObjectURL(file);

  // anchor.href = url;
  // anchor.download = file.name;
  // document.body.appendChild(anchor);
  // anchor.click();
  // document.body.removeChild(anchor);

  // recordedAudio.value = [];
};
</script>
