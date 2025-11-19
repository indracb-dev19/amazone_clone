import { centsToDollar } from "../../helper/moneyConverter.js";

describe('tests suite: formatCurrency', () => { 
    it('convert cents to dollars', () => {
        expect(centsToDollar(2095)).toEqual('20.95');
    });
    it('works with 0', () => {
        expect(centsToDollar(0)).toEqual('0.00');
    });
    it('rounds up to nearest cent', () => {
        expect(centsToDollar(2000.5)).toEqual('20.01');
    });
 });