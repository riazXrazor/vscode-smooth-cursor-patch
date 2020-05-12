#!/usr/bin/env node
var fs = require("fs");
var path = require("path");
var vscodepath = process.argv[2]; // vscode install path
var revert = process.argv[3]; // revert patch
var filePath =
  "\\resources\\app\\out\\vs\\workbench\\workbench.desktop.main.css";
var datatopatch = ".cursor{transition:all 80ms}";
if (!path) {
  console.error("First argument is <install_path> for VS Code.");
  process.exit(0);
}

var fullfilepath = path.normalize(vscodepath + filePath);
if (revert === "--clear-patch" || revert === "-c") {
  if (!fs.existsSync(fullfilepath + ".backup")) {
    console.error("No patch to clear yet !!");
    process.exit(0);
  }
  var r = fs.readFileSync(fullfilepath + ".backup");
  var w = fs.writeFileSync(fullfilepath + ".txt", r);

  if (w) {
    console.error("Error unable to patch : ");
    if (e.code == "EPERM") {
      console.error("Run the script with Administrative permission.");
    }
    process.exit(0);
  }
  fs.renameSync(fullfilepath, fullfilepath + ".old");
  fs.renameSync(fullfilepath + ".txt", fullfilepath);
  fs.unlinkSync(fullfilepath + ".old");
  console.log("Patch undone !!");

  process.exit(0);
}

fs.createReadStream(fullfilepath)
  .pipe(fs.createWriteStream(fullfilepath + ".backup"))
  .on("finish", function () {
    fs.appendFile(fullfilepath, datatopatch, function (err) {
      if (err) {
        console.error("Error:");
        console.log(err);
        return;
      }

      console.log("Patched successfully enjoy :) !!");
    });
  })
  .on("error", function (e) {
    console.error("Error unable to patch : ");
    if (e.code == "EPERM") {
      console.error("Run the script with Administrative permission.");
    }
  });
