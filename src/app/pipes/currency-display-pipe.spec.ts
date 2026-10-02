import { CurrencyDisplayPipe } from './currency-display-pipe';

describe('CurrencyDisplayPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyDisplayPipe();
    expect(pipe).toBeTruthy();
  });
});
