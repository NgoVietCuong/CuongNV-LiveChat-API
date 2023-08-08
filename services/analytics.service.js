const Visitor = require('../models/visitor.model');
const Chat = require('../models/chat.model');
const Message = require('../models/message.model');
const Aggregate = require('../helpers/mongodb.helper');
const ChatService = require('./chat.service');

async function getAppAnalytics(shop) {
  const response = {
    waitingChat: 0,
    openedChat: 0,
    closedChat: 0,
    numberOfVisitors: 0,
    numberOfContacts: 0,
    chatActivities: []
  }

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const chats = await Chat.aggregate([
    Aggregate.match({ shop: shop._id }),
    Aggregate.group({ '_id': '$status', count: { $sum: 1 } })
  ]);

  const visitors = await Visitor.aggregate([
    Aggregate.match({ shop: shop._id }),
    Aggregate.group({ '_id': '$in_contact', count: { $sum: 1 }})
  ]);

  const activities = await Message.aggregate([
    Aggregate.match({ shop: shop._id }),
    Aggregate.sort({ created_at: -1 }),
    Aggregate.addFields({ formattedDate: { $dateToString: { format: '%d-%m-%Y', date: '$created_at' } } }),
    Aggregate.group({ '_id': { date: '$formattedDate', sender: '$sender' }, uniqueChats: { $addToSet: '$chat'} }),
    Aggregate.project({ _id: 1, count: { $size: '$uniqueChats' } }),
    Aggregate.match({ '_id.date': {$gte: sevenDaysAgo.toISOString().slice(0, 10)} })
  ]);

  chats.forEach((chat) => {
    if (chat._id === 'Waiting') {
      response.waitingChat = chat.count;
    } else if (chat._id === 'Open') {
      response.openedChat = chat.count;
    } else {
      response.closedChat = chat.count;
    }
  });

  visitors.forEach((visitor) => {
    response.numberOfVisitors += visitor.count;
    if (visitor._id) {
      response.numberOfContacts = visitor.count;
    }
  });

  activities.forEach((activity) => {
    const chatActivity = response.chatActivities.find(item => item.date === activity._id.date);
    if (chatActivity && chatActivity.date) {
      chatActivity[`${activity._id.sender}`] = activity.count;
    } else {
      const newActivity = {};
      newActivity.date = activity._id.date
      newActivity[`${activity._id.sender}`] = activity.count;
      response.chatActivities.unshift(newActivity);
    }
  });

  return response;
}

async function getVisitorAnalytics(shop, id) {
  const response = {
    chatStatus: 'Deleted',
    lastChatTime: 'No data',
    totalMessages: 'No data',
    chatActivities: []
  }

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const chat = await ChatService.findOne({ visitor: id, shop: shop._id });
  if (chat && chat._id) {
    const messages = await Message.aggregate([
      Aggregate.match({ chat: chat._id, shop: shop._id }),
      Aggregate.group({ '_id': '$sender', count: { $sum: 1 } })
    ]);

    const activities = await Message.aggregate([
      Aggregate.match({ chat: chat._id, shop: shop._id, sender: 'Visitor' }),
      Aggregate.sort({ created_at: -1 }),
      Aggregate.addFields({ formattedDate: { $dateToString: { format: '%d-%m-%Y', date: '$created_at' } } }),
      Aggregate.group({ '_id': { date: '$formattedDate' }, messages: { $sum: 1 } }),
      Aggregate.match({ '_id.date': {$gte: sevenDaysAgo.toISOString().slice(0, 10)} })
    ]);

    const options = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric', 
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'UTC' 
    };

    response.chatStatus = chat.status;

    const lastTime = new Date(chat.updated_at);
    response.lastChatTime = lastTime.toLocaleDateString('en-US', options);
    
    const visitorMessages = messages.find(item => item._id == 'Visitor');
    response.totalMessages = visitorMessages ? visitorMessages.count : 0;

    activities.forEach((activity) => {
      const newActivity = {};
      newActivity.date = activity._id.date
      newActivity.messages = activity.messages;
      response.chatActivities.unshift(newActivity);
    });
  }

  return response;
}

module.exports = {
  getAppAnalytics,
  getVisitorAnalytics
}