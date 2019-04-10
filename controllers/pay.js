const deductCredits = (req,res,db) => {
	const {userid,carid,fromdate,todate,location,locationId,totalcost,bookingtime} = req.body;

	db.transaction(trx => {
		trx.insert({
					userid:userid,
					carid:carid,
					fromdate:fromdate,
					todate:todate,
					locationid:locationId,
					totalcost:totalcost,
					bookingtime:bookingtime

			})
			.into('bookings')
			.returning(['userid','bookingid'])
			.then(data => {
				return trx('users')
						.returning('*')
						.where('id','=',data[0].userid)
						.decrement({
							credits:Math.round(totalcost*0.001)
						})
						.then(user => {
							console.log('Inserted into bookings and credits deducted!')
							res.json(data[0].bookingid);
						})
						.catch(console.log)
			})
			.then(trx.commit)
			.catch(trx.rollback)

		})
		.catch(err => console.log(err))

}


const renewCredits = (req,res,db) => {
	const {id} = req.body;
	
	db('users')
	.where('id','=',id)
	.update({
		credits: 100000,
	})
	.returning('credits')
	.then(credits => {
		res.json(credits[0]);
	})
	.catch(err => res.status(400).json('Unabale to renew credits!'))
}

module.exports = {
	deductCredits:deductCredits,
	renewCredits:renewCredits
}