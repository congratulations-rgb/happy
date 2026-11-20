// ✏️ EVERYTHING you may want to change lives in this file.
export const config = {
  recipientName: '',            // e.g. 'Sara' -> "Happy Birthday, Sara! ❤️" (leave '' for none)
  music: 'assets/birthday.mp3', // put your song in public/assets/
  envelope: { above: 'Someone has a little surprise for you...', below: 'Tap to open your surprise ❤️' },
  hero: { title: 'Happy Birthday', subtitle: 'Today is all about celebrating someone special.', scroll: 'Scroll to see our memories' },
  album: {
    title: 'Our Little Memories ✨', cover: 'Our Memories', button: 'Open Our Album ❤️',
    notes: ['you + me ♥', 'my favorite day', 'always smiling', 'so beautiful ✨', 'never forget this'], // handwritten notes on pages
  },
  // 📸 Put photos in public/images/ with these names. Missing files are skipped automatically.
  memories: [
    { src: 'images/image.jpg',   caption: 'A beautiful memory ❤️' },
    { src: 'images/image2.jpg',  caption: 'One of my favorite moments ✨' },
    { src: 'images/image3.jpg',  caption: 'Laughing together' },
    { src: 'images/image4.jpg',  caption: 'Just us' },
    { src: 'images/image5.jpg',  caption: 'A day I will never forget' },
    { src: 'images/image6.jpg',  caption: 'Pure happiness' },
    { src: 'images/image7.jpg',  caption: 'You make everything brighter' },
    { src: 'images/image8.jpg',  caption: 'Little adventures' },
    { src: 'images/image9.jpg',  caption: 'Sweet moments' },
    { src: 'images/image10.jpg', caption: 'And many more to come ❤️' },
  ],
  letter: `To someone who makes the world a little more beautiful...

Today is your special day, and I just wanted to remind you how special you are.

I hope your day is filled with happiness, laughter, beautiful moments, and everything your heart wishes for.

You deserve all the beautiful things in this world.

Happy Birthday! ❤️`,
  final: { text: 'And this is just a little reminder that you are special. ❤️', button: 'One More Surprise ✨', hug: 'Sending you the biggest birthday hug! ❤️' },
}
