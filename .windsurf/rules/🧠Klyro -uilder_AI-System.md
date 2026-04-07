# 🧠 Klyro Builder — AI System Documentation

## 📌 Overview

**Klyro** is a visual builder platform inspired by tools like Builder.io and Articulate, designed to create both:

* Interactive educational content (SCORM-ready)
* Responsive web pages (landing pages and experiences)

The system is built on top of:

* React (frontend)
* Express (backend)
* MongoDB (database)
* Mongoose (ODM)
* Puck Editor (core editing engine)

---

## 🎯 Purpose of This Document

This document serves as:

* Internal technical documentation
* Base knowledge for AI assistants integrated into the system
* Source of truth for architecture, data structures, and behavior

---

## 👥 Target Users

* Designers
* Web Designers
* Reviewers
* (Future) E-learning companies

---

## 🧱 System Architecture

### Monorepo Structure

```
klyro-builder/
  /frontend
  /backend
```

---

## ⚙️ Core Concept: Schema-driven Visual Builder

Klyro is powered by **Puck Editor**, which enables:

* Drag-and-drop components
* JSON-based page structure
* Dynamic rendering using React

---

## 🧩 Builder Data Model

### Key Principle

Pages are stored as structured JSON using Puck's format.

### Example Structure

```json
{
  "page": {
    "root": {
      "props": {}
    },
    "content": [
      {
        "type": "ComponentName",
        "props": {},
        "id": "unique-id"
      }
    ],
    "zones": {}
  }
}
```

---

## 🧱 Component Model

Each component follows:

```json
{
  "type": "ComponentName",
  "props": {
    "...": "..."
  },
  "id": "unique-id"
}
```

### Rules

* `type` must match a registered Puck component
* `props` must match component fields config
* `id` must be unique per component instance

---

## 🧬 Nested Structure

Components can contain other components via:

* `slot`
* arrays inside props

Example:

```json
{
  "type": "Container",
  "props": {
    "slot": [
      {
        "type": "RichText",
        "props": {}
      }
    ]
  }
}
```

---

## 🗄️ Database Design (MongoDB)

### Database: `ead-builder`

---

### 📁 Collection: `users`

```json
{
  "name": "string",
  "email": "string",
  "passwordHash": "string",
  "role": "admin | user",
  "active": true,
  "createdAt": "date",
  "lastLogin": "date"
}
```

---

### 📁 Collection: `groups` (Projects)

Represents a project or learning module.

```json
{
  "name": "string",
  "usersId": "ObjectId",
  "createdAt": "date",
  "updatedAt": "date"
}
```

---

### 📁 Collection: `pages`

Core entity of the builder.

```json
{
  "title": "string",
  "slug": "string",
  "type": "landing | course",
  "order": number,
  "puckData": {},
  "version": number,
  "usersId": "ObjectId",
  "groupsId": "ObjectId",
  "createdAt": "date",
  "updatedAt": "date"
}
```

---

## 🔗 Relationships

* User → Groups (1:N)
* Group → Pages (1:N)
* Page → Puck JSON (embedded)

---

## 🧠 AI Responsibilities

The AI must:

### 1. Understand Builder Structure

* Interpret `puckData`
* Validate component trees
* Suggest improvements

---

### 2. Generate Components

Example:

```json
{
  "type": "RichText",
  "props": {
    "content": "<h1>Hello</h1>"
  }
}
```

---

### 3. Modify Existing Pages

* Add components
* Reorder blocks
* Update props
* Maintain valid structure

---

### 4. Assist Development

* Generate backend routes (Express)
* Suggest Mongo/Mongoose schemas
* Help implement features

---

## ⚙️ Backend Responsibilities

Using **Express.js**

### Suggested Structure

```
/backend/src
  /models
  /controllers
  /routes
  /services
```

---

## 🧬 Suggested Mongoose Models

### Page Model

```js
const PageSchema = new mongoose.Schema({
  title: String,
  slug: String,
  type: String,
  order: Number,
  puckData: Object,
  version: Number,
  usersId: ObjectId,
  groupsId: ObjectId
}, { timestamps: true });
```

---

## 🎨 Frontend Responsibilities

Using React + Puck:

### Editor

```js
<Puck config={config} data={data} onPublish={save} />
```

### Renderer

```js
<Render config={config} data={data} />
```

---

## 🧠 AI Rules (Critical)

### MUST DO

* Always preserve valid JSON structure
* Never remove required fields (`type`, `props`, `id`)
* Respect nesting (`slot`, arrays)
* Keep compatibility with Puck config

---

### MUST NOT DO

* Invent unknown component types
* Break component hierarchy
* Return invalid JSON

---

## 🚀 Future Features

* SCORM export
* Versioning system
* Real-time collaboration
* AI-assisted layout generation
* Component marketplace

---

## 🧩 Design Philosophy

Klyro combines:

* Visual editing (like Builder.io)
* Structured data (like Notion)
* Learning-focused output (like Articulate)

---

## 🔥 Final Principle

> The UI is just a reflection.
> The source of truth is always the JSON.

---

## 📌 Summary for AI

* System is JSON-driven
* Components are typed + structured
* Pages belong to groups
* Data must remain valid for rendering
* AI acts as co-builder, not just assistant

---
