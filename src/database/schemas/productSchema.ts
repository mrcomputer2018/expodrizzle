import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core" // criando tabela no sqlite

export const product = sqliteTable("products", {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
});