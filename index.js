/**
 * Created by liuqi on 2017/12/11.
 */
$(function () {
    /*$('.comment-box').nestComment({
     data:[{
     id: 1,
     name: 'Item 1',
     price: '$1'
     }, {
     id: 2,
     name: 'Item 2',
     price: '$2'
     }]
     });*/

    /*$('#my-nest').nestComment({
     url: '/nest/comments?parentId=0&topicType=0&topicId=24695531230177356545&type=0&page=1&rows=10',
     onAll:function (data,args) {
     console.log('双击666');
     }
     });*/
    $('#my-nest').nestComment({
        data: [{
            "id": "24719563439646783560",
            "authorName": "jelon",
            "authorEmail": "jilijelon@163.com",
            "authorUrl": "www.baidu.com",
            "authorIp": "127.0.0.1",
            "authorAgent": "firefox",
            "authorInfo": null,
            "createDate": "2017-12-07 14:59:44",
            "content": "不错哦，双击666",
            "likeCount": 0,
            "replyCount": 0,
            "isTop": 0,
            "isHot": 0,
            "type": 0,
            "status": 1,
            "parentId": "0",
            "topicId": "24695531230177356545",
            "topicType": 0
        }, {
            "id": "24719566450206817150",
            "authorName": "joanna",
            "authorEmail": "joanna@163.com",
            "authorUrl": "www.baidu.com",
            "authorIp": "127.0.0.1",
            "authorAgent": "firefox",
            "authorInfo": null,
            "createDate": "2017-12-07 15:00:02",
            "content": "棒棒棒",
            "likeCount": 0,
            "replyCount": 0,
            "isTop": 0,
            "isHot": 0,
            "type": 0,
            "status": 1,
            "parentId": "0",
            "topicId": "24695531230177356545",
            "topicType": 0
        }, {
            "id": "24719567714396197995",
            "authorName": "joanna",
            "authorEmail": "joanna@163.com",
            "authorUrl": "www.baidu.com",
            "authorIp": "127.0.0.1",
            "authorAgent": "firefox",
            "authorInfo": {
                "userId": "23885819423303763495",
                "fname": "吉",
                "lname": "力",
                "nickName": "机智的码农",
                "avatar": "http://q.qlogo.cn/headimg_dl?dst_uin=806533632&spec=100",
                "birthday": "2017-10-09 17:31:10",
                "sex": "1",
                "siteUrl": "jilijelon.liangrenyixin.cn",
                "introduction": "天下代码，唯快不破"
            },
            "createDate": "2017-12-07 15:00:10",
            "content": "棒棒棒66666",
            "likeCount": 0,
            "replyCount": 0,
            "isTop": 0,
            "isHot": 0,
            "type": 0,
            "status": 1,
            "parentId": "0",
            "topicId": "24695531230177356545",
            "topicType": 0
        }, {
            "id": "24721826429839419921",
            "authorName": "jelon",
            "authorEmail": "jilijelon@163.com",
            "authorUrl": "http://www.baidu.com",
            "authorIp": "127.0.0.1",
            "authorAgent": "fireFox",
            "authorInfo": null,
            "createDate": "2017-12-07 18:49:56",
            "content": "内容也是666",
            "likeCount": 0,
            "replyCount": 3,
            "isTop": 0,
            "isHot": 0,
            "type": 0,
            "status": 1,
            "parentId": "0",
            "topicId": "24695531230177356545",
            "topicType": 0
        }, {
            "id": "24735712314664979022",
            "authorName": "测试的人",
            "authorEmail": "test@163.com",
            "authorUrl": "www.baidu.com",
            "authorIp": "127.0.0.1",
            "authorAgent": "",
            "authorInfo": null,
            "createDate": "2017-12-08 18:22:28",
            "content": "说点啥好呢",
            "likeCount": 0,
            "replyCount": 0,
            "isTop": 0,
            "isHot": 0,
            "type": 0,
            "status": 0,
            "parentId": "0",
            "topicId": "24695531230177356545",
            "topicType": 0
        }, {
            "id": "24735795014543382943",
            "authorName": "小机智",
            "authorEmail": "xiaojizhi@xiaojizhi.com",
            "authorUrl": "www.asd.com",
            "authorIp": "127.0.0.1",
            "authorAgent": "",
            "authorInfo": null,
            "createDate": "2017-12-08 18:30:53",
            "content": "说点啥好呢",
            "likeCount": 0,
            "replyCount": 0,
            "isTop": 0,
            "isHot": 0,
            "type": 0,
            "status": 0,
            "parentId": "0",
            "topicId": "24695531230177356545",
            "topicType": 0
        }, {
            "id": "24735796165355549736",
            "authorName": "小机智",
            "authorEmail": "xiaojizhi@xiaojizhi.com",
            "authorUrl": "www.asd.com",
            "authorIp": "127.0.0.1",
            "authorAgent": "",
            "authorInfo": null,
            "createDate": "2017-12-08 18:31:00",
            "content": "说点啥好呢2",
            "likeCount": 0,
            "replyCount": 0,
            "isTop": 0,
            "isHot": 0,
            "type": 0,
            "status": 0,
            "parentId": "0",
            "topicId": "24695531230177356545",
            "topicType": 0
        }, {
            "id": "24735796673587217928",
            "authorName": "小机智",
            "authorEmail": "xiaojizhi@xiaojizhi.com",
            "authorUrl": "www.asd.com",
            "authorIp": "127.0.0.1",
            "authorAgent": "",
            "authorInfo": null,
            "createDate": "2017-12-08 18:31:03",
            "content": "说点啥好呢3",
            "likeCount": 0,
            "replyCount": 0,
            "isTop": 0,
            "isHot": 0,
            "type": 0,
            "status": 0,
            "parentId": "0",
            "topicId": "24695531230177356545",
            "topicType": 0
        }, {
            "id": "24735797155276862330",
            "authorName": "小机智",
            "authorEmail": "xiaojizhi@xiaojizhi.com",
            "authorUrl": "www.asd.com",
            "authorIp": "127.0.0.1",
            "authorAgent": "",
            "authorInfo": null,
            "createDate": "2017-12-08 18:31:06",
            "content": "说点啥好呢5",
            "likeCount": 0,
            "replyCount": 0,
            "isTop": 0,
            "isHot": 0,
            "type": 0,
            "status": 0,
            "parentId": "0",
            "topicId": "24695531230177356545",
            "topicType": 0
        }, {
            "id": "24735797635655745425",
            "authorName": "小机智",
            "authorEmail": "xiaojizhi@xiaojizhi.com",
            "authorUrl": "www.asd.com",
            "authorIp": "127.0.0.1",
            "authorAgent": "",
            "authorInfo": null,
            "createDate": "2017-12-08 18:31:09",
            "content": "说点啥好呢5asdas  qwdasd ",
            "likeCount": 0,
            "replyCount": 0,
            "isTop": 0,
            "isHot": 0,
            "type": 0,
            "status": 0,
            "parentId": "0",
            "topicId": "24695531230177356545",
            "topicType": 0
        }]
    });

    console.log($('#my-nest').nestComment('getData'));

});
