var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'QUIZ3', errors: [] });
});

router.param('quizId', quizController.load);
router.param('commentId', commentController.load);

// Definicion de rutas de sesión
router.get('/login', sessionController.new); 		//formulario login
router.post('/login', sessionController.create);	//crear session
router.get('/logout', sessionController.destroy);	//destrui sesión

// Definicion de rutas de /quizes
router.get('/quizes', 						quizController.index);
router.get('/quizes/:quizId(\\d+)',			quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', 	quizController.answer);
router.get('/quizes/search',                quizController.index);
router.get('/quizes/new',					sessionController.loginRequired,  	quizController.new);
router.post('/quizes/create', 				sessionController.loginRequired,  	quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', 	sessionController.loginRequired,	quizController.edit);
router.put('/quizes/:quizId(\\d+)', 		sessionController.loginRequired,	quizController.update);
router.delete('/quizes/:quizId(\\d+)', 		sessionController.loginRequired,	quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new', 	commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', 		commentController.create);
router.put ('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',
												sessionController.loginRequired,    commentController.publish);

//router.get('/quizes/question', quizController.question);
//router.get('/quizes/answer', quizController.answer);
router.get('/author', quizController.author);

console.log ('HOLA');

module.exports = router;
