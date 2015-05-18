#Music Graph
>This app is basically a simple bit of experimentation with dynamic creation of sound (we could even call this music!) using the web audio API.

## Contents

- [About](#about)
- [Installing and Using](#installing-and-using)
- [Author](#author)
- [License](#license)

##About
I'm using the HTML canvas element to create a line graph with draggable lines. I then use the x and y position of each data point on that graph to generate a melody.

##Installing and Using
>This app is a simple front-end app. Hey, it's not even really an app. But if you wanna use it:
###Installation
1.) Download/clone it to your local machine:
>>```git clone https://github.com/Newms34/musicGraph.git```

2.) Open index.html. Seriously, that's it as far as installation. And here you were expecting some fancy install procedure, right?
###Usage
1.) Click on the graph to add new points. The x-position of the point corresponds to _when_ the corresponding note is played. The y-position corresponds to the _pitch_ of the note.
2.) To edit a note you've already put down, hover over it. You'll know you're in the right spot if a blue bar appears!
3.) Pick a tempo and a volume. I'd not advise you set the volume to very high!
4.) Pick a waveform. 'sine' is the most gentle sounding, and sawtooth and square are rather harsh!
5.) Click 'Play again!'. Music!
6.) Clicking 'autoplay' will cause the song to play every time you change or add a note.
7.) Click the save button ( &#10145; &#128190; ) to bring up a secret code that you can save in notepad or something and share with your buddies.
8.) Load your buddies' code by clicking the load button ( &#128190; &#10145; ) and pasting in that secret code.
9.) Oh, and if you're really unhappy with your song, feel free to click "reset". You know, if you're a quitter like that.

##Author
* __David Newman__ - [LinkedIn](https://www.linkedin.com/in/newms34) | [GitHub](https://github.com/Newms34)

## License

This projected is licensed under the terms of the [MIT license](http://opensource.org/licenses/MIT)
