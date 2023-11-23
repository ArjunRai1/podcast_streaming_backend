const mongoose = require('mongoose');
const express = require('express');
const audioroute = express.Router();
const podcastSchema = require('../models/Sample');

audioroute.get('/get-audio-list', (req, res) => {
  podcastSchema.find({}, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const audioList = data.map((audio) => ({
        _id: audio._id, 
        name: audio.name,
        description: audio.description,
        url: audio.url,
      }));
      res.json(audioList);
    }
  });
});


audioroute.post("/create-new", (req, res) => {
  podcastSchema.create(req.body, (err, data) => {
    if (err)
      return err;
    else
      res.json(data);
  })
})

audioroute.route("/update-podcast/:id")
  .get((req, res) => {
    podcastSchema.find(mongoose.Types.ObjectId(req.params.id), (err, data) => {
      if (err)
        return err;
      else
        res.json(data);
    })
  }).put((req, res) => {
    const receivedId = req.params.id;

    console.log('Received ID:', receivedId);
    podcastSchema.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id),
      { $set: req.body },
      (err, data) => {
        if (err)
          return err;
        else
          res.json(data);
      })
  })

  audioroute.delete("/delete-podcast/:id", (req, res) => {
    podcastSchema.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id), (err, data) => {
      if (err)
        return res.status(500).json({ error: 'Internal Server Error' });
      else
        res.json(data);
    });
  });






module.exports = audioroute;