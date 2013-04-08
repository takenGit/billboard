
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', {
  	title: 'billbord',
  	pos: ['naka','ue','shita'],
  	size: ['medium','small','big'],
  	color: ['black','red','pink','orange','yellow','green','cyan','blue','purple','random']
  });
};