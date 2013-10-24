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
