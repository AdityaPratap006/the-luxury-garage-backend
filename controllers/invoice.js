const getInvoice = (req,res,db) => {

	const {bookingid} = req.params;

	db.select('*')
	.from('bookings')
	.innerJoin('locations', 'bookings.locationid', 'locations.id')
	.innerJoin('cars','bookings.carid','cars.carid')
	.where('bookings.bookingid','=',bookingid)
	.then(data => res.json(9))
	.catch(console.log)

}



module.exports={
	getInvoice:getInvoice
}