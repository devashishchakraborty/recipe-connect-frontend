const getImgUrlLength = (text) => {
  const regex = /!\[.*\]\(.+?\)/;
  const match = text.match(regex); // Get first match
  // const match = null
  return match ? match[0].length : 0; // Return its length or 0 if no match
}

const clipText = (text) => {
  if (text.length <= 150) return text;
  const imgLength = getImgUrlLength(text.slice(0, 150));
  const breakIndex = text.slice(150 + imgLength).search(/\n/);

  return text.slice(0, 150 + imgLength + breakIndex) + "... **Read More**";
};

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toDateString();
};

export { clipText, formatTimestamp };
