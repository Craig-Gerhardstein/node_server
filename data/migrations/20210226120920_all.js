exports.up = (knex) => {
  return knex.schema
    .createTable('profiles', function (table) {
      table.string('id').notNullable().unique().primary();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.string('name');
      table.boolean('instructor');
      table.timestamps(true, true);
    })
    .createTable('classes', function (table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('type').notNullable();
      table.datetime('start').notNullable();
      table.integer('duration').notNullable();
      table.string('intensity').notNullable();
      table.string('location').notNullable();
      table.integer('max_size').notNullable();
      table
        .string('owner_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('profiles')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps(true, true);
    })
    .createTable('class_passes', function (table) {
      table.increments('id').primary();
      table
        .string('owner_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('profiles')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .string('issued_by')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('profiles')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('type').notNullable();
      table.integer('total_classes').notNullable();
      table.decimal('price_paid', 10, 2);
      table.timestamps(true, true);
    })
    .createTable('reservations', function (table) {
      table.increments('id').primary();
      table
        .integer('class_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('classes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .string('owner_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('profiles')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('pass_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('class_passes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps(true, true);
    });
};

exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists('reservations')
    .dropTableIfExists('class_passes')
    .dropTableIfExists('class_cards')
    .dropTableIfExists('classes')
    .dropTableIfExists('profiles');
};
