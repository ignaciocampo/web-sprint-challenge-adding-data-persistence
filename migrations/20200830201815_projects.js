
exports.up = async function(knex) {
    await knex.schema.createTable("projects", (table)=> {
        //translates to "id" INTEGER NOT NULL UNIQUE PRIMARY KEY
      //   table.integer("id").notNull().unique().primary()
        table.increments("id")
        table.text("name").notNull()
        table.text("description").notNull()
        table.boolean("completed").defaultTo(false);
        table.integer("tasks_id").references("id").inTable("tasks")
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
        table.integer("project_name").references("name").inTable("projects").notNull()
        table.integer("project_description").references("description").inTable("projects").notNull()
    })
 

};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("projects")
    await knex.schema.dropTableIfExists("resources")
    await knex.schema.dropTableIfExists("tasks")
};
