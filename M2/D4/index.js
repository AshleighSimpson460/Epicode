/* EXERCISE 1
  Given the object below, write a piece of code for programmatically removing the last skill from the skills array inside the me object.
 */

  const me = {
    name: "Joh",
    lastName: "Doe",
    skills: ["javascript", "html", "css"],
  };

  //The pop() method removes (pops) the last element of an array. The pop() method changes the original array. The pop() method returns the removed element.
  // These are notes for myself when I go over my homework :D
  
  me.skills.pop();

  console.log(me)
  
  /* EXERCISE 2
  Write a piece of code to create an array of only ODD numbers from 1 to 100
   */
  const array1 = []

//if (x % 2 !==0) for odd  (x % 2 !==1) for even numbers.

  for(let x = 1; x <=100; x++){
    if (x % 2 !== 0);
    array1.push(x)
  }
  console.log(array1)

  // let odds = arr.filter(n => n%2) <-- This is how you retrieve only ODD numbers from an Array of 1 to 100.

  let oddNum = array1.filter(x => x%2)

  console.log(oddNum)

  /* EXERCISE 3
  Write a piece of code to create an array of 10 elements of random numbers in the range from 0 to 100 inclusive
   */
  let arr = []
  for(let i = 0; i < 10; i++){
    const random = Math.round(Math.random() * 100)
    arr.push(random)
  }
  console.log(arr)
  

  /* EXERCISE 4
    Write a piece of code for getting only even numerical values from an array . 
   */
  
    const array2 = []
    for(let y = 1; y <=100; y++){
      if (y % 2 !==1)
      array2.push(y)
    }
    
  
    let evenNum = array2.filter(y => y%2 === 0);
  
    console.log(array2)

  /* EXERCISE 5
  Write a piece of code to sum up the numbers in an array
   */
  
    let array3 = [1,2,3,4,5,6,8,9]
    let sum = 0

    for(let z = 0; z < array3.length; z++){
        sum += array3[z];
    }
    console.log(sum)

  /* EXERCISE 6
   Write a piece of code for increasing all the numerical values in a array by 1.
  */
  
   // The addition assignment (+=) operator adds the value of the right operand to a variable and assigns the result to the variable.
    const array4 = [1,2,3,4,5]

    for (let i = 0; i < array4.length; i++){
        array4 [i] += 1;
    }

    console.log(array4)

  /* EXERCISE 7 (EXTRA)
   Write a piece of code for deleting only even entries from an array.
  */
  
   const arr4 = [1,2,3,4,5,6]
   for(let i = 0; i < arr4.length; i++){
     if(arr4[i] % 2 ===0){
         arr4.splice(i--,1)
     }
   }
   console.log(arr4)



  /* EXERCISE 8
  Write a piece of code to create an array of 10 elements of random numbers in the range from 0 to 10 inclusive WITHOUT duplicates
   */
  
    // did not understand this question I will ask for help on this one
    // v

  const arr8 = [];

  while (arr8.length < 10) {
    const rand = Math.floor(Math.random() * 101 + 1);
    if (!arr8.includes(rand)) {
      arr8.push(rand);
    }
  }
  
  console.log(arr8);

  /* EXERCISE 9
   Replace all the strings contained in an array with their length.
   es.: ["strive", "is", "great"] => [6, 2, 5]
  */
  
    // array6[e] = array6[e].length; is the key to showing the length in the console panel for the amount of letters in each word <-- without the code does not appear how you think

   let array6 = ["strive", "is", "great"]
   for(let e = 0; e < array6.length; e++){
    array6[e] = array6[e].length;
   }
   
   console.log(array6)

  /* EXERCISE 10
   Write a piece of code for reverting an array.
   es:
   [1, 3, 5] ==> [5, 3, 1]
  */
  
   let array7 = [1, 3, 5]

   array7.reverse();

   console.log(array7)

  /* EXERCISE 11
   Write a piece of code for getting the maximum numerical value from an array.
  */
  
   // const array8Max = Math.max(...array8); <-- highest value
   //const array8Max = Math.min(...array8); <-- lowest value

   let array8 = [23, 122, 1, 23, 4, 56]

   const array8Max = Math.max(...array8);

   console.log(array8Max)

  /* This movies array is used throughout the exercises. You're not supposed to alter it. */
  const movies = [
    {
      Title: "The Lord of the Rings: The Fellowship of the Ring",
      Year: "2001",
      imdbID: "tt0120737",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg",
    },
    {
      Title: "The Lord of the Rings: The Return of the King",
      Year: "2003",
      imdbID: "tt0167260",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    },
    {
      Title: "The Lord of the Rings: The Two Towers",
      Year: "2002",
      imdbID: "tt0167261",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNGE5MzIyNTAtNWFlMC00NDA2LWJiMjItMjc4Yjg1OWM5NzhhXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    },
    {
      Title: "Lord of War",
      Year: "2005",
      imdbID: "tt0399295",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTYzZWE3MDAtZjZkMi00MzhlLTlhZDUtNmI2Zjg3OWVlZWI0XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg",
    },
    {
      Title: "Lords of Dogtown",
      Year: "2005",
      imdbID: "tt0355702",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNDBhNGJlOTAtM2ExNi00NmEzLWFmZTQtYTZhYTRlNjJjODhmXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg",
    },
    {
      Title: "The Lord of the Rings",
      Year: "1978",
      imdbID: "tt0077869",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BOGMyNWJhZmYtNGQxYi00Y2ZjLWJmNjktNTgzZWJjOTg4YjM3L2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
    },
    {
      Title: "Lord of the Flies",
      Year: "1990",
      imdbID: "tt0100054",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BOTI2NTQyODk0M15BMl5BanBnXkFtZTcwNTQ3NDk0NA@@._V1_SX300.jpg",
    },
    {
      Title: "The Lords of Salem",
      Year: "2012",
      imdbID: "tt1731697",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMjA2NTc5Njc4MV5BMl5BanBnXkFtZTcwNTYzMTcwOQ@@._V1_SX300.jpg",
    },
    {
      Title: "Greystoke: The Legend of Tarzan, Lord of the Apes",
      Year: "1984",
      imdbID: "tt0087365",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTM5MzcwOTg4MF5BMl5BanBnXkFtZTgwOTQwMzQxMDE@._V1_SX300.jpg",
    },
    {
      Title: "Lord of the Flies",
      Year: "1963",
      imdbID: "tt0057261",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BOGEwYTlhMTgtODBlNC00ZjgzLTk1ZmEtNmNkMTEwYTZiM2Y0XkEyXkFqcGdeQXVyMzU4Nzk4MDI@._V1_SX300.jpg",
    },
    {
      Title: "The Avengers",
      Year: "2012",
      imdbID: "tt0848228",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    },
    {
      Title: "Avengers: Infinity War",
      Year: "2018",
      imdbID: "tt4154756",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg",
    },
    {
      Title: "Avengers: Age of Ultron",
      Year: "2015",
      imdbID: "tt2395427",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg",
    },
    {
      Title: "Avengers: Endgame",
      Year: "2019",
      imdbID: "tt4154796",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg",
    },
  ];
  
  /* EXERCISE 12
      Write a piece of code to  find the oldest movie in the provided movies array.
  */
  
  

  /* EXERCISE 13
      Write a piece of code to get the number of movies contained in the provided movies array.
  */
  
  let totalMovies = movies.length;

  console.log(totalMovies)

  /* EXERCISE 14
      Write a piece of code to create an array with just the titles of the movies contained in the provided movies array.
  */
      // push is a mutating method
      // ... means decompose the array into values

  let MovieName = []

  for (a = 0; a < movies.length; a++){
    MovieName.push(movies[a].Title)
  }
  
  console.log(MovieName)

  /* EXERCISE 15
     Write a piece of code to get only the movies produced in this millennium from the provided movies array.
  */
  
     let MovieYear = []

     for (a = 0; a < movies.length; a++){
       if(movies[a].Year >= 2000){
        MovieYear.push(movies[a].Year)
       }
     }

     console.log(MovieYear)

  /* EXERCISE 16
     Write a piece of code to get  the movie with the  id given below from the provided movies array.
  */
 
  const id = "tt0355702";
  
    for(let n = 0; n < movies.length; n++){
      if(movies[n].imdbID !== id);
      movieID = movies[n];
      break;
    }

    console.log(movieID)

  /* EXERCISE 17
       Write a piece of code to get  the  the sum of all the years in which the movies in the provided movies array have been produced.
  */
    let sum1 = 0

   for (let c = 0; c < movies.length; c++){
    sum1 = sum1 + parseInt(movies[c].Year);
   }

   console.log(sum1)
  /* EXERCISE 18
     Write a piece of code to get  all the movies in the provided movies array which contain the string value (provided below) in the title.
  */
  
   let outcome = []

   for (let b = 0; b < movies.length; b++){
    if(movies[b].Title.includes("Lord","Avengers"));
    outcome.push(movies[b]);
   }

    console.log(outcome)