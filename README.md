# Node.js Backend Template Using TypeScript

## Biomejs
Biomejs is used as the default formatter and linter. You can read about it [here](https://biomejs.dev/).

## Zod
Zod is used for validating data coming from requests. The middleware for this can be found in **src/middleware/zodValidator**. It can be used in any route by passing the schema as an argument. Additionally, all **.env** variables are validated in the **/src/utils/env.ts** file. First, add the variable to the .env file and then validate it in **env.ts** to get autocompletion.

## Error Handling
A middleware for error handling is located in **src/middleware/error-handler.ts**. It catches any errors thrown in the routes. You can also use the **HttpError** class from this file to throw an error with a message and status code:

```typescript
throw new HttpError("Some Message", 400);
```

## Type Alias
Type aliases are defined in tsconfig.json for more information check tsconfig.json.
## Logger 
Morgan is used as the default logger for logging every incoming request. Additionally, there is a logger file in **lib/logger**. You can use this logger and customize the log colors according to your needs.
