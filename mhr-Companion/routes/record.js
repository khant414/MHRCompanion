const bodyParser = require("body-parser");
const { request } = require("express");
const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

recordRoutes.use(bodyParser.json());

// This will help us connect to the database
const dbo = require("../db/conn");

// This section will help you get a list of all the hitzone records.
recordRoutes.route("/hitzones").get(async function (_req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection("HitzoneCollection")
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching hitzones!");
      } else {
        res.json(result);
      }
    });
});

//this route simply returns monster names and ID in order to make building the dropdown easier.
recordRoutes.route("/hitzonenames").get(async function (_req, res) {
  const dbConnect = dbo.getDb();
  const hitzones = dbConnect.collection("HitzoneCollection");
  const projection = { _id: 0, MonsterName: 1, MonsterID: 1 };
  const cursor = hitzones.find().project(projection);

  cursor.toArray(function (err, result) {
    if (err) {
      res.status(400).send("Error fetching hitzones!");
    } else {
      res.json(result);
    }
  });
});

//this route returns all motion values
recordRoutes.route("/motionvalues").get(async function (_req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection("WeaponCollection")
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching MVs!");
      } else {
        res.json(result);
      }
    });
});

recordRoutes.route("/hzsearch/:id").get(async function (_req, res) {
  console.log(_req.params.id);
  const requestID = parseInt(_req.params.id);
  const dbConnect = dbo.getDb();
  const hitzones = dbConnect.collection("HitzoneCollection");
  const query = { MonsterID: requestID };
  const projection = { _id: 0, MonsterName: 0, MonsterID: 0 };

  const cursor = hitzones.find(query).project(projection);

  cursor.toArray(function (err, result) {
    if (err) {
      res.status(400).send("Error fetching hitzones!");
    } else {
      res.json(result);
    }
  });
});

recordRoutes.route("/mvsearch/:id").get(async function (_req, res) {
  console.log(_req.params.id);
  const requestID = parseInt(_req.params.id);
  const dbConnect = dbo.getDb();
  const weapons = dbConnect.collection("WeaponCollection");
  const query = { MoveID: requestID };
  const projection = { _id: 0 };

  const cursor = weapons.find(query).project(projection);

  cursor.toArray(function (err, result) {
    if (err) {
      res.status(400).send("Error fetching weapons!");
    } else {
      res.json(result);
    }
  });
});

recordRoutes.route("/mvsearch2/:wep").get(async function (_req, res) {
  console.log(_req.params.wep);
  const requestID = _req.params.wep.toString();
  const dbConnect = dbo.getDb();
  const weapons = dbConnect.collection("WeaponCollection");
  const query = { WeaponName: requestID };
  const projection = { _id: 0 };

  const cursor = weapons.find(query).project(projection);

  cursor.toArray(function (err, result) {
    if (err) {
      res.status(400).send("Error fetching weapons!");
    } else {
      res.json(result);
    }
  });
});

recordRoutes.route("/userSettings/:userid").get(async function (_req, res) {
  const dbConnect = dbo.getDb();

  console.log(_req.params.userid);
  const requestID = parseInt(_req.params.userid);
  const userinfo = dbConnect.collection("UserInputCollection");
  const query = { googleid: requestID };
  const projection = { _id: 0, googleid: 0, last_modified: 0 };

  const cursor = userinfo.find(query).project(projection);

  cursor.toArray(function (err, result) {
    if (err) {
      res.status(400).send("Error fetching userinfo!");
    } else {
      res.json(result);
    }
  });
});

recordRoutes.route("/userSettings").get(async function (_req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection("UserInputCollection")
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching MVs!");
      } else {
        res.json(result);
      }
    });
});

// This section will help you create a new record.
recordRoutes
  .route("/userSettings/recordUserSettings")
  .post(function (req, res) {
    const dbConnect = dbo.getDb();

    const userSettings = {
      googleid: req.body.googleid,
      last_modified: new Date(),
      raw: req.body.raw,
      sharpness: req.body.sharpness,
      eleType: req.body.eleType,
      ele: req.body.ele,
      critchance: req.body.critchance,
      wex: req.body.wex,
      critboost: req.body.critboost,
      criteye: req.body.criteye,
      atkboost: req.body.atkboost,
      agitator: req.body.agitator,
      peakperf: req.body.peakperf,
      resentment: req.body.resentment,
      resuscitate: req.body.resuscitate,
      maxmight: req.body.maxmight,
      critele: req.body.critele,
      offensiveguard: req.body.offensiveguard,
      eleatkup: req.body.eleatkup,
      eleexploit: req.body.eleexploit,
      mailofhellfire: req.body.mailofhellfire,
      dereliction: req.body.dereliction,
      burst: req.body.burst,
    };

    dbConnect
      .collection("UserInputCollection")
      .insertOne(userSettings, function (err, result) {
        if (err) {
          res.status(400).send("Error inserting matches!");
        } else {
          console.log(`Added a new match with id ${result.insertedId}`);
          res.status(204).send();
        }
      });
  });

recordRoutes
  .route("/userSettings/overwriteUserSettings")
  .post(async function (req, res) {
    const dbConnect = dbo.getDb();
    const userinfo = dbConnect.collection("UserInputCollection");
    const idcheck = req.body.googleid;

    const userSettings = req.body;
    console.log(userSettings);
    userinfo.replaceOne(
      { googleid: idcheck },
      {
        last_modified: new Date(),
        raw: req.body.raw,
        sharpness: req.body.sharpness,
        eleType: req.body.eleType,
        ele: req.body.ele,
        critchance: req.body.critchance,
        wex: req.body.wex,
        critboost: req.body.critboost,
        criteye: req.body.criteye,
        atkboost: req.body.atkboost,
        agitator: req.body.agitator,
        peakperf: req.body.peakperf,
        resentment: req.body.resentment,
        resuscitate: req.body.resuscitate,
        maxmight: req.body.maxmight,
        critele: req.body.critele,
        offensiveguard: req.body.offensiveguard,
        eleatkup: req.body.eleatkup,
        eleexploit: req.body.eleexploit,
        mailofhellfire: req.body.mailofhellfire,
        dereliction: req.body.dereliction,
        burst: req.body.burst,
      },
      { upsert: true }
    );
    console.log(`updated ${req.body.googleid} character stats`);
  });

// // This section will help you delete a record.
// recordRoutes.route('/listings/delete/:id').delete((req, res) => {
//   const dbConnect = dbo.getDb();
//   const listingQuery = { listing_id: req.body.id };

//   dbConnect
//     .collection('listingsAndReviews')
//     .deleteOne(listingQuery, function (err, _result) {
//       if (err) {
//         res
//           .status(400)
//           .send(`Error deleting listing with id ${listingQuery.listing_id}!`);
//       } else {
//         console.log('1 document deleted');
//       }
//     });
// });

module.exports = recordRoutes;
