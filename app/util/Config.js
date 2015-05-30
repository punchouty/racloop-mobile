
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
        zeroResultsHtml : '<div class="section-header">' +
                            '<div class="small-text-medium uppercase colored-text">' +
                            'No Results Found' +
                            '</div>' +
                            '<div class="colored-line"></div>' +
                            '<div class="sub-heading">We got your request and We will connect with you soon.</div>' +
                            '</div>',
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
            this.config.locationUpdateFrequency = 180000;this.config.url.RACLOOP_LOGIN = 'http://www.racloop.com/app/userMobile/login';
            this.config.url.RACLOOP_LOGOUT = 'http://www.racloop.com/app/userMobile/logout';
            this.config.url.RACLOOP_SIGNUP = 'http://www.racloop.com/app/userMobile/signup';
            this.config.url.RACLOOP_VERIFYMOBILE = 'http://www.racloop.com/app/userMobile/verifyMobile';
            this.config.url.RACLOOP_RESENDSMS = 'http://www.racloop.com/app/userMobile/resendSms';
            this.config.url.RACLOOP_CHANGEPASSWORD = 'http://www.racloop.com/app/userMobile/changePassword';
            this.config.url.RACLOOP_EDIT = 'http://www.racloop.com/app/userMobile/editProfile';
            this.config.url.RACLOOP_FORGOTPASSWORD = 'http://www.racloop.com/app/userMobile/forgotPassword';
            this.config.url.RACLOOP_SAVE_EMERGENCY_CONTACTS='http://www.racloop.com/app/userMobile/saveEmergencyContacts';
            this.config.url.RACLOOP_SOS='http://www.racloop.com/app/userMobile/sos';
            this.config.url.RACLOOP_TERMS='http://www.racloop.com/app/userMobile/terms';
            this.config.url.RACLOOP_PRIVACY='http://www.racloop.com/app/userMobile/privacy';
            this.config.url.RACLOOP_GET_CURRENT_JOURNEY = 'http://www.racloop.com/app/userMobile/getCurrentJourney';
            this.config.url.RACLOOP_SEND_USER_RATING = 'http://www.racloop.com/app/userMobile/sendUserRating';

            this.config.url.RACLOOP_JOURNEYS = 'http://www.racloop.com/app/journeyMobile/myJourneys';
            this.config.url.RACLOOP_CHILD_JOURNEYS = 'http://www.racloop.com/app/journeyMobile/childJourneys';
            this.config.url.RACLOOP_HISTORY = 'http://www.racloop.com/app/journeyMobile/myHistory';
            this.config.url.RACLOOP_SEARCH = 'http://www.racloop.com/app/journeyMobile/search';
            this.config.url.RACLOOP_SEARCH_AGAIN = 'http://www.racloop.com/app/journeyMobile/searchAgain';
            this.config.url.RACLOOP_KEEP_ORIGINAL_AND_SEARCH = 'http://www.racloop.com/app/journeyMobile/keepOriginalAndSearch';
            this.config.url.RACLOOP_REPLACE_AND_SEARCH = 'http://www.racloop.com/app/journeyMobile/replaceAndSearch';

            this.config.url.RACLOOP_SAVE_JOURNEY = 'http://www.racloop.com/app/workflowMobile/saveJourney';
            this.config.url.RACLOOP_DELETE_JOURNEY = 'http://www.racloop.com/app/workflowMobile/deleteJourney';
            this.config.url.RACLOOP_REQUEST = 'http://www.racloop.com/app/workflowMobile/sendRequest';
            this.config.url.RACLOOP_ACCEPTREQUEST = 'http://www.racloop.com/app/workflowMobile/acceptRequest';
            this.config.url.RACLOOP_REJECTREQUEST = 'http://www.racloop.com/app/workflowMobile/rejectRequest';
            this.config.url.RACLOOP_CANCELREQUEST = 'http://www.racloop.com/app/workflowMobile/cancelRequest';


        } else if (this.config.env == 'dev') {
            this.config.locationUpdateFrequency = 20000;

            this.config.url.RACLOOP_LOGIN = 'http://localhost:8080/app/userMobile/login';
            this.config.url.RACLOOP_LOGOUT = 'http://localhost:8080/app/userMobile/logout';
            this.config.url.RACLOOP_SIGNUP = 'http://localhost:8080/app/userMobile/signup';
            this.config.url.RACLOOP_VERIFYMOBILE = 'http://localhost:8080/app/userMobile/verifyMobile';
            this.config.url.RACLOOP_RESENDSMS = 'http://localhost:8080/app/userMobile/resendSms';
            this.config.url.RACLOOP_CHANGEPASSWORD = 'http://localhost:8080/app/userMobile/changePassword';
            this.config.url.RACLOOP_EDIT = 'http://localhost:8080/app/userMobile/editProfile';
            this.config.url.RACLOOP_FORGOTPASSWORD = 'http://localhost:8080/app/userMobile/forgotPassword';
            this.config.url.RACLOOP_SAVE_EMERGENCY_CONTACTS='http://localhost:8080/app/userMobile/saveEmergencyContacts';
            this.config.url.RACLOOP_SOS='http://localhost:8080/app/userMobile/sos';
            this.config.url.RACLOOP_TERMS='http://localhost:8080/app/userMobile/terms';
            this.config.url.RACLOOP_PRIVACY='http://localhost:8080/app/userMobile/privacy';
            this.config.url.RACLOOP_GET_CURRENT_JOURNEY = 'http://localhost:8080/app/userMobile/getCurrentJourney';
            this.config.url.RACLOOP_SEND_USER_RATING = 'http://localhost:8080/app/userMobile/sendUserRating';

            this.config.url.RACLOOP_JOURNEYS = 'http://localhost:8080/app/journeyMobile/myJourneys';
            this.config.url.RACLOOP_CHILD_JOURNEYS = 'http://localhost:8080/app/journeyMobile/childJourneys';
            this.config.url.RACLOOP_HISTORY = 'http://localhost:8080/app/journeyMobile/myHistory';
            this.config.url.RACLOOP_SEARCH = 'http://localhost:8080/app/journeyMobile/search';
            this.config.url.RACLOOP_SEARCH_AGAIN = 'http://localhost:8080/app/journeyMobile/searchAgain';
            this.config.url.RACLOOP_KEEP_ORIGINAL_AND_SEARCH = 'http://localhost:8080/app/journeyMobile/keepOriginalAndSearch';
            this.config.url.RACLOOP_REPLACE_AND_SEARCH = 'http://localhost:8080/app/journeyMobile/replaceAndSearch';

            this.config.url.RACLOOP_SAVE_JOURNEY = 'http://localhost:8080/app/workflowMobile/saveJourney';
            this.config.url.RACLOOP_DELETE_JOURNEY = 'http://localhost:8080/app/workflowMobile/deleteJourney';
            this.config.url.RACLOOP_REQUEST = 'http://localhost:8080/app/workflowMobile/sendRequest';
            this.config.url.RACLOOP_ACCEPTREQUEST = 'http://localhost:8080/app/workflowMobile/acceptRequest';
            this.config.url.RACLOOP_REJECTREQUEST = 'http://localhost:8080/app/workflowMobile/rejectRequest';
            this.config.url.RACLOOP_CANCELREQUEST = 'http://localhost:8080/app/workflowMobile/cancelRequest';

        } else {
            var ip = "127.0.0.1";//"192.168.1.3";
            this.config.locationUpdateFrequency = 20000;

            this.config.url.RACLOOP_LOGIN = 'http://' + ip + ':8080/app/userMobile/login';
            this.config.url.RACLOOP_LOGOUT = 'http://' + ip + ':8080/app/userMobile/logout';
            this.config.url.RACLOOP_SIGNUP = 'http://' + ip + ':8080/app/userMobile/signup';
            this.config.url.RACLOOP_VERIFYMOBILE = 'http://' + ip + ':8080/app/userMobile/verifyMobile';
            this.config.url.RACLOOP_RESENDSMS = 'http://' + ip + ':8080/app/userMobile/resendSms';
            this.config.url.RACLOOP_CHANGEPASSWORD = 'http://' + ip + ':8080/app/userMobile/changePassword';
            this.config.url.RACLOOP_EDIT = 'http://' + ip + ':8080/app/userMobile/editProfile';
            this.config.url.RACLOOP_FORGOTPASSWORD = 'http://' + ip + ':8080/app/userMobile/forgotPassword';
            this.config.url.RACLOOP_SAVE_EMERGENCY_CONTACTS='http://' + ip + ':8080/app/userMobile/saveEmergencyContacts';
            this.config.url.RACLOOP_SOS='http://' + ip + ':8080/app/userMobile/sos';
            this.config.url.RACLOOP_TERMS='http://' + ip + ':8080/app/userMobile/terms';
            this.config.url.RACLOOP_PRIVACY='http://' + ip + ':8080/app/userMobile/privacy';
            this.config.url.RACLOOP_GET_CURRENT_JOURNEY = 'http://' + ip + ':8080/app/userMobile/getCurrentJourney';
            this.config.url.RACLOOP_SEND_USER_RATING = 'http://' + ip + ':8080/app/userMobile/sendUserRating';

            this.config.url.RACLOOP_JOURNEYS = 'http://' + ip + ':8080/app/journeyMobile/myJourneys';
            this.config.url.RACLOOP_CHILD_JOURNEYS = 'http://' + ip + ':8080/app/journeyMobile/childJourneys';
            this.config.url.RACLOOP_HISTORY = 'http://' + ip + ':8080/app/journeyMobile/myHistory';
            this.config.url.RACLOOP_SEARCH = 'http://' + ip + ':8080/app/journeyMobile/search';
            this.config.url.RACLOOP_SEARCH_AGAIN = 'http://' + ip + ':8080/app/journeyMobile/searchAgain';
            this.config.url.RACLOOP_KEEP_ORIGINAL_AND_SEARCH = 'http://' + ip + ':8080/app/journeyMobile/keepOriginalAndSearch';
            this.config.url.RACLOOP_REPLACE_AND_SEARCH = 'http://' + ip + ':8080/app/journeyMobile/replaceAndSearch';

            this.config.url.RACLOOP_SAVE_JOURNEY = 'http://' + ip + ':8080/app/workflowMobile/saveJourney';
            this.config.url.RACLOOP_DELETE_JOURNEY = 'http://' + ip + ':8080/app/workflowMobile/deleteJourney';
            this.config.url.RACLOOP_REQUEST = 'http://' + ip + ':8080/app/workflowMobile/sendRequest';
            this.config.url.RACLOOP_ACCEPTREQUEST = 'http://' + ip + ':8080/app/workflowMobile/acceptRequest';
            this.config.url.RACLOOP_REJECTREQUEST = 'http://' + ip + ':8080/app/workflowMobile/rejectRequest';
            this.config.url.RACLOOP_CANCELREQUEST = 'http://' + ip + ':8080/app/workflowMobile/cancelRequest';
        }
        return this.config;
    }
});