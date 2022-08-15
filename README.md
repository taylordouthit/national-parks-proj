## Focus Site Blocker

![focus extension logo](icons/logo.png)

# Description

Focus site blocker is a chrome browser extension that blocks websites for the sake of productivity.

# General Architecture

- /debugger/ ----------- a debugging function
- /icons/ -------------- add, remove, and logo icons
- /options/ ------------ options page
- /popup/ -------------- popup page
- /redirect/ ----------- redirect page
- /runtime/ ------------ wraps runtime api
- /storage/ ------------ wraps storage api
- background.js -------- service worker that updates rules
- content-script.js ---- currently only used when Debugging
- manifest.json -------- configuration for the extension

# Debugging

To debug the application, add this to manifest.json:

```
"content_scripts": [
  {
    "matches": ["<all_urls>"],
    "js": ["content-script.js"]
  }
]
```

This will allow you to see logs in the Chrome dev tools console. If you didn't add this configuration, you could still see the logs, but you'd have to open the dev tools for the chrome extension itself--which is one more click and who has time for that? Just make sure to use `debug()` instead of `console.log()`.
