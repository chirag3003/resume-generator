Here is the detailed implementation project plan for your AI-Powered Resume Builder.

```markdown
# Project Plan: AI-Powered ATS Resume Builder
**Stack:** Next.js 15 (App Router), Bun, Tailwind CSS, Vercel AI SDK, React-PDF.

---

## Phase 1: Infrastructure & Environment Setup
**Goal:** Initialize the project with the correct runtime and base styling libraries.

### 1.1 Initialization
- [ ] Initialize project using Bun:
  ```bash
  bun create next-app@latest resume-builder --typescript --tailwind --eslint

```

* [ ] Verify `bun.lockb` is generated and recognized.
* [ ] Configure `bun dev` as the startup script.

### 1.2 UI Library Configuration (shadcn/ui)

* [ ] Initialize shadcn/ui:
```bash
bunx shadcn@latest init

```


* [ ] Install core components:
```bash
bunx shadcn@latest add button sheet tabs accordion input textarea label scroll-area card separator

```


* [ ] Install icons:
```bash
bun add lucide-react

```



### 1.3 Typography & Global Styles

* [ ] Configure **Inter** or **Geist Sans** in `layout.tsx` (Standard, parsable fonts are critical for ATS).
* [ ] Setup `globals.css` to include print-specific media queries (hiding UI elements during PDF generation).

---

## Phase 2: Core Data Architecture

**Goal:** Define the single source of truth for the resume data to ensure sync between AI, Editor, and Preview.

### 2.1 Type Definitions (`/types/resume.ts`)

* [ ] Create strict interfaces for `ResumeData`, `Experience`, `Education`, `Skill`, and `Project`.
* [ ] Define the Zod Schema mirroring these interfaces (for AI validation later).

### 2.2 Global State Management (`/store`)

* [ ] Install Zustand: `bun add zustand`.
* [ ] Create `useResumeStore.ts`.
* **State:** `resumeData` (Object), `isGenerating` (Boolean), `activeTemplate` (String).
* **Actions:** `setResumeData`, `updateSectionItem`, `addSectionItem`, `removeSectionItem`.


* [ ] Create `initialData.ts` with placeholder resume content to test the UI before the AI is ready.

---

## Phase 3: The Builder UI (Frontend Shell)

**Goal:** Create the "Split-Pane" workspace where users interact with the app.

### 3.1 Layout Architecture (`/app/builder/page.tsx`)

* [ ] Create a persistent 2-column grid layout (fixed height `100vh`).
* **Left Col (35%):** Input/Editor Panel (Scrollable).
* **Right Col (65%):** Live Preview Panel (Gray background, centered "Paper" view).



### 3.2 The Resume Template (`/components/templates`)

* [ ] Build `ClassicATSTemplate.tsx`.
* **Constraint:** Use semantic HTML (`<section>`, `<h3>`, `<ul>`) only.
* **Styling:** Use Tailwind for spacing/typography. Avoid flexbox/grid for core text blocks if possible (block flow is safest for parsers).
* **Data Binding:** Connect props to `useResumeStore`.



### 3.3 Preview Panel Wrapper

* [ ] Create `PreviewPanel.tsx`.
* [ ] Implement a "Scale" feature (CSS `transform: scale()`) to fit the A4 paper within the screen without breaking layout.

---

## Phase 4: AI Integration ("The Brain")

**Goal:** Connect the Vercel AI SDK to transform raw text into structured JSON.

### 4.1 API Route Setup

* [ ] Install AI dependencies:
```bash
bun add ai @ai-sdk/openai zod

```


* [ ] Create route `app/api/generate-resume/route.ts`.

### 4.2 Prompt Engineering & Logic

* [ ] Implement `generateObject` from Vercel AI SDK.
* [ ] Write the **System Prompt**:
* *Instruction:* "You are an expert resume writer..."
* *Constraint:* "Map user skills to job description keywords."
* *Output:* Strict JSON based on the Zod schema from Phase 2.1.


* [ ] Handle API errors and edge cases (e.g., empty job descriptions).

### 4.3 Client-Side Trigger

* [ ] Create `AIGeneratorForm.tsx` in the Left Panel.
* [ ] Connect the "Generate" button to the API.
* [ ] On success: Dispatch `setResumeData(response)` to the Zustand store.

---

## Phase 5: The Editing Engine

**Goal:** Allow users to refine the AI-generated content manually.

### 5.1 Manual Editor Components

* [ ] Create `ManualEditor.tsx` using **Tabs** (Personal, Work, Skills, Projects).
* [ ] Implement **Accordion** sections for lists (e.g., Job 1, Job 2).

### 5.2 Forms & Validation

* [ ] Install Form libs: `bun add react-hook-form @hookform/resolvers`.
* [ ] Create isolated form components (e.g., `ExperienceForm.tsx`).
* [ ] **Sync Logic:**
* On `onChange` or `onBlur`, update the specific field in the Zustand store.
* *Result:* Typing in the left panel instantly updates the right panel.



### 5.3 Click-to-Edit Interaction (Polish)

* [ ] Make sections in the `PreviewPanel` clickable.
* [ ] On click: Open the specific Accordion/Sheet in the Left Panel corresponding to that section.

---

## Phase 6: PDF Generation ("The Printer")

**Goal:** Convert the resume to a high-fidelity PDF using React-PDF.

### 6.1 React-PDF Setup

* [ ] Install React-PDF: `bun add @react-pdf/renderer`.
* [ ] Create `/components/pdf/ResumePDFDocument.tsx`.

### 6.2 PDF Document Component

* [ ] Build `ResumePDFDocument` using React-PDF primitives (`Document`, `Page`, `View`, `Text`, `StyleSheet`).
* [ ] Mirror the styling from `ClassicATSTemplate.tsx` using React-PDF's StyleSheet API.
* [ ] Bind props to `ResumeData` type from Zustand store.

### 6.3 Download Trigger

* [ ] Create `PDFDownloadButton.tsx` using `@react-pdf/renderer`'s `PDFDownloadLink`.
* [ ] Connect button to current resume state for dynamic generation.
* [ ] Handle loading states during PDF generation.

---

## Phase 7: Testing & Optimization

**Goal:** Ensure the resume actually passes ATS parsers.

### 7.1 Parser Testing

* [ ] Export a PDF.
* [ ] Use a text extraction tool (like `pdftotext`) to verify the reading order.
* [ ] Ensure "Experience" comes before "Education" in the text stream.

### 7.2 Performance

* [ ] Optimize large imports (lazy load Puppeteer).
* [ ] Verify Bun runtime performance logs.

### 7.3 Deployment

* [ ] Deploy to **Vercel**.
* [ ] Verify PDF generation works in production (React-PDF runs client-side, no serverless issues).
