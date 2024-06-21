import { faker } from '@faker-js/faker';
import { config } from '@repo/configs';
import { LegacyScrypt } from 'lucia';

import { db } from '../libs/db';
import { todos as todosTable, users as usersTable } from '../schema';

export const adminUser = {
  email: 'admin.user@email.com',
  firstName: 'Admin',
  lastName: 'User',
  password: 'password',
};

async function seed() {
  const users: (typeof usersTable.$inferInsert)[] = [
    {
      email: adminUser.email,
      firstName: adminUser.firstName,
      hashedPassword: await new LegacyScrypt().hash(adminUser.password),
      language: config.defaultLanguage,
      lastName: adminUser.lastName,
      name: `${adminUser.firstName} ${adminUser.lastName}`,
      role: 'ADMIN',
    },
  ];
  const todos: (typeof todosTable.$inferInsert)[] = [];

  console.log('🌱 Seeding the database');

  for (let i = 0; i < 50; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    users.push({
      email: faker.internet.email(),
      firstName,
      hashedPassword: await new LegacyScrypt().hash('password'),
      language: config.defaultLanguage,
      lastName,
      name: `${firstName} ${lastName}`,
      role: 'USER',
    });
  }

  console.log('🌱 Seeding users');

  await db.insert(usersTable).values(users);

  console.log('Done seeding users');

  console.log('Getting users from table');

  const usersInTable = await db.select().from(usersTable);

  for (const element of usersInTable) {
    for (let j = 0; j < 10; j++) {
      todos.push({
        authorId: element.id,
        text: faker.lorem.words(),
      });
    }
  }

  console.log('🌱 Seeding todos');

  await db.insert(todosTable).values(todos);

  console.log('Done seeding todos');
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => process.exit(0));
