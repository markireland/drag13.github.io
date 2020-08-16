# TypeScript Tips and Tricks for beginners - Declarations

[![typescript tips and trics declarations](~/img/kdpv/ts-declarations.png)](./index.pug)

TypeScript is a very powerful language and it is becoming more and more popular. It is simple from the first sight but may contain some not very intuitive solutions.
In this series of short articles I will show you useful tips and tricks that may help you in everyday coding and will keep your code type-safe (No any usage, promising!).

Let's start from something simple - TypeScript declarations.

## Global object augmentation is TypeScript

The declaration is one of the most important parts of the TypeScript and of course, you already familiar with it. Despite this, sometimes declaration might be tricky. Imagine that you need to extend global objects (like window) with custom properties. If you will try to do it directly, TypeScript will show an error like this: `Property 'customProperty' does not exist on type 'Window & typeof globalThis'.ts(2339)`. This happens because `customProperty` not exists in the corresponding type and TypeScript disallows you to operate with not existed properties.

The popular way to solve this (and incorrect), is to cast the desired object to `any` and then, assign or use new properties. However, in this case, we will lose IntelliSense and type safety. A much better way to extend globally declared class is to declare new, correct interface with the same name:

```typescript
// window.d.ts
declare interface Window {
  config: {
    env: "dev" | "prod";
  };
}
```

This approach named "Global Augmentation". The good news is that you don't need to redeclare all other properties, you still can use all other. The bad news is that you can't override existing properties without manual correcting corresponding .d.ts file. If you want to track this issue, check this [link](https://github.com/microsoft/TypeScript/issues/36146)

## Adding static methods to the existed class in TypeScript

Let's move further. What if you want to add a new static method to the existed class, like `Array`? In this case, you need to do:

- Declare a new interface for the **constructor** you want to extend,
- Add actual code to the prototype of the constructor
- Import the file in the entry point of your application

Code example:

```typescript
// array.ts
declare interface Array<T> {
  foo(): string;
}

Array.prototype.foo = function (): string {
  return "bar";
};
```

```typescript
// index.ts
import "./array.ts";

[].foo();
```

**Important note:** you should avoid any import or export statements in this file or your file will be treated as module and trick will not work.

## Adding types for the third-party libraries in TypeScript

As you can see, extending global objects in the TypeScript is quite simple. But how to add custom types for the 3rd party library? In this case, you should use a module declaration statement:

```typescript
// mytestlib.d.ts
declare module "my-test-lib" {
  export function main_answer(): number;
}
```

Now, when you will import something from `my-test-lib` you will have proper IntelliSense and type checking. Don't forget to send a PR to the [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) to let other people use your types.

**Important note:** don't forget to ensure that your *.d.ts files are visible for the TypeScript. Check `files/include` option in your tsconfig.json. If you have any issues, I have some more info about [how to add custom typings into the TypeScript project](https://drag13.io/posts/custom-typings/index.html)

## Summary

In this article we found how to:

* Add custom properties to the global or already existed types
* Add static properties to already existed objects
* Add custom types for the 3rd party code

That's is the end of the first part of the TypeScript tips and tricks for beginners. See you soon!