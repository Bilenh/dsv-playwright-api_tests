## 📁 Exercise 3 – Playwright API Testing

**Project Folder**: `dsv-playwright-api_tests`  
**Description**:  
A TypeScript-based Playwright suite that:
- Verifies `GET` and `POST` requests to API endpoints.
- Generates reports in HTML or Allure.

### ✅ Prerequisites

- Node.js 18+
- [Playwright](https://playwright.dev/)
- Allure CLI

```bash
npm install
npx playwright install
npm install -g allure-commandline --save-dev
```

---

### 🚀 How to Run

**1. Run the API Test Suite**

```bash
npx playwright test
```

**2. View HTML Report**

```bash
npx playwright show-report
```

**3. Generate Allure Report**

```bash
allure serve allure-results 
OR
npx allure generate --clean ./allure-results && npx allure open
```

---

## 🛠 Tips for VS Code

- Install the **Java Extension Pack** for Maven & Spring support.
- Use the **Playwright Test for VS Code** extension to debug and explore UI/API tests easily.
- Add `launch.json` to debug Java tests or Playwright scripts.

---

## 📌 Notes

- Ensure Kafka server is running for real-time consumption.
- Allure results folder paths may vary. Check `allure-results` or `target/allure-results` as applicable.
- Each project contains its own `package.json` or `pom.xml` – install dependencies per folder.

---
