const getList = (req,res,db) => {

	const {id} = req.params;

	db.select(
		'*'

		)
	.from('bookings')
	.innerJoin('locations', 'locations.id', 'bookings.locationid')
	.innerJoin('cars','cars.carid','bookings.carid')
	.where('bookings.userid','=',id)
	.orderBy('bookings.bookingtime','desc')
	.then(data =>{ 
		console.log(data[0]);
		res.json(data);
	})
	.catch(console.log)

}



module.exports={
	getList:getList
}