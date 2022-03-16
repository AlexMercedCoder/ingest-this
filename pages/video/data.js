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
    { title: "GraphQL & Apollo Server", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbZ7XA4XFhxiVsg_Lu3dDKsK" },
    { title: "Express with LiquidJS", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbZQSCfJLwPcbsH_koOC_F-t" },
    { title: "Express/EJS with Session Based Auth", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbYY4AQ_mgBEc8JOrVBNUhk0" },
    { title: "Contentful/Jquery Build", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbYC-NRcAFVN4_R5D3HRmKGu" },
    { title: "Intro to SolidJS Framework", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbYaQQs3p_KrDZGAuNHYWpLw" },
    { title: "Working with Angular", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbahNK_YUsjTzP5U-FkGA544" },
    { title: "Working with Vue", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbbsEAIDfFAlhAVbSCIt2Bxx" },
    { title: "Working with Native Web Components", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbaNVkXHOHWxgdKEZLGKuFP9" },
    { title: "Working with StencilJS", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbazpUTMcGmvMtgU5sr0Ip-V" },
    { title: "Working with Gatsby", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbZgxwVjSuk-SkgoFNuMBWL_" },
    { title: "Working with Lodash", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbbB6o91AcCploetRyg5zgQs" },
  ] },

  { title: "Python", playlists: [
    { title: "Learning Python", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbaTvgXqNCRXcKnqbO5j2oQn" },
    { title: "Data with Python", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbZ0DdRY827HV53rK4gm6E8N" },
    { title: "Python web development with Masonite", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbYrrQQG2AKLYaXgn0W4ixWB" },
    { title: "Python Flask, FastAPI & Masonite", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbao2ssilmG_ahnqkEzxysMs" },
    { title: "Full Stack Django with React", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbYP5xLCFeEN0dPvc5tf_vqr" },
    { title: "Full Stack Django with Vue", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbYz5bMJizo2e-t0bw7YymLJ" },
  ] },

  { title: "Ruby", playlists: [
    { title: "Intro to Ruby", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbZp8Kh6jS5A6j-6H2kGY12e" },
    { title: "Full Stack Rails with React", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbYNIC0Yq3Cc6mgHZrWiZcJU" },
    { title: "Full Stack Rails with Vue", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbaerYuOKc9UxaKOS1k4qFWU" }, 
    { title: "Intro to Sinatra", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbZn4pi2Wma0MmqRtD9SImJj" },
    { title: "Intro to Ruby on Rails", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbYlAqVHgzZl5lou54bizdbV" },
  ] },

  { title: "PHP", playlists: [
    { title: "Intro to PHP", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbbLnwRkrCDhOl94iaibHwBJ" },
    { title: "Intro to the Laravel Web Framework", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbZ5TgZKeh0uKT6d1DenRmx1" },
  ] },

  { title: "GO", playlists: [
    { title: "Intro to Go", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbZbFOW6r6YulR1_9SCrdyOZ" },
    { title: "100 Days of Rust & Go", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbabcwTf0ijTQvDtgKrQ6pub" },
  ] },

  { title: "Rust", playlists: [
    { title: "Intro to Rust", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbYPkf2AhsPbq_YGh3q7p4Aj" },
  ] },

  { title: "Other Languages", playlists: [
    { title: "Intro to ReasonML and OCAML", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbbwwLH1c7n-2prVeWzE2b8V" },
    { title: "Working with Postgres/SQL", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbYC24jbJwOmekvsraIV8Gv7" },
    { title: "Learning SQL", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbb8R-o64IT1vLp5mUTXUuyx" },
    { title: "Programming in Scala", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbYj5195RSNJHCb9myXyThYZ" },
    { title: "Learning Java", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbZtl3gTxPisijUGR3AnKw6D" },
    { title: "Programming in C#", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbaQfi5KyW7IexlIsIKD1Oqb" },
    { title: "Programming in C", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbaFlr8YPGokRA1CjJ20BE_b" },
    { title: "Programming in C++", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbaOEN-4vA_cZ5bqwysKCOGC" },
    { title: "Programming in Raku", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbbMOdyKsY9U2KS4BCOMmAzR" },
    { title: "Programming in Ballerina", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbbWQOA-j-uyf6swRqwP4Ehr" },
    { title: "Programming in Nim", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbaU9h_STLxU-hYXBTvFYqZF" },
    { title: "Programming in Clojure", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbarM5X9VpYCVtPH85rsunv0" },
    { title: "Programming in Kotlin", url: "https://youtube.com/playlist?list=PLY6oTPmKnKba9Xg06DR67IxdppdKsQZ_s" },
    { title: "Programming in Clojure", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbarM5X9VpYCVtPH85rsunv0" },
    { title: "Programming in Dart", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbZaOObALdHSgGTZhne6Q-yJ" },
    { title: "Programming in Swift", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbYn60pD3UYfYw7BzxGY2Do0" },
    { title: "Programming in Exlixir", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbYZhj8LsQ3yq1vn-HwlpkkS" },
    { title: "Programming in Crystal", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbZZBx6Z4uQ2vTUic2mBT5rw" },
    { title: "Other Languages", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbbGEJLfi6qkHkMp6wGaTkJh" },
  ] },

  { title: "Misc.", playlists: [
    { title: "Computer Science Concepts", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbbfwjU1ToZlUWCinxmFqlIp" },
    { title: "Basic Data Skills", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbb5ARhHDPgOQBF3fp-DjX9H" },
    { title: "Programmer Tools", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbYjGEm9nLowExbgkI-epIgg" },
    { title: "Docker", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbY4s-zvHlgaa3UROegVr8f9" },
    { title: "Command Line - Bash & Git", url: "https://www.youtube.com/playlist?list=PLY6oTPmKnKbYrSHKdkYjpMs99RyxzyXWp" },
    { title: "Working with MongoDB", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbaSCVF-Imd1hkQJvl8iLrV3" },
    { title: "Collaboration Tools", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbZ6P8tdFlrRAOTk6NUNjMMx" },
    { title: "Deployment", url: "https://youtube.com/playlist?list=PLY6oTPmKnKbYrresZjUQSzYoBYrSmzoM2" },
  ] },
];

export default videos;
