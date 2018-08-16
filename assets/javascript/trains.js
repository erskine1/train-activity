
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCuvebUBeuzbDRWlB01OWO0eXO4HUM1TIc",
  authDomain: "train-2081e.firebaseapp.com",
  databaseURL: "https://train-2081e.firebaseio.com",
  projectId: "train-2081e",
  storageBucket: "train-2081e.appspot.com",
  messagingSenderId: "355494074362"
};
firebase.initializeApp(config);
var database = firebase.database();


var name = '';
var dest = '';
var freq = '';
var next = '';
var eta = '';

function createRow() {
  // do stuff
  var newRow = $('<tr>');
  var nameCol = $('<td>');
  var destCol = $('<td>');
  var freqCol = $('<td>');
  var nextCol = $('<td>');
  var etaCol = $('<td>');

  newRow.append(nameCol.text(name));
  newRow.append(destCol.text(dest));
  newRow.append(freqCol.text(freq));
  newRow.append(nextCol.text(next));
  newRow.append(etaCol.text(eta));

  $('#train-table').append(newRow);
}

database.ref().on('child_added', function(snapshot) {
  var nextTrain = snapshot.val().next;

  name = snapshot.val().name;
  dest = snapshot.val().dest;
  freq = snapshot.val().freq;
  next = moment(nextTrain).format('MM/DD/YYYY');
  eta = snapshot.val().eta;

  createRow();
});

$('#submit').on('click', function(event) {
  event.preventDefault();
  var nextTrain = $('#first-input').val().trim();

  name = $('#name-input').val().trim();
  dest = $('#dest-input').val().trim();
  freq = $('#freq-input').val().trim();
  next = moment(nextTrain).format('MM/DD/YYYY');
  
  console.log(name);
  console.log(dest);
  console.log(freq);
  console.log(next);
  

  database.ref().push({
    name: name,
    dest: dest,
    freq: freq,
    next: next,
    eta: eta,
  });

  // createRow();
});