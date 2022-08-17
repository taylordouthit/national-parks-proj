## Focus Site Blocker

![focus extension logo](icons/logo.png)

# Description

Focus site blocker is a chrome browser extension that blocks websites for the sake of productivity.

# General Architecture

- /debugger/ ----------- a debugging function
- /icons/ -------------- icons used in project
- /options/ ------------ options page
- /popup/ -------------- popup modal
- /redirect/ ----------- redirect page
- /runtime/ ------------ wraps runtime api
- /storage/ ------------ wraps storage api
- background.js -------- service worker that updates dynamic rules
- manifest.json -------- configuration for the extension
