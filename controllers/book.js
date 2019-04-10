checkAvailability = (req,res,db) => {

	const {carid,location,userid,fromdate,todate,totalcost} = req.body;

	 if(!carid || !location || !userid || !fromdate || !todate || !totalcost){
	 	res.status('400').json('EMPTY DATA');
	 }
	
	db.select('id')
	.from('locations')
	.where('city','=',location)
	.then(data => {
		
		db.select('*')
		.from('bookings')
		.where('carid','=',carid)
		.andWhere('locationid','=',data[0].id)
		.then(list => {

		     const  notAvailable = list.filter((booking,i)=> {
				return (
						!(
							((new Date(fromdate) < booking.fromdate && new Date(todate) < booking.fromdate)
						   ||(new Date(fromdate) > booking.todate && new Date(todate) > booking.todate))
							&&(
								(new Date(todate).getTime()+3*24*60*60*1000 < booking.fromdate.getTime())
							||(new Date(fromdate).getTime()  > booking.todate.getTime()+3*24*60*60*1000)
							)
						)
					);
			});
			 
			if(notAvailable.length){
				
				res.json('NOT AVAILABLE!');
			}
			else{

				
				
				res.json(data[0].id);
			}
		})
		.catch(console.log)

	})
	.catch(console.log)

	/**/

}

module.exports = {
	checkAvailability:checkAvailability
};

/*checkAvailability = () => {
		fetch("http://localhost:4000/book",{
			method:'post',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({
				carid:myBookingData.carid,
				location:myBookingData.location,
				userid:myBookingData.userid,
				fromdate:`${myBookingData.startDate.startYear}-${myBookingData.startDate.startMonth}-${myBookingData.startDate.startDay}`,
				todate:`${myBookingData.endDate.endYear}-${myBookingData.endDate.endMonth}-${myBookingData.endDate.endDay}`,
				totalcost:myBookingData.totalCost
			})
		})
		.then(response => {
			
			console.log(response.json());
		})
		.catch(console.log)
		
	}
*/