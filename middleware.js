module.exports = (req, res, next) => {
    if(req.url == '/orders' && req.method == 'POST' && req.body.truckId) {
        var Pusher = require('pusher');

        var channels_client = new Pusher({
          appId: '886510',
          key: '97e7b31d543104eaaa59',
          secret: '6db49968fcd9bc90309b',
          cluster: 'ap3',
          encrypted: true
        });
        
        channels_client.trigger('orders', 'truck.'+req.body.truckId, {
          "message": "주문이 추가되었습니다"
        });
    }

    // 준비완료요청이면
    if(req.url.startsWith('/orders/') && req.method == 'PATCH' && req.body.isReady) {
      var Pusher = require('pusher');

      var channels_client = new Pusher({
        appId: '886510',
        key: '97e7b31d543104eaaa59',
        secret: '6db49968fcd9bc90309b',
        cluster: 'ap3',
        encrypted: true
      });
      
      let orderId = req.url.replace('/orders/', '');
      channels_client.trigger('orders', 'user', {
        "message": "주문이 준비되었습니다",
        "orderId": orderId
      });
  }

    next()
}