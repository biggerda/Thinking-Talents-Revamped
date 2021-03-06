const mongoose = require('mongoose');
const {ObjectId} = require("bson");
const {Schema} = mongoose;
const teamModel = new Schema(
  {
    _id: {type:ObjectId},
    players: [
      {
        name: {type: String},
        talents: [
          {
            name: {type: String},
            description: {type: String},
            checked: {type: Boolean},
            type: {type: String}
          }
        ],
        aTalents: {type: Number},
        iTalents: {type: Number},
        rTalents: {type: Number},
        pTalents: {type: Number},
        talentPref: {type: String},
        blindSpot: {type: String},
        isDisplayed: {type: Boolean}
      }
    ],
    stuffed: {type: Boolean},
    teamName: {type: String},
    teamPreferences: [
      {type: String}
    ],
    teamBlindspots: [
      {type: String}
    ]
  }
)
module.exports = mongoose.model('Team', teamModel)
