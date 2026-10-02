const React = require('react');

function Svg(props) {
  return React.createElement('MockSvg', props);
}

function Path(props) {
  return React.createElement('MockPath', props);
}

module.exports = { __esModule: true, default: Svg, Svg, Path };