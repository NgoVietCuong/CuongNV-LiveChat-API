function getRandomAvatar() {
  const colorArray = ['#FC8181', '#F6AD55', '#68D391', '#63B3ED', '#76E4F7', '#B794F4', '#F687B3'];
  const randomIndex = Math.floor(Math.random() * colorArray.length);
  return colorArray[randomIndex];
}

module.exports = {
  getRandomAvatar
}