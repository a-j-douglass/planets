# planets
A JavaScript orrery

This project is intended to be an accurate and pretty toy solar system.

[Play with it](https://a-j-douglass.github.io/planets/)

It shows the solar system from below,  scaled such that earth is up (12 o clock) at new years day each year and moves clockwise.

So it's like a clock, with earth in blue as the 'year hand'.
12 &uparrow is the start of January.
 3 &rightarrow is the start of April.
 6 &rightarrow is the start of July.
 9 &rightarrow is the start of October.

If you don't want to wait long enough for the outer planets to move, drag them around and the date will update.

If you want a specific date, like 20th October 2017, execute

`$> window.changeDate("2017-10-20");`

in your browser's js console.

See how the same date for different years has Earth in the same position.


To build you need node and npm

`$>npm install; gulp webserver;`

Tested on Windows and OSX
