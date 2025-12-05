# 🚀 Careers Page Builder

A full-stack application that enables companies to create branded careers pages and allows candidates to browse open positions.


## 📌 Features

### For Recruiters

* **Branding Editor**: Customize company name, description, colors, logo, banner, and culture video.
* **Section Manager**: Add, edit, delete, and toggle visibility of content sections (About Us, Values, Benefits, etc.).
* **Live Preview**: See how the careers page looks before publishing with desktop/tablet/mobile views.
* **Shareable Link**: Get a public URL to share with candidates.

### For Candidates

* **Company Information**: Learn about the company culture and values.
* **Job Listings**: Browse all open positions.
* **Search & Filters**: Find jobs by title, location, work policy, department.
* **Mobile-Friendly**: Fully responsive design.

---

## 🛠 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **UI Components** | Shadcn/ui + Radix UI |
| **Database** | PostgreSQL (Neon) |
| **ORM** | Prisma |
| **Authentication** | NextAuth.js |
| **Deployment** | Vercel |

---

## 🚀 Getting Started

### Prerequisites

* Node.js 18+
* npm or yarn
* PostgreSQL database (or use SQLite for local dev)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/royaals/careers-page-builder.git
    cd careers-page-builder
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up environment variables**
    ```bash
    cp .env.example .env
    ```
    Edit `.env` with your values:
    ```text
    DATABASE_URL="your-database-url"
    NEXTAUTH_SECRET="your-secret-key"
    NEXTAUTH_URL="http://localhost:3000"
    ```

4.  **Set up the database**
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Seed sample data**
    ```bash
    npm run db:seed
    ```

6.  **Start the development server**
    ```bash
    npm run dev
    ```

7.  **Open your browser**
    ```text
    http://localhost:3000
    ```

### Demo Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **TechCorp Recruiter** | `recruiter@techcorp.com` | `password123` |
| **GreenLeaf Recruiter** | `hr@greenleaf.com` | `password123` |

---

### 🔗 Public Candidate Pages

After starting the server and running the seed script, you can view the publicly accessible careers pages:

* **TechCorp Careers Page:** `http://localhost:3000/techcorp/careers`
* **GreenLeaf Careers Page:** `http://localhost:3000/greenleaf/careers`

### 🔒 Recruiter Login

* **Login**: Log in using the **demo credentials** above to access the dashboard and customize the pre-built pages.
* **Register**: Create your own company page by navigating to the **registration route** (`http://localhost:3000/register`), then customize and publish your new careers page.

