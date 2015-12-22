
Ext.define('Racloop.util.Config', {
    singleton: true,
    alternateClassName: ['Config'],

    config: {
        env: 'prod',
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
        settingPreferences : 'Preferences',
        settingRecurringSearches: 'Recurring Rides',
        settingNameEmergencyContacts : 'Emergency Contacts',
        settingNameDataPrivacy : 'Data Privacy',
        settingNameTerms : 'Terms and Conditions',
        settingNameLogout : 'Logout',
        //Tabs
        tabHome : 'Home',
        tabSearch : 'Search',
        tabMyJourneys : 'My Rides',
        tabHistory : 'History',
        tabNotifications : 'Notifications',
        tabSettings : 'Settings',
        tabSos : 'SOS!',
        zeroResultsHtml : '<div class="startup-header">' +
                            '<div class="small-text-medium-empty uppercase colored-text">' +
                            'No Results Found' +
                            '</div>' +
                            '<div class="colored-line"></div>' +
                            '<div class="sub-heading-empty">We will notify you as soon as we find any matches for your ride.</div>' +
                            '</div>',
        zeroResultsHtmlMain : '<div class="startup-header">' +
                            '<div class="small-text-medium-empty uppercase colored-text">' +
                            'No Results Found' +
                            '</div>' +
                            '<div class="colored-line"></div>' +
                            '<div class="sub-heading-empty">But you can ' +
                                '<a href="#" id="searchFormSignInLink" class="racloop-btn racloop-btn-sm racloop-btn-default" onclick="Racloop.app.getController(\'UiController\').showLogin(); return false;">' +
                                'Sign In' +
                                '</a>' +
                            ' and save your request so that others can find you.</div>' +
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
            this.config.locationUpdateFrequency = 60000;
            this.facebookId = '1049343688459536';
            this.config.url.RACLOOP_LOGIN = 'http://www.oddlyeven.in/userMobile/login';
            this.config.url.RACLOOP_LOGOUT = 'http://www.oddlyeven.in/userMobile/logout';
            this.config.url.RACLOOP_SIGNUP = 'http://www.oddlyeven.in/userMobile/signup';
            this.config.url.RACLOOP_VERIFYMOBILE = 'http://www.oddlyeven.in/userMobile/verifyMobile';
            this.config.url.RACLOOP_RESENDSMS = 'http://www.oddlyeven.in/userMobile/resendSms';
            this.config.url.RACLOOP_CHANGEPASSWORD = 'http://www.oddlyeven.in/userMobile/changePassword';
            this.config.url.RACLOOP_EDIT = 'http://www.oddlyeven.in/userMobile/editProfile';
            this.config.url.RACLOOP_SAVE_PREFERENCES = 'http://www.oddlyeven.in/userMobile/savePreferences';
            this.config.url.RACLOOP_FORGOTPASSWORD = 'http://www.oddlyeven.in/userMobile/forgotPassword';
            this.config.url.RACLOOP_SAVE_EMERGENCY_CONTACTS='http://www.oddlyeven.in/userMobile/saveEmergencyContacts';
            this.config.url.RACLOOP_SOS='http://www.oddlyeven.in/userMobile/sos';
            this.config.url.RACLOOP_TERMS='http://www.oddlyeven.in/userMobile/terms';
            this.config.url.RACLOOP_PRIVACY='http://www.oddlyeven.in/userMobile/privacy';
            this.config.url.RACLOOP_GET_CURRENT_JOURNEY = 'http://www.oddlyeven.in/userMobile/getCurrentJourney';
            this.config.url.RACLOOP_SEND_USER_RATING = 'http://www.oddlyeven.in/userMobile/sendUserRating';
            this.config.url.RACLOOP_CANCEL_USER_RATING = 'http://www.oddlyeven.in/userMobile/cancelUserRating';

            this.config.url.RACLOOP_JOURNEY_DETAILS = 'http://www.oddlyeven.in/journeyMobile/journeyDetails';
            this.config.url.RACLOOP_JOURNEYS = 'http://www.oddlyeven.in/journeyMobile/myJourneys';
            this.config.url.RACLOOP_CHILD_JOURNEYS = 'http://www.oddlyeven.in/journeyMobile/childJourneys';
            this.config.url.RACLOOP_PASSENGERS = 'http://www.oddlyeven.in/journeyMobile/passengers';
            this.config.url.RACLOOP_HISTORY = 'http://www.oddlyeven.in/journeyMobile/myHistory';
            this.config.url.RACLOOP_SEARCH = 'http://www.oddlyeven.in/journeyMobile/search';
            this.config.url.RACLOOP_SEARCH_AGAIN = 'http://www.oddlyeven.in/journeyMobile/searchAgain';
            this.config.url.RACLOOP_KEEP_ORIGINAL_AND_SEARCH = 'http://www.oddlyeven.in/journeyMobile/keepOriginalAndSearch';
            this.config.url.RACLOOP_REPLACE_AND_SEARCH = 'http://www.oddlyeven.in/journeyMobile/replaceAndSearch';

            this.config.url.RACLOOP_SAVE_JOURNEY = 'http://www.oddlyeven.in/workflowMobile/saveJourney';
            this.config.url.RACLOOP_DELETE_JOURNEY = 'http://www.oddlyeven.in/workflowMobile/deleteJourney';
            this.config.url.RACLOOP_REQUEST = 'http://www.oddlyeven.in/workflowMobile/sendRequest';
            this.config.url.RACLOOP_ACCEPTREQUEST = 'http://www.oddlyeven.in/workflowMobile/acceptRequest';
            this.config.url.RACLOOP_REJECTREQUEST = 'http://www.oddlyeven.in/workflowMobile/rejectRequest';
            this.config.url.RACLOOP_CANCELREQUEST = 'http://www.oddlyeven.in/workflowMobile/cancelRequest';
            this.config.url.RACLOOP_LOGIN_AS_FACEBOOK = 'http://www.oddlyeven.in/userMobile/loginFromFacebook';
            this.config.url.RACLOOP_MAKE_RECURRING = 'http://www.oddlyeven.in/preference/makeRecurring';
            this.config.url.RACLOOP_RECURRING_JOURNEY = 'http://www.oddlyeven.in/preference/recurringJourney';
            this.config.url.RACLOOP_DELETE_RECURRING_JOURNEY = 'http://www.oddlyeven.in/preference/deleteRecurringJourney';
            this.config.url.RACLOOP_NEARBY_LOCATIONS = 'http://www.oddlyeven.in/journeyMobile/nearByPoints';
            this.config.url.RACLOOP_REQUEST_AGAIN = 'http://www.oddlyeven.in/workflowMobile/requestAgain';
            this.config.url.RACLOOP_USER_IMAGE = 'http://www.oddlyeven.in/userMobile/setUserImage';
            this.config.url.RACLOOP_DEVICE_INFO = 'http://www.oddlyeven.in/userMobile/installReferer';
            this.config.url.RACLOOP_RADIO_TAXI = 'http://www.oddlyeven.in/userMobile/radioTaxi';
            this.config.url.RACLOOP_CALL_USER = 'http://www.oddlyeven.in/userMobile/callUser';

        } else if (this.config.env == 'dev') {
            this.config.locationUpdateFrequency = 20000;
            this.facebookId = '1049343688459536';

            this.config.url.RACLOOP_LOGIN = 'http://localhost:8080/app/userMobile/login';
            this.config.url.RACLOOP_LOGOUT = 'http://localhost:8080/app/userMobile/logout';
            this.config.url.RACLOOP_SIGNUP = 'http://localhost:8080/app/userMobile/signup';
            this.config.url.RACLOOP_VERIFYMOBILE = 'http://localhost:8080/app/userMobile/verifyMobile';
            this.config.url.RACLOOP_RESENDSMS = 'http://localhost:8080/app/userMobile/resendSms';
            this.config.url.RACLOOP_CHANGEPASSWORD = 'http://localhost:8080/app/userMobile/changePassword';
            this.config.url.RACLOOP_EDIT = 'http://localhost:8080/app/userMobile/editProfile';
            this.config.url.RACLOOP_SAVE_PREFERENCES = 'http://localhost:8080/app/userMobile/savePreferences';
            this.config.url.RACLOOP_FORGOTPASSWORD = 'http://localhost:8080/app/userMobile/forgotPassword';
            this.config.url.RACLOOP_SAVE_EMERGENCY_CONTACTS='http://localhost:8080/app/userMobile/saveEmergencyContacts';
            this.config.url.RACLOOP_SOS='http://localhost:8080/app/userMobile/sos';
            this.config.url.RACLOOP_TERMS='http://localhost:8080/app/userMobile/terms';
            this.config.url.RACLOOP_PRIVACY='http://localhost:8080/app/userMobile/privacy';
            this.config.url.RACLOOP_GET_CURRENT_JOURNEY = 'http://localhost:8080/app/userMobile/getCurrentJourney';
            this.config.url.RACLOOP_SEND_USER_RATING = 'http://localhost:8080/app/userMobile/sendUserRating';
            this.config.url.RACLOOP_CANCEL_USER_RATING = 'http://localhost:8080/app/userMobile/cancelUserRating';

            this.config.url.RACLOOP_JOURNEY_DETAILS = 'http://localhost:8080/app/journeyMobile/journeyDetails';
            this.config.url.RACLOOP_JOURNEYS = 'http://localhost:8080/app/journeyMobile/myJourneys';
            this.config.url.RACLOOP_CHILD_JOURNEYS = 'http://localhost:8080/app/journeyMobile/childJourneys';
            this.config.url.RACLOOP_PASSENGERS = 'http://localhost:8080/app/journeyMobile/passengers';
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
            this.config.url.RACLOOP_LOGIN_AS_FACEBOOK = 'http://localhost:8080/app/userMobile/loginFromFacebook';
            this.config.url.RACLOOP_MAKE_RECURRING = 'http://localhost:8080/app/preference/makeRecurring';
            this.config.url.RACLOOP_RECURRING_JOURNEY = 'http://localhost:8080/app/preference/recurringJourney';
            this.config.url.RACLOOP_DELETE_RECURRING_JOURNEY = 'http://localhost:8080/app/preference/deleteRecurringJourney';
            this.config.url.RACLOOP_NEARBY_LOCATIONS = 'http://localhost:8080/app/journeyMobile/nearByPoints';
            this.config.url.RACLOOP_USER_IMAGE = 'http://localhost:8080/app/userMobile/setUserImage';
            this.config.url.RACLOOP_REQUEST_AGAIN = 'http://localhost:8080/app/workflowMobile/requestAgain';
            this.config.url.RACLOOP_DEVICE_INFO = 'http://localhost:8080/app/userMobile/installReferer';
            this.config.url.RACLOOP_RADIO_TAXI = 'http://localhost:8080/app/userMobile/radioTaxi';
            this.config.url.RACLOOP_CALL_USER = 'http://localhost:8080/app/userMobile/callUser';

        } else {
            var ip = "192.168.1.109";//"127.0.0.1";//
            this.config.locationUpdateFrequency = 20000;
            this.facebookId = '1049343688459536';

            this.config.url.RACLOOP_LOGIN = 'http://' + ip + ':8080/app/userMobile/login';
            this.config.url.RACLOOP_LOGOUT = 'http://' + ip + ':8080/app/userMobile/logout';
            this.config.url.RACLOOP_SIGNUP = 'http://' + ip + ':8080/app/userMobile/signup';
            this.config.url.RACLOOP_VERIFYMOBILE = 'http://' + ip + ':8080/app/userMobile/verifyMobile';
            this.config.url.RACLOOP_RESENDSMS = 'http://' + ip + ':8080/app/userMobile/resendSms';
            this.config.url.RACLOOP_CHANGEPASSWORD = 'http://' + ip + ':8080/app/userMobile/changePassword';
            this.config.url.RACLOOP_EDIT = 'http://' + ip + ':8080/app/userMobile/editProfile';
            this.config.url.RACLOOP_SAVE_PREFERENCES = 'http://' + ip + ':8080/app/userMobile/savePreferences';
            this.config.url.RACLOOP_FORGOTPASSWORD = 'http://' + ip + ':8080/app/userMobile/forgotPassword';
            this.config.url.RACLOOP_SAVE_EMERGENCY_CONTACTS='http://' + ip + ':8080/app/userMobile/saveEmergencyContacts';
            this.config.url.RACLOOP_SOS='http://' + ip + ':8080/app/userMobile/sos';
            this.config.url.RACLOOP_TERMS='http://' + ip + ':8080/app/userMobile/terms';
            this.config.url.RACLOOP_PRIVACY='http://' + ip + ':8080/app/userMobile/privacy';
            this.config.url.RACLOOP_GET_CURRENT_JOURNEY = 'http://' + ip + ':8080/app/userMobile/getCurrentJourney';
            this.config.url.RACLOOP_SEND_USER_RATING = 'http://' + ip + ':8080/app/userMobile/sendUserRating';
            this.config.url.RACLOOP_CANCEL_USER_RATING = 'http://' + ip + ':8080/app/userMobile/cancelUserRating';

            this.config.url.RACLOOP_JOURNEY_DETAILS = 'http://' + ip + ':8080/app/journeyMobile/journeyDetails';
            this.config.url.RACLOOP_JOURNEYS = 'http://' + ip + ':8080/app/journeyMobile/myJourneys';
            this.config.url.RACLOOP_CHILD_JOURNEYS = 'http://' + ip + ':8080/app/journeyMobile/childJourneys';
            this.config.url.RACLOOP_HISTORY = 'http://' + ip + ':8080/app/journeyMobile/myHistory';
            this.config.url.RACLOOP_PASSENGERS = 'http://' + ip + ':8080/app/journeyMobile/passengers';
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
            this.config.url.RACLOOP_LOGIN_AS_FACEBOOK = 'http://' + ip + ':8080/app/userMobile/loginFromFacebook';
            this.config.url.RACLOOP_MAKE_RECURRING = 'http://' + ip + ':8080/app/preference/makeRecurring';
            this.config.url.RACLOOP_RECURRING_JOURNEY = 'http://' + ip + ':8080/app/preference/recurringJourney';
            this.config.url.RACLOOP_DELETE_RECURRING_JOURNEY = 'http://' + ip + ':8080/app/preference/deleteRecurringJourney';
            this.config.url.RACLOOP_NEARBY_LOCATIONS = 'http://' + ip + ':8080/app/journeyMobile/nearByPoints';
            this.config.url.RACLOOP_USER_IMAGE = 'http://' + ip + ':8080/app/userMobile/setUserImage';
            this.config.url.RACLOOP_REQUEST_AGAIN = 'http://' + ip + ':8080/app/workflowMobile/requestAgain';
            this.config.url.RACLOOP_DEVICE_INFO = 'http://' + ip + ':8080/app/userMobile/installReferer';
            this.config.url.RACLOOP_RADIO_TAXI = 'http://' + ip + ':8080/app/userMobile/radioTaxi';
            this.config.url.RACLOOP_CALL_USER = 'http://' + ip + ':8080/app/userMobile/callUser';

        }
        return this.config;
    }
});