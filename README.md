Racloop Mobile App
====================

Installation
-------------

* Install node js
* sudo npm install
* sudo npm install -g http-server
* sudo npm install -g cordova
* sudo npm install -g phonegap
* sudo npm install -g ios-sim
* clone reporsiory from Github or 
* sencha phonegap init FFUH83A68B.com.racloop.app
* sencha ant sass

Notes for Node.js
---------------------

if node is not working - *npm link express*

Help at [server.js](https://github.com/spadin/simple-express-static-server)

Notes for Sencha Touch
---------------------

* sencha fs web -p 80 start -map /path/to/htdocs/
* sencha -sdk /Users/rpunch/Documents/touch-2.3.1 generate app Racloop .
* sencha generate model Setting id,gps:boolean,city:string,country:string
* sencha generate form -name SettingsView -fields city:textfield,country:textfield

Notes Other
-------------

* phonegap remote login -u myemailadress@gmail.com -p mypassw0rd*
* Issue with message alert and its solution - http://www.sencha.com/forum/showthread.php?284450

Google Autocomplete Help
------------------------

http://www.sencha.com/forum/showthread.php?226731-Sencha-2-Google-Places-Autocomplete
http://www.sencha.com/forum/showthread.php?212154-How-to-get-google.maps.places.Autocomplete-working-on-iOS&p=1062822#post1062822

Notes for Phonegap Remote build
-------------------------------

* sencha app clean
* sencha app build native

To initialise (First time only)
* sencha phonegap init com.racloop.mobile Racloop
* Follow - http://www.joshmorony.com/using-sencha-touch-with-phonegap-build/

Notes for Phonegap - Do not use. Instead use remote build
------------------

* phonegap create my-app
* phonegap build android
* 

Notes for Phonegap + Sencha - Do not use. Instead use remote build
----------------------------

* sencha -sdk /Users/rpunch/Documents/touch-2.3.1 generate app OneApp ./OneApp
* sencha phonegap init com.example.OneApp OneApp
* in app.json uncomment  - "platform": "ios" and "remote":false under build configuration
* sencha app build -run native
*

Important Commands
-------------

* sencha ant sass :- generate css
* sencha app refresh :- after any changes in app.json (addition of third party lib)
* sencha app build native :- make build on build.phonegap.com

TO DO
------
* Session time out issue - check for mobile also - To change session time out - http://grails.github.io/grails-howtos/en/performanceTuning.html
* Start up image and app icons
* Edit of mobile should trigger SMS verification - message box at start up
* Push notification
* Verify SMS - DOne
* Security App - requirements clear
* History
* My Journey - UI
* Search - UI
* Domain and Branding - Not doing any thing
* Icons change - Done
* Data privacy clause in "Privacy" statement - Eergency COntact
* Term and Privacy in mobile app
* Tab color - Done
* HTTPS - ????
* Unique error from server - change message.properties - Done
* Mobile code for SMS - Done
* Edit profile from mobile - changes for sms verification pending (server side)
* Emergency contacts functionality pending
* facebook integration
* Batch job for review
* Archiving
* Implement privacy and terms on server for mobile (as well as web app). See Mobile controller.

* Distance from start location
* No of time racloop used
* Star rating dispaly
* Review Screen - revamp

* Three nearest people - destination and origin


Notes for iOS
--------------

* http://www.raywenderlich.com/32960/apple-push-notification-services-in-ios-6-tutorial-part-1

