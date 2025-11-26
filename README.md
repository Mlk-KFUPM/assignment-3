# Assignment 2 – Interactive Features

This project is an enhancement of the Assignment 1 portfolio. It introduces interactivity, dynamic data, and modern web development techniques to create a more engaging user experience.

This portfolio is built with semantic HTML, modern CSS (with variables, grid, and flexbox), and dynamic JavaScript.

## 🚀 New Features (Assignment 2)

- **Dynamic Project Section**: The "Projects" section is no longer static HTML. The project data is stored in a JavaScript array (`projectsData`) in `js/script.js`. On page load, JavaScript reads this array and dynamically generates the project cards.
- **Interactive Project Filtering**: Users can click filter buttons ("All", "Flutter", "Spring Boot", etc.) to dynamically filter the project list, which satisfies the "Dynamic Content" requirement.
- **Enhanced Form Validation**: The contact form now uses JavaScript to provide real-time, inline error messages instead of relying on default browser popups.
- **Animations & Transitions**: Project cards now have a "lift" (transform) animation on hover and fade in smoothly when loaded or filtered.
- **Data Handling**: The site uses `localStorage` to save the user's theme preference and handles form submission.
- **Error & Empty States**: The project filter will show a "No projects found" message if no projects match the selected filter.

## 🖥️ Run Locally

1.  Clone the repository:
    ```bash
    git clone [https://github.com/Mlk-KFUPM/assignment-2.git](https://github.com/Mlk-KFUPM/assignment-2.git)
    cd assignment-2
    ```
2.  Open `index.html` in any modern web browser.

## 🤖 AI Usage

This project was built with assistance from AI tools (Gemini, ChatGPT, and Cursor AI). This was used for:

- Pivoting from a failed API fetch to a more robust local data array.
- Implementing the project filtering logic.
- Refactoring the contact form for inline validation.
- Debugging a CSS light-mode theme bug.

Full details on this process are documented in [docs/ai-usage-report.md](docs/ai-usage-report.md).

## 📜 License

MIT
