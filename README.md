[npm-image]: https://img.shields.io/npm/v/date-time-js.svg
[npm-url]: https://npmjs.org/package/date-time-js
[downloads-image]: https://img.shields.io/npm/dm/date-time-js.svg

# DateTimeJS

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][npm-url]

## Overview

A lightweight TypeScript library which parses, formats and manipulates dates in various cultures.

## Download
Download it using npm:

`npm install date-time-js --save`

## Getting started
For TypeScript projects:  
`import { DateTime } from 'date-time-js';`

For JavaScript projects:  
`<script src="node_modules/source/date-time.js"></script>`

## Usage

### Parsing

Supports cultures: en-GB, en-US, ru-RU, uk-UA.

    new DateTime('7')                    // '2015-02-07T00:00:00Z' (Takes a current year and month)
    new DateTime('1/7')                  // '2015-07-01T00:00:00Z' (Takes a current year)
    new DateTime('1/7/87')               // '1987-07-01T00:00:00Z'
    new DateTime('010787')               // '1987-07-01T00:00:00Z'
    new DateTime('1/7/15')               // '2015-07-01T00:00:00Z'
    new DateTime('1/7/1987')             // '1987-07-01T00:00:00Z'
    new DateTime('1.7.1987')             // '1987-07-01T00:00:00Z'
    new DateTime('1-7-1987')             // '1987-07-01T00:00:00Z'
    new DateTime('1 7 1987')             // '1987-07-01T00:00:00Z'
    new DateTime('01071987')             // '1987-07-01T00:00:00Z'
    
    new DateTime('2015/1/7', 'en-GB')    // '2015-07-01T00:00:00Z'
    new DateTime('2015/1/7', 'en-US')    // '2015-01-07T00:00:00Z'
    
    new DateTime('21 Feb 15')            // '2015-02-21T00:00:00Z'
    new DateTime('21 February 15')       // '2015-02-21T00:00:00Z'
    new DateTime('21 February 2015')     // '2015-02-21T00:00:00Z'
    new DateTime('2015 February 21')     // '2015-02-21T00:00:00Z'
    
    new DateTime('21 фев 15')            // '2015-02-21T00:00:00Z'
    new DateTime('21 фев 2015')          // '2015-02-21T00:00:00Z'
    new DateTime('21 февраль 15')        // '2015-02-21T00:00:00Z'
    new DateTime('21 февраля 15')        // '2015-02-21T00:00:00Z'
    new DateTime('21 февраль 2015')      // '2015-02-21T00:00:00Z'
    new DateTime('2015 февраль 21')      // '2015-02-21T00:00:00Z'
    
    new DateTime('21 лют 15')            // '2015-02-21T00:00:00Z'
    new DateTime('21 лютий 15')          // '2015-02-21T00:00:00Z'
    
    new DateTime('Feb 21, 15')           // '2015-02-21T00:00:00Z'
    new DateTime('Feb21,15')             // '2015-02-21T00:00:00Z'
    new DateTime('Feb 21, 2015')         // '2015-02-21T00:00:00Z'
    new DateTime('Feb21,2015')           // '2015-02-21T00:00:00Z'
    
    new DateTime('1987-07-01T00:00:00Z') // '1987-07-01T00:00:00Z'

### Manipulation

**Addition**

    new DateTime('2015-02-21T10:45:30.000Z').add(2, 'millisecond')      // '2015-02-21T10:45:30.002Z'
    new DateTime('2015-02-21T10:45:30Z').add(2, 'second')               // '2015-02-21T10:45:32Z'
    new DateTime('2015-02-21T10:45:30Z').add(2, 'minute')               // '2015-02-21T10:47:30Z'
    new DateTime('2015-02-21T10:45:30Z').add(2, 'hour')                 // '2015-02-21T12:45:30Z'
    new DateTime('2015-02-21T10:45:30Z').add(2, 'day')                  // '2015-02-23T10:45:30Z'
    new DateTime('2015-02-21T10:45:30Z').add(2, 'month')                // '2015-04-21T10:45:30Z'
    new DateTime('2015-02-21T10:45:30Z').add(2, 'year')                 // '2017-02-21T10:45:30Z'

**Subtraction**

    new DateTime('2015-02-21T10:45:30.500Z').subtract(2, 'millisecond') // '2015-02-21T10:45:30.498Z'
    new DateTime('2015-02-21T10:45:30Z').subtract(2, 'second')          // '2015-02-21T10:45:28Z'
    new DateTime('2015-02-21T10:45:30Z').subtract(2, 'minute')          // '2015-02-21T10:43:30Z'
    new DateTime('2015-02-21T10:45:30Z').subtract(2, 'hour')            // '2015-02-21T08:45:30Z'
    new DateTime('2015-02-21T10:45:30Z').subtract(2, 'day')             // '2015-02-19T10:45:30Z'
    new DateTime('2015-02-21T10:45:30Z').subtract(1, 'month')           // '2015-01-21T10:45:30Z'
    new DateTime('2015-02-21T10:45:30Z').subtract(2, 'year')            // '2013-02-21T10:45:30Z'
    
**Start of time**

    new DateTime('2015-02-21T10:45:35.500Z').startOf('second')          // '2015-02-21T10:45:35.000Z'
    new DateTime('2015-02-21T10:45:35.500Z').startOf('minute')          // '2015-02-21T10:45:00.000Z'
    new DateTime('2015-02-21T10:45:35.500Z').startOf('hour')            // '2015-02-21T10:00:00.000Z'
    new DateTime('2015-02-21T10:45:35.500Z').startOf('day')             // '2015-02-21T00:00:00.000Z'
    new DateTime('2015-02-21T10:45:35.500Z').startOf('month')           // '2015-02-01T00:00:00.000Z'
    new DateTime('2015-02-21T10:45:35.500Z').startOf('year')            // '2015-01-01T00:00:00.000Z'

**End of time**

    new DateTime('2015-01-01T00:00:00.000Z').endOf('second')            // '2015-01-01T00:00:00.999Z'
    new DateTime('2015-01-01T00:00:00.000Z').endOf('minute')            // '2015-01-01T00:00:59.999Z'
    new DateTime('2015-01-01T00:00:00.000Z').endOf('hour')              // '2015-01-01T00:59:59.999Z'
    new DateTime('2015-01-01T00:00:00.000Z').endOf('day')               // '2015-01-01T23:59:59.999Z'
    new DateTime('2015-01-01T00:00:00.000Z').endOf('month')             // '2015-01-31T23:59:59.999Z'
    new DateTime('2015-01-01T00:00:00.000Z').endOf('year')              // '2015-12-31T23:59:59.999Z'

**Getting and setting**
    
    new DateTime('2015-02-21T10:45:30.500Z').millisecond()               // 500
    new DateTime('2015-02-21T10:45:30.000Z').millisecond(10)             // '2015-02-21T10:45:30.010Z'
    
    new DateTime('2015-02-21T10:45:30Z').second()                        // 30
    new DateTime('2015-02-21T10:45:30Z').second(10)                      // '2015-02-21T10:45:10Z'
    
    new DateTime('2015-02-21T10:45:00Z').minute()                        // 45
    new DateTime('2015-02-21T10:45:30Z').minute(10)                      // '2015-02-21T10:10:30Z'
    
    new DateTime('2015-02-21T10:45:00Z').hour()                          // 10
    new DateTime('2015-02-21T10:45:30Z').hour(20)                        // '2015-02-21T20:45:30Z'
    
    new DateTime('2015-02-21T10:45:00Z').date()                          // 21
    new DateTime('2015-02-21T10:45:30Z').date(25)                        // '2015-02-25T10:45:30Z'
    
    new DateTime('2015-02-21T10:45:00Z').month()                         // 1
    new DateTime('2015-02-21T10:45:30Z').month(3)                        // '2015-04-21T10:45:30Z'
    
    new DateTime('2015-02-21T10:45:00Z').year()                          // 2015
    new DateTime('2015-02-21T10:45:30Z').year(2010)                      // '2010-02-21T10:45:30Z'
    
    new DateTime('2015-02-21T10:45:00-03:00').offset()                   // -180
    new DateTime('2015-02-21T10:45:30Z').offset(-180)                    // '2015-02-21T10:45:00-03:00'  

**Chaining**

    let formattedDate = new DateTime('2015-02-21T10:45:30Z')
        .millisecond(10)
        .second(10)
        .minute(10)
        .hour(20)
        .date(25)
        .month(3)
        .year(2010)
        .add(2, 'millisecond')
        .subtract(3, 'millisecond')
        .offset(-180)
        .format('yyyy-MM-ddTHH:mm:ss.fffK');    // '2010-04-25T20:10:10.009-03:00'

**Copying**
    
    let date = new DateTime('2015-02-21T10:45:00Z');
    let dateCopy = date.copy();
    
### Comparison

    new DateTime('2016-09-26T00:00:00Z').difference('2016-09-26T00:00:01Z')                        // -1000
    new DateTime('2016-09-26T00:00:00Z').isEqual('2016-09-26T00:00:00Z')                           // true
    new DateTime('2016-09-26T00:00:00Z').isLess('2016-09-26T00:00:00Z')                            // false
    new DateTime('2016-09-26T00:00:00Z').isLessOrEqual('2016-09-26T00:00:01Z')                     // true
    new DateTime('2016-09-26T00:00:00Z').isGreater('2016-09-26T00:00:00Z')                         // false
    new DateTime('2016-09-26T00:00:00Z').isGreaterOrEqual('2016-09-26T00:00:00Z')                  // true
    new DateTime('2016-08-15T00:00:00Z').isBetween('2016-08-01T00:00:00Z', '2016-09-01T00:00:00Z') // true

### Formatting

    new DateTime('1/7/1987').format()            // '1987-07-01T00:00:00Z'
    new DateTime('1/7/1987').format('yyyy-M-dd') // '1987-7-01'
    
**Standard date and time format specifiers**

| Format specifier | Description | Examples |
| :---- | :---- | :---- |
| f | The milliseconds, from 0 to 9. | 2015-02-01T03:05:09.4Z -> 4 |
| ff | The milliseconds, from 00 to 99. | 2015-02-01T03:05:09.49Z -> 49 |
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

### Miscellaneous
    
    new DateTime()                                    // Today
    DateTime.createEmpty().isEmpty()                  // true

    new DateTime('2016-09-26T00:00:00Z').isUtc()      // true
    new DateTime('2016-09-26T00:00:00+01:00').isUtc() // false
    new DateTime('2015-02-21T20:45:00+04:00').toUtc() // '2015-02-21T16:45:00Z'
    
    DateTime.parseTimeZone('Z')                       // 0
    DateTime.parseTimeZone('+01:00')                  // 60
    DateTime.parseTimeZone('-01:00')                  // -60
    
    DateTime.formatTimeZone(0)                        // 'Z'
    DateTime.formatTimeZone(60)                       // '+01:00'
    DateTime.formatTimeZone(-60)                      // '-01:00'
    
    DateTime.isDateTime(null)                         // false
    DateTime.isDateTime(new DateTime())               // true
    
    DateTime.isDate(new Date())                       // true
    DateTime.isDate('2015-02-21')                     // false

## Development

1. Install dependencies.  
`npm install`
2. Run the project.  
`gulp`

## Testing
`gulp test`
