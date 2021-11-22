It's time to make a game! Goal of this project is to learn how to use TDD.
At first I was completely lost with TDD. Writing tests for non-existing functions felt so hard. But eventually
I started to get it and it really did help to write cleaner code. Unfortunately at one point I fell of the TDD
wagon. Once I implemented JS modules (Index, dom, gamelogic), it all broke down. Jest doesn't go well with
Webpack. Tried to Google solutions for that and tried some, but it just didn't work. So from that point onward it
was back to using console.logs. But all the main gamelogic functions were still written the TDD way and I think that's
good enough for now.

## NOTES:

NOTE: There was a problem: Enemy's randomized movements doesn't for some reason recognize player's board, unless
the ships are pre-rendered.
But now somehow it fixed itself? There's a mystery right there. I didn't even restart live server (in case it or npx or something gets tired
after hours and starts lagging.)
