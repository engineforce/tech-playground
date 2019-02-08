
[![Greenkeeper badge](https://badges.greenkeeper.io/engineforce/tech-playground.svg)](https://greenkeeper.io/)

```
clients/
    portfolio-web:
        gatsby-cli

    chart-web:
        polymer-cli

    investing-rn:
        create-react-native-app

    user-web:
        create-react-app

packages/
    async-lib:
        poi

services/
    user-service:
        serverless

    trade-service:
        F# .NET Core
        serverless

    chart-service:
        C# .NET Core
        serverless

    credit-service:
        golang
        serverless

Prettier on precommit:

    husky
    prettier
    pretty-quick

Monorepo

    lerna
```

Known issues:

1.  error An unexpected error occurred: "ENOENT: no such file or directory, lstat 'packages/async-lib/node_modules/jest'".

    `yarn run clean && yarn` caused above error

    Opened packages/async-lib/node_modules/, jest is there, most likely it is hoisted to the top, causing this error.

    Can be workaround by running `yarn` again without cleaning.
