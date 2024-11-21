<p align="center">
  <a href="https://angular.dev/" target="_blank">
    <img alt="MEAN Stack Frontend with Angular" src="https://static.platzi.com/cdn-cgi/image/width=1024,quality=50,format=auto/media/achievements/badge-angular-new-769e08d0-1113-4095-839c-56ab1d0bf45f.png" width="100" />
  </a>
</p>

<h1 align="center">
  MEAN Stack Frontend - Angular Application
</h1>

<p align="center">
  <img src="./public/MEAN.gif" alt="Application Demo" width="800"/>
</p>

<p align="center">
  Modern, Secure, and Scalable Web Application built with Angular
</p>

<p align="center">
  <a href="https://angular.dev/" target="_blank">
    Angular 17
  </a>
  ·
  <a href="https://www.spartan.ng/" target="_blank">
    Spartan UI
  </a>
  ·
  <a href="https://tailwindcss.com/" target="_blank">
    Tailwind CSS
  </a>
</p>

* [Quick Guide](#-quick-guide)
* [Features](#-features)
* [Tech Stack](#-tech-stack)
* [Project Structure](#-project-structure)

### 🤖 Quick Guide

1. **Start Development**
   
   Clone the repository
   ```sh
   git clone <repository-url>
   cd frontend
   ```

   Install dependencies
   ```sh
   npm install
   ```

   Run development server
   ```sh
   ng serve
   ```
   Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

2. **Build for Production**
   ```sh
   ng build
   ```
   The build artifacts will be stored in the `dist/` directory.

### 🚀 Features

1. **Authentication System**
   - User signup/login with JWT
   - Auto-logout on token expiration (1 hour)
   - Protected routes with Guards
   - Persistent auth state with localStorage
   - Secure token management

2. **Post Management**
   - Create, Read, Update, Delete posts
   - Image upload functionality
   - Pagination
   - Owner-only post editing
   - Real-time updates

3. **UI/UX Features**
   - Responsive layout
   - Loading indicators
   - Error handling
   - Dynamic navigation
   - Form validation
   - Toast notifications

### 💻 Tech Stack

- **Framework**: Angular 17
- **UI Components**: 
  - Spartan UI
  - Custom components
- **Styling**: 
  - Tailwind CSS
  - Custom CSS modules
- **Routing**: Angular Router with Guards
- **State Management**: RxJS
- **HTTP Client**: Angular HttpClient
- **Forms**: 
  - Template-driven forms
  - Reactive forms
- **Authentication**: JWT

### 📚 Key Files Description

- `app.routes.ts`: Main routing configuration
- `app.config.ts`: Application-wide configuration and providers
- `interceptors/`: HTTP interceptors for auth and error handling
- `pages/`: Feature modules and components
- `shared/`: Reusable components, services, and guards
- `main.ts`: Application entry point
- `styles.css`: Global styles and Tailwind imports
- `tailwind.config.js`: Tailwind CSS configuration
- `tsconfig.json`: TypeScript configuration

### 🛠️ Development Commands

1. **Generate Components**:
   ```sh
   ng generate component pages/new-component
   ```

2. **Generate Services**:
   ```sh
   ng generate service shared/services/new-service
   ```

3. **Generate Guards**:
   ```sh
   ng generate guard shared/guards/new-guard
   ```

4. **Run Tests**:
   ```sh
   ng test
   ```

### 📚 Documentation

- [Angular Documentation](https://angular.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [RxJS Documentation](https://rxjs.dev/)
- [Spartan UI Documentation](https://www.spartan.ng/)

### 🔐 Environment Setup

Create `environment.ts` in the `src/environments` directory:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

### 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

### 🙏 Acknowledgments

- Angular Team for the amazing framework
- Spartan UI for beautiful components
- Tailwind CSS for utility-first CSS

Happy coding! 🚀
