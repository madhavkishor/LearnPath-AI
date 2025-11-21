# **LearnPath AI — Intelligent Learning Path Generator**

LearnPath-AI is a modern AI-powered learning assistant that helps users generate personalized learning paths, track progress, and interact with an intelligent dashboard. It is built using a full modern stack including **Vite, React 19, TypeScript, Tailwind v4, Shadcn UI, Convex backend, Framer Motion**, and **Three.js**.

---

## 🚀 **Features**

### ✅ **Personalized AI Learning Paths**

* Generate structured learning roadmaps for any topic.
* Adaptive difficulty suggestions.

### ✅ **User Authentication**

* Email-OTP login powered by Convex Auth.
* Anonymous sessions supported.
* Secure user data storage.

### ✅ **Interactive UI / UX**

* Modern UI with Shadcn components.
* Smooth Framer-Motion animations.
* Fully responsive design (mobile + desktop).

### ✅ **Convex-Powered Backend**

* Real-time database.
* Pre-built CRUD system.
* Secure user-based routing & data access.

### ✅ **Dashboard**

* Personalized “Get Started” workflow.
* Track progress, modules, and tasks.
* Sidebar-based protected layout.

### ✅ **3D Enhancements**

* Three.js support for creating 3D elements on landing page or UI.

---

# 🧱 **Tech Stack**

### **Frontend**

* **React 19**
* **TypeScript**
* **Vite**
* **Tailwind CSS v4**
* **Shadcn UI + Lucide Icons**
* **Framer Motion**
* **React Router v7**

### **Backend**

* **Convex** (database + server functions)
* **Convex Auth** (email OTP)

### **Optional Enhancements**

* Three.js for 3D
* Sonner for toast notifications

---

# 📁 **Project Structure**

```
LearnPath-AI/
├── src/
│   ├── components/       # UI components, Shadcn components
│   ├── pages/            # Main pages (Auth, Dashboard, Landing)
│   ├── hooks/            # Auth & utility hooks
│   ├── convex/           # Convex backend functions & schema
│   ├── assets/           # Images & static files
│   ├── main.tsx          # React Router setup
│   └── index.css         # Global styles & theme
└── package.json
```

---

# 🛠️ **Installation & Setup**

### **1. Clone the repository**

```bash
git clone https://github.com/madhavkishor/LearnPath-AI.git
cd LearnPath-AI
```

### **2. Install dependencies**

```bash
pnpm install
```

### **3. Setup Convex**

Login & link:

```bash
npx convex dev
```

### **4. Start development server**

```bash
pnpm run dev
```

Now open:
👉 **[http://localhost:5173](http://localhost:5173)**

---

# 🔐 **Authentication Usage**

Use the pre-built hook:

```ts
import { useAuth } from "@/hooks/use-auth";

const { user, signIn, signOut, isAuthenticated } = useAuth();
```

Never manually decode tokens or build custom session logic — Convex handles it.

Auth pages are handled under:
`src/pages/Auth.tsx`

Protected routes should redirect to `/auth` if not logged in.

---

# 🗃️ **Backend (Convex)**

### **Schema**

Located at:

```
src/convex/schema.ts
```

Rules:

* Do not include `_id` or `_creationTime` in fields.
* Never duplicate indexes.
* Use **Id<"tableName">** for reference types.
* Use `Doc<"tableName">` for objects.

### **Using CRUD**

```ts
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const createItem = useMutation(api.items.create);
```

---

# 🎨 **Design Guidelines**

* Use Shadcn UI components by default.
* Avoid nested cards or heavy shadows.
* Always add mobile responsiveness.
* Every major component should have a Framer-Motion animation.

Example:

```tsx
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
  <Card>...</Card>
</motion.div>
```

---

# 🎯 **Roadmap**

* [ ] Add user progress tracking
* [ ] Add AI chatbot tutor
* [ ] Add course completion certificates
* [ ] Add gamification & badges
* [ ] Improve dashboard analytics

---

# 🤝 Contributing

Pull requests are welcome!
Feel free to improve the UI, backend logic, or documentation.


