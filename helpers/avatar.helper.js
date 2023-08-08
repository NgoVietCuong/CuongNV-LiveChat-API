function getRandomAvatar() {
  const colorArray = ['#A0AEC0', '#FC8181', '#F6AD55', '#68D391', '#63B3ED', '#76E4F7', '#B794F4', '#F687B3', '#4FD1C5'];
  const randomIndex = Math.floor(Math.random() * colorArray.length);
  return colorArray[randomIndex];
}

module.exports = {
  getRandomAvatar
}