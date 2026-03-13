# Thomas Haiden | Developer Portfolio

A minimalist personal portfolio and digital resume focused on high-performance design and technical clarity. This project is built to showcase my transition from a background in hospitality management to an engineering-focused path in Computer Science.

## Project Overview

This site is a custom environment built from scratch using TypeScript and Vite. It avoids heavy frameworks or third-party UI libraries to maintain absolute control over performance and interactive elements. 

The design is inspired by the technical aesthetic of Nothing.com, featuring a reactive dot-grid background and a minimalist left-aligned navigation system.

## Core Features

Design and Layout
The site uses an editorial, left-aligned layout with a custom Sage Green color palette. It includes strict light and dark themes where every container and background is tonally matched to maintain a clean visual flow.

Interactive Background
A background dot matrix is rendered via the HTML5 Canvas API. It calculates the distance between the mouse pointer and each dot to create a dynamic "growth" effect as the user moves their cursor across the screen.

Scroll Progress Indicator
The left sidebar contains a custom scroll indicator. It uses a 1px vertical track with a moving sage green notch that calculates the precise scroll percentage of the document to show the user's current position.

Fidget Mini-game
A hidden "Pop It" grid is integrated into the footer. It allows users to interact with a set of bubbles that reset automatically, adding a small layer of tactile engagement to the experience.

## Technical Stack

The project relies on native web APIs rather than external dependencies:

Languages: TypeScript, CSS3, HTML5
Build Tool: Vite
Animations: Intersection Observer (for scroll reveals), Canvas API (for background)
Version Control: Git

## Local Development

To run this repository on your own machine:

1. Clone the repository:
git clone https://github.com/tomsliikee/portfolio.git

2. Install the necessary packages:
npm install

3. Launch the local dev server:
npm run dev

## About the Author

I am currently a second-semester Computer Science student at FH Wr. Neustadt. My work focuses on low-level systems programming in C and C++, as well as relational database architecture using SQL. My previous experience in high-end hospitality management informs my attention to detail and my user-centric approach to software design.

Thomas Haiden | 2026
