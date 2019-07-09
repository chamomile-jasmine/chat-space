$(function() {

  // メッセージ表示のHTMLを生成
  function buildHTML(message) {
    var insertImage = '';
    if (message.image.url) {
      insertImage = `<img src="${message.image.url}">`;
    }
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
    console.log(formdata);
    $.ajax({
      type: 'POST',
      url: location.href,
      // group/1/messages
      data: formdata,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      console.log('aaaaaa')
      var message = buildHTML(data);
      // console.log(message)
      $('.messages').append(message);
      $('.form__message').val('');
      $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight}, 'fast');
      leastMessage = data;
    })
    .fail(function(data) {
      alert('メッセージを入力してください');
    });
  return false;
  });

  // メッセージ自動更新
//     var interval = setInterval(function() {
//       if (window.location.href.match(/\/groups\/\d+\/messages/)) {
//     $.ajax({
//       type: 'GET',
//       url: location.href,
//       dataType: 'json'
//     })
//     .done(function(data) {
//       var id = $('.chat').data('messageId');
//       var insertHTML = '';
//       data.messages.forEach(function(message) {
//         if (message.id > id ) {
//           insertHTML += buildHTML(message);
//         }
//       });
//       $('.chat-wrapper').prepend(insertHTML);
//     })
//     .fail(function(data) {
//       alert('自動更新に失敗しました');
//     });
//   } else {
//     clearInterval(interval);
//    }} , 5 * 1000 );
});


// 備忘
// var html = `
// <div class="message" data-message-id="${message.id}">
//   <p class="message__user">${message.name}</p>
//   <p class="message__date">${message.date}</p>
//   <p class="lower-message__content">${message.body}</p>
//   ${insertImage}
// </div>`;
// return html