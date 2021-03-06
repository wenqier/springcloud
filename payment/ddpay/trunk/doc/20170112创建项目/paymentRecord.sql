CREATE TABLE
IF NOT EXISTS `payment_records`(
	`id` INTEGER NOT NULL auto_increment ,
	`type` VARCHAR(100) ,
	`status` VARCHAR(100) ,
	`tradeType` VARCHAR(100) ,
	`amount` DECIMAL(15 , 5) ,
	`operateLogNo` VARCHAR(100) ,
	`field` VARCHAR(100) ,
	`tradeAccountNo` VARCHAR(100) ,
	`counterpartyNo` VARCHAR(100) ,
	`orderType` VARCHAR(400),
	`orderId` VARCHAR(200) ,
	`remark` VARCHAR(400) ,
	`outTradeRecordNo` VARCHAR(200) ,
	`createdAt` DATETIME NOT NULL ,
	`updatedAt` DATETIME NOT NULL ,
	`TradeAccountId` INTEGER ,
	PRIMARY KEY(`id`) ,
	KEY(`TradeAccountId`)
) ENGINE = INNODB DEFAULT CHARSET=utf8;