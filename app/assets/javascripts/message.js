$(function() {

  // メッセージ表示のHTMLを生成
  function buildHTML(message) {
    var insertImage = message.image.url ? `<img src="${message.image.url}">` : "";
     
    var html = `
    <div class="message">
     <div class="upper-message">
       <div class="upper-message__user-name">${message.name}</div>
       <div class="upper-message__date">${message.date}</div>
      </div>
      <div class="lower-message">
       <p class="lower-message__content">
       ${message.body}
       </p>
        ${insertImage}
      </div>
     </div>`;
    return html
  }


  // メッセージ送信の非同期通信
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formdata = new FormData(this);
    $.ajax({
      type: 'POST',
      url: location.href,
      data: formdata,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var message = buildHTML(data);
      $('.messages').append(message);
      $('#new_message')[0].reset();
      $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight}, 'fast');
      leastMessage = data;
    })
    .fail(function(data) {
      alert('メッセージを入力してください');
    });
  return false;
  });


});
