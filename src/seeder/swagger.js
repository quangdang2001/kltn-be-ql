const swaggerAutogen = require('swagger-autogen')()

const outputFile = {
  definition: {
    info: {
      title: 'TLCN K19 API',
      version: '1.0.0',
      description: 'TLCN K19  Ecommerce API',
    },
    servers: ['http://localhost:5000'],
  },
  apis: ['./routes/*.js'],
}
const endpointsFiles = ['./routes/*.js']

swaggerAutogen(outputFile, endpointsFiles)
