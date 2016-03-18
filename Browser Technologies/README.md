#Exercise 2.1 - Feature Detection
##HTML
###Feature 1: Video tag
Nowadays videos are an important media source on the web. But there is a problem using the video tag, since not every browser supports it (like IE 8 and Opera Mini 8). Luckily, nowadays almost all browsers support it. Except for Opera Mini and IE 8 and below.

####Fallback
It is important to create a fallback for the users that visit your websites on these browsers. A good fallback for videos is to provide textual and/or visual feedback on why it doesn't show a video. To enable the user to still watch the video, you can add a download link as a fallback. Allowing them to watch the video locally. The image and/or text will be shown if the video tag isn't supported.

[Link to demo](https://melvinr.github.io/Browser%20Technologies/Week%202/Feature%201/index.html)

###Feature 2: srcset
Srcset is an exciting attribute brought to us by HTML5. It allows us as webdevelopers to enable responsive images. If for example you want to show a separate image, based on the resolution the user's device has. Srcset is a great way to do this. But there is a problem, browsers like IE and Opera Mini for example don't support it.

####Fallback
Since IE doesn't support it, and a lot of people still use IE, it's important to create a fallback. The easiest fallback of all is to define a basic image using the src attribute in the same img tag. This makes sure that, even though the user loses the benefit of responsive images, the image is still shown. Keeping the most important part of the img tag intact.

[Link to demo](https://melvinr.github.io/Browser%20Technologies/Week%202/Feature%202/index.html)

##CSS
###Feature 3: Viewport Units
Viewport units are a great way to build responsive websites. It allows you to style elements in relation to the viewport. Sadly, and totally unexpected of course, not all browsers support them (IE for the win!). So it's important to create fallbacks for these values.

####Fallback
Before defining the width and/or height of an element using viewport units, define them using values that are always supported, like percentages. If a browser supports viewport units, it will overwrite the first declaration. Otherwise it will use the first one and ignore the viewport units.

[Link to demo](https://melvinr.github.io/Browser%20Technologies/Week%202/Feature%203/index.html)

###Feature 4: text-decoration styling
Text-decoration styling allows you to define the type, style and color of lines in text-decoration. Sadly, most browsers don't support these, except for Safari and Firefox.

####Fallback
The default fallback for text-decoration styling is the element's color itself. Text-decoration inherits this color when styling it is not supported.

[Link to demo](https://melvinr.github.io/Browser%20Technologies/Week%202/Feature%204/index.html)

##JavaScript
###Feature 5: Geolocation
Since HTML 5 it is possible to get the current geolocation without having to use an api for this. The only downside to this is that for example IE8 (surprise right?) doesn't support this. So in order to keep the functionality of getting the user's geolocation, you have to provide a fallback.

####Fallback
There are multiple ways in which you can create a fallback, all based on what you or the user needs. Let's say your websites shows results of bargains based on your geolocation. Chances are your website has a lot more content, so instead of showing content based on their location, show general content when geolocation is no option.

Another option is to use the Google AJAX API to get the user's geolocation if HTML 5's geolocation is not supported. This fallback checks for navigator, which indicates geolocation support or not. If it's there, get the user's location using HTML 5. Otherwise, use google's api.

[Link to demo](https://melvinr.github.io/Browser%20Technologies/Week%202/Feature%205/index.html)

Source: http://marcgrabanski.com/html5-geolocation-fallback-google-ajax-api/


###Feature 6: classList
classList is a powerful way to manipulate classes that are present on HTML elements. Sometimes you have to change the appearance of an element, a great way to do this is to add or remove styled classes from an element with JavaScript. The problem with classList is that not every browser supports it. IE 9 and down don't support it at all, and IE 10 and up have poor support for it. To make sure the functionality remains intact, you have to create either a fallback for classList, or use another method to do this.

####Fallback
One way to make sure every user will get to see the changes, is to use className instead of classList. This is supported by every browser and essentially does the same as classList.

You could also write a function that checks whether or not a browser supports classList, if it does, it will use it to remove/add a class. If it doesn't, it will refer back to className and manually replaces the class of an element.

[Link to demo](https://melvinr.github.io/Browser%20Technologies/Week%202/Feature%206/index.html)

Sources:
- http://stackoverflow.com/questions/6746230/optimizing-a-javascript-function-with-a-fallback-if-classlist-is-not-supported
- http://jaketrent.com/post/addremove-classes-raw-javascript/