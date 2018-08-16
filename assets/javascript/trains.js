
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDPCCklkAEMdwAZuyiPaLoBB_wgYgl_CwI",
  authDomain: "codersbay-402c8.firebaseapp.com",
  databaseURL: "https://codersbay-402c8.firebaseio.com",
  projectId: "codersbay-402c8",
  storageBucket: "codersbay-402c8.appspot.com",
  messagingSenderId: "846003266265"
};
firebase.initializeApp(config);
var database = firebase.database();


var name = '';
var role = '';
var date = '';
var rate = '';
var time = '';
var earnings = '';

function createRow() {
  // do stuff
  var newRow = $('<tr>');
  var nameCol = $('<td>');
  var roleCol = $('<td>');
  var dateCol = $('<td>');
  var rateCol = $('<td>');
  var timeCol = $('<td>');
  var earnCol = $('<td>');

  newRow.append(nameCol.text(name));
  newRow.append(roleCol.text(role));
  newRow.append(dateCol.text(date));
  newRow.append(rateCol.text(rate));
  newRow.append(timeCol.text(time));
  newRow.append(earnCol.text(earnings));
  $('#table-body').append(newRow);
}

database.ref().on('child_added', function(snapshot) {
  var startDate = snapshot.val().date;

  name = snapshot.val().name;
  role = snapshot.val().role;
  date = moment(startDate).format('MM/DD/YYYY');
  rate = snapshot.val().rate;
  time = snapshot.val().time;
  earnings = snapshot.val().earnings;

  createRow();
});

$('#submit').on('click', function(event) {
  event.preventDefault();
  var startDate = $('#start-input').val().trim();

  name = $('#name-input').val().trim();
  role = $('#role-input').val().trim();
  date = moment(startDate).format('MM/DD/YYYY');
  rate = $('#rate-input').val().trim();

  console.log(name);
  console.log(role);
  console.log(date);
  console.log(rate);

  database.ref().push({
    name: name,
    role: role,
    date: date,
    rate: rate,
    time: time,
    earnings: earnings,
  });

  // createRow();
});