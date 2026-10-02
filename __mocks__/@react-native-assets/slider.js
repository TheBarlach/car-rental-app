const React = require('react');

function Slider(props) {
  return React.createElement('MockSlider', props);
}

function RangeSlider(props) {
  return React.createElement('MockRangeSlider', props);
}

module.exports = { __esModule: true, default: Slider, Slider, RangeSlider };
