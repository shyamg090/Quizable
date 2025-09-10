# 🌀 Temporal POC: Signals + Queries in a Single Workflow

## 📌 Overview

This POC demonstrates how to:

* Start a workflow with initial JSON data.
* Send new JSON updates via **signals**.
* Retrieve the current state via **queries**.
  All of this happens **inside a single long-running workflow**.

---

## ⚙️ Setup

### 1. Install Temporal + SDK

```bash
npm install @temporalio/client @temporalio/worker
```

Make sure Temporal server is running locally:

```bash
temporal server start-dev
```

---

## 📂 Project Structure

```
.
├── workflows/
│   └── messageFlow.js   # Workflow definition
├── worker.js            # Worker to run workflows
├── client.js            # Temporal client
├── server.js            # Express API
```

---

## 📝 Workflow (`workflows/messageFlow.js`)

```js
import { defineSignal, defineQuery, setHandler } from "@temporalio/workflow";

export const addMessageSignal = defineSignal("addMessage");
export const getStateQuery = defineQuery("getState");

export async function MessageWorkflow(initialData) {
  let state = { ...initialData };

  // Signal handler (mutates state)
  setHandler(addMessageSignal, (newData) => {
    state = { ...state, ...newData };
  });

  // Query handler (returns current state)
  setHandler(getStateQuery, () => state);

  // Keep workflow alive
  await new Promise(() => {});
}
```

---

## 👷 Worker (`worker.js`)

```js
import { Worker } from "@temporalio/worker";

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve("./workflows/messageFlow"),
    taskQueue: "message-queue",
  });

  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

---

## 📡 Client (`client.js`)

```js
import { Connection, Client } from "@temporalio/client";

const connection = await Connection.connect();
export const client = new Client({ connection });
```

---

## 🌐 Express API (`server.js`)

```js
import express from "express";
import { client } from "./client.js";

const app = express();
app.use(express.json());

// Start workflow
app.post("/start", async (req, res) => {
  const { initialData } = req.body;

  const handle = await client.workflow.start("MessageWorkflow", {
    args: [initialData],
    taskQueue: "message-queue",
    workflowId: `msg-${Date.now()}`, // unique ID
  });

  res.json({ workflowId: handle.workflowId });
});

// Send signal
app.post("/message/:id", async (req, res) => {
  const { id } = req.params;
  const { newData } = req.body;

  const handle = client.workflow.getHandle(id);
  await handle.signal("addMessage", newData);

  res.json({ status: "Message received" });
});

// Query state
app.get("/state/:id", async (req, res) => {
  const { id } = req.params;
  const handle = client.workflow.getHandle(id);

  const state = await handle.query("getState");
  res.json({ state });
});

app.listen(3000, () => {
  console.log("API server running on http://localhost:3000");
});
```

---

## 🚀 Run

1. Start Temporal server:

   ```bash
   temporal server start-dev
   ```
2. Start worker:

   ```bash
   node worker.js
   ```
3. Start API:

   ```bash
   node server.js
   ```

---

## 🧪 Test with cURL

### Start workflow

```bash
curl -X POST http://localhost:3000/start \
  -H "Content-Type: application/json" \
  -d '{"initialData": {"foo": "bar"}}'
```

➡️ Returns: `{ "workflowId": "msg-169425123..." }`

### Send message

```bash
curl -X POST http://localhost:3000/message/msg-169425123... \
  -H "Content-Type: application/json" \
  -d '{"newData": {"hello": "world"}}'
```

### Get state

```bash
curl http://localhost:3000/state/msg-169425123...
```

➡️ `{ "state": {"foo": "bar", "hello": "world"} }`

---
