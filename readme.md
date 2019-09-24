# Saboteur2 website remake

"Saboteur 2" was an old game released in 1987. Long after the game's time, a fan
(sabotwo@gmail.com) made a website dedicated to it -
[http://www.saboteur2.ru](http://www.saboteur2.ru)

This project is a remake of the website, updating its presentation and layout
(but not contents) to modern web standards. It is partly an exercise of my
skills as webdev, and partly me paying respects to the game I played so much as
a child.

See the project [live at Zeit Now](https://saboteur2ru-remake.now.sh)!

## Notes on finished project

You can read [workplan.md](./workplan.md) to get an estimation of what was in
plans to do, before the actual project coding took place. I'd say 95% of that
plan was completed successfully.

Of relevant points:

* Site is rendered nicely from IE6 and higher, thought the rendering is not
    pixel-perfect (there are inconsistencies with boxing model between IE
    browser versions).

* IE9 and higher, as well as modern browsers, do not require JS to have full
    site functionality - dubious value, but it was nearly free of cost to get.
    In particular, to allow site to work in no-JS conditions, the plan to
    convert the Map page to some sort of scalable Google Maps type of widget
    was abandoned. Also, switching between musical tracks on Music page is done
    via reloading of an IFRAME - not the cleanest of solutions, but looks nice
    enough visually.

* The main menu and page headers use "Impact" font face. This is only native to
    Windows system, I believe. So where it is not available, it is replaced with
    Oswald from Google Fonts. I chose to go with similar-looking font, instead
    of providing Impact.ttf by the site, due to possible legal issues.

* Cross-browsers compatibility and responsive design were not as thoroughly
    tested as I would like. This is mostly due to time constraints and
    unwillingness to pay substantial monthly fees to online services like
    Browserstack. Autoprefixer plugin should take care of majority of browsers
    in circulation, and I wrote media queries to tackle a few of particular
    annoying edge cases.
