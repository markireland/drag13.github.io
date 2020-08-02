# Perfrunner - an automated testing tool to check your web site performance improvements against various conditions.

A few months ago I worked on the performance improvements for one React-based web application. I tried different tricks to improve initial application loading and I was really annoyed with the way of testing my changes. I had to launch the application several times to get average results. I had to repeat all launches against at least two types of networks (4g and my current). And I must do all mentioned once again for cache and cashless scenarios. For the one single change, I must run at least 12 tests. This was not fun.

I decided that I don't want to do this anymore and this is how the [Perfrunner](https://github.com/Drag13/perfrunner) appeared.

Perfrunner is a simple CLI tool, that launches your web site or web application, collects performance metrics, and reports them back to you. The cool part is that Perfrunner doing not only the single run but the series of runs against different networks, cache and CPU conditions!

In other words, Perfrunner loads your application several times (3 by default) against each condition, calculates average results, and display you the difference between all previous runs. You don't have to run them manually anymore or calculate difference anymore, it is all automated!

Enough words, it's showtime!

## Install Perfrunner

Install Perfrunner and add launch script to the package.json:

```cmd
npm i perfrunner -D
```

```json
{
  "scripts": {
    "perfrunner": "perfrunner"
  }
}
```

## Generate inital data

Run Perfrunner to get inital data.

```cmd
npm run perfrunner https://drag13.io
```

## Make the changes and test again

Now, change something that might affect performance (I added jQuery to the top of the page) and run Perfrunner one more time. Open folder named `generated/{your_site_name}` and than open the `default-report.html`.

![original network test, 25ms diff](./original_1.png)

At the report you will see at least four different charts:

- Application Events with First-Paint, First-Contentful-Paint, Largest-Contentfult-Paint, DomContentLoaded and Dom Interactive events.
- Common performance metrics like Layout Duration, Script Duration, Recalculate Style Duration
- Size of the resources loaded before First-Contentful-Paint event
- All sizes of the resources loaded by the site.

Also, if you are using performance marks, it will show the performance marks chart as well. And what is even better - you can switch to the second tab and see how your changes affect the performance for the fast3g type of network!

![fast-3g network test, 100ms diff](./fast3g.png)

As you can see, for the fast-3g network, the First-Contentful-Paint event appeared 75 ms later than for the regular network.

You also ca can instruct Perfrunner to use additional network conditions, like slow-3g or regular-4g:

```cmd
npm run perfrunner http://drag13.io -- --network slow-3g fast-3g hspa regular-4g online
```

or you can do testing against cached resources and not cached:

```cmd
npm run perfrunner http://drag13.io -- --cache true false
```

And of course, you can combine this together to get as much information as you need:

```cmd
npm run perfrunner http://drag13.io -- --network slow-3g fast-3g hspa regular-4g online --cache true false
```

Apart network conditions, Perfrunner also supports CPU throttling with -T flag:

```cmd
npm run perfrunner http://drag13.io -- -T 8
```

This will set 8x throttling for your CPU. It is useful when you want to test your changes against slow devices.

## Advanced things

Perfrunner is more flexible than at first sight. First of all, if you don't want default-html reporter, you can switch it to CSV or JSON format, using `--reporter` flag. You also can write your own reporter and use it with option:

```
npx perfrunner http://drag13.io --reporter my-custom-reporter.js
```

where reporter should looks like:

```js
module.exports = (outputFolder, data, args) => console.log(outputFolder, JSON.stringify(data), args);
```

Another useful trick is that Perfrunner also collects all Chrome traces from every test run. If you will need more detailed information, you can open `generated/{your_site_name/traces}` and get all the additional information you need.

## Troubleshooting.

Perfrunner based on [puppeteer](https://github.com/puppeteer/puppeteer), so it has all weaknesses and advantages of it. If you struggle with launching Perfrurunner, please visit [troubleshooting](https://developers.google.com/web/tools/puppeteer/troubleshooting) page. From my side, Perfrunner supports `--chrome-args` and `--ignore-default-args` flags. It also supports `--executablePath`, so you can launch Perfrunner on your own Chrome instance if nothing other helps.

## Final words

Summarizing, Perfrunner is a great tool to quickly check your performance improvements. It supports various network conditions, CPU throttling, and much more. If you have any question or issue, feel free to visit [github](https://github.com/Drag13/perfrunner/issues) or contact me on [twitter](https://twitter.com/drag137).

Wish you the fastest app!

<span>Photo by <a href="https://unsplash.com/@veri_ivanova?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Veri Ivanova</a> on <a href="https://unsplash.com/s/photos/speed?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>