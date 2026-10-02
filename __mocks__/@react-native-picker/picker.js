const React = require('react');

function Item(props) {
  return React.createElement('MockPickerItem', props);
}

function Picker(props) {
  return React.createElement('MockPicker', props);
}

Picker.Item = Item;

module.exports = { Picker, Item, default: Picker };