import api from '../apiconfig';

export const combineAudio = (formData) =>
  api
    .post('/audio/combine', formData, { responseType: 'blob' })
    .then((res) => res.data);
