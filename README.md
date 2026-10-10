# Sonifica

Big, bright sound pads for a two-year-old. Colorifica's musical sibling: no words, no menus, nothing to get lost in.

- **Ten singing pads** in Colorifica's ten paint colors. Each color plays the same note it plays in Colorifica, so red always sounds like red. The notes are a pentatonic scale, so any order of taps sounds like a tune.
- **Slide a finger** across the pads for a run of notes. Multi-touch works, so several fingers (or a whole palm) play at once; a palm on one pad counts as one note.
- **Instruments** (top in portrait, right in landscape): bells, drums, and animals (cow, bee, chick, frog, duck, owl, sheep, pig, dog, cat). Picking one plays a quick demo on the pads.
- **Play button:** sings back the child's last little tune on the current instrument, lighting each pad as it goes. Before they've played anything, it plays "Mary Had a Little Lamb." Press it again to stop.
- **Hit animations:** every pad has a face that opens its mouth and squints happily when it sings. Bells swing and throw notes and sparkles, drums squash and splash paint drops, and animals hop and send a tiny copy of themselves floating up.
- **Laptop keyboards** work too: mashing keys plays pads.
- Use the device volume to turn it down or off. A built-in limiter keeps a whole palm of pads from getting loud.

It's one static `index.html` with no build step and no dependencies. Every sound is synthesized with Web Audio: no recordings, no files to load.

Reduced-motion device settings turn off the animations and vibration. Flying notes and sparkles also stay off on devices reporting 2 GB of memory or fewer, or two CPU cores or fewer.

For optional opt-outs without extra on-screen controls, add any of these attributes to the opening `<html>` tag in `index.html`: `data-haptics="off"`, `data-effects="off"` (all animations, a calmer low-stimulation mode), or `data-particles="off"` (flying notes and sparkles only).

## Deploy

Vercel: import the repo with the **Other** framework preset, leave the build command empty, and set the output directory to the repo root. Any static host works the same way.

## Lock it down for the kid

1. Open the site on the tablet or phone and use **Add to Home Screen**. It launches fullscreen with no browser bar.
2. Pin the app so little fingers can't swipe out:
   - **iPhone/iPad:** Settings → Accessibility → Guided Access, then triple-click the side button in the app.
   - **Android:** Settings → Security → App pinning.

## Run locally

```sh
npx serve .
```
