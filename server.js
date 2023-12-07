const app = require('./app.js')

app.listen(process.env.PORT ,()=>{
	console.log(`up and running on port ${process.env.PORT}`);
   });