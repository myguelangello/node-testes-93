import dotenv from 'dotenv'
import NodeEnvironment from 'jest-environment-node'
import { v4 as uuid } from 'uuid'
import { execSync } from 'child_process'
import { resolve } from 'path'
import { Client } from 'pg'

const prismaCli = './node_modules/.bin/prisma'

dotenv.config({
  path: resolve(__dirname, '..', '.env.test'),
})

class CustomEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config)
    this.schema = `code_schema_${uuid()}`
    console.log('schemas', this.schema)
    this.connectionString = `${process.env.DATABASE_URL}${this.schema}`
  }

  setup() {
    process.env.DATABASE_URL = this.connectionString
    this.global.process.env.DATABASE_URL = this.connectionString

    // Rodar as migrations
    execSync(`${prismaCli} migrate dev`)
  }

  async teardown() {
    const client = new Client({
      connectionString: this.connectionString,
    })

    await client.connect()
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`)
    await client.end()
  }
}

export default CustomEnvironment
