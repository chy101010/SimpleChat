const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

// Can be changed to make it to multiple user chat
function arrayLimit(val) {
    return val.length === 2;
}

function returnResult(stat, msg, id) {
    return {
        status: stat,
        message: msg,
        conversationId: id
    }
}

const conversationSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuidv4().replace("-", "")
        },
        userIds: {
            type: [{ type: String }],
            validate: [arrayLimit, `Conversation with two user`]
        },
        creator: { type: String },
        status: {
            type: String,
            enum: ['accept', 'pending'],
            default: 'pending'
        }
    },
    {
        collation: "conversations"
    }
)

conversationSchema.statics.sendRequest = async function (creator, receivor) {
    try {
        const exist = await this.findOne({
            userIds: {
                $all: [creator, receivor]
            }
        });
        if (exist) {
            if (exist.status === 'accept') {
                return returnResult('duplicate', 'conversation already exist', exist._id);
            } else {
                return returnResult('duplicate', 'request already sent', exist._id);
            }
        }
        const newCon = await this.create(
            {
                'userIds': [creator, receivor],
                'creator': creator
            })
        return returnResult('ok', 'new conversation created', newCon._id);
    } catch (error) {
        console.log("Conversation's sendRequest", error);
        throw error;
    }
}

conversationSchema.statics.acceptRequest = async function (id, receiver) {
    try {
        const request = await this.findOneAndUpdate(
            {
                _id: id,
                userIds: { $elemMatch: [receiver] }
            },
            {
                status: 'accept'
            });
        if (request) {
            return returnResult('ok', 'requested accepted', id);
        }
        else {
            return returnResult('error', 'request accept failed', id);
        }
    }
    catch (error) {
        console.log("Conversation's acceptRequest", error);
        throw error;
    }
}


conversationSchema.statics.getConversationsByUsername = async function (username) {
    try {
        const result = await this.find(
            {
                userIds: { $elemMatch: [username] }
            }).lean();
        console.log(result);
        return result;
    } catch (error) {
        console.log("Conversation's getConversationsByUsername", error);
        throw error;
    }
}

conversationSchema.statics.getConversationById = async function (id) {
    try {
        const result = await this.findOne(
            {
                _id: id
            }
        )
        return result;
    } catch (error) {
        console.log("Conversation's getConversationById", error);
        throw error;
    }
}

conversationSchema.statics.deleteConversation = async function (id, username) {
    try {
        const request = await this.findOneAndDelete(
            {
                _id: id,
                userIds: { $elemMatch: { username } }
            });
        if (request) {
            return returnResult('ok', 'request accepted', id);
        } else {
            return returnResult('error', 'request delete failed', id);
        }
    }
    catch (error) {
        console.log("Conversation's deleteConversation", error);
        throw error;
    }
}