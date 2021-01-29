# ![GA logo](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) README: a How-To Guide

### Overview

To get your project idea approved for the Unit 1 project, you will begin developing your project's README file. The approval process will follow the steps below:

* Learn about README files and markdown
* Fork and clone this README for your project
* In your copy, fill out the following fields:
  * Title & Blurb
  * Motivation
  * User Stories & Wireframes
* Submit a pull request for project approval
* Get your project approved
* Copy this template to your project repository
* Complete your README as your project develops


### What is a README?

A README is a file that describes a project, program or app. It often includes information on technologies used, how to install or use the app, and code examples.

On GitHub, a README in your repo acts like an `index.html` file. If there is a README in a directory of a repo, the README will display as an HTML page.

---
### Markdown

Markdown is a plain text format for writing *structured* documents. It uses non-alphabetic characters to indicate simple styling choices. The simple syntax makes it easy to read in its raw format and converts easily to a formatted HTML document.

### GFM (GitHub Flavored Markdown)

GitHub Flavored Markdown, aka GFM, is a dialect of Markdown. It uses  the same syntax as Markdown with some additional features, e.g., direct embedding of HTML.

#### Basic Syntax
```markdown
h1 - h6 head tags
# = h1, ## = h2, etc.

**text** = bold
*text* = italic

[link text](absolute or relative url)

![image path](absolute or relative url)

```

#### Markdown Resources

* [GFM basic syntax](https://docs.github.com/en/free-pro-team@latest/github/writing-on-github/basic-writing-and-formatting-syntax)
* [Mastering Markdown on GitHub](https://guides.github.com/features/mastering-markdown/)
* [GitHub Flavored Markdown Spec](https://github.github.com/gfm/)

---
## Project READMEs at ![GA logo](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)


# Project One: Connect Four
A fun 2 player game where players place tokens in a grid one after another with the goal of connecting four tokens in a row.

### Motivation
I am building this app to fulfill the requirements for project one of General Assembly SE Immersive.

---
### Screenshots
![screenGrab 1](./screenGrab1.png)

---
### User Stories & Wireframes
The planning materials used to build this app.
* This is a two player game.  Player one should select a column and the token should drop to the bottom and land in the last free space.  Player two will then be prompted to drop the token. 
* once either player has four tokens in a row a positive message will display saying who one. 
* There are buttons to **Restart Game** AND **Enter Players Name** 

### Wireframes
![wireFrame 1](./wireFrame.jpeg)

---
### Technologies & Code Snippets
* The entire game can be made in javaScript, CSS, and HTML

* One of my biggest weaknesses was understanding how to create an application that maintained a low run time while containing static divs. Watching "Code with Ania Kubów" I got the idea to update the class and ids inside the divs so that I could throw each div into a larger array that would allow me to loop through and shorten my run time.
![htmlSnippet](./htmlSnip.png)

* A goal with any code is to shorten the run time.  Originally I had one large checkStatusOfGame function that held all the code for each of these check functions.  However, even after a win the code would still have to run to check for an additional match.  First, I pulled each function out of the checkStatusOfGame function.  Then, I added a return statement at the end of each function to stop the function from running too many times.
![jsSnippet](./checkStatusSnip.png)

---
### Credits
I relied on "Code with Ania Kubów and her turtorial on Building a Simple Connect 4 Game: https://www.youtube.com/watch?v=dBlSiGOFjUY

---

### Future development
Connect 4 can be won using various algorithms and statistical models.  I would love to create a computer that can win the game any time using the work completed by mathematicians.

I would like to continue to hunt for ways to minimize my run time.  I know that to find a negDiag match we still have to fist check all other matches. How can I train a computer to find where to only hunt for the "most likely" match in the game?  How can I add logic to only check for matches after there are a mathematically sufficient number of moves for a match to exist?
