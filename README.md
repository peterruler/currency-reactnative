# installation

install expo `yarn global add expo-cli`

(scaffold new app: `expo init currency-reactnative -t expo-template-blank-typescript`)

install dependencies via cmd-line, run: `yarn`

# run locally for development

- with expo without android sdk or XCode MacOS
- `expo start --web`

# run via expo webapp

 scan qr code with phone

# emulator ios and/or android

with android sdk and emulator, run (need android version e.g. 11, Emulator for e. g. pixel 2):
 `expo start --android`

- install expo for current user & project: `yarn add expo-cli`
- update expo: `/Users/$(whoami)/Documents/Projects/supertrumpf-reactnative/node_modules/expo-cli/bin/expo.js update 44.0.0`
- on MacOS if not in path use: `/Users/$(whoami)/Documents/Projects/supertrumpf-reactnative/node_modules/expo-cli/bin/expo.js start --web`

# routing

use this navigation solution instead of react-router:

https://reactnavigation.org/docs/navigating

# dependencies

see package.json

# install expo

- `install nodejs macos https://nodejs.org/download/release/v16.20.0/`
- `npm install -g npm@9.7.1`
- `yarn`
- `yarn global add expo-cli@6.3.2`
- `yarn install`
- `sudo expo update 48.0.0`
- `expo upgrade`
# rest api

- https://app.freecurrencyapi.com/dashboard
- login with gmail

# demo snack on expo

- https://snack.expo.dev/@petethegreat/currency-reactnative
- see also: https://snack.expo.dev/@petethegreat/super-trumpf