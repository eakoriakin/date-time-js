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
    
**Standard Date and Time Format Specifiers**

| Format | Description | Example |
| :---- | :---- | :---- |
| fff | Millisecond between 0-999 with leading zeros. | "0" to "999" |
| s | Second between 0-59. | "0" to "59" |
| ss | Second with leading zero. | "00" to "59" | 
| m | Minute between 0-59. | "0"  or "59" | 
| mm | Minute with leading zero. | "00" or "59" | 
| HH | Hour between 0-23 with leading zero. | "00" to "23" | 
| d | Day between 1 and 31. | "1"  to "31" | 
| dd | Day with leading zero. | "01" to "31" | 
| ddd | Short day name. | "Mon" to "Sun" |  
| dddd | Full day name. | "Monday" to "Sunday" | 
| M | Month between 1-12. | "1" to "12" | 
| MM | Month with leading zero. | "01" to "12" | 
| MMM | Short month name. | "Jan" to "Dec" | 
| MMMM | Full month name. | "January" to "December" | 
| yy | Two-digit year. | "87" or "15" | 
| yyyy | Four-digit year. | "1987" or "2015" | 
    
