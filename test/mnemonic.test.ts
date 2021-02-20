import Mnemonic from '../src';
import crypto from 'crypto';

describe('mnemonic', () => {
  it('should return 25 words mnemonic from seed', () => {
    const seed = crypto.randomBytes(32);
    const mn = Mnemonic.mnemonicFromSeed(seed);
    expect(mn.split(' ').length).toStrictEqual(25);
  });

  it('should be able to convert back to seed', () => {
    const seed = new Uint8Array(crypto.randomBytes(32).buffer);
    const mn = Mnemonic.mnemonicFromSeed(seed);
    const target = Mnemonic.seedFromMnemonic(mn);
    expect(target).toStrictEqual(seed);
  });

  it('should pass zero vector test', () => {
    const seed = new Uint8Array([
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
    ]);
    const mn =
      'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon art';
    const targetMnemonic = Mnemonic.mnemonicFromSeed(seed);
    expect(targetMnemonic).toEqual(mn);
  });

  it('should fail to convert invalid mnemonic to seed', () => {
    const seed = new Uint8Array(crypto.randomBytes(32).buffer);
    const mn = Mnemonic.mnemonicFromSeed(seed);
    // Shuffle bits
    const shuffledMn = mn.slice(0, mn.length - 1) + 'h';

    // https://jestjs.io/docs/en/expect.html#tothrowerror
    function seedFromInvalidChecksumMnemonic(): void {
      Mnemonic.seedFromMnemonic(shuffledMn);
    }

    expect(seedFromInvalidChecksumMnemonic).toThrowError(
      Mnemonic.ERROR_FAILED_TO_DECODE_MNEMONIC
    );
  });

  it('should fail to verify invalid mnemonic', () => {
    const mn =
      'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon venue abandon abandon abandon abandon abandon abandon abandon abandon abandon invest';

    function seedFromInvalidMnemonic(): void {
      Mnemonic.seedFromMnemonic(mn);
    }

    expect(seedFromInvalidMnemonic).toThrowError(
      Mnemonic.ERROR_FAILED_TO_DECODE_MNEMONIC
    );
  });

  it('should fail to verify mnemonic with invalid word', () => {
    const mn =
      'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon venues abandon abandon abandon abandon abandon abandon abandon abandon abandon invest';

    function seedFromInvalidMnemonic(): void {
      Mnemonic.seedFromMnemonic(mn);
    }

    expect(seedFromInvalidMnemonic).toThrowError(
      Mnemonic.ERROR_WORD_NOT_IN_WORDSLIST
    );
  });
});
