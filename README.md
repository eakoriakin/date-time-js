[npm-image]: https://img.shields.io/npm/v/date-time-js.svg
[npm-url]: https://npmjs.org/package/date-time-js
[downloads-image]: https://img.shields.io/npm/dm/date-time-js.svg

# DateTimeJS

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][npm-url]

## Download
Download it using npm:

`npm install date-time-js --save`

## Getting started

`<script src="node_modules/date-time-js/dist/date-time.min.js"></script>`

## Development

1. `npm install`
2. `gulp`

## Testing

`gulp test`

## Usage

### Parsing

Supports cultures: en-GB, en-US, ru-RU, uk-UA.

    DateTime.parse('7').format()                 // '2015-02-07T00:00:00Z' (Current year is 2015 and month is February)
    DateTime.parse('1/7').format()               // '2015-07-01T00:00:00Z' (Current year is 2015)
    DateTime.parse('1/7/87').format()            // '1987-07-01T00:00:00Z'
    DateTime.parse('1/7/1987').format()          // '1987-07-01T00:00:00Z'
    
    DateTime.parse('2015/1/7', 'en-GB').format() // '2015-07-01T00:00:00Z'
    DateTime.parse('2015/1/7', 'en-US').format() // '2015-01-07T00:00:00Z'
    
    DateTime.parse('21 Feb 15').format()         // '2015-02-21T00:00:00Z'
    DateTime.parse('21 Фев 15').format()         // '2015-02-21T00:00:00Z'
    DateTime.parse('21 Лют 15').format()         // '2015-02-21T00:00:00Z'
    
    DateTime.parse('21 February 15').format()    // '2015-02-21T00:00:00Z'
    DateTime.parse('21 Февраль 15').format()     // '2015-02-21T00:00:00Z'
    DateTime.parse('21 Лютий 15').format()       // '2015-02-21T00:00:00Z'
    
    DateTime.parse('Feb 21, 15').format()        // '2015-02-21T00:00:00Z'
    
### Formatting

    DateTime.parse('1/7/1987').format()            // '1987-07-01T00:00:00Z'
    DateTime.parse('1/7/1987').format('yyyy-M-dd') // '1987-7-01'
    
**Standard date and time format specifiers**

| Format specifier | Description | Examples |
| :---- | :---- | :---- |
| fff | The milliseconds, from 000 to 999. | 2015-02-01T03:05:09.499Z -> 499 |
| s | The second, from 0 through 59. | 2015-02-01T03:05:09Z -> 9<br/>2015-02-21T13:45:30Z -> 30 |
| ss | The second, from 00 through 59. | 2015-02-01T03:05:09Z -> 09<br/>2015-02-21T13:45:30Z -> 30 | 
| m | The minute, from 0 through 59. | 2015-02-01T03:05:30Z -> 5<br/>2015-02-21T13:45:30Z -> 45 | 
| mm | The minute, from 00 through 59. | 2015-02-01T03:05:30Z -> 05<br/>2015-02-21T13:45:30Z -> 45 | 
| HH | The hour, using a 24-hour clock from 00 to 23. | 2015-02-01T03:45:30Z -> 03<br/>2015-02-21T13:45:30Z -> 13 | 
| d | The day of the month, from 1 through 31. | 2015-02-01T13:45:30Z -> 1<br/>2015-02-21T13:45:30Z -> 21 | 
| dd | The day of the month, from 01 through 31. | 2015-02-01T13:45:30Z -> 01<br/>2015-02-21T13:45:30Z -> 21 | 
| ddd | The abbreviated name of the day of the week. | 2015-02-21T13:45:30Z -> Mon (en-US)<br/>2015-02-21T13:45:30Z -> пн (ru-RU) |  
| dddd | The full name of the day of the week. | 2015-02-21T13:45:30Z -> Monday (en-US)<br/>2015-02-21T13:45:30Z -> понедельник (ru-RU) | 
| M | The month, from 1 through 12. | 2015-02-21T13:45:30Z -> 2 | 
| MM | The month, from 01 through 12. | 2015-02-21T13:45:30Z -> 02 | 
| MMM | The abbreviated name of the month. | 2015-02-21T13:45:30Z -> Feb (en-US)<br/>2015-02-21T13:45:30Z -> фев (ru-RU) | 
| MMMM | The full name of the month. | 2015-02-21T13:45:30Z -> February (en-US)<br/>2015-02-21T13:45:30Z -> февраль (ru-RU) | 
| yy | The year, from 00 to 99. | 1987-02-21T13:45:30Z -> 87<br/>2015-02-21T13:45:30Z -> 15<br/>2000-02-21T13:45:30Z -> 00 | 
| yyyy | The year as a four-digit number. | 1987-02-21T13:45:30Z -> 1987<br/>2015-02-21T13:45:30Z -> 2015<br/>2000-02-21T13:45:30Z -> 2000 | 
| K | Time zone information. | 2015-02-21T13:45:30Z -> Z<br/>2015-02-21T13:45:30-07:00 -> -07:00 | 
    
