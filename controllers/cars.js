const fetchCars = (req,res,db) => {

	const {type} = req.params;

	db.select('*')
	.from('cars')
	.where({
		type: type
	}) 
	.orderBy(['make','model'])
	.then(carList => {
		if(carList.length){
			res.json(carList);
		}
		else{
			res.status(400).json('No Cars in this category');
		}
	})
	.catch(err => res.status(400).json('Error fetching cars!') )
}

const getCarInfo = (req,res,db) => {

	const {make,model,type} = req.params;

	db.select('*')
	.from('cars')
	.where({
		 type:type.toLowerCase(),
		make:make.toLowerCase(),
		model:model.toLowerCase()
	}) 
	.then(car  => {
		if(car.length){
			res.json(car[0]);
		}
		else{
			res.status(400).json('No such car found!');
		}
	})
	.catch(err => res.status(400).json('Error fetching cars!') )
}


module.exports = {
	fetchCars: fetchCars,
	getCarInfo: getCarInfo
}