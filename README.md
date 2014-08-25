timerApp
========

This is a continuation of my blog post from last month [Mobile Apps Phonegap Yeoman](http://lucaspaulger.com/javascript/2013/09/25/Mobile-apps-Phonegap-Yeoman/). I decide to spend a little more time to enhance the application, submit it to iTunes and publish it to the [web](http://lucaspaulger.com/timerApp/) (try out the app to the left). The iPhone App will be available soon in [the app store](https://itunes.apple.com/us/app/repeat-timer-lp/id730948498?ls=1&mt=8). Feel free to leave comments and let me know what you think. Please find the [Github repository here](https://github.com/lpaulger/timerApp).

## Getting started

##### Clone the project

    git clone git@github.com:lpaulger/timerApp.git

##### Install global tools
Assuming node, npm and optionally nvm are installed.
    
    npm install -g yo
    npm install -g cordova

##### run package installers
    
    npm install
    bower install

##### serve web
    
    grunt server

##### build web

    grunt build

##### build ios
    
    cordova plugin add org.apache.cordova.device
    cordova plugin add org.apache.cordova.vibration
    cordova plugin add org.apache.cordova.inappbrowser
    cordova platform add ios
    grunt build:phonegap    

##### serve ios

Open the TimerApp.xcodeproj within platforms/ios/

Run simulator


## The MIT License (MIT)

### Copyright (c) 2014 Lucas Paulger

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.