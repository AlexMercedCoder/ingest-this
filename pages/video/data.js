const videos = [
  { title: "HTML/CSS", playlists: [
  { title: "Intro to HTML/CSS/JS", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbbeAFC_F_f6jBKU4Xfu24sX" },
  { title: "Styling with CSS", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbZXeMjA3ngkpE_4puPstrLT" }
] },
  { title: "Javascript", playlists: [
    { title: "Javascript 101", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbZDZ9cRrRby4Wnr4GIJj5O3" },
    { title: "Javascript & Typescript 101", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbaLXuHhxl_dZenjmrjYd8Sc" },
    { title: "Node & Deno - Server-side Javascripts", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbaSy7nS6p4F8CgA4iPVdwwg" },
    { title: "Javascript DOM Manipulation", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbbZvUyySSQYfnaClxfo4_iE" },
    { title: "Javascript Object Oriented Programming", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbagncvwQeIvSmHlirSGNCUO" },
    { title: "Debugging Javascript", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbbRBom0Txvg28C6EySkR6Vq" },
    { title: "Javascript Dates 101", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbYxFXNkZqZDAko98ZzABjQ7" },
    { title: "Intro to Svelte", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbZtkaXh9VeZFTTzsLO0koJS" },
    { title: "Typescript 101", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbboGAL_-MineM-zcOblOm6V" },
    { title: "Working with NextJS", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbZBfml7eZ-ubwCEMC4EjdTN" },
    { title: "Intro to React", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbba6LlpF7kcnsyWdlwePt_V" },
    { title: "Express with Express-React-Views", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbYSccuOraBKdmf-hnayh_-7" },
    { title: "Full Stack Express with React", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbZujWwt2VVNbtxslz0qrXbG" }, 
    { title: "React with 3rd Party APIs", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbYihSJuWSGpvNDD8QvA4ha8" },
    { title: "Learning Python", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbaTvgXqNCRXcKnqbO5j2oQn" },
    { title: "Learning Python", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbaTvgXqNCRXcKnqbO5j2oQn" },
    { title: "Learning Python", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbaTvgXqNCRXcKnqbO5j2oQn" },
  ] },

  { title: "Python", playlists: [
    { title: "Learning Python", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbaTvgXqNCRXcKnqbO5j2oQn" },
    { title: "Data with Python", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbZ0DdRY827HV53rK4gm6E8N" },
    { title: "Python web development with Masonite", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbYrrQQG2AKLYaXgn0W4ixWB" },
    { title: "Python Flask, FastAPI & Masonite", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbao2ssilmG_ahnqkEzxysMs" },
    { title: "Full Stack Django with React", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbYP5xLCFeEN0dPvc5tf_vqr" },
    { title: "Learning Python", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbaTvgXqNCRXcKnqbO5j2oQn" },
  ] },

  { title: "Ruby", playlists: [
    { title: "Full Stack Rails with React", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbYNIC0Yq3Cc6mgHZrWiZcJU" },
    { title: "Full Stack Rails with React", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbYNIC0Yq3Cc6mgHZrWiZcJU" }, 
    { title: "Full Stack Rails with React", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbYNIC0Yq3Cc6mgHZrWiZcJU" },
    { title: "Full Stack Rails with React", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbYNIC0Yq3Cc6mgHZrWiZcJU" },
  ] },

  { title: "PHP", playlists: [
    { title: "Intro to Svelte", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbZtkaXh9VeZFTTzsLO0koJS" },
  ] },

  { title: "GO", playlists: [
    { title: "Intro to Svelte", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbZtkaXh9VeZFTTzsLO0koJS" },
  ] },

  { title: "Rust", playlists: [
    { title: "Intro to Svelte", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbZtkaXh9VeZFTTzsLO0koJS" },
  ] },

  { title: "Other Languages", playlists: [
    { title: "Intro to Svelte", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbZtkaXh9VeZFTTzsLO0koJS" },
    { title: "Working with Postgres/SQL", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbYC24jbJwOmekvsraIV8Gv7" },
    { title: "Learning SQL", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbb8R-o64IT1vLp5mUTXUuyx" },
    { title: "Programming in Scala", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbYj5195RSNJHCb9myXyThYZ" },
    { title: "Learning Java", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbZtl3gTxPisijUGR3AnKw6D" },
    { title: "Intro to Svelte", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbZtkaXh9VeZFTTzsLO0koJS" },
  ] },

  { title: "Misc.", playlists: [
    { title: "Computer Science Concepts", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbbfwjU1ToZlUWCinxmFqlIp" },
    { title: "Basic Data Skills", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbb5ARhHDPgOQBF3fp-DjX9H" },
    { title: "Programmer Tools", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbYjGEm9nLowExbgkI-epIgg" },
    { title: "Docker", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbY4s-zvHlgaa3UROegVr8f9" },
    { title: "Command Line - Bash & Git", url: "https://www.youtube.com/playlist?list=PLY6oTPmKnKbYrSHKdkYjpMs99RyxzyXWp" },
    { title: "Working with MongoDB", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbaSCVF-Imd1hkQJvl8iLrV3" },
    { title: "Computer Science Concepts", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbbfwjU1ToZlUWCinxmFqlIp" },
    { title: "Computer Science Concepts", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbbfwjU1ToZlUWCinxmFqlIp" },
  ] },
];

export default videos;
