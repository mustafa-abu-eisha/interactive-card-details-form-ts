# Frontend Mentor - Interactive card details form solution

This is a solution to the [Interactive card details form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-card-details-form-XpS8cKZDWw).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Fill in the form and see the card details update in real-time
- Receive error messages when the form is submitted if:
  - Any input field is empty
  - The card number, expiry date, or CVC fields are in the wrong format
- View the optimal layout depending on their device's screen size
- See hover, active, and focus states for interactive elements on the page

### Screenshot

|                                        Submit Form                                        |                                         Thanks Card                                          |
| :---------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------: |
| <img src="./src/assets/submit-form-screenshot.png" width="100%" alt="Rating Card View" /> | <img src="./src/assets/thanks-card-screenshot.png" width="100%" alt="Thank You Card View" /> |

### Links

- [Solution URL Here](https://github.com/mustafa-abu-eisha/interactive-card-details-form-ts)
- [Live Site URL Here](https://interactive-card-details-form-ts-live.pages.dev/)

## My process

### Built with

- Semantic HTML5 markup
- Mobile-first workflow
- [React](https://reactjs.org/) - JS Library
- [TypeScript](https://www.typescriptlang.org/) - Strongly typed programming language
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling

### What I learned

While building this project, I strengthened my understanding of managing form state and custom input formatting in React with TypeScript.

One of the key achievements was formatting the card number automatically with spaces every 4 digits and typing strict state structures:

```typescript
export interface InputsTypes {
  holderName: string;
  cardNumber: string;
  month: string;
  year: string;
  cvc: string;
}

const handleChange = (
  e: ChangeEvent<HTMLInputElement>,
  name: keyof InputsTypes,
): void => {
  if (name === "cardNumber") {
    const noSpaces = e.target.value.replace(/\s+/g, "");

    const formatted = noSpaces.replace(/(.{4})(?=.)/g, "$1 ");
    setCardDetails((prev) => ({ ...prev, [name]: formatted }));
  } else {
    setCardDetails((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  }
};
```

### Continued development

In future projects, I plan to:

- Explore form validation libraries like React Hook Form combined with Zod for schema validation to simplify state management.
- Further refine accessible component patterns (ARIA attributes) for custom interactive form controls.

### Useful resources

- [React Documentation](https://react.dev) - The updated React documentation helped me structure conditional rendering cleanly.
- [Tailwind CSS Docs](https://tailwindcss.com/docs) - Excellent resource for quick reference on utility classes and responsive breakpoints.
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) - Helpful reference for typing event handlers and React component props.

## Author

- [Frontend Mentor Profile](https://www.frontendmentor.io/profile/mustafa-abu-eisha)
- [GitHub Profile](https://github.com/mustafa-abu-eisha)
- [LinkedIn Profile](https://www.linkedin.com/in/mustafaabueisha)

## Acknowledgments

Thanks to Frontend Mentor for providing realistic design challenges that help improve frontend development skills through hands-on practice.
