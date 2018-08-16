
// Firebase
var config = {
  apiKey: "AIzaSyCuvebUBeuzbDRWlB01OWO0eXO4HUM1TIc",
  authDomain: "train-2081e.firebaseapp.com",
  databaseURL: "https://train-2081e.firebaseio.com",
  projectId: "train-2081e",
  storageBucket: "train-2081e.appspot.com",
  messagingSenderId: "355494074362"
};
firebase.initializeApp(config);

// Variables
var database = firebase.database();
var name = '';
var dest = '';
var freq = '';
var first = '';

// Functions
function createRow() {
  var newRow = $('<tr>');
  var nameCol = $('<td>');
  var destCol = $('<td>');
  var freqCol = $('<td>');
  var nextCol = $('<td>');
  var etaCol = $('<td>');

  var firstTrain = moment(first, 'HH:mm');

  if (moment().isBefore(firstTrain)) {
    var next = moment(firstTrain).format('hh:mm a');
    var eta = moment(firstTrain).diff(moment(), 'minutes') + 1;
  }
  else {
    var diff = moment().diff(moment(firstTrain), 'minutes');
    var mod = diff % freq;
    var eta = freq - mod;
    var nextTrain = moment().add(eta, 'minutes');
    var next = moment(nextTrain).format('hh:mm a');
  }

  newRow.append(nameCol.text(name));
  newRow.append(destCol.text(dest));
  newRow.append(freqCol.text(freq));
  newRow.append(nextCol.text(next));
  newRow.append(etaCol.text(eta));

  $('#train-table').append(newRow); 
}

// Events
database.ref().on('child_added', function(snapshot) {
  name = snapshot.val().name;
  dest = snapshot.val().dest;
  freq = snapshot.val().freq;
  first = snapshot.val().first;

  createRow();
});

$('#submit').on('click', function(event) {
  event.preventDefault();
  var first = $('#first-input').val().trim();

  name = $('#name-input').val().trim();
  dest = $('#dest-input').val().trim();
  freq = $('#freq-input').val().trim();

  database.ref().push({
    name: name,
    dest: dest,
    freq: freq,
    first: first,
  });
  
  $('#first-input').val('');
  $('#name-input').val('');
  $('#dest-input').val('');
  $('#freq-input').val('');
});