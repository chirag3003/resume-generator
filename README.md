# ResumeBuilder

A free, open-source resume builder built as a hobby project. Create clean, ATS-friendly resumes without the bloat.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Built with](https://img.shields.io/badge/built%20with-Next.js%2015-black)

## What is this?

A simple web app for creating professional resumes. It's designed to be straightforward—no account required, no data sent to servers, just a tool that helps you make a resume.

### Key Features

- **Multiple Resumes** - Create and save different versions for different job applications
- **Live Preview** - See changes instantly as you type
- **PDF Export** - Download your resume as a PDF
- **ATS-Friendly Templates** - Clean layouts that work well with Applicant Tracking Systems
- **AI-Assisted Writing** - Bring your own API key (OpenAI, Google, or Anthropic) to get help with content
- **Local Storage** - All data stays in your browser

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Runtime**: Bun
- **Styling**: Tailwind CSS + shadcn/ui
- **PDF Generation**: @react-pdf/renderer
- **State Management**: Zustand
- **AI Integration**: Vercel AI SDK (BYOK - Bring Your Own Key)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine

### Installation

```bash
# Clone the repository
git clone https://github.com/chirag3003/resume-generator.git
cd resume-generator

# Install dependencies
bun install

# Start the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Go to the dashboard
2. Click "Create New Resume"
3. Fill in your information or use AI to generate content
4. Preview your resume in real-time
5. Download as PDF when ready

### AI Features (Optional)

To use AI-powered content generation:

1. Go to Settings
2. Enter your API key for OpenAI, Google Gemini, or Anthropic
3. Keys are stored locally in your browser—never sent to any server

## Important Notes

- **Data Storage**: All resume data is stored in your browser's localStorage. If you clear browser data, your resumes will be lost. Always export PDFs of important work.
- **Hobby Project**: This is a personal project, not a commercial product. There's no support team or SLA.
- **AI Keys**: You need to provide your own API keys for AI features. The app doesn't include any AI credits.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── builder/[id]/      # Resume editor
│   ├── create/            # New resume creation
│   ├── dashboard/         # Resume management
│   └── settings/          # User settings
├── components/
│   ├── builder/           # Editor components
│   ├── pdf/               # PDF generation
│   ├── settings/          # Settings forms
│   ├── templates/         # Resume templates
│   └── ui/                # shadcn/ui components
└── lib/
    ├── ai/                # AI service integration
    ├── schema/            # Zod schemas
    └── store/             # Zustand stores
```

## Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest features
- Submit pull requests

## Author

**Chirag Bhalotia**

- Website: [chirag.codes](https://chirag.codes)
- GitHub: [@chirag3003](https://github.com/chirag3003)

## License

This project is open source and available under the [MIT License](LICENSE).
