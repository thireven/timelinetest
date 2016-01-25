var line, bars, trash, timelineContainer, modalShowing = false;

function addAddTimelineButton() {
  var button = $('<li/>').addClass('add-timeline');
  timelineContainer.append(button);
}

function removeAddTimelineButton() {
  timelineContainer.find('.add-timeline').remove();
}

$(function() {
  timelineContainer = $('.timeline-list'),
  bars = $('#template-container .move'),
  line = $('#template-container svg.dotted-line'),
  trash = $('#template-container i.fa-trash');

  addAddTimelineButton();

  var container = document.getElementById('test');

  var sort = Sortable.create(container, {
    animation: 150, // ms, animation speed moving items when sorting, `0` — without animation
    handle: "h3", // Restricts sort start click/touch to the specified element
    draggable: "li", // Specifies which items inside the element should be sortable
    onStart: function(evt) {
      removeAddTimelineButton();
    },
    onEnd: function(evt){
      addAddTimelineButton();
    }
  });

  $('.timeline-list ol').each(function() {
    var elem = $(this)[0];
    $(this).find('li').prepend(bars.clone());
    Sortable.create(elem, {
      animation: 150,
      group: {name: 'sub'},
      handle: ".move"
    });

    $(this).parent().append($('<i/>').addClass('add-subitem').html('+'));
  });

  $('.timeline-item').each(function() {
    var new_line = line.clone(),
    bg = $('<div/>').addClass('bg').append(new_line);
    $(this).prepend(bg);
  });

  $('.timeline-sub-item').each(function() {
    $(this).append(trash.clone());
  });

$('#myModal1')
  .on('show.bs.modal', function() {
    modalShowing = true;
  })
  .on('hide.bs.modal', function() {
    modalShowing = false;
  });

  $('.timeline-sub-item')
    .on('click', '.fa-trash', function() {
        var elem = $(this).parent();
        elem.velocity(
          {opacity: 0},
          {
            complete: function() {
              elem.remove();
            }
          }
        );
    })
    .on('click', ':not(.fa-trash,.move)', function() {
      if(!modalShowing) {
        $('#myModal1').modal();
      }
    });

  // add the animation to the modal
  $(".modal").each(function(index) {
    $(this).on('show.bs.modal', function(e) {
      var open = $(this).attr('data-easein');
      $('.modal-dialog').velocity('transition.' + open);
    });
  });


});
