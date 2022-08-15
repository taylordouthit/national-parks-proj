To debug the application, add this to manifest.json:

```
"content_scripts": [
  {
    "matches": ["<all_urls>"],
    "js": ["content-script.js"]
  }
]
```

and make use of the `debug` function within `debugger.js`
