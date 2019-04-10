const handleUserProfile=(req,res,db) => {
	const {id} = req.params;
	const userid = Number(id);
	 
	db.select('*')
	.from('users')
	.where({
		id: id
	})
	.then(user => {
		console.log(user);
		if(user[0].id){
			res.json(user[0]);
		}
		else{
			res.status(400).json('Not found!');
		}
		
	})
	.catch(err => {
		res.status(400).json('Error fetching user!');
	})

	 
}

module.exports = {
	handleUserProfile:handleUserProfile
};