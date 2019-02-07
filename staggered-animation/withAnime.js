const timeline = anime.timeline({
  easing: 'easeOutExpo',
  duration: 750,
});

timeline.add({
  targets: 'section div',
  width: '100%',
  backgroundColor: 'rgb(155,155,255)',
  delay: anime.stagger(100),
});

timeline.add({
  targets: 'section div',
  backgroundColor: 'rgb(202,210,255)',
  width: '90%',
});

timeline.add(
  {
    targets: 'h1',
    top: '15%',
    opacity: 1,
    duration: 3000,
  },
  '-=1000', // offset
);

const rotation = anime({
  targets: 'section',
  scaleY: 2,
  scaleX: 2,
  translateX: '40%',
  rotate: '45deg',
  duration: 4000,
  autoplay: false,
});

const title = document.querySelector('h1');

title.addEventListener('mouseover', rotation.play);

// title.addEventListener('mouseout', rotation.reverse);
