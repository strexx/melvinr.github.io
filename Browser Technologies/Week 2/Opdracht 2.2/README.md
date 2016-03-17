#Opdracht 2.2 - Funda Shaker Core Functionality
##Geolocation
One of the most important functionalities of the Funda Shaker app is geolocation. It gets the user's location (the city he or she is in), and shows houses available in that city. The problem is that there are browsers, like IE 8 and Opera Mini (they keep coming back don't they), that don't support HTML geolocation. For these users the application is completely useless.

##Fallback and progressive enhancement
To create a fallback and implement progressive enhancement, I had to rewrite my code a bit. Previously the application tried to get the user's geolocation when it launched. Now it checks whether or not a browser supports geolocation or not. If it does, it adds a button to the homepage which gives the user the option to have the application get their location. If geolocation is not supported, this button will not be shown.

To ensure that these users can still use the application without geolocation, I created a fallback. This fallback is an input field in which the user can type the name of the city manually. This enables the user to keep using the application, and even adds extra functionality to the application in general. Since users are now able to look up houses in a city they want, instead of being restricted to their current location.