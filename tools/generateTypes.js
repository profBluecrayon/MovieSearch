const SwaggerParser = require('@apidevtools/swagger-parser')
const { generateApi } = require('swagger-typescript-api')
const { resolve } = require('path')

const baseUrl = 'https://thetvdb.github.io/v4-api'

const generateTypes = async () => {
	try {
		const schema = await SwaggerParser.parse(`${baseUrl}/swagger.yml`)

		// Generate the Typescript interface and enums and save them in the specified path (output).
		await generateApi({
			name: 'server.ts',
			spec: schema,
			generateClient: false,
			output: resolve(process.cwd(), '../src/helpers/types/'),
			prettier: {
				bracketSpacing: true,
				bracketSameLine: true,
				singleQuote: true,
				trailingComma: 'all',
				semi: false,
				useTabs: true,
				printWidth: 180,
				parser: "typescript",
			},
		})
	} catch (err) {
		console.error(err)
		process.exit(1)
	}
}


generateTypes()
