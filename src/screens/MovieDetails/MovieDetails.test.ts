// to start firebase
import '../../firebase'

import { MovieInfo } from 'helpers/types'
import { getIMDBTitleInfo } from 'utils'

it('gets correct movie details', (done) => {
	getIMDBTitleInfo('67', (info: MovieInfo) => {
		console.log(info)
		done()
	})
})
