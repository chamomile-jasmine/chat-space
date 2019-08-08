$(function() {

  // メッセージ表示のHTMLを生成
  function buildHTML(message) {
    image = (message.image) ? `<img class="lower-message__image" src=${message.image}>` : "";
     
    var html = `
    <div class="message" data-message-id="${message.id}">

     <div class="upper-message">
       <div class="upper-message__user-name">${message.user_name}</div>
       <div class="upper-message__date">${message.date}</div>
      </div>
      <div class="lower-message">
       <p class="lower-message__content">
       ${message.content}
       </p>
        ${image}
      </div>
     </div>`
    return html;
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
    })
    .fail(function(data) {
      alert('メッセージを入力してください');
    });
  return false;
  });
 

 // メッセージ自動更新
  var reloadMessages = function() {
   if (window.location.href.match(/\/groups\/\d+\/messages/)){
     var last_message_id = $('.message:last').data("message-id");
    
     $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {last_id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function (message){
      insertHTML = buildHTML(message);
      $('.messages').append(insertHTML);
      })
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast');
    })
    .fail(function() {
      alert('自動更新に失敗しました');
     });
    }
    };
   setInterval(reloadMessages,5000);
  ;


});
