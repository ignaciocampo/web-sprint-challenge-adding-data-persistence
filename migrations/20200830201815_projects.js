
exports.up = async function(knex) {
    await knex.schema.createTable("projects", (table)=> {
        //translates to "id" INTEGER NOT NULL UNIQUE PRIMARY KEY
      //   table.integer("id").notNull().unique().primary()
        table.increments("id")
        table.text("name").notNull()
        table.text("description").notNull()
        table.boolean("completed").defaultTo(false);
  
    })
    await knex.schema.createTable("resources", (table)=> {
        table.increments("id")
        table.text("name").notNull()
        table.text("description").notNull()
    })
    await knex.schema.createTable("tasks", (table)=> {
        table.increments("id")
        table.text("description").notNull()
        table.text("notes").notNull()
        table.boolean("completed").notNull().defaultTo(false);
        table.integer("project_id").notNullable().references("id").inTable("projects")
    })
    await knex.schema.createTable("project_resources", (table)=> {
        table.integer("project_id").unsigned().notNull().references("id").inTable("projects")
        table.integer("resource_id").unsigned().notNull().references("id").inTable("resources")
        table.primary(["project_id", "resource_id"])
    })
 

};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("projects")
    await knex.schema.dropTableIfExists("resources")
    await knex.schema.dropTableIfExists("tasks")
};
