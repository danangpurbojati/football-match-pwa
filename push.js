const webPush = require('web-push');

const vapidKeys = {
   "publicKey": "BHCg95_b-m4mYLIrh8g5yIJpSV-BuDBADTIKsp52dk2vbXVUj_kRiC4FBQy245KdSZhkDR_xTq9usyxG-0o7g8I",
   "privateKey": "1Ie9iyhu1BWxmgxcVwkEPFrVoS29vaTSsozmVz-2R3E"
};


webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
let pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dhy12eETzag:APA91bFcCEmpBBMiKqWuO2eNwndqsvsAvoNKP4TmZoGIH1W8RspJ02q_IOtfkvarijzsV7UFN14F20A4f-05VYWzRrSvZzmcHYiUZTNArxDwXvcW0XkRArwQSNDSN2TiePkfxLxy1GL1",
   "keys": {
       "p256dh": "BPuSKVTDqNM2rM9cCewmwFwJ56xL32zbd+2XLyPr95kai9eETdqvFWHPIwPuF78CqbOGDuKw087J1Lznaa39UnE=",
       "auth": "6vSOzhJyJavSFnwDX6gmpQ=="
   }
};
let payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

let options = {
   gcmAPIKey: '467449924995',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);