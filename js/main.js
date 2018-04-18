function showNotifications() {
	$('.notifications').toggleClass('hidden');
}

// Iterate over each select element
$('select').each(function () {
  // Cache the number of options
  var $this = $(this),
      numberOfOptions = $(this).children('option').length;

  // Wrap the select element in a div
  $this.wrap('<div class="select"></div>');

  // Insert a styled div to sit over the top of the hidden select element
  $this.after('<div class="styledSelect"></div>');

  // Cache the styled div
  var $styledSelect = $this.next('div.styledSelect');

  // Show the first select option in the styled div
  $styledSelect.prepend('<p></p>');
  var $text = $styledSelect.children().first();
  $text.text($this.children('option').eq(0).text());

  // Insert an unordered list after the styled div and also cache the list
  var $list = $('<ul />', {
    'class': 'options'
  }).insertAfter($styledSelect);

  // Insert a list item into the unordered list for each select option
  for (var i = 0; i < numberOfOptions; i++) {
    $('<li />', {
      text: $this.children('option').eq(i).text(),
      rel: $this.children('option').eq(i).val()
    }).appendTo($list);
  }

  // Cache the list items
  var $listItems = $list.children('li');

  // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
  $styledSelect.click(function (e) {
    $(this).toggleClass('active').next('ul.options').toggle();
    if( $(this).hasClass('active') ) {
      $(this).addClass('activating');
    }
  });

  // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
  // Updates the select element to have the value of the equivalent option
  $listItems.click(function (e) {
    $text.text($(this).text()).removeClass('active');
    $this.val($(this).attr('rel'));
    $list.hide();
  });

  // Hides the unordered list when clicking outside of it
  $(document).click(function () {
    if( $styledSelect.hasClass('activating') ) {
      $styledSelect.removeClass('activating');
    } else {
      $styledSelect.removeClass('active');
      $list.hide();
    }
  });

  // Moves ID styles to the parent
  $this.parent().attr('id', $this.attr('id'));
  $this.remove();
});

$('#contest-search button').click(function () {
  $(this).toggleClass('active');
  var sibling = $(this).siblings('button').first();
  if( sibling.hasClass('active') ) {
    sibling.removeClass('active');
  }
});
$('#results aside button').click(function () {
  $(this).toggleClass('active');
  if( $(this).hasClass('active') ) {
    $(this).text("Watching");
  } else {
    $(this).text("Watch");
  }
});

function updateButtons() {
  $('#buttons div button').each(function () {
    $(this).css({
      'width': '0',
      'height': '0'
    })
  });
  $('#buttons div').each(function () {
    var row = parseInt($(this).css('grid-row-start')) - 1;
    if( row == 2 ) {
      row--;
    }
    var col = parseInt($(this).css('grid-column-start')) - 1;
    var height = $(this).height();

    $(this).children('button').first().css({
      'width': height + 'px',
      'height': height + 'px',
      'background-position': '-' + (col*2*height) + 'px -' + (row*height) + 'px'
    });
    $(this).children('button').last().css({
      'width': height + 'px',
      'height': height + 'px',
      'background-position': '-' + ((col*2+1)*height) + 'px -' + (row*height) + 'px'
    });
  });
}

$(window).resize(updateButtons);

updateButtons();
