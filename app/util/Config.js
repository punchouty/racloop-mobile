
Ext.define('Racloop.util.Config', {
    singleton: true,
    alternateClassName: ['Config'],

    config: {
        env: 'local',
        app: {
            messageText: 'Test message.'
        },
        services: {
            timeout: 5000
        },
        toastTimeout : 2500,
        initComplete : false,
        //Setting menu
        settingNameProfile : 'Profile',
        settingNameChangePassword : 'Change Password',
        settingNameEmergencyContacts : 'Emergency Contacts',
        settingNameDataPrivacy : 'Data Privacy',
        settingNameTerms : 'Terms and Conditions',
        settingNameLogout : 'Logout',
        //Tabs
        tabHome : 'Home',
        tabSearch : 'Search',
        tabMyJourneys : 'My Journeys',
        tabHistory : 'History',
        tabNotifications : 'Notifications',
        tabSettings : 'Settings',
        tabSos : 'SOS!',
        //encryption for storage
        quote : 'believe you can',
        cypherJsonFormatter : {
            stringify: function (cipherParams) {
                // create json object with ciphertext
                var jsonObj = {
                    ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)
                };

                // optionally add iv and salt
                if (cipherParams.iv) {
                    jsonObj.iv = cipherParams.iv.toString();
                }
                if (cipherParams.salt) {
                    jsonObj.s = cipherParams.salt.toString();
                }

                // stringify json object
                return JSON.stringify(jsonObj);
            },

            parse: function (jsonStr) {
                // parse json string
                var jsonObj = JSON.parse(jsonStr);

                // extract ciphertext from json object, and create cipher params object
                var cipherParams = CryptoJS.lib.CipherParams.create({
                    ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct)
                });

                // optionally extract iv and salt
                if (jsonObj.iv) {
                    cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv)
                }
                if (jsonObj.s) {
                    cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s)
                }

                return cipherParams;
            }
        },
        url: {}        
    },
    constructor: function() {
        if (this.config.env == 'prod') {
            this.config.locationUpdateFrequency = 180000;
            this.config.url.RACLOOP_LOGIN = 'http://www.racloop.com/mlogin';
            this.config.url.RACLOOP_LOGOUT = 'http://www.racloop.com/mlogout';
            this.config.url.RACLOOP_SIGNUP = 'http://www.racloop.com/msignup';
            this.config.url.RACLOOP_VERIFYMOBILE = 'http://www.racloop.com//mverifymobile';
            this.config.url.RACLOOP_RESENDSMS = 'http://www.racloop.com//mresendsms';
            this.config.url.RACLOOP_CHANGEPASSWORD = 'http://www.racloop.com/mpassword';
            this.config.url.RACLOOP_EDIT = 'http://www.racloop.com/meditprofile';
            this.config.url.RACLOOP_FORGOTPASSWORD = 'http://www.racloop.com/mforgot';
            this.config.url.RACLOOP_SEARCH = 'http://www.racloop.com/mobile/search';
            this.config.url.RACLOOP_SEARCH_AGAIN = 'http://www.racloop.com/mobile/searchAgain';
            this.config.url.RACLOOP_SAVE_JOURNEY = 'http://www.racloop.com/mobile/addJourney';
            this.config.url.RACLOOP_DELETE_JOURNEY = 'http://www.racloop.com/mobile/deleteJourney';
            this.config.url.RACLOOP_JOURNEYS = 'http://www.racloop.com/mobile/myJourneys';
            this.config.url.RACLOOP_HISTORY = 'http://www.racloop.com/mobile/history';
            this.config.url.RACLOOP_ACCEPTREQUEST = 'http://www.racloop.com/mobile/acceptResponse';
            this.config.url.RACLOOP_REJECTREQUEST = 'http://www.racloop.com/mobile/rejectResponse';
            this.config.url.RACLOOP_REQUEST = 'http://www.racloop.com/mobile/requestService';
            this.config.url.RACLOOP_CANCELREQUEST = 'http://www.racloop.com/mobile/cancelResponse';
            this.config.url.RACLOOP_EXISTINGJOURNEY='http://www.racloop.com/mobile/searchWithExistingJourney';
            this.config.url.RACLOOP_TERMS='http://www.racloop.com/mobile/terms';
            this.config.url.RACLOOP_PRIVACY='http://www.racloop.com/mobile/privacy';
            this.config.url.RACLOOP_SAVE_EMERGENCY_CONTACTS='http://www.racloop.com/mobile/saveEmergencyContacts';
            this.config.url.RACLOOP_SOS='http://www.racloop.com/mobile/sos';
        } else if (this.config.env == 'dev') {
            this.config.locationUpdateFrequency = 20000;
            this.config.url.RACLOOP_LOGIN = 'http://localhost:8080/app/mlogin';
            this.config.url.RACLOOP_LOGOUT = 'http://localhost:8080/app/mlogout';
            this.config.url.RACLOOP_SIGNUP = 'http://localhost:8080/app/msignup';
            this.config.url.RACLOOP_VERIFYMOBILE = 'http://localhost:8080/app/mverifymobile';
            this.config.url.RACLOOP_RESENDSMS = 'http://localhost:8080/app/mresendsms';
            this.config.url.RACLOOP_CHANGEPASSWORD = 'http://localhost:8080/app/mpassword';
            this.config.url.RACLOOP_EDIT = 'http://localhost:8080/app/meditprofile';
            this.config.url.RACLOOP_FORGOTPASSWORD = 'http://localhost:8080/app/mforgot';
            this.config.url.RACLOOP_SEARCH = 'http://localhost:8080/app/mobile/search';
            this.config.url.RACLOOP_SEARCH_AGAIN = 'http://localhost:8080/app/mobile/searchAgain';
            this.config.url.RACLOOP_SAVE_JOURNEY = 'http://localhost:8080/app/mobile/addJourney';
            this.config.url.RACLOOP_DELETE_JOURNEY = 'http://localhost:8080/app/mobile/deleteJourney';
            this.config.url.RACLOOP_JOURNEYS = 'http://localhost:8080/app/mobile/myJourneys';
            this.config.url.RACLOOP_HISTORY = 'http://localhost:8080/app/mobile/history';
            this.config.url.RACLOOP_ACCEPTREQUEST = 'http://localhost:8080/app/mobile/acceptResponse';
            this.config.url.RACLOOP_REJECTREQUEST = 'http://localhost:8080/app/mobile/rejectResponse';
            this.config.url.RACLOOP_REQUEST = 'http://localhost:8080/app/mobile/requestService';
            this.config.url.RACLOOP_CANCELREQUEST = 'http://localhost:8080/app/mobile/cancelResponse';
            this.config.url.RACLOOP_EXISTINGJOURNEY='http://localhost:8080/app/mobile/searchWithExistingJourney';
            this.config.url.RACLOOP_TERMS='http://localhost:8080/app/mobile/terms';
            this.config.url.RACLOOP_PRIVACY='http://localhost:8080/app/mobile/privacy';
            this.config.url.RACLOOP_SAVE_EMERGENCY_CONTACTS='http://localhost:8080/app/mobile/saveEmergencyContacts';
            this.config.url.RACLOOP_SOS='http://localhost:8080/app/mobile/sos';
        } else {
            var ip = "192.168.1.11";
            this.config.locationUpdateFrequency = 20000;
            this.config.url.RACLOOP_LOGIN = 'http://' + ip + ':8080/app/mlogin';
            this.config.url.RACLOOP_LOGOUT = 'http://' + ip + ':8080/app/mlogout';
            this.config.url.RACLOOP_SIGNUP = 'http://' + ip + ':8080/app/msignup';
            this.config.url.RACLOOP_VERIFYMOBILE = 'http://' + ip + ':8080/app/mverifymobile';
            this.config.url.RACLOOP_RESENDSMS = 'http://' + ip + ':8080/app/mresendsms';
            this.config.url.RACLOOP_CHANGEPASSWORD = 'http://' + ip + ':8080/app/mpassword';
            this.config.url.RACLOOP_EDIT = 'http://' + ip + ':8080/app/meditprofile';
            this.config.url.RACLOOP_FORGOTPASSWORD = 'http://' + ip + ':8080/app/mforgot';
            this.config.url.RACLOOP_SEARCH = 'http://' + ip + ':8080/app/mobile/search';
            this.config.url.RACLOOP_SEARCH_AGAIN = 'http://' + ip + ':8080/app/mobile/searchAgain';
            this.config.url.RACLOOP_SAVE_JOURNEY = 'http://' + ip + ':8080/app/mobile/addJourney';
            this.config.url.RACLOOP_DELETE_JOURNEY = 'http://' + ip + ':8080/app/mobile/deleteJourney';
            this.config.url.RACLOOP_JOURNEYS = 'http://' + ip + ':8080/app/mobile/myJourneys';
            this.config.url.RACLOOP_HISTORY = 'http://' + ip + ':8080/app/mobile/history';
            this.config.url.RACLOOP_ACCEPTREQUEST = 'http://' + ip + ':8080/app/mobile/acceptResponse';
            this.config.url.RACLOOP_REJECTREQUEST = 'http://' + ip + ':8080/app/mobile/rejectResponse';
            this.config.url.RACLOOP_REQUEST = 'http://' + ip + ':8080/app/mobile/requestService';
            this.config.url.RACLOOP_CANCELREQUEST = 'http://' + ip + ':8080/app/mobile/cancelResponse';
            this.config.url.RACLOOP_EXISTINGJOURNEY='http://' + ip + ':8080/app/mobile/searchWithExistingJourney';
            this.config.url.RACLOOP_TERMS='http://' + ip + ':8080/app/mobile/terms';
            this.config.url.RACLOOP_PRIVACY='http://' + ip + ':8080/app/mobile/privacy';
            this.config.url.RACLOOP_SAVE_EMERGENCY_CONTACTS='http://' + ip + ':8080/app/mobile/saveEmergencyContacts';
            this.config.url.RACLOOP_SOS='http://' + ip + ':8080/app/mobile/sos';
        }
        return this.config;
    }
});