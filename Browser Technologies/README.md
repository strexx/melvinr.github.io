#Exercise 2.1 - Feature Detection
##HTML
###Video tag
Nowadays videos are an important media source on the web. But there is a problem using the video tag, since not every browser supports it. Luckily, nowadays almost all browsers support it. Except for Opera Mini and IE 8 and below.

####Fallback
It is important to create a fallback for the users that visit your websites on these browsers. A good fallback for videos is to provide textual and/or visual feedback on why it doesn't show a video. To enable the user to still watch the video, you can add a download link as a fallback. Allowing them to watch the video locally.

[Link to demo](https://melvinr.github.io/Browser%20Technologies/Week%202/Feature%201/index.html)

###Srcset
Srcset is an exciting attribute brought to us by HTML5.
It allows us as webdevelopers to enable responsive images. If for example you want to show a separate image, based on the resolution the user's device has. Srcset is a great way to do this. But there is a problem, browsers like IE and Opera Mini for example don't support it.

####Fallback
Since IE doesn't support it, and a lot of people still use IE, it's important to create a fallback. The easiest fallback of all is to define a basic image using the src attribute in the same img tag.

[Link to demo](https://melvinr.github.io/Browser%20Technologies/Week%202/Feature%202/index.html)

##CSS
###Viewport Units
Viewport units are a great way to build responsive websites. Sadly, and totally unexpected of course, not all browsers support them (IE for the win!). So it's important to create fallbacks for these values.

####Fallback
Before defining the width and/or height of an element using viewport units, define them using values that are always supported, like em's.

[Link to demo]()