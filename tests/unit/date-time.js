describe('DateTime', function() {
    var DateTime = window.DateTime,
        currentDate = new Date(),
        currentYear = currentDate.getFullYear();

    describe('constructor', function() {
        it('creates empty instance if passed date is incorrect', function() {
            expect(new DateTime(undefined).isEmpty()).toEqual(true);
            expect(new DateTime(null).isEmpty()).toEqual(true);
            expect(new DateTime(true).isEmpty()).toEqual(true);
        });

        it('uses current date if date is not passed', function() {
            var date = new DateTime();
            expect(date.isEqual(new Date())).toEqual(true);
        });

        it('uses date string', function() {
            expect(new DateTime('1 7 87').format()).toEqual('1987-07-01T00:00:00Z');
        });

        it('uses date string and culture', function() {
            expect(new DateTime('1 7 87', 'en-US').format()).toEqual('1987-01-07T00:00:00Z');
        });

        it('uses date', function() {
            var date = new DateTime(1987, 6, 1, 0, 0, 0);
            expect(date.format()).toEqual('1987-07-01T00:00:00Z');
            expect(date.offset()).toEqual(0);

            date = new DateTime(date);
            expect(date.format()).toEqual('1987-07-01T00:00:00Z');
            expect(date.offset()).toEqual(0);
        });

        it('uses year', function() {
            expect(new DateTime(2015).format()).toEqual('2015-01-01T00:00:00Z');
        });

        it('uses year and month', function() {
            expect(new DateTime(2015, 1).format()).toEqual('2015-02-01T00:00:00Z');
        });

        it('uses year, month and date', function() {
            expect(new DateTime(2015, 1, 10).format()).toEqual('2015-02-10T00:00:00Z');
        });

        it('uses year, month, date and hour', function() {
            expect(new DateTime(2015, 1, 10, 15).format()).toEqual('2015-02-10T15:00:00Z');
        });

        it('uses year, month, date, hour and minute', function() {
            expect(new DateTime(2015, 1, 10, 15, 30).format()).toEqual('2015-02-10T15:30:00Z');
        });

        it('uses year, month, date, hour, minute and second', function() {
            expect(new DateTime(2015, 1, 10, 15, 30, 45).format()).toEqual('2015-02-10T15:30:45Z');
        });
    });

    describe('isDate method', function() {
        it('determines whether value is a date', function() {
            expect(DateTime.isDate(new Date())).toEqual(true);
            expect(DateTime.isDate(new Date('invalid'))).toEqual(false);
            expect(DateTime.isDate('Mon Aug 24 2015 10:42:31 GMT+0700 (N. Central Asia Daylight Time)')).toEqual(false);
            expect(DateTime.isDate('2015-02-21')).toEqual(false);
            expect(DateTime.isDate('Simple string')).toEqual(false);
            expect(DateTime.isDate('')).toEqual(false);
            expect(DateTime.isDate(2015)).toEqual(false);
            expect(DateTime.isDate([])).toEqual(false);
            expect(DateTime.isDate([10, 20, 30])).toEqual(false);
            expect(DateTime.isDate({})).toEqual(false);
            expect(DateTime.isDate({
                name: 'Data'
            })).toEqual(false);
            expect(DateTime.isDate(true)).toEqual(false);
            expect(DateTime.isDate(false)).toEqual(false);
            expect(DateTime.isDate(null)).toEqual(false);
            expect(DateTime.isDate(undefined)).toEqual(false);
            expect(DateTime.isDate(NaN)).toEqual(false);
        });
    });

    describe('isDateTime method', function() {
        it('determines whether value is a DateTime', function() {
            expect(DateTime.isDateTime()).toEqual(false);
            expect(DateTime.isDateTime(null)).toEqual(false);
            expect(DateTime.isDateTime(new DateTime())).toEqual(true);
        });
    });

    describe('isUtc method', function() {
        it('determines whether date is in UTC', function() {
            expect(DateTime.createEmpty().isUtc()).toEqual(false);
            expect(new DateTime('2016-09-26T00:00:00Z').isUtc()).toEqual(true);
            expect(new DateTime('2016-09-26T00:00:00+01:00').isUtc()).toEqual(false);
        });
    });

    describe('parse method', function() {
        it('returns passed date if it is already a valid DateTime object', function() {
            var date = DateTime.parse('2015-02-21T10:00:00Z');
            expect(DateTime.parse(date)).toEqual(date);
        });

        it('parses date in dd format', function() {
            var currentMonth = new DateTime(currentDate).format('MM');
            expect(DateTime.parse('21').format()).toEqual(currentYear + '-' + currentMonth + '-21T00:00:00Z');
        });

        it('parses date in d/M format', function() {
            expect(DateTime.parse('1 7').format()).toEqual(currentYear + '-07-01T00:00:00Z');
            expect(DateTime.parse('1/7').format()).toEqual(currentYear + '-07-01T00:00:00Z');
            expect(DateTime.parse('1.7').format()).toEqual(currentYear + '-07-01T00:00:00Z');
            expect(DateTime.parse('1-7').format()).toEqual(currentYear + '-07-01T00:00:00Z');

            // en-GB
            expect(DateTime.parse('1 7', 'en-GB').format()).toEqual(currentYear + '-07-01T00:00:00Z');
            expect(DateTime.parse('7 1', 'en-GB').format()).toEqual(currentYear + '-01-07T00:00:00Z');
            expect(DateTime.parse('21 1', 'en-GB').format()).toEqual(currentYear + '-01-21T00:00:00Z');
            expect(DateTime.parse('1 13', 'en-GB').isEmpty()).toEqual(true);

            // en-US
            expect(DateTime.parse('1 7', 'en-US').format()).toEqual(currentYear + '-01-07T00:00:00Z');
            expect(DateTime.parse('7 1', 'en-US').format()).toEqual(currentYear + '-07-01T00:00:00Z');
            expect(DateTime.parse('7 21', 'en-US').format()).toEqual(currentYear + '-07-21T00:00:00Z');
            expect(DateTime.parse('13 1', 'en-US').isEmpty()).toEqual(true);
        });

        it('parses date in d/M/yy format', function() {
            expect(DateTime.parse('1 7 87').format()).toEqual('1987-07-01T00:00:00Z');
            expect(DateTime.parse('1/7/87').format()).toEqual('1987-07-01T00:00:00Z');
            expect(DateTime.parse('1/7/15').format()).toEqual('2015-07-01T00:00:00Z');
            expect(DateTime.parse('1-7-87').format()).toEqual('1987-07-01T00:00:00Z');
            expect(DateTime.parse('1.7.87').format()).toEqual('1987-07-01T00:00:00Z');
        });

        it('parses date in d/MM/yy format', function() {
            expect(DateTime.parse('1 07 87').format()).toEqual('1987-07-01T00:00:00Z');
            expect(DateTime.parse('1/07/87').format()).toEqual('1987-07-01T00:00:00Z');
            expect(DateTime.parse('1-07-87').format()).toEqual('1987-07-01T00:00:00Z');
            expect(DateTime.parse('1.07.87').format()).toEqual('1987-07-01T00:00:00Z');
        });

        it('parses date in dd/MM format', function() {
            expect(DateTime.parse('2102').format()).toEqual(currentYear + '-02-21T00:00:00Z');
            expect(DateTime.parse('21 02').format()).toEqual(currentYear + '-02-21T00:00:00Z');
            expect(DateTime.parse('21-02').format()).toEqual(currentYear + '-02-21T00:00:00Z');
            expect(DateTime.parse('21/02').format()).toEqual(currentYear + '-02-21T00:00:00Z');
            expect(DateTime.parse('21.02').format()).toEqual(currentYear + '-02-21T00:00:00Z');

            // en-GB
            expect(DateTime.parse('1002', 'en-GB').format()).toEqual(currentYear + '-02-10T00:00:00Z');
            expect(DateTime.parse('0210', 'en-GB').format()).toEqual(currentYear + '-10-02T00:00:00Z');
            expect(DateTime.parse('1022', 'en-GB').isEmpty()).toEqual(true);

            // en-US
            expect(DateTime.parse('1002', 'en-US').format()).toEqual(currentYear + '-10-02T00:00:00Z');
            expect(DateTime.parse('0210', 'en-US').format()).toEqual(currentYear + '-02-10T00:00:00Z');
            expect(DateTime.parse('2210', 'en-US').isEmpty()).toEqual(true);
        });

        it('parses date in dd/M/yy format', function() {
            expect(DateTime.parse('01 7 87').format()).toEqual('1987-07-01T00:00:00Z');
            expect(DateTime.parse('01/7/87').format()).toEqual('1987-07-01T00:00:00Z');
            expect(DateTime.parse('01-7-87').format()).toEqual('1987-07-01T00:00:00Z');
            expect(DateTime.parse('01.7.87').format()).toEqual('1987-07-01T00:00:00Z');
        });

        it('parses date in dd/M/yyyy format', function() {
            expect(DateTime.parse('21 2 2015').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('21/2/2015').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('21-2-2015').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('21.2.2015').format()).toEqual('2015-02-21T00:00:00Z');
        });

        it('parses date in dd/MM/yy format', function() {
            expect(DateTime.parse('010787').format()).toEqual('1987-07-01T00:00:00Z');
            expect(DateTime.parse('01 07 87').format()).toEqual('1987-07-01T00:00:00Z');
            expect(DateTime.parse('01/07/87').format()).toEqual('1987-07-01T00:00:00Z');
            expect(DateTime.parse('01-07-87').format()).toEqual('1987-07-01T00:00:00Z');
            expect(DateTime.parse('01.07.87').format()).toEqual('1987-07-01T00:00:00Z');

            // en-GB
            expect(DateTime.parse('010787', 'en-GB').format()).toEqual('1987-07-01T00:00:00Z');
            expect(DateTime.parse('070187', 'en-GB').format()).toEqual('1987-01-07T00:00:00Z');
            expect(DateTime.parse('011387', 'en-GB').isEmpty()).toEqual(true);

            // en-US
            expect(DateTime.parse('010787', 'en-US').format()).toEqual('1987-01-07T00:00:00Z');
            expect(DateTime.parse('070187', 'en-US').format()).toEqual('1987-07-01T00:00:00Z');
            expect(DateTime.parse('130187', 'en-US').isEmpty()).toEqual(true);
        });

        it('parses date in dd/MM/yyyy format', function() {
            expect(DateTime.parse('01071987').format()).toEqual('1987-07-01T00:00:00Z');
            expect(DateTime.parse('01 07 1987').format()).toEqual('1987-07-01T00:00:00Z');
            expect(DateTime.parse('01/07/1987').format()).toEqual('1987-07-01T00:00:00Z');
            expect(DateTime.parse('01-07-1987').format()).toEqual('1987-07-01T00:00:00Z');
            expect(DateTime.parse('01.07.1987').format()).toEqual('1987-07-01T00:00:00Z');
        });

        it('parses date in dd/MMM/yy format', function() {
            expect(DateTime.parse('21Feb15').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('21 Feb 15').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('21/Feb/15').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('21-Feb-15').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('21.Feb.15').format()).toEqual('2015-02-21T00:00:00Z');
        });

        it('parses date in dd/MMM/yyyy format', function() {
            expect(DateTime.parse('21Feb2015').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('21 Feb 2015').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('21/Feb/2015').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('21-Feb-2015').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('21.Feb.2015').format()).toEqual('2015-02-21T00:00:00Z');
        });

        it('parses date in dd/MMMM/yy format', function() {
            expect(DateTime.parse('21February15').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('21 February 15').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('21/February/15').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('21-February-15').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('21.February.15').format()).toEqual('2015-02-21T00:00:00Z');
        });

        it('parses date in dd/MMMM/yyyy format', function() {
            expect(DateTime.parse('21February2015').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('21 February 2015').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('21/February/2015').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('21-February-2015').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('21.February.2015').format()).toEqual('2015-02-21T00:00:00Z');
        });

        it('parses date in MMM/dd/yy format', function() {
            expect(DateTime.parse('Feb2115').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('Feb 21 15').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('Feb/21/15').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('Feb-21-15').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('Feb.21.15').format()).toEqual('2015-02-21T00:00:00Z');
        });

        it('parses date in MMM/dd/yyyy format', function() {
            expect(DateTime.parse('Feb212015').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('Feb 21 2015').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('Feb-21-2015').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('Feb/21/2015').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('Feb.21.2015').format()).toEqual('2015-02-21T00:00:00Z');
        });

        it('parses date in yyyy/M/dd format', function() {
            expect(DateTime.parse('2015/2/21').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('2015-2-21').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('2015-2-9').format()).toEqual('2015-02-09T00:00:00Z');
            expect(DateTime.parse('2015.2.21').format()).toEqual('2015-02-21T00:00:00Z');
        });

        it('parses date in yyyy/MM/dd format', function() {
            expect(DateTime.parse('2015 02 21').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('2015/02/21').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('2015-02-21').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('2015.02.21').format()).toEqual('2015-02-21T00:00:00Z');
        });

        it('parses date in yyyy/MMMM/dd format', function() {
            expect(DateTime.parse('2015February21').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('2015 February 21').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('2015/February/21').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('2015-February-21').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('2015.February.21').format()).toEqual('2015-02-21T00:00:00Z');
        });

        it('parses date in yyyy-MM-ddTHH:mm:ss.fffK format', function() {
            var date = DateTime.parse('2015-02-21T10:00:00Z');
            expect(date.format()).toEqual('2015-02-21T10:00:00Z');
            expect(date.offset()).toEqual(0);
            expect(date.millisecond()).toEqual(0);

            var date = DateTime.parse('2015-02-21T10:00:00-03:00');
            expect(date.format()).toEqual('2015-02-21T10:00:00-03:00');
            expect(date.offset()).toEqual(-180);
            expect(date.millisecond()).toEqual(0);

            var date = DateTime.parse('2015-02-21T10:00:00.500Z');
            expect(date.format('yyyy-MM-ddTHH:mm:ss.fffK')).toEqual('2015-02-21T10:00:00.500Z');
            expect(date.offset()).toEqual(0);
            expect(date.millisecond()).toEqual(500);
        });

        it('supports specific en-GB formats', function() {
            expect(DateTime.parse('Feb 21, 15').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('Feb21,15').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('Feb 21, 2015').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('Feb21,2015').format()).toEqual('2015-02-21T00:00:00Z');
        });

        it('returns empty instance if it can not parse date', function() {
            expect(DateTime.parse('Incorrect date').isEmpty()).toEqual(true);
            expect(DateTime.parse(null).isEmpty()).toEqual(true);
            expect(DateTime.parse(true).isEmpty()).toEqual(true);
            expect(DateTime.parse(false).isEmpty()).toEqual(true);
            expect(DateTime.parse(undefined).isEmpty()).toEqual(true);
            expect(DateTime.parse(1999).isEmpty()).toEqual(true);
            expect(DateTime.parse('29/29/1999').isEmpty()).toEqual(true);
            expect(DateTime.parse('12/33/1999').isEmpty()).toEqual(true);
            expect(DateTime.parse('42/11/1999').isEmpty()).toEqual(true);
            expect(DateTime.parse('data/11.1999').isEmpty()).toEqual(true);
            expect(DateTime.parse('99 Feburrr 12').isEmpty()).toEqual(true);
            expect(DateTime.parse('11 month 2000').isEmpty()).toEqual(true);
            expect(DateTime.parse('2015-02-21T10:00:00-25:00').isEmpty()).toEqual(true);
        });

        it('parses leap years', function() {
            expect(DateTime.parse('28 Feb 2015').format()).toEqual('2015-02-28T00:00:00Z');
            expect(DateTime.parse('29 Feb 2015').isEmpty()).toEqual(true);
            expect(DateTime.parse('29 Feb 2012').format()).toEqual('2012-02-29T00:00:00Z');
        });

        it('ignores whitespaces', function() {
            expect(DateTime.parse('28  Feb 2015').format()).toEqual('2015-02-28T00:00:00Z');
            expect(DateTime.parse('08   Nov  16').format()).toEqual('2016-11-08T00:00:00Z');
        });
    });

    describe('format method', function() {
        it('returns null if date is empty', function() {
            expect(new DateTime(null).format()).toEqual(null);
        });

        it('formats date', function() {
            var date = new Date(2015, 1, 7, 12, 0, 7);
            expect(new DateTime(date).format()).toEqual('2015-02-07T12:00:07Z');
            expect(new DateTime(date).offset(180).format()).toEqual('2015-02-07T12:00:07+03:00');
            expect(new DateTime(date).offset(-180).format()).toEqual('2015-02-07T12:00:07-03:00');
        });

        it('formats date using format', function() {
            var date = new Date(2015, 1, 7, 12, 0, 7);
            expect(new DateTime(date).format('yyyy-MM-dd')).toEqual('2015-02-07');
            expect(new DateTime(date).format('yyyy-MM-dd HH:mm:ssK')).toEqual('2015-02-07 12:00:07Z');
            expect(new DateTime(date).offset(180).format('yyyy-MM-dd HH:mm:ssK')).toEqual('2015-02-07 12:00:07+03:00');
            expect(new DateTime(date).offset(-180).format('yyyy-MM-dd HH:mm:ssK')).toEqual('2015-02-07 12:00:07-03:00');
        });

        it('supports day format', function() {
            var date = new Date(2015, 1, 7);
            expect(new DateTime(date).format('yyyy-MM-d')).toEqual('2015-02-7');
            expect(new DateTime(date).format('yyyy-MM-dd')).toEqual('2015-02-07');
            expect(new DateTime(date).format('yyyy-MM-ddd')).toEqual('2015-02-Sat');
            expect(new DateTime(date).format('yyyy-MM-dddd')).toEqual('2015-02-Saturday');
        });

        it('supports month format', function() {
            var date = new Date(2015, 1, 7);
            expect(new DateTime(date).format('yyyy-M-dd')).toEqual('2015-2-07');
            expect(new DateTime(date).format('yyyy-MM-dd')).toEqual('2015-02-07');
            expect(new DateTime(date).format('yyyy-MMM-dd')).toEqual('2015-Feb-07');
            expect(new DateTime(date).format('yyyy-MMMM-dd')).toEqual('2015-February-07');
        });

        it('supports year format', function() {
            var date = new Date(2015, 1, 7);
            expect(new DateTime(date).format('yy-M-dd')).toEqual('15-2-07');
            expect(new DateTime(date).format('yyyy-M-dd')).toEqual('2015-2-07');
        });

        it('supports millisecond formats', function() {
            var date = new Date(2015, 1, 7, 12, 0, 42);
            date.setMilliseconds(2);
            expect(new DateTime(date).format('fff')).toEqual('002');
        });

        it('supports second formats', function() {
            var date = new Date(2015, 1, 7, 12, 2, 2);
            expect(new DateTime(date).format('s')).toEqual('2');
            expect(new DateTime(date).format('ss')).toEqual('02');
        });

        it('supports minute formats', function() {
            var date = new Date(2015, 1, 7, 12, 2, 42);
            expect(new DateTime(date).format('m')).toEqual('2');
            expect(new DateTime(date).format('mm')).toEqual('02');
        });

        it('supports hour formats', function() {
            var date = new Date(2015, 1, 7, 02, 0, 42);
            expect(new DateTime(date).format('H')).toEqual('2');
            expect(new DateTime(date).format('HH')).toEqual('02');
        });

        it('supports time zone format', function() {
            var date = new Date(2015, 1, 7);
            expect(new DateTime(date).format('K')).toEqual('Z');
            expect(new DateTime(date).offset(120).format('K')).toEqual('+02:00');
        });
    });

    describe('valueOf method', function() {
        it('returns the primitive value of a date', function() {
            // Date.
            expect(new DateTime('2016-09-26T00:00:00Z').valueOf()).toEqual(new Date(2016, 8, 26, 0, 0, 0, 0).valueOf());

            // Date and time.
            expect(new DateTime('2016-09-26T01:00:00Z').valueOf()).toEqual(new Date(2016, 8, 26, 1, 0, 0, 0).valueOf());

            // Date with time zone.
            expect(new DateTime('2016-09-26T10:00:00+01:00').valueOf()).toEqual(new Date(2016, 8, 26, 9, 0, 0, 0).valueOf());
        });
    });

    describe('difference method', function() {
        it('returns difference in milliseconds between two dates', function() {
            expect(new DateTime('2016-09-26T00:00:00Z').difference('2016-09-26T00:00:00Z')).toEqual(0);
            expect(new DateTime('2016-09-26T00:00:01Z').difference('2016-09-26T00:00:00Z')).toEqual(1000);
            expect(new DateTime('2016-09-26T00:00:00Z').difference('2016-09-26T00:00:01Z')).toEqual(-1000);
        });
    });

    describe('isEqual method', function() {
        it('determines whether date is equal to passed date', function() {
            expect(DateTime.createEmpty().isEqual(DateTime.createEmpty())).toEqual(true);
            expect(new DateTime('2016-09-26T00:00:00Z').isEqual('2016-09-26T00:00:00Z')).toEqual(true);
            expect(new DateTime('2016-09-26T00:00:01Z').isEqual('2016-09-26T00:00:00Z')).toEqual(false);
            expect(new DateTime('2016-09-26T00:00:00Z').isEqual('2016-09-26T00:00:01Z')).toEqual(false);
        });
    });

    describe('isLess method', function() {
        it('determines whether date is less than passed date', function() {
            expect(DateTime.createEmpty().isLess(DateTime.createEmpty())).toEqual(false);
            expect(new DateTime('2016-09-26T00:00:00Z').isLess('2016-09-26T00:00:01Z')).toEqual(true);
            expect(new DateTime('2016-09-26T00:00:00Z').isLess('2016-09-26T00:00:00Z')).toEqual(false);
            expect(new DateTime('2016-09-26T00:00:01Z').isLess('2016-09-26T00:00:00Z')).toEqual(false);
        });
    });

    describe('isLessOrEqual method', function() {
        it('determines whether date is less than or equal to passed date', function() {
            expect(DateTime.createEmpty().isLessOrEqual(DateTime.createEmpty())).toEqual(true);
            expect(new DateTime('2016-09-26T00:00:00Z').isLessOrEqual('2016-09-26T00:00:01Z')).toEqual(true);
            expect(new DateTime('2016-09-26T00:00:00Z').isLessOrEqual('2016-09-26T00:00:00Z')).toEqual(true);
            expect(new DateTime('2016-09-26T00:00:01Z').isLessOrEqual('2016-09-26T00:00:00Z')).toEqual(false);
        });
    });

    describe('isGreater method', function() {
        it('determines whether date is greater than passed date', function() {
            expect(DateTime.createEmpty().isGreater(DateTime.createEmpty())).toEqual(false);
            expect(new DateTime('2016-09-26T00:00:01Z').isGreater('2016-09-26T00:00:00Z')).toEqual(true);
            expect(new DateTime('2016-09-26T00:00:00Z').isGreater('2016-09-26T00:00:00Z')).toEqual(false);
            expect(new DateTime('2016-09-26T00:00:00Z').isGreater('2016-09-26T00:00:01Z')).toEqual(false);
        });
    });

    describe('isGreaterOrEqual method', function() {
        it('determines whether date is greater than or equal to passed date', function() {
            expect(DateTime.createEmpty().isGreaterOrEqual(DateTime.createEmpty())).toEqual(true);
            expect(new DateTime('2016-09-26T00:00:01Z').isGreaterOrEqual('2016-09-26T00:00:00Z')).toEqual(true);
            expect(new DateTime('2016-09-26T00:00:00Z').isGreaterOrEqual('2016-09-26T00:00:00Z')).toEqual(true);
            expect(new DateTime('2016-09-26T00:00:00Z').isGreaterOrEqual('2016-09-26T00:00:01Z')).toEqual(false);
        });
    });

    describe('isBetween method', function() {
        it('determines whether date is between two other dates', function() {
            expect(DateTime.createEmpty().isBetween('2016-08-01T00:00:00Z', '2016-09-01T00:00:00Z')).toEqual(false);
            expect(new DateTime('2016-08-15T00:00:00Z').isBetween(DateTime.createEmpty(), '2016-09-01T00:00:00Z')).toEqual(false);
            expect(new DateTime('2016-08-15T00:00:00Z').isBetween('2016-08-01T00:00:00Z', DateTime.createEmpty())).toEqual(false);
            expect(new DateTime('2016-08-15T00:00:00Z').isBetween('2016-08-01T00:00:00Z', '2016-09-01T00:00:00Z')).toEqual(true);
            expect(new DateTime('2016-08-01T00:00:00Z').isBetween('2016-08-01T00:00:00Z', '2016-09-01T00:00:00Z')).toEqual(false);
            expect(new DateTime('2016-09-01T00:00:00Z').isBetween('2016-08-01T00:00:00Z', '2016-09-01T00:00:00Z')).toEqual(false);
        });

        it('determines whether date is between two other dates inclusively', function() {
            expect(new DateTime('2016-08-15T00:00:00Z').isBetween('2016-08-01T00:00:00Z', '2016-09-01T00:00:00Z', true)).toEqual(true);
            expect(new DateTime('2016-08-01T00:00:00Z').isBetween('2016-08-01T00:00:00Z', '2016-09-01T00:00:00Z', true)).toEqual(true);
            expect(new DateTime('2016-09-01T00:00:00Z').isBetween('2016-08-01T00:00:00Z', '2016-09-01T00:00:00Z', true)).toEqual(true);
        });
    });

    describe('parseTimeZone method', function() {
        it('parses time zone', function() {
            expect(DateTime.parseTimeZone('Z')).toEqual(0);
            expect(DateTime.parseTimeZone('00:00')).toEqual(0);
            expect(DateTime.parseTimeZone('-00:00')).toEqual(0);
            expect(DateTime.parseTimeZone('01:00')).toEqual(60);
            expect(DateTime.parseTimeZone('-01:00')).toEqual(-60);
            expect(DateTime.parseTimeZone('01:30')).toEqual(90);
            expect(DateTime.parseTimeZone('-01:30')).toEqual(-90);

            // GMT prefix.
            expect(DateTime.parseTimeZone('GMTZ')).toEqual(0);
            expect(DateTime.parseTimeZone('GMT+01:00')).toEqual(60);
            expect(DateTime.parseTimeZone('GMT-01:00')).toEqual(-60);

            // Incorrect time zone.
            expect(DateTime.parseTimeZone()).toEqual(0);
            expect(DateTime.parseTimeZone('000:00')).toEqual(0);
            expect(DateTime.parseTimeZone('--00:00')).toEqual(0);
            expect(DateTime.parseTimeZone('24:00')).toEqual(0);
            expect(DateTime.parseTimeZone('00:60')).toEqual(0);
        });
    });

    describe('formatTimeZone method', function() {
        it('parses time zone', function() {
            expect(DateTime.formatTimeZone()).toEqual(null);
            expect(DateTime.formatTimeZone('')).toEqual(null);
            expect(DateTime.formatTimeZone(false)).toEqual(null);

            expect(DateTime.formatTimeZone(0)).toEqual('Z');
            expect(DateTime.formatTimeZone(60)).toEqual('+01:00');
            expect(DateTime.formatTimeZone(-60)).toEqual('-01:00');
            expect(DateTime.formatTimeZone(90)).toEqual('+01:30');
            expect(DateTime.formatTimeZone(-90)).toEqual('-01:30');

            // Minimun time zone is -12:00.
            expect(DateTime.formatTimeZone(-720)).toEqual('-12:00');
            expect(DateTime.formatTimeZone(-721)).toEqual(null);

            // Maximum time zone is 14:00.
            expect(DateTime.formatTimeZone(840)).toEqual('+14:00');
            expect(DateTime.formatTimeZone(841)).toEqual(null);
        });
    });

    describe('createEmpty method', function() {
        it('creates empty instance', function() {
            expect(DateTime.createEmpty().isEmpty()).toEqual(true);
        });
    });

    describe('add method', function() {
        // Milliseconds.
        it('adds milliseconds', function() {
            var date = new DateTime('2015-02-21T10:45:30Z');
            date.add(2, 'millisecond');
            expect(date.format('yyyy-MM-ddTHH:mm:ss.fffZ')).toEqual('2015-02-21T10:45:30.002Z');

            date.add(999, 'millisecond');
            expect(date.format('yyyy-MM-ddTHH:mm:ss.fffZ')).toEqual('2015-02-21T10:45:31.001Z');
        });

        // Seconds.
        it('adds seconds', function() {
            var date = new DateTime('2015-02-21T10:45:30Z');
            date.add(2, 'second');
            expect(date.format()).toEqual('2015-02-21T10:45:32Z');

            date.add(28, 'second');
            expect(date.format()).toEqual('2015-02-21T10:46:00Z');
        });

        // Minutes.
        it('adds minutes', function() {
            var date = new DateTime('2015-02-21T10:45:30Z');
            date.add(2, 'minute');
            expect(date.format()).toEqual('2015-02-21T10:47:30Z');

            date.add(13, 'minute');
            expect(date.format()).toEqual('2015-02-21T11:00:30Z');
        });

        // Hours.
        it('adds hours', function() {
            var date = new DateTime('2015-02-21T10:45:30Z');
            date.add(2, 'hour');
            expect(date.format()).toEqual('2015-02-21T12:45:30Z');

            date.add(12, 'hour');
            expect(date.format()).toEqual('2015-02-22T00:45:30Z');
        });

        // Days.
        it('adds days', function() {
            var date = new DateTime('2015-02-21T10:45:30Z');
            date.add(2, 'day');
            expect(date.format()).toEqual('2015-02-23T10:45:30Z');

            date.add(6, 'day');
            expect(date.format()).toEqual('2015-03-01T10:45:30Z');
        });

        // Months.
        it('adds months', function() {
            var date = new DateTime('2015-02-21T10:45:30Z');
            date.add(2, 'month');
            expect(date.format()).toEqual('2015-04-21T10:45:30Z');

            date.add(9, 'month');
            expect(date.format()).toEqual('2016-01-21T10:45:30Z');
        });

        // Years.
        it('adds years', function() {
            var date = new DateTime('2015-02-21T10:45:30Z');
            date.add(2, 'year');
            expect(date.format()).toEqual('2017-02-21T10:45:30Z');
        });
    });

    describe('subtract method', function() {
        // Milliseconds.
        it('subtracts milliseconds', function() {
            var date = new DateTime('2015-02-21T10:45:30.500Z');
            date.subtract(2, 'millisecond');
            expect(date.format('yyyy-MM-ddTHH:mm:ss.fffK')).toEqual('2015-02-21T10:45:30.498Z');

            date.subtract(499, 'millisecond');
            expect(date.format('yyyy-MM-ddTHH:mm:ss.fffK')).toEqual('2015-02-21T10:45:29.999Z');
        });

        // Seconds.
        it('subtracts seconds', function() {
            var date = new DateTime('2015-02-21T10:45:30Z');
            date.subtract(2, 'second');
            expect(date.format()).toEqual('2015-02-21T10:45:28Z');

            date.subtract(29, 'second');
            expect(date.format()).toEqual('2015-02-21T10:44:59Z');
        });

        // Minutes.
        it('subtracts minutes', function() {
            var date = new DateTime('2015-02-21T10:45:30Z');
            date.subtract(2, 'minute');
            expect(date.format()).toEqual('2015-02-21T10:43:30Z');

            date.subtract(44, 'minute');
            expect(date.format()).toEqual('2015-02-21T09:59:30Z');
        });

        // Hours.
        it('subtracts hours', function() {
            var date = new DateTime('2015-02-21T10:45:30Z');
            date.subtract(2, 'hour');
            expect(date.format()).toEqual('2015-02-21T08:45:30Z');

            date.subtract(9, 'hour');
            expect(date.format()).toEqual('2015-02-20T23:45:30Z');
        });

        // Days.
        it('subtracts days', function() {
            var date = new DateTime('2015-02-21T10:45:30Z');
            date.subtract(2, 'day');
            expect(date.format()).toEqual('2015-02-19T10:45:30Z');

            date.subtract(19, 'day');
            expect(date.format()).toEqual('2015-01-31T10:45:30Z');
        });

        // Months.
        it('subtracts months', function() {
            var date = new DateTime('2015-02-21T10:45:30Z');
            date.subtract(1, 'month');
            expect(date.format()).toEqual('2015-01-21T10:45:30Z');

            date.subtract(1, 'month');
            expect(date.format()).toEqual('2014-12-21T10:45:30Z');
        });

        // Years.
        it('subtracts years', function() {
            var date = new DateTime('2015-02-21T10:45:30Z');
            date.subtract(2, 'year');
            expect(date.format()).toEqual('2013-02-21T10:45:30Z');
        });
    });

    describe('millisecond method', function() {
        it('returns milliseconds', function() {
            var date = new DateTime('2015-02-21T10:45:30.500Z');
            expect(date.millisecond()).toEqual(500);
        });

        it('sets milliseconds', function() {
            var date = new DateTime('2015-02-21T10:45:30Z');
            date.millisecond(10);
            expect(date.millisecond()).toEqual(10);
            expect(date.second()).toEqual(30);

            date.millisecond(1001);
            expect(date.millisecond()).toEqual(1);
            expect(date.second()).toEqual(31);
        });
    });

    describe('second method', function() {
        it('returns seconds', function() {
            var date = new DateTime('2015-02-21T10:45:30Z');
            expect(date.second()).toEqual(30);
        });

        it('sets seconds', function() {
            var date = new DateTime('2015-02-21T10:45:30Z');
            date.second(10);
            expect(date.second()).toEqual(10);
            expect(date.minute()).toEqual(45);

            date.second(80);
            expect(date.second()).toEqual(20);
            expect(date.minute()).toEqual(46);
        });
    });

    describe('minute method', function() {
        it('returns minutes', function() {
            var date = new DateTime('2015-02-21T10:45:00Z');
            expect(date.minute()).toEqual(45);
        });

        it('sets minutes', function() {
            var date = new DateTime('2015-02-21T10:45:30Z');
            date.minute(10);
            expect(date.minute()).toEqual(10);

            date.minute(80);
            expect(date.minute()).toEqual(20);
            expect(date.hour()).toEqual(11);
        });
    });

    describe('hour method', function() {
        it('returns hours', function() {
            var date = new DateTime('2015-02-21T10:45:00Z');
            expect(date.hour()).toEqual(10);
        });

        it('sets hours', function() {
            var date = new DateTime('2015-02-21T10:45:30Z');
            date.hour(20);
            expect(date.hour()).toEqual(20);

            date.hour(30);
            expect(date.format()).toEqual('2015-02-22T06:45:30Z');
        });
    });

    describe('date method', function() {
        it('returns day of month', function() {
            var date = new DateTime('2015-02-21T10:45:00Z');
            expect(date.date()).toEqual(21);
        });

        it('sets day of month', function() {
            var date = new DateTime('2015-02-21T10:45:30Z');
            date.date(25);
            expect(date.date()).toEqual(25);

            date.date(29);
            expect(date.date()).toEqual(1);
            expect(date.format()).toEqual('2015-03-01T10:45:30Z');
        });
    });

    describe('month method', function() {
        it('returns month', function() {
            var date = new DateTime('2015-02-21T10:45:00Z');
            expect(date.month()).toEqual(1);
        });

        it('sets month', function() {
            var date = new DateTime('2015-02-21T10:45:30Z');
            date.month(3);
            expect(date.month()).toEqual(3);
            expect(date.format()).toEqual('2015-04-21T10:45:30Z');

            date.month(15);
            expect(date.month()).toEqual(3);
            expect(date.format()).toEqual('2016-04-21T10:45:30Z');
        });
    });

    describe('year method', function() {
        it('returns year', function() {
            var date = new DateTime('2015-02-21T10:45:00Z');
            expect(date.year()).toEqual(2015);
        });

        it('sets year', function() {
            var date = new DateTime('2015-02-21T10:45:30Z');
            date.year(2010);
            expect(date.year()).toEqual(2010);
        });
    });

    describe('toUtc method', function() {
        it('does nothing if offset iz zero', function() {
            var date = new DateTime('2015-02-21T20:45:00Z');
            date.toUtc();
            expect(date.offset()).toEqual(0);
            expect(date.format()).toEqual('2015-02-21T20:45:00Z');
        });

        it('transforms date to UTC', function() {
            var date = new DateTime('2015-02-21T20:45:00+04:00');
            date.toUtc();
            expect(date.offset()).toEqual(0);
            expect(date.format()).toEqual('2015-02-21T16:45:00Z');

            date = new DateTime('2015-02-21T20:45:00-04:00');
            date.toUtc();
            expect(date.offset()).toEqual(0);
            expect(date.format()).toEqual('2015-02-22T00:45:00Z');
        });
    });

    describe('startOf method', function() {
        it('sets date to the start of a unit of time', function() {
            expect(new DateTime('2015-02-21T10:45:35.500Z').startOf('second').format('yyyy-MM-ddTHH:mm:ss.fffK')).toEqual('2015-02-21T10:45:35.000Z');
            expect(new DateTime('2015-02-21T10:45:35.500Z').startOf('minute').format('yyyy-MM-ddTHH:mm:ss.fffK')).toEqual('2015-02-21T10:45:00.000Z');
            expect(new DateTime('2015-02-21T10:45:35.500Z').startOf('hour').format('yyyy-MM-ddTHH:mm:ss.fffK')).toEqual('2015-02-21T10:00:00.000Z');
            expect(new DateTime('2015-02-21T10:45:35.500Z').startOf('day').format('yyyy-MM-ddTHH:mm:ss.fffK')).toEqual('2015-02-21T00:00:00.000Z');
            expect(new DateTime('2015-02-21T10:45:35.500Z').startOf('month').format('yyyy-MM-ddTHH:mm:ss.fffK')).toEqual('2015-02-01T00:00:00.000Z');
            expect(new DateTime('2015-02-21T10:45:35.500Z').startOf('year').format('yyyy-MM-ddTHH:mm:ss.fffK')).toEqual('2015-01-01T00:00:00.000Z');
        });
    });

    describe('endOf method', function() {
        it('sets date to the start of a unit of time', function() {
            expect(new DateTime('2015-01-01T00:00:00.000Z').endOf('second').format('yyyy-MM-ddTHH:mm:ss.fffK')).toEqual('2015-01-01T00:00:00.999Z');
            expect(new DateTime('2015-01-01T00:00:00.000Z').endOf('minute').format('yyyy-MM-ddTHH:mm:ss.fffK')).toEqual('2015-01-01T00:00:59.999Z');
            expect(new DateTime('2015-01-01T00:00:00.000Z').endOf('hour').format('yyyy-MM-ddTHH:mm:ss.fffK')).toEqual('2015-01-01T00:59:59.999Z');
            expect(new DateTime('2015-01-01T00:00:00.000Z').endOf('day').format('yyyy-MM-ddTHH:mm:ss.fffK')).toEqual('2015-01-01T23:59:59.999Z');
            expect(new DateTime('2015-01-01T00:00:00.000Z').endOf('month').format('yyyy-MM-ddTHH:mm:ss.fffK')).toEqual('2015-01-31T23:59:59.999Z');
            expect(new DateTime('2015-01-01T00:00:00.000Z').endOf('year').format('yyyy-MM-ddTHH:mm:ss.fffK')).toEqual('2015-12-31T23:59:59.999Z');
        });
    });

    describe('offset method', function() {
        it('returns offset', function() {
            expect(new DateTime('2015-02-21T10:45:00Z').offset()).toEqual(0);
            expect(new DateTime('2015-02-21T10:45:00+02:00').offset()).toEqual(120);
            expect(new DateTime('2015-02-21T10:45:00-03:00').offset()).toEqual(-180);
        });

        it('sets offset', function() {
            var date = new DateTime('2015-02-21T10:45:30Z');
            date.offset(-180);
            expect(date.offset()).toEqual(-180);
            expect(date.format()).toEqual('2015-02-21T10:45:30-03:00');
        });
    });
});
