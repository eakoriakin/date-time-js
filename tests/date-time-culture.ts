import { DateTime } from '../date-time';

describe('DateTime', () => {
    var currentDate = new Date(),
        currentYear = currentDate.getFullYear();

    describe('parse method', () => {
        it('parses date in dd/MMM/yy format', () => {
            // ru
            expect(DateTime.parse('21фев15').format()).toEqual('2015-02-21T00:00:00Z');

            // uk
            expect(DateTime.parse('21лют15').format()).toEqual('2015-02-21T00:00:00Z');
        });

        it('parses date in dd/MMM/yyyy format', () => {
            // ru
            expect(DateTime.parse('21фев2015').format()).toEqual('2015-02-21T00:00:00Z');

            // uk
            expect(DateTime.parse('21лют2015').format()).toEqual('2015-02-21T00:00:00Z');
        });

        it('parses date in dd/MMMM/yy format', () => {
            // ru
            expect(DateTime.parse('21февраль15').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('21февраля15').format()).toEqual('2015-02-21T00:00:00Z');

            // uk
            expect(DateTime.parse('21лютий15').format()).toEqual('2015-02-21T00:00:00Z');
        });

        it('parses date in dd/MMMM/yyyy format', () => {
            // ru
            expect(DateTime.parse('21февраль2015').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('21февраля2015').format()).toEqual('2015-02-21T00:00:00Z');

            // uk
            expect(DateTime.parse('21лютий2015').format()).toEqual('2015-02-21T00:00:00Z');
        });

        it('parses date in MMM/dd/yy format', () => {
            // ru
            expect(DateTime.parse('фев2115').format()).toEqual('2015-02-21T00:00:00Z');

            // uk
            expect(DateTime.parse('лют2115').format()).toEqual('2015-02-21T00:00:00Z');
        });

        it('parses date in MMM/dd/yyyy format', () => {
            // ru
            expect(DateTime.parse('фев212015').format()).toEqual('2015-02-21T00:00:00Z');

            // uk
            expect(DateTime.parse('лют212015').format()).toEqual('2015-02-21T00:00:00Z');
        });

        it('parses date in yyyy/MMMM/dd format', () => {
            // ru
            expect(DateTime.parse('2015февраль21').format()).toEqual('2015-02-21T00:00:00Z');
            expect(DateTime.parse('2015февраля21').format()).toEqual('2015-02-21T00:00:00Z');

            // uk
            expect(DateTime.parse('2015лютий21').format()).toEqual('2015-02-21T00:00:00Z');
        });
    });
});