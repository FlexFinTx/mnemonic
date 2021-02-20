# Mnemonic

![CI](https://github.com/FlexFinTx/mnemonic/workflows/CI/badge.svg)
![CD](https://github.com/FlexFinTx/mnemonic/workflows/CD/badge.svg)

<p align="center">
  <img src="./flexfintx-green-logo.png"/>
</p>

`Mnemonic` is a library to convert 32 byte UInt8Arrays (commonly used by assymetric public key cryptography algorithms) to English menmonic phrases, and vice versa. Intended to be used to convert secret keys to mnemonic phrases and vice versa.

## Example Usage

```typescript
import Mnemonic from 'flexid-mnemonic';

const seed = new Uint8Array(crypto.randomBytes(32).buffer);
const mn = Mnemonic.mnemonicFromSeed(seed);
const target = Mnemonic.seedFromMnemonic(mn);
// Target and Seed will be strictly equal
```

## Development

`yarn start`

## Building

`yarn build`

## Tests

`yarn lint`

## License

```
Copyright 2020 FlexBlockID Technologies Pvt Ltd

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
