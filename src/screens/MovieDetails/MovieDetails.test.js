// to start firebase
import MovieDetails from './MovieDetails'

it('gets correct movie details', (done) => {
	MovieDetails.getTitleInfo('67', (snapshot) => {
		console.log(JSON.stringify(snapshot))
		done()
	})
})
