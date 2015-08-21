/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.application({
    name: 'Racloop',

    viewport: {
        autoBlurInput: false
        //,
        //width: '100.2%',
        //height: '100.2%'
    },
    requires: [
        'Ext.MessageBox',
        'Ext.device.Connection',
        'Racloop.view.MapPanel',
        'Racloop.view.OfflineView',
        'Racloop.util.Config',
        'Racloop.util.Common',
        'Racloop.util.LoginHelper',
        'Racloop.util.Utility',
        'Racloop.util.FBConnect'
    ],

    models: [
        'User',
        'LoginCredential',
        'Journey',
        'UserReview',
        'RecurringSearch'
    ],

    views: [
        'MainNavigationView',
        'LoginForm',
        'RegisterForm',
        'JourneyDetailsPanel',
        'SettingNavigationView',
        'MainTabs',
        'PrivacyPanel',
        'SearchNavigationView',
        'SearchResultsDataView',
        'SearchResultsEmptyView',
        'SearchResultsView',
        'Preferences',
        'TermsPanel',
        'JourneyNavigationView',
        'HistoryNavigationView',
        'EditProfileForm',
        'ChangePasswordForm',
        'ForgotPasswordForm',
        //'SearchViewItem',
        'JourneyViewItem',
        'RelatedRequestViewItem',
        'RelatedRequestViewReadOnlyItem',
        'RequestJourneyPanel',
        'ExistingJourneyPanel',
        'MapPanel',
        'VerifySmsForm',
        'EmergencyContactForm',
        'SosView',
        'JourneyRatingView',
        'MyJourneyView',
        'HistoryView',
        'MobileCaptureForm',
        'RecurringSearchScreen',
        'RecurringView',
        'RecurringViewItem'
    ],

    controllers: [
        'UiController',
        'SessionsController',
        'SettingsController',
        'AccountController',
        'JourneysController',
        'WorkflowController',
        'MapController'
    ],

    stores: [
        'Journeys',
        'ChildJourneys',
        'Passengers',
        'Searches',
        'History',
        'Recurring'
    ],

    icon: {
        //'57': 'resources/icons/Icon.png',
        //'72': 'resources/icons/Icon~ipad.png',
        //'114': 'resources/icons/Icon@2x.png',
        //'144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        //'320x460': 'resources/startup/320x460.jpg',
        //'640x920': 'resources/startup/640x920.png',
        //'768x1004': 'resources/startup/768x1004.png',
        //'748x1024': 'resources/startup/748x1024.png',
        //'1536x2008': 'resources/startup/1536x2008.png',
        //'1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        console.log('launching application......');
        if(!(Ext.os.is.Android || Ext.os.is.iOS)){
            console.log("this is browser")
            facebookConnectPlugin.browserInit(827652170684004,'v2.3');
        }
        this.initSslCertificates();
        document.addEventListener('deviceready', function () {
            StatusBar.hide();
            if (Ext.os.is.iOS && Ext.os.version.major >= 7) {
            //    document.body.style.marginTop = "20px";
            //    Ext.Viewport.setHeight(Ext.Viewport.getWindowHeight() - 20);
            }
        });
        if (!Ext.device.Connection.isOnline()) {
            Ext.Viewport.add(Ext.create('Racloop.view.OfflineView'));
        }
        // Destroy the #appLoadingIndicator element
        this.initSslCertificates();
        this.cleanup();
        this.fixOverflowChangedIssue();
        if(Ext.fly('appLoadingIndicator')) Ext.fly('appLoadingIndicator').destroy();
        if(Ext.fly('startup')) Ext.fly('startup').destroy();
    },

    initSslCertificates: function() {
        //cordovaHTTP.enableSSLPinning(true, function() {
        //    console.log('success!');
        //}, function() {
        //    console.log('error :(');
        //});
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    },

    cleanup: function() {
        //Message box issue
        //Based upon http://www.sencha.com/forum/showthread.php?284450
        Ext.Component.prototype.animateFn = // or Ext.override( Ext.Component, { animateFn:
            function(animation, component, newState, oldState, options, controller) {
                var me = this;
                if (animation && (!newState || (newState && this.isPainted()))) {
                    this.activeAnimation = new Ext.fx.Animation(animation);
                    this.activeAnimation.setElement(component.element);
                    if (!Ext.isEmpty(newState)) {
                        var onEndInvoked = false;
                        var onEnd = function() {
                            if (!onEndInvoked) {
                                onEndInvoked = true;
                                me.activeAnimation = null;
                                controller.resume();
                            }
                        };
                        this.activeAnimation.setOnEnd(onEnd);
                        window.setTimeout(onEnd, 50 + (this.activeAnimation.getDuration() || 500));
                        controller.pause();
                    }
                    Ext.Animator.run(me.activeAnimation);
                }
            };
    },

    fixOverflowChangedIssue: function() {
        if (Ext.browser.is.WebKit) {
            console.info(this.$className + ': Fix a Sencha Touch Bug (TOUCH-5716 / Scrolling Issues in Google Chrome v43+)');

            Ext.override(Ext.util.SizeMonitor, {
                constructor: function (config) {
                    var namespace = Ext.util.sizemonitor;
                    return new namespace.Scroll(config);
                }
            });

            Ext.override(Ext.util.PaintMonitor, {
                constructor: function (config) {
                    return new Ext.util.paintmonitor.CssAnimation(config);
                }
            });
        }
    }
});
