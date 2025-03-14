const clipText = (text) => {
  if (text.length <= 170) return text;
  const breakIndex = text.slice(170).search(/\n/);
  return text.slice(0, 170 + breakIndex) + "... **Read More**";
};

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toDateString();
};

export { clipText, formatTimestamp };
