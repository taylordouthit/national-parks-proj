const fse = require("fs-extra");

const copyFromTo = (srcDir, destDir, overwrite) => {
  fse.copySync(srcDir, destDir, { overwrite: overwrite }, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("success!");
    }
  });
};

copyFromTo("icons/", "dist/icons/", (overwrite = true));
copyFromTo(
  "options/options.html",
  "dist/options/options.html",
  (overwrite = true)
);
copyFromTo("popup/popup.html", "dist/popup/popup.html", (overwrite = true));
copyFromTo(
  "redirect/redirect.html",
  "dist/redirect/redirect.html",
  (overwrite = true)
);
copyFromTo("manifest.json", "dist/manifest.json", (overwrite = true));

require("esbuild").buildSync({
  entryPoints: [
    "options/options.js",
    "popup/popup.js",
    "redirect/redirect.js",
    "runtime/runtime.js",
    "storage/storage.js",
    "background.js",
  ],
  bundle: false,
  minify: true,
  outdir: "dist",
});

require("esbuild").buildSync({
  entryPoints: [
    "options/options.css",
    "popup/popup.css",
    "redirect/redirect.css",
  ],
  bundle: false,
  minify: true,
  outdir: "dist",
});
