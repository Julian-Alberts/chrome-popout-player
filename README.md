# Popout Player
Since Version 70 Google Chrome supportes Picure in Picture Mode for the HTML 5 video element. This small extension enables you to access this feature through a simple click on a newly added button.

## Currently supported platforms
Platform|IFrame support|Since version|IFrame support since version
-|-|-|-
[d.tube](https://d.tube)| :heavy_check_mark: 
[netflix.com](https://netflix.com)| :x: 
[twitch.tv](https://twitch.tv)| :heavy_check_mark:
[youtube.com](https://youtube.com)| :heavy_check_mark:

# Installation

## Github
1. Open [chrome://extensions/](chrome://extensions/)
1. Enable developer mode
1. Click the "Load unpacked extension" button
1. Select the bin/ folder in the repository. Should there not be an bin/ folder continue reading under Contributing > Building.

## Chrome web store
Comming soon

# Contributing
Feel free to create merge request to add new platforms to the list. Please keep in mind that only family friendly pages will be supported by this plugin.

## Building
Before you can build a new version of this plugin you have to compile the build script under ./build with `tsc`. When you have cumpiled this script you can run `node build/build.js` from the project root. The new Version will be available under ./bin 

