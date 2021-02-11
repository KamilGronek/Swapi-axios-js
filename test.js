let orgArray = [1, 2, 3];

let copy = orgArray.map((e) => e + 1); // => return {}

copy.reverse();

copy[2]; //1 //e + 1 = 2
orgArray[2]; //3 //e + 1 = 3

//==================================

let orgArray2 = [1, 2, 3];

// orgArray2.forEach((e) => e + 1); // dodawaonie i nic z tym nie robimy
// orgArray2.forEach((e, i) => {
//   orgArray2[i] = e + 1;
// });

function myMap(org, callback) {
  let newTab = [org.length];
  // co robi map
  for (i = 0; i < org.length; i++) {
    newTab[i] = callback(org[i]);
  }

  return newTab;
}

myMap(orgArray2, (e) => {
  return e + 1;
});

orgArray2.reverse();

orgArray2[2]; //1 //e + 1 = 1

//===================================

let orgArray3 = [1, 2, 3];

let copy3 = orgArray3.filter((e) => e);

copy3.reverse();

copy3[2]; //1
orgArray3[2]; //3
