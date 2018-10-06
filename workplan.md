# Saboteur 2 website remake #

Outline of goals, limitations, tools, and tasks to accomplish.

## Source material ##

As this is a "remake" - naturally there is some original content already made
to require a following remake. Source website is http://www.saboteur2.ru

Its not very well put together. I suspect, it was made in some sort of visual
editor and exported into HTML. Oh, and its HTML4 Transitional.

Sample from the top navigation menu:

    <A style="TEXT-DECORATION: none"
    href="saboteur2_vragi.html"><FONT color=#FFB90F>Враги
    </A>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

    <A style="TEXT-DECORATION: none"
    href="saboteur2_predm.html"><FONT color=#FFB90F>Предметы
    </A>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

    <A style="TEXT-DECORATION: none"
    href="saboteur2_panel.html"><FONT color=#FFB90F>Панель
    </A>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

The site comprises of several interlinked pages, mostly *HTML + inlined CSS*.
No JS or external style sheets seen so far. There are numerous illustrations -
both static images and gifs, as well as inclusion of audio media via embedded
(<object\>) *Shockwave Flash* player.

The original website seems to be designed with 800px width screen in mind.

## Target Goals ##

The goal of this exercise is to rework presentation of the material into
modern HTML5 + CSS3 website - no content change, no design change, unless
trivial and obvious improvement on material layout on my own discretion.

Shockwave Flash is to be abandon in favor of <audio\>.

New website will support wider screens, as well as mobile devices.

The remake will be providing full functionality for modern browsers and
IE, starting from IE9. Earlier browsers down to (inclusive) IE6 will have a
graceful downgraded version - no worse than the existing source site.

## Site pages structure - normative listing ##

- Main page - http://www.saboteur2.ru/index.html
    - Game casette loading sounds - http://www.saboteur2.ru/saboteur2_sab2_tape.html
- Missions - http://www.saboteur2.ru/saboteur2_miss.html
- Enemies - http://www.saboteur2.ru/saboteur2_vragi.html
- Items - http://www.saboteur2.ru/saboteur2_predm.html
- Panel - http://www.saboteur2.ru/saboteur2_panel.html
- Weapons - http://www.saboteur2.ru/saboteur2_weapon.html
- Map - http://www.saboteur2.ru/saboteur2_map.html
- Music - http://www.saboteur2.ru/saboteur2_music.html
    - Originals
        - IBM PC http://www.saboteur2.ru/saboteur2_mus_pc.html
        - ZX Spectrum 48K http://www.saboteur2.ru/saboteur2_mus_zx48k_sp.html
        - ZX Spectrum 128K http://www.saboteur2.ru/saboteur2_mus_zx128k_ay.html
        - Amstrad CPC http://www.saboteur2.ru/saboteur2_mus_amstrad_cpc.html
        - Commodore C64 http://www.saboteur2.ru/saboteur2_mus_c64.html
    - Remixes
        - Rob Hubbard http://www.saboteur2.ru/saboteur2_mus_rob_hubbard.html
        - Marcel Donne http://www.saboteur2.ru/saboteur2_mus_marcel_donne.html
        - Marcel Donne - Revisited http://www.saboteur2.ru/saboteur2_mus_marcel_donne_revisited.html
        - Saboteur 2 v2009 http://www.saboteur2.ru/saboteur2_mus_v2009.html
        - Endika Fernandez - techno-mix http://www.saboteur2.ru/saboteur2_mus_endika.html
- Tactics - http://www.saboteur2.ru/saboteur2_tactic.html
- Secrets - http://www.saboteur2.ru/saboteur2_secret.html
    - Level codes - http://www.saboteur2.ru/saboteur2_sec_codes.html
    - Secret room (immortality) - http://www.saboteur2.ru/saboteur2_sec_room.html
    - Teleport - http://www.saboteur2.ru/saboteur2_sec_teleport.html
    - Infinite punch cards box - http://www.saboteur2.ru/saboteur2_sec_infinit_perf.html
    - Hidden punch card - http://www.saboteur2.ru/saboteur2_sec_hidden_perf.html
    - Migrating punch card - http://www.saboteur2.ru/saboteur2_sec_migrate_perf.html
    - Unused punch cards - http://www.saboteur2.ru/saboteur2_sec_neisp_perf.html
    - Rocket takeoff - http://www.saboteur2.ru/saboteur2_sec_rocket.html
    - Timer stop - http://www.saboteur2.ru/saboteur2_sec_timer.html
- Facts - http://www.saboteur2.ru/saboteur2_facts.html
- Fantasies - http://www.saboteur2.ru/saboteur2_fantasy.html
- Play - http://www.saboteur2.ru/saboteur2_play.html
- Releases - http://www.saboteur2.ru/saboteur2_release.html
- Press - http://www.saboteur2.ru/saboteur2_press.html
- History - http://www.saboteur2.ru/saboteur2_history.html
- Contacts - http://www.saboteur2.ru/saboteur2_contacts.html

Notably, many sub pages link to their parent page with "Back" links.
Also, some pages link to "Contacts" page.
Top level pages are available from navigation menu, shown on every page.

## Project design decisions ##

After some consideration I resolved to abstain from using any sort of backend
framework for this project - like Laravel or Yii. Instead the result will be
a set of static files - .html, .css, .js - as the project not only
does not require any sort of persistent state storage, but also have no
interactivity (AJAX, etc.) and no complex logic that could not be made by the
client alone.

This comes with a downside - URLs in the browser will include visible .html
extensions (unless I find some rewrite rule to avoid it).

Some sub pages will be joined together - music, for example - since they provide
uniform functionality and I will implement some sort of layout or content
selector that will provide better UI for the user.

Pages that have no content in the source material (stubs) will be omitted from
the resulting work.

The "Play" page that (presumably) was providing the ability to play the game
online - via some sort of Java applet - will either be replaced with a link
to game store or emulation ROM-site or removed completely as I don't wont any
copyright issues with the game developers, and fixing Java to run will
be to hard probably anyway.

Pages that used to start the musical playback immediately on load will no longer
do so, to comply with usability guidelines.

There will be a big visible overlay banner, that will clearly state that the
resulting site is a derivative work and will point to this project's source page,
as well as to the original website.