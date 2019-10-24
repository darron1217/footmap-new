module.exports = (req, res, next) => {
    if(req.url == '/orders' && req.method == 'POST') {
        var Pusher = require('pusher');

        var channels_client = new Pusher({
          appId: '886510',
          key: '97e7b31d543104eaaa59',
          secret: '6db49968fcd9bc90309b',
          cluster: 'ap3',
          encrypted: true
        });
        
        channels_client.trigger('my-channel', 'my-event', {
          "message": "주문이 추가되었습니다"
        });
    }

    next()
}