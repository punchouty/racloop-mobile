This folder contains the controllers

Sessions Controller
Login, Auto login, Logout

Setting Controller
terms (ajax call), privacy (ajax call), screen navigation for Setting Navigation View

UI Controller (No business logic)
Navigation (Login, Register, Forgot Password, verify mobile), My Journey, History, Tab Navigation, Terms (forward to setting controller), Privacy (forward to setting controller), 

Account Controller
Register, SMS Verification, Resend SMS, Forgot Password

Profile Controller
Edit Profile, Change Password, Edit Emergency Contacts

Security Controller
sos, log, isSafe

Journey Controller
Search, Request, Active Journeys, History, Search Again, Review, Update location

WorkflowController
accept, cancel, reject, delete, incoming, outgoing


Initialize function - JourneyController
launch - SessionController

Init

1. Is Online = true
1.1 Is google loaded = true
1.1.1 Is user in local storage = true
1.1.1.1 login
1.1.1.1.1 login successful = true

1.2 Is google loaded = false
1.2.1 Load google
1.2.2 mark google loaded
1.2.3.1 Is user exists = true

2. Is Online = false
2.1 Show offline page