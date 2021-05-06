const {connectFirestore} = require('./firestore')
const admin = require('firebase-admin')

exports.getAffirmations = (req, res) =>{
  const db = connectFirestore()
  db.collection('affirmations')
  .get()
  .then(collection => {
    const affirmationList = collection.docs.map(doc => doc.data())
      res.send(affirmationList)
  })
  .catch(err => res.status(500).send('Error getting affirmations'))
}
exports.postAffirmations = (req, res) =>{
  if(!req.body || !req.body.text || !req.body.displayName || !req.body.photoUrl){
    res.send(400).send('Invalid Request')
  }
  const db = connectFirestore()
  const {uid,text,displayName,photoUrl} = req.body
  const now = admin.firestore.FieldValue.serverTimestamp()
  const newAffrimation = {
    uid,
    created_at : now,
    text,
    displayName,
    photoUrl
  }
  db.collection('affirmations').add(newAffrimation)
  .then(
    this.getAffirmations(req,res)// pass response to get all affirmations
  )
  .catch(err => res.status(500).send('Error posting affirmations' + err.message))
}