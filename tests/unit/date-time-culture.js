describe('DateTime', function() {
    var DateTime = window.DateTime,
        currentDate = new Date(),
        currentYear = currentDate.getFullYear();

    describe('parse method', function() {
        it('parses date in dd/MMM/yy format', function() {
            // ru
            expect(DateTime.parse('21Фев15').format()).toEqual('2015-02-21T00:00:00Z');

            // uk
            expect(DateTime.parse('21Лют15').format()).toEqual('2015-02-21T00:00:00Z');
        });

        it('parses date in dd/MMM/yyyy format', function() {
            // ru
            expect(DateTime.parse('21Фев2015').format()).toEqual('2015-02-21T00:00:00Z');

            // uk
            expect(DateTime.parse('21Лют2015').format()).toEqual('2015-02-21T00:00:00Z');
        });

        it('parses date in dd/MMMM/yy format', function() {
            // ru
            expect(DateTime.parse('21Февраль15').format()).toEqual('2015-02-21T00:00:00Z');

            // uk
            expect(DateTime.parse('21Лютий15').format()).toEqual('2015-02-21T00:00:00Z');
        });

        it('parses date in dd/MMMM/yyyy format', function() {
            // ru
            expect(DateTime.parse('21Февраль2015').format()).toEqual('2015-02-21T00:00:00Z');

            // uk
            expect(DateTime.parse('21Лютий2015').format()).toEqual('2015-02-21T00:00:00Z');
        });

        it('parses date in MMM/dd/yy format', function() {
            // ru
            expect(DateTime.parse('Фев2115').format()).toEqual('2015-02-21T00:00:00Z');

            // uk
            expect(DateTime.parse('Лют2115').format()).toEqual('2015-02-21T00:00:00Z');
        });

        it('parses date in MMM/dd/yyyy format', function() {
            // ru
            expect(DateTime.parse('Фев212015').format()).toEqual('2015-02-21T00:00:00Z');

            // uk
            expect(DateTime.parse('Лют212015').format()).toEqual('2015-02-21T00:00:00Z');
        });

        it('parses date in yyyy/MMMM/dd format', function() {
            // ru
            expect(DateTime.parse('2015Февраль21').format()).toEqual('2015-02-21T00:00:00Z');

            // uk
            expect(DateTime.parse('2015Лютий21').format()).toEqual('2015-02-21T00:00:00Z');
        });
    });
});
