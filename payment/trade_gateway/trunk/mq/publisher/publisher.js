const { MqSendMessage } = require('../../models/tradeGatewayDb');
const PROCESS_ID = process.pid;
const MESSAGE_ID_START = 'TRADE_GATEWAY_';
const Publisher = function (publisher) {
    this.publisher = publisher;
};
const logger = global.Logger('mq-publisher-publisher');

/**
 * 消息结构为：
 * {
 *      messageId,
 *      data: {
 *          业务所需内容
 *      }
 * }
 */

Publisher.prototype.initMessage = function (message) {
    // 系统开头+时间戳+进程号+2位随机数
    let no = MESSAGE_ID_START + Date.now() + '_' + PROCESS_ID + '_' + parseInt(Math.random() * 100);
    message.messageId = no;
    return Promise.resolve(message);
}

/**
 * 发送消息
 * 1、插入消息记录（插入失败回滚）
 * 2、发送消息
 * 3、发送成功删除，失败保留消息
 * @param message
 * @param options
 * @param callback
 */
Publisher.prototype.saveMessage = function (par, options) {
    let publisher = this.publisher;
    let transaction;
    let {
        message,
        options: sendOptions
    } = par;
    transaction = options.transaction;
    //插入消息
    return MqSendMessage.create({
        content: JSON.stringify(message),
        type: publisher,
        options: sendOptions && JSON.stringify(sendOptions) || '',
        timestamp: Date.now(),
        messageId: message.messageId
    }, {
        transaction: transaction
    })
};

/**
 * 发送成功后删除消息，如果删除消息失败，事务不回滚
 */
Publisher.prototype.success = function (log, options) {
    return log.update({
            state: 99
        }, {
            transaction: options && options.transaction
        })
        .catch((error) => {
            logger.error(error, error.sql, error.stack);
            return '';
        })
}

module.exports = Publisher;