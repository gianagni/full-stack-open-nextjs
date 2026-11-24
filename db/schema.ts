import { boolean, integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  name: varchar("name", { length: 100 }).notNull(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  apiToken: text("api_token"),
})

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  author: varchar("author", { length: 100 }).notNull(),
  url: varchar("url", { length: 500 }).notNull(),
  likes: integer("likes").notNull().default(0),
  userId: integer("user_id").references(() => users.id),
})

export const readingLists = pgTable("reading_lists", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  blogId: integer("blog_id").notNull().references(() => blogs.id),
  read: boolean("read").notNull().default(false),
})

export const usersRelations = relations(users, ({ many }) => ({
  blogs: many(blogs),
  readingLists: many(readingLists),
}))

export const blogsRelations = relations(blogs, ({ one, many }) => ({
  user: one(users, { fields: [blogs.userId], references: [users.id] }),
  readingLists: many(readingLists),
}))

export const readingListsRelations = relations(readingLists, ({ one }) => ({
  user: one(users, { fields: [readingLists.userId], references: [users.id] }),
  blog: one(blogs, { fields: [readingLists.blogId], references: [blogs.id] }),
}))

export type User = typeof users.$inferSelect
export type Blog = typeof blogs.$inferSelect
export type ReadingList = typeof readingLists.$inferSelect
