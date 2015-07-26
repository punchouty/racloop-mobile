/*
 * @author Ally Ogilvie
 * @copyright Wizcorp Inc. [ Incorporated Wizards ] 2014
 * @file - facebookConnectPlugin.js
 * @about - JavaScript interface for PhoneGap bridge to Facebook Connect SDK
 *
 *
 */
if (window.cordova){
    var exec = require("cordova/exec");

    var facebookConnectPlugin = {

        getLoginStatus: function (s, f) {
            cordova.exec(s, f, "FacebookConnectPlugin", "getLoginStatus", []);
        },

        showDialog: function (options, s, f) {
            cordova.exec(s, f, "FacebookConnectPlugin", "showDialog", [options]);
        },

        login: function (permissions, s, f) {
            cordova.exec(s, f, "FacebookConnectPlugin", "login", permissions);
        },

        logEvent: function(name, params, valueToSum, s, f) {
            // Prevent NSNulls getting into iOS, messes up our [command.argument count]
            if (!params && !valueToSum) {
                cordova.exec(s, f, "FacebookConnectPlugin", "logEvent", [name]);
            } else if (params && !valueToSum) {
                cordova.exec(s, f, "FacebookConnectPlugin", "logEvent", [name, params]);
            } else if (params && valueToSum) {
                cordova.exec(s, f, "FacebookConnectPlugin", "logEvent", [name, params, valueToSum]);
            } else {
                f("Invalid arguments");
            }
        },

        logPurchase: function(value, currency, s, f) {
            cordova.exec(s, f, "FacebookConnectPlugin", "logPurchase", [value, currency]);
        },

        getAccessToken: function(s, f) {
            cordova.exec(s, f, "FacebookConnectPlugin", "getAccessToken", []);
        },

        logout: function (s, f) {
            cordova.exec(s, f, "FacebookConnectPlugin", "logout", []);
        },

        api: function (graphPath, permissions, s, f) {
            if (!permissions) permissions = [];
            cordova.exec(s, f, "FacebookConnectPlugin", "graphApi", [graphPath, permissions]);
        }
    };

    module.exports = facebookConnectPlugin;
}
else {
// This should override the existing facebookConnectPlugin object created from cordova_plugins.js
    var facebookConnectPlugin = {

        getLoginStatus: function (s, f) {
            // Try will catch errors when SDK has not been init
            try {
                FB.getLoginStatus(function (response) {
                    s(response);
                });
            } catch (error) {
                if (!f) {
                    console.error(error.message);
                } else {
                    f(error.message);
                }
            }
        },

        showDialog: function (options, s, f) {

            if (!options.name) {
                options.name = "";
            }
            if (!options.message) {
                options.message = "";
            }
            if (!options.caption) {
                options.caption = "";
            }
            if (!options.description) {
                options.description = "";
            }
            if (!options.link) {
                options.link = "";
            }
            if (!options.picture) {
                options.picture = "";
            }
            
            // Try will catch errors when SDK has not been init
            try {
                FB.ui({
                    method: options.method,
                    message: options.message,
                    name: options.name,
                    caption: options.caption,
                    description: (
                        options.description
                    ),
                    link: options.link,
                    // JS SDK expects href and not link
                    href: options.link,
                    picture: options.picture
                },
                function (response) {
                    if (response && (response.request || !response.error_code)) {
                        s(response);
                    } else {
                        f(response);
                    }
                });
            } catch (error) {
                if (!f) {
                    console.error(error.message);
                } else {
                    f(error.message);
                }
            }
        },
        // Attach this to a UI element, this requires user interaction.
        login: function (permissions, s, f) {
            // JS SDK takes an object here but the native SDKs use array.
            var permissionObj = {};
            if (permissions && permissions.length > 0) {
                permissionObj.scope = permissions.toString();
            }
            
            FB.login(function (response) {
                if (response.authResponse) {
                    s(response);
                } else {
                    f(response.status);
                }
            }, permissionObj);
        },

        getAccessToken: function (s, f) {
            var response = FB.getAccessToken();
            if (!response) {
                if (!f) {
                    console.error("NO_TOKEN");
                } else {
                    f("NO_TOKEN");
                }
            } else {
                s(response);
            }
        },

        logEvent: function (eventName, params, valueToSum, s, f) {
            // AppEvents are not avaliable in JS.
            s();
        },

        logPurchase: function (value, currency, s, f) {
            // AppEvents are not avaliable in JS.
            s();
        },

        logout: function (s, f) {
            // Try will catch errors when SDK has not been init
            try {
                FB.logout( function (response) {
                    s(response);
                });
            } catch (error) {
                if (!f) {
                    console.error(error.message);
                } else {
                    f(error.message);
                }
            }
        },

        api: function (graphPath, permissions, s, f) {
            // JS API does not take additional permissions
            
            // Try will catch errors when SDK has not been init
            try {
                FB.api(graphPath, function (response) {
                    if (response.error) {
                        f(response);
                    } else {
                        s(response);
                    }
                });
            } catch (error) {
                if (!f) {
                    console.error(error.message);
                } else {
                    f(error.message);
                }
            }
        },

        // Browser wrapper API ONLY
        browserInit: function (appId, version) {
            if (!version) {
                version = "v2.0";
            }
            FB.init({
                appId      : appId,
                cookie     : true,
                xfbml      : true,
                version    : version
            })
        }
    };
    
    // Bake in the JS SDK
    (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));

}