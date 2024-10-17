const router = require("express").Router()
const Recommendation = require("../models/recommendation.model")


// | POST        | `/api/recommendations`                   | Create a new recommendation                     |
router.post("/", async (req, res, next) => {
  try {
    const newRec = await Recommendation.create({
      content: req.body.content,
      creator: req.body.creator,
      tagline: req.body.tagline,
      recText: req.body.recText
    })
    res.status(201).json(newRec)
    // console.log(newRec)
  } catch (error) {
    next(error)
  }
})

// | GET         | `/api/recommendations`            | Read all recommendations                         |
router.get("/", async (req, res, next) => {
  try {
    const allRecs = await Recommendation.find()
    res.status(200).json(allRecs)
  } catch (error) {
    next(error)
  }
})


// | GET         | `/api/recommendations/:recommendationId` | Read details of a specific recommendation       |
router.get("/:recommendationId", async (req, res, next) => {
  try {
    const specificRec = await Recommendation.findById(req.params.recommendationId)
    .populate("content") // populates content info -> adapt later as needed... e.g. content.title
    .populate("creator") // populates rec-creator -> adapt later as needed... e.g. info creator.username
    res.status(200).json(specificRec)
  } catch (error) {
    next(error)
  }
})


// | GET         | `/api/recommendations/content/:contentId`        | Read all recommendations for a specific content |
// router.get("/content/:contentId", async (req, res, next) => {
//   try {
//     const allRecsByContent = await Recommendation.find({ content: req.params.contentId })
//     res.status(200).json(allRecsByContent)
//   } catch (error) {
//     next(error)
//   }
// })
// ===
router.get("/content/:contentId", async (req, res, next) => {
  try {
    const allRecsByContent = await Recommendation.find({ content: req.params.contentId })
      .populate("content") // populates content info
      .populate("creator") // populates rec-creator info
    res.status(200).json(allRecsByContent);
  } catch (error) {
    next(error)
  }
})


// | PUT         | `/api/recommendations/:recommendationId` | Update a specific recommendation                |
router.put("/:recommendationId", async (req, res, next) => {
  try {
    const updatedRec = await Recommendation.findByIdAndUpdate(
      req.params.recommendationId,
      {
        content: req.body.content,
        creator: req.body.creator,
        tagline: req.body.tagline,
        recText: req.body.recText
        // add more fields if you change the model !!!
      },
      { new: true }
    )
      res.status(200).json(updatedRec)
  } catch (error) {
    next(error)
  }
})


// | DELETE      | `/api/recommendations/:recommendationId` | Delete a specific recommendation                |
router.delete("/:recommendationId", async (req, res, next) => {
  try {
    await Recommendation.findByIdAndDelete(req.params.recommendationId)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})



module.exports = router