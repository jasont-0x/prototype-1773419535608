const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference (prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.redirect('/start')
})

router.get('/teacher-status', function (req, res) {
  res.render('teacher-status')
})

router.post('/teacher-status', function (req, res) {
  const answer = req.session.data['teacher-status']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'teacher-status': 'Select if you are currently employed as a qualified teacher.' }
    return res.render('teacher-status')
  }
  if (answer === 'no') {
    return res.redirect('/ineligible-teacher-status')
  }
  res.redirect('/teacher-reference-number')
})

router.get('/ineligible-teacher-status', function (req, res) {
  res.render('ineligible-teacher-status')
})

router.get('/teacher-reference-number', function (req, res) {
  res.render('teacher-reference-number')
})

router.post('/teacher-reference-number', function (req, res) {
  const answer = req.session.data['teacher-reference-number']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'teacher-reference-number': 'Enter your teacher reference number.' }
    return res.render('teacher-reference-number')
  }
  res.redirect('/training-type')
})

router.get('/training-type', function (req, res) {
  res.render('training-type')
})

router.post('/training-type', function (req, res) {
  const answer = req.session.data['training-type']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'training-type': 'Select which training you need to complete.' }
    return res.render('training-type')
  }
  res.redirect('/school-name')
})

router.get('/school-name', function (req, res) {
  res.render('school-name')
})

router.post('/school-name', function (req, res) {
  const answer = req.session.data['school-name']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'school-name': 'Enter the name of your school.' }
    return res.render('school-name')
  }
  res.redirect('/preferred-month')
})

router.get('/preferred-month', function (req, res) {
  res.render('preferred-month')
})

router.post('/preferred-month', function (req, res) {
  const answer = req.session.data['preferred-month']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'preferred-month': 'Select when you would prefer to complete the training.' }
    return res.render('preferred-month')
  }
  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers')
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('TT')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation')
})

module.exports = router
