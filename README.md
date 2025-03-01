# AI Jeopardy

A NextJS application that lets users create custom Jeopardy-style games with AI-generated questions.

## Features

- Interactive Jeopardy-style game board
- User can input 5 custom categories
- AI-generated questions for each category based on difficulty levels (100-500)
- Clickable question cards that flip to reveal questions
- Responsive design with Tailwind CSS

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- OpenAI API for question generation

## Project Structure

- `/pages` - Next.js pages
- `/components` - Reusable UI components
- `/lib` - Utility functions and API handlers
- `/styles` - Global styles and Tailwind config
- `/types` - TypeScript type definitions
- `/public` - Static assets

## API Integration

Using OpenAI API to generate questions based on:
- Category name
- Difficulty level (mapped to point values)
- Knowledge domain constraints

## Development Notes

- Implement game board UI first
- Create category input form
- Build question card component with flip animation
- Implement OpenAI API integration for question generation
- Add score tracking (optional)
- Add sound effects (optional)