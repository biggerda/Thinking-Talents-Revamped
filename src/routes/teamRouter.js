const express = require('express');

function routes(Team) {
  const teamRouter = express.Router();

  teamRouter.route('/team/sample')
    .get((req, res) => {
      Team.findById("60038ec44d8074c7415bd82c", (err, team) => {
        if (err) {
          return res.send(err);
        }
        return res.status(200).json(team);
      });
    });

  teamRouter.route('/team/save')
    .post((req, res) => {
      const team = new Team(req.body);

      team.save()
        .then(result => {
          return res.status(201).json(result.id);
        })
        .catch(err => {
          if (err) {
            return res.send(err);
          }
        });
    });

  teamRouter.route('/team')
    .get((req, res) => {
      Team.find((err, teams) => {
        if (err) {
          return res.send(err);
        }
        return res.status(200).send(teams);
      })
    });

  teamRouter.route('/team/:teamid')
    .get((req, res) => {
      Team.findById(req.params.teamid, (err, team) => {
        if (err) {
          return res.send(err);
        }
        return res.status(200).json(team);
      });
    })
    .put((req, res) => {
      Team.findById(req.params.teamid, (err, team) => {
        if (err) {
          return res.send(err);
        }
        team.players = req.body.players;
        team.stuffed = req.body.stuffed;
        team.teamName = req.body.teamName;
        team.teamPreferences = req.body.teamPreferences;
        team.teamBlindspots = req.body.teamBlindspots;
        team.save((err) => {
          if (err) {
            return res.send(err)
          }
          return res.status(204).json(team);
        });
      });
    })
    .patch((req, res) => {
      const { team } = req;

      if (req.body._id) {
        delete req.body._id;
      }

      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        team[key] = value;
        console.log('Objects: ', team[key]);
      });

      team.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.status(204).json(team);
      })
    })

  return teamRouter;
}

module.exports = routes;
