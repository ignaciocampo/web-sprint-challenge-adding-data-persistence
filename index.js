const express = require("express")
const knex = require("knex")
const Tasks = require("./routers/tasks-router")
const Resources = require("./routers/resources-router")
const Projects = require("./routers/projects-router")
const logger = require("./middleware/logger")

const server = express()
const port = process.env.PORT || 5000



server.use(express.json())

server.use(logger())



server.use('/projects', Projects)
server.use('/resources', Resources)
server.use('/tasks', Tasks)


server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})
