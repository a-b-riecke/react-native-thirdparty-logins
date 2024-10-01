# react-native-thirdparty-logins

providing alternative ways to login

## Installation

```sh
npm install react-native-thirdparty-logins
```

## Google api setup

Local installation:
From your project root 
```sh
cd android && ./gradlew signingReport.
```

Scroll to the top of output, see the fingerprints. Debug fingerprint is used in dev, release fingerprint is used for release APK.
Set the keys up in [Google Cloud](https://peerlist.io/blog/engineering/implementing-google-signin-in-react-native#10-possible-problem-developer_error)



## Usage


```js
import { multiply } from 'react-native-thirdparty-logins';

// ...

const result = await multiply(3, 7);
```


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
