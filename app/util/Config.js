
Ext.define('Racloop.util.Config', {
    singleton: true,
    alternateClassName: ['Config'],

    config: {
        env: 'dev',
        app: {
            messageText: 'Test message.'
        },
        services: {
            timeout: 5000
        },
        toastTimeout : 3000,
        //Setting menu
        settingNameProfile : 'Profile',
        settingNameChangePassword : 'Change Password',
        settingNameEmergencyContacts : 'Emergency Contacts',
        settingNameDataPrivacy : 'Data Privacy',
        settingNameTerms : 'Terms and Conditions',
        settingNameLogout : 'Logout',
        //Tabs
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
        if (this.config.env == null) {
            this.config.url.RACLOOP_LOGIN = '/test-data/login_success.json';
            this.config.url.RACLOOP_LOGOUT = '/test-data/logout.json';
            this.config.url.RACLOOP_SIGNUP = '/test-data/registeration_success.json';
            this.config.url.RACLOOP_CHANGEPASSWORD = '/test-data/change_password.json';
            this.config.url.RACLOOP_EDIT = '/test-data/accept_request.json';
            this.config.url.RACLOOP_FORGOTPASSWORD = '/test-data/accept_request.json';
            this.config.url.RACLOOP_SEARCH = '/test-data/accept_request.json';
            this.config.url.RACLOOP_JOURNEYS = '/test-data/accept_request.json';
            this.config.url.RACLOOP_ACCEPTREQUEST = '/test-data/accept_request.json';
            this.config.url.RACLOOP_REJECTREQUEST = '/test-data/reject_request.json';
            this.config.url.RACLOOP_REQUEST = '/test-data/request_success.json';
            this.config.url.RACLOOP_CANCELREQUEST = '/test-data/request_cancel.json';
        } else if (this.config.env == 'prod') {
            this.config.url.RACLOOP_LOGIN = 'http://www.racloop.com/mlogin';
            this.config.url.RACLOOP_LOGOUT = 'http://www.racloop.com/mlogout';
            this.config.url.RACLOOP_SIGNUP = 'http://www.racloop.com/msignup';
            this.config.url.RACLOOP_VERIFYMOBILE = 'http://www.racloop.com//mverifymobile';
            this.config.url.RACLOOP_RESENDSMS = 'http://www.racloop.com//mresendsms';
            this.config.url.RACLOOP_CHANGEPASSWORD = 'http://www.racloop.com/mpassword';
            this.config.url.RACLOOP_EDIT = 'http://www.racloop.com/meditprofile';
            this.config.url.RACLOOP_FORGOTPASSWORD = 'http://www.racloop.com/mforgot';
            this.config.url.RACLOOP_SEARCH = 'http://www.racloop.com/mobile/search';
            this.config.url.RACLOOP_JOURNEYS = 'http://www.racloop.com/mobile/myJourneys';
            this.config.url.RACLOOP_HISTORY = 'http://www.racloop.com/mobile/history';
            this.config.url.RACLOOP_ACCEPTREQUEST = 'http://www.racloop.com/mobile/acceptResponse';
            this.config.url.RACLOOP_REJECTREQUEST = 'http://www.racloop.com/mobile/rejectResponse';
            this.config.url.RACLOOP_REQUEST = 'http://www.racloop.com/mobile/requestService';
            this.config.url.RACLOOP_CANCELREQUEST = 'http://www.racloop.com/mobile/cancelResponse';
            this.config.url.RACLOOP_EXISTINGJOURNEY='http://www.racloop.com/mobile/searchWithExistingJourney';
            this.config.url.RACLOOP_TERMS='http://www.racloop.com/mobile/terms';
            this.config.url.RACLOOP_PRIVACY='http://www.racloop.com/mobile/privacy';
        } else if (this.config.env == 'dev') {
            this.config.url.RACLOOP_LOGIN = 'http://localhost:8080/app/mlogin';
            this.config.url.RACLOOP_LOGOUT = 'http://localhost:8080/app/mlogout';
            this.config.url.RACLOOP_SIGNUP = 'http://localhost:8080/app/msignup';
            this.config.url.RACLOOP_VERIFYMOBILE = 'http://localhost:8080/app/mverifymobile';
            this.config.url.RACLOOP_RESENDSMS = 'http://localhost:8080/app/mresendsms';
            this.config.url.RACLOOP_CHANGEPASSWORD = 'http://localhost:8080/app/mpassword';
            this.config.url.RACLOOP_EDIT = 'http://localhost:8080/app/meditprofile';
            this.config.url.RACLOOP_FORGOTPASSWORD = 'http://localhost:8080/app/mforgot';
            this.config.url.RACLOOP_SEARCH = 'http://localhost:8080/app/mobile/search';
            this.config.url.RACLOOP_JOURNEYS = 'http://localhost:8080/app/mobile/myJourneys';
            this.config.url.RACLOOP_HISTORY = 'http://localhost:8080/app/mobile/history';
            this.config.url.RACLOOP_ACCEPTREQUEST = 'http://localhost:8080/app/mobile/acceptResponse';
            this.config.url.RACLOOP_REJECTREQUEST = 'http://localhost:8080/app/mobile/rejectResponse';
            this.config.url.RACLOOP_REQUEST = 'http://localhost:8080/app/mobile/requestService';
            this.config.url.RACLOOP_CANCELREQUEST = 'http://localhost:8080/app/mobile/cancelResponse';
            this.config.url.RACLOOP_EXISTINGJOURNEY='http://localhost:8080/app/mobile/searchWithExistingJourney';
            this.config.url.RACLOOP_TERMS='http://localhost:8080/app/mobile/terms';
            this.config.url.RACLOOP_PRIVACY='http://localhost:8080/app/mobile/privacy';
        } else {
            this.config.url.RACLOOP_LOGIN = '/test-data/login_success.json';
            this.config.url.RACLOOP_LOGOUT = '/test-data/logout.json';
            this.config.url.RACLOOP_SIGNUP = '/test-data/registeration_success.json';
            this.config.url.RACLOOP_CHANGEPASSWORD = '/test-data/change_password.json';
            this.config.url.RACLOOP_EDIT = '/test-data/accept_request.json';
            this.config.url.RACLOOP_FORGOTPASSWORD = '/test-data/accept_request.json';
            this.config.url.RACLOOP_SEARCH = '/test-data/accept_request.json';
            this.config.url.RACLOOP_JOURNEYS = '/test-data/accept_request.json';
            this.config.url.RACLOOP_ACCEPTREQUEST = '/test-data/accept_request.json';
            this.config.url.RACLOOP_REJECTREQUEST = '/test-data/reject_request.json';
            this.config.url.RACLOOP_REQUEST = '/test-data/request_success.json';
            this.config.url.RACLOOP_CANCELREQUEST = '/test-data/request_cancel.json';
        }
        return this.config;
    }
});