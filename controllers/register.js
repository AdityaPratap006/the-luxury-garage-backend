const handleRegister = (req,res,db,bcrypt) => {
	const {fname,lname,email,password} = req.body;
	const hash = bcrypt.hashSync(password);
	if(!email || !fname ||!lname ||!password){
		return res.status(400).json('Incorrect form submission!');
	}
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginemail => {
			return trx('users')
			.returning('*')
			.insert({
				email:loginemail[0],
				fname:fname,
				lname:lname,
				joined:new Date()
			})
			.then(user => {

				res.json(user[0]);
			})
			
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json('Unable to register!'))
		
	
	//console.log(database.users[database.users.length-1]);
}

module.exports = {
	handleRegister: handleRegister
};