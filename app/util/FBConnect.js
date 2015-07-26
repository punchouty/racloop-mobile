Ext.define('Racloop.util.FBConnect', {

	singleton: true,

	//Authenticates a user with Facebook and queries the
	//Facebook API
    authenticate: function(sessionsController) {

    	var me = this;

		//Check if the user is alreadya authenticated with Facebook
		facebookConnectPlugin.getLoginStatus(function(response) {

		    if (response.status === 'connected') {

		    	//They are, so let's query the FB API for their
		    	//id and email
		    	var uid = response.authResponse.userID;
		    	var accessToken = response.authResponse.accessToken;

				facebookConnectPlugin.api('/me?fields=id,email,name,gender', [], function(response) {

					var fbid = response.id,
						email = response.email,
						name = response.name,
						gender = response.gender;

			    	//Attempt to create account, if it already exists log them in instead
			    	me.createAccount(fbid, email, name, gender, sessionsController);							

				},function(response){});

		    }
		    else {

		    	//They are not authenticated so lets log them in with Facebook
		    	//This will trigger a switch into the Facebook login screen
		        facebookConnectPlugin.login(["email"], function(response) {

		            if (response.authResponse) {

		            	//They are now authenticated, proceed with the query
						facebookConnectPlugin.api('/me?fields=id,email,name,gender', [], function(response) {

						   	var fbid = response.id,
							email = response.email
							name = response.name,
						gender = response.gender;

							//Trigger account creation or login if already exists in database
							me.createAccount(fbid, email, name, gender, sessionsController);
						},function(response){});

		            }
		            else {
		            	//The login failed so show an error message
		                loginController.signInFailure("Could not log into Faceobok");
		            }

		        },function(response){});

		    }

		},function(response){});

    },

    //Creates a new account, or if it already exists attempts
    //to log the user in with Facebook
    createAccount: function(fbid, email, name, gender, sessionsController){

    	var me = this;

		sessionsController.loginAsFacebook(fbid, email, name, gender);


    },

    //Logs a user in with the supplied fbid (instead of a password) and email address
    login: function(fbid, email, loginController){

		var me = this;

		//This is kind of like what we did before when we saved the user and invoked the proxy
		//But this Ajax request is triggered manually by us, and we can supply whatever parameters
		//we want, do some stuff on the server with it, and return data to our application
		Ext.Ajax.request({

			url: 'http://www.joshmorony.com/demos/SenchaLogin/api/users.php?action=login',
			method: 'post',
			params: {
				email: email,
				fbid: fbid
			},

			//If a successful response was returned we run this function
			success: function(response){

				//Grab the JSON response
				var loginResponse = Ext.JSON.decode(response.responseText);

				if(loginResponse.success){
					
					//Extract the information from the JSON response
					var localUsersStore = Ext.getStore('LocalUsers');
					var session = loginResponse.details[0].session;
					var userId = loginResponse.details[0].id;
					var email = loginResponse.details[0].email;

					//Set the userId as a global so we can reference it later
					SenchaLogin.globals.userId = userId;

                    if(localUsersStore.getCount() > 0){
                    	
                        //A local user already exists so update their email and
                        //session key
                        var currentUser = localUsersStore.getAt(0);

                        currentUser.set('email', email);
                        currentUser.set('session', session);
                        localUsersStore.sync();
                    }
                    else
                    {
                    	//This is the first log in so create a new local user
						var newLocalUser = Ext.create('SenchaLogin.model.LocalUser', {
							email: email,
							session: session
						});

						localUsersStore.add(newLocalUser);
						localUsersStore.sync();                    	
                    }

                    console.log(loginResponse);

					loginController.signInSuccess();
				}
				else 
				{
					console.log(loginResponse);
					
					//Failed to sign in error message
					loginController.signInFailure(loginResponse.error);
				}
			},

			failure: function(response){			
				//Failure message
			}
		});

    }
		
});