const React = require('react');

function DateTimePicker(props) {
  return React.createElement('mock-datetime-picker', { ...props, testID: 'mock-datetime-picker' });
}

module.exports = { __esModule: true, default: DateTimePicker, DateTimePicker };