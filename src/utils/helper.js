const elapsedTimeToString = (elapsedTime, startedFrom) => {
  let newElapsedTime = elapsedTime;
  if (startedFrom) {
    newElapsedTime += Date.now() - startedFrom;
  }
  const seconds = Math.floor((newElapsedTime / 1000) % 60);
  const minutes = Math.floor((newElapsedTime / 1000 / 60) % 60);
  const hours = Math.floor(newElapsedTime / 1000 / 60 / 60);
  return `${hours}h ${minutes}m ${seconds}s`;
};

const getTimers = (url, success) => {
  return fetch(url, {
    headers: {
      'Accept': 'application/json'
    }
  }).then(parseJSON)
    .then(success);
};

const startTimer = (url, data) => {
  return fetch(url, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
};

const stopTimer = (url, data) => {
  return fetch(url, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
};

const parseJSON = (res) => {
  return res.json();
};

export default {
  elapsedTimeToString,
  getTimers,
  startTimer,
  stopTimer
};