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
    },
    requires: [
        'Ext.MessageBox',
        'Racloop.util.Config',
        'Racloop.util.Common',
        'Racloop.util.LoginHelper'
    ],

    models: [
        'User',
        'LoginCredential',
        'Journey'
    ],

    views: [
        'MainNavigationView',
        'LoginForm',
        'RegisterForm',
        'FaqPanel',
        'SettingNavigationView',
        'MainTabs',
        'PrivacyPanel',
        'SearchNavigationView',
        'SettingsMenu',
        'TermsPanel',
        'JourneyNavigationView',
        'EditProfileForm',
        'ChangePasswordForm',
        'UserSearchList',
        'ForgotPasswordForm',
        'SearchViewItem',
        'JourneyViewItem',
        'RequestJourneyPanel',
        'ExistingJourneyPanel',
        'VerifySmsForm',
        'EmergencyContactForm'
    ],

    controllers: [
        'AccountController',
        'SettingsController',
        'SearchController',
        'ProfileController'
    ],

    stores: [
        'Journeys',
        'Searches'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        console.log('rajan');
        // Destroy the #appLoadingIndicator element
        this.cleanup();
        Ext.fly('appLoadingIndicator').destroy();
        
        Ext.create('Racloop.view.MainNavigationView', {
            fullscreen: true
        });
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
    }
});
