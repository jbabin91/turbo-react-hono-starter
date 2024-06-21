import { sql } from 'drizzle-orm';

import { db } from '../libs/db';

async function reset() {
  const tableSchema = db._.schema;

  if (!tableSchema) {
    throw new Error('No table schema found');
  }

  console.log('🗑️  Emptying the entire database');

  const queries = Object.values(tableSchema).map((table) => {
    console.log(`🧨 Preparing delete query for table: ${table.dbName}`);
    return sql.raw(`TRUNCATE TABLE ${table.dbName} CASCADE;`);
  });

  console.log('📨 Sending delete queries...');

  await db.transaction(async (tx) => {
    await Promise.all(
      queries.map(async (query) => {
        if (query) await tx.execute(query);
      }),
    );
  });

  console.log('✅ Database emptied');
}

reset()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => process.exit(0));
