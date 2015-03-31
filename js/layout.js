$(function() {

  // Launch modal on load
  $('#add-columns-modal').addClass('show');

  // create main layout
  $('#add-columns-btn').click(function() {
    $('#add-columns-modal').removeClass('show');

    var cols = $('#add-columns-number').val();
    $('#main-grid').attr('data-columns', cols);
    if ($('input[name=add-columns-gutter]:checked').val() === 'yes') {
      $('#main-grid').addClass('tef-gutter');
    }

    // build columns
    for (var i = 0; i < cols ; ++ i) {
      var itemID = 'column-'+ (i+1);
      $('#main-grid').append('<div id="'+ itemID +'"><span>Column '+ (i+1) +'</span> <button id="add-'+ itemID +'" class="tef-button small subdued"><i data-icon="plus"></i></button><button id="remove-'+ itemID +'" class="tef-button small subdued"><i data-icon="minus"></i></button></div>');
    }
  });


});

