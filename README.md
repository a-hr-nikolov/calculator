# Calculator with vanilla JS

As it is, this project is fairly simple, so it is no surprise that vanilla JS handles it without much trouble.

There wasn't anything particularly challenging in the initial requirements, aside from the fact that one has to think about how calculators actually work. I like breaking things down and figuring out their step-by-step operation, so that didn't bother me much.

However, when I decided to include extended functionality, things got a little challenging.

## Initial Requirements

1. Code the following operations:

- Addition
- Subtraction
- Multiplication
- Division

2. Create a simple calculator design with button input
3. Add keyboard support

## My additions

1. Make the design responsive
2. Handle longer outputs (with scientific notation or truncation)
3. Add a +/- button

## Challenges

1. Converting numbers to scientific notation. The logic wasn't hard, but it was hard fighting against JavaScript's built-in conversion, mainly because I didn't know it existed.
2. Rounding numbers when shortening them. While JavaScript has its built-in Math functions, you cannot simply use them to round numbers when shortening them, because the shortening function works in a different way. I had to create an entire separate rounding function, which rounded the last digit of the shortened number, before any further operation can be done it (e.g. attaching an exponent).
