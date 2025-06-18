document.getElementById('openDialog').addEventListener('click', function() {
    $('#confirmationDialog').modal('show');
});

document.getElementById('confirmButton').addEventListener('click', function() {
    alert('İşlem onaylandı!');
    $('#confirmationDialog').modal('hide');
});