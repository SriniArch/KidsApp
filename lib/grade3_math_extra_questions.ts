import type { Question } from "./curriculum"

// Additional questions merged with each topic's base questions.
// Quizzes draw a random subset, so attempts vary.
export const grade3MathExtraQuestions: Record<string, Question[]> = {
  // ---------------------------------------------------------------- Grade 3 Math
  "grade-3:math:addition": [
    { id: "e1", type: "number", prompt: "What is 45 + 27?", answer: 72, explanation: "40 + 20 = 60 and 5 + 7 = 12, so 60 + 12 = 72." },
    { id: "e2", type: "number", prompt: "What is 9 + 9?", answer: 18, explanation: "9 + 9 = 18." },
    {
      id: "e3", type: "mcq",
      prompt: "Which sum equals 50?",
      options: ["20 + 30", "40 + 20", "25 + 20", "35 + 10"],
      answerIndex: 0,
      explanation: "20 + 30 = 50."
    },
    { id: "e4", type: "boolean", prompt: "0 + 8 equals 8.", answer: true, explanation: "Adding zero does not change a number." },
    { id: "e5", type: "number", prompt: "What is 123 + 100?", answer: 223, explanation: "Add 100 to the hundreds: 123 + 100 = 223." },
    { id: "e6", type: "number", prompt: "What is 36 + 42?", answer: 78, explanation: "30 + 40 = 70 and 6 + 2 = 8, so 70 + 8 = 78." },
    { id: "e7", type: "number", prompt: "What is 58 + 17?", answer: 75, explanation: "58 + 10 = 68 and 68 + 7 = 75." },
    {
      id: "e8", type: "mcq",
      prompt: "Which sum equals 100?",
      options: ["45 + 55", "60 + 30", "25 + 65", "70 + 20"],
      answerIndex: 0,
      explanation: "45 + 55 = 100."
    },
    { id: "e9", type: "boolean", prompt: "35 + 25 equals 60.", answer: true, explanation: "35 + 25 = 60." },
    { id: "e10", type: "number", prompt: "What is 200 + 345?", answer: 545, explanation: "200 + 300 = 500 and 500 + 45 = 545." },
    {
      id: "e11", type: "mcq",
      prompt: "What is 27 + 36?",
      options: ["53", "63", "73", "83"],
      answerIndex: 1,
      explanation: "27 + 36 = 63."
    },
    { id: "e12", type: "number", prompt: "What is 125 + 75?", answer: 200, explanation: "125 + 75 = 200." },
    { id: "e13", type: "boolean", prompt: "48 + 32 equals 80.", answer: true, explanation: "48 + 32 = 80." },
    { id: "e14", type: "number", prompt: "What is 314 + 25?", answer: 339, explanation: "314 + 20 = 334 and 334 + 5 = 339." },
    {
      id: "e15", type: "mcq",
      prompt: "Ravi has 24 pencils and gets 15 more. How many pencils does he have?",
      options: ["29", "39", "49", "59"],
      answerIndex: 1,
      explanation: "24 + 15 = 39 pencils."
    }
  ],

  // ------------------------------------------------------------- Grade 3 Math
  "grade-3:math:subtraction": [
    { id: "e1", type: "number", prompt: "What is 90 - 35?", answer: 55, explanation: "90 - 35 = 55." },
    { id: "e2", type: "number", prompt: "What is 12 - 12?", answer: 0, explanation: "Taking away everything leaves 0." },
    {
      id: "e3", type: "mcq",
      prompt: "What is 45 - 20?",
      options: ["25", "20", "35", "15"],
      answerIndex: 0,
      explanation: "45 - 20 = 25."
    },
    { id: "e4", type: "boolean", prompt: "100 - 1 equals 99.", answer: true, explanation: "One less than 100 is 99." },
    { id: "e5", type: "number", prompt: "What is 64 - 9?", answer: 55, explanation: "64 - 9 = 55." },
    { id: "e6", type: "number", prompt: "What is 75 - 32?", answer: 43, explanation: "75 - 30 = 45 and 45 - 2 = 43." },
    { id: "e7", type: "number", prompt: "What is 100 - 45?", answer: 55, explanation: "100 - 45 = 55." },
    {
      id: "e8", type: "mcq",
      prompt: "What is 63 - 27?",
      options: ["26", "36", "46", "56"],
      answerIndex: 1,
      explanation: "63 - 27 = 36."
    },
    { id: "e9", type: "boolean", prompt: "80 - 30 equals 50.", answer: true, explanation: "80 - 30 = 50." },
    { id: "e10", type: "number", prompt: "What is 500 - 125?", answer: 375, explanation: "500 - 125 = 375." },
    {
      id: "e11", type: "mcq",
      prompt: "Which answer is correct for 91 - 19?",
      options: ["62", "72", "82", "92"],
      answerIndex: 1,
      explanation: "91 - 19 = 72."
    },
    { id: "e12", type: "number", prompt: "What is 150 - 75?", answer: 75, explanation: "150 - 75 = 75." },
    { id: "e13", type: "boolean", prompt: "64 - 24 equals 40.", answer: true, explanation: "64 - 24 = 40." },
    { id: "e14", type: "number", prompt: "What is 326 - 100?", answer: 226, explanation: "Subtracting 100 changes the hundreds: 326 - 100 = 226." },
    {
      id: "e15", type: "mcq",
      prompt: "Maya has 50 stickers and gives 18 away. How many stickers are left?",
      options: ["22", "32", "38", "42"],
      answerIndex: 1,
      explanation: "50 - 18 = 32 stickers."
    }
  ],

  "grade-3:math:multiplication": [
    { id: "e1", type: "number", prompt: "What is 4 × 4?", answer: 16, explanation: "4 × 4 = 16." },
    { id: "e2", type: "number", prompt: "What is 8 × 3?", answer: 24, explanation: "8 × 3 = 24." },
    {
      id: "e3", type: "mcq",
      prompt: "What is 5 × 0?",
      options: ["5", "0", "50", "10"],
      answerIndex: 1,
      explanation: "Any number times 0 is 0."
    },
    {
      id: "e4", type: "boolean",
      prompt: "6 × 2 gives the same answer as 2 × 6.",
      answer: true,
      explanation: "Order does not change the product. Both equal 12."
    },
    { id: "e5", type: "number", prompt: "What is 9 × 3?", answer: 27, explanation: "9 × 3 = 27." },
    { id: "e6", type: "number", prompt: "What is 5 × 6?", answer: 30, explanation: "5 × 6 = 30." },
    { id: "e7", type: "number", prompt: "What is 7 × 4?", answer: 28, explanation: "7 × 4 = 28." },
    {
      id: "e8", type: "mcq",
      prompt: "What is 6 × 5?",
      options: ["25", "30", "35", "40"],
      answerIndex: 1,
      explanation: "6 × 5 = 30."
    },
    { id: "e9", type: "boolean", prompt: "3 × 7 equals 21.", answer: true, explanation: "3 × 7 = 21." },
    { id: "e10", type: "number", prompt: "What is 10 × 8?", answer: 80, explanation: "10 × 8 = 80." },
    {
      id: "e11", type: "mcq",
      prompt: "Which multiplication gives 36?",
      options: ["4 × 8", "6 × 6", "5 × 7", "3 × 9"],
      answerIndex: 1,
      explanation: "6 × 6 = 36."
    },
    { id: "e12", type: "number", prompt: "What is 7 × 8?", answer: 56, explanation: "7 × 8 = 56." },
    { id: "e13", type: "boolean", prompt: "9 × 2 equals 18.", answer: true, explanation: "9 × 2 = 18." },
    { id: "e14", type: "number", prompt: "What is 3 × 12?", answer: 36, explanation: "3 groups of 12 make 36." },
    {
      id: "e15", type: "mcq",
      prompt: "There are 4 bags with 5 apples in each bag. How many apples are there?",
      options: ["9", "15", "20", "25"],
      answerIndex: 2,
      explanation: "4 × 5 = 20 apples."
    }
  ],

  "grade-3:math:division": [
    { id: "e1", type: "number", prompt: "What is 16 ÷ 4?", answer: 4, explanation: "16 ÷ 4 = 4." },
    { id: "e2", type: "number", prompt: "What is 18 ÷ 2?", answer: 9, explanation: "18 ÷ 2 = 9." },
    {
      id: "e3", type: "mcq",
      prompt: "What is 24 ÷ 6?",
      options: ["3", "4", "5", "6"],
      answerIndex: 1,
      explanation: "24 ÷ 6 = 4."
    },
    { id: "e4", type: "boolean", prompt: "10 ÷ 1 equals 10.", answer: true, explanation: "Dividing by 1 does not change a number." },
    { id: "e5", type: "number", prompt: "What is 21 ÷ 3?", answer: 7, explanation: "21 ÷ 3 = 7." },
    { id: "e6", type: "number", prompt: "What is 20 ÷ 5?", answer: 4, explanation: "20 ÷ 5 = 4." },
    { id: "e7", type: "number", prompt: "What is 30 ÷ 5?", answer: 6, explanation: "30 ÷ 5 = 6." },
    {
      id: "e8", type: "mcq",
      prompt: "What is 36 ÷ 6?",
      options: ["4", "5", "6", "7"],
      answerIndex: 2,
      explanation: "36 ÷ 6 = 6."
    },
    { id: "e9", type: "boolean", prompt: "25 ÷ 5 equals 5.", answer: true, explanation: "25 ÷ 5 = 5." },
    { id: "e10", type: "number", prompt: "What is 40 ÷ 8?", answer: 5, explanation: "40 ÷ 8 = 5." },
    {
      id: "e11", type: "mcq",
      prompt: "Which division gives 7?",
      options: ["21 ÷ 3", "24 ÷ 4", "32 ÷ 4", "45 ÷ 5"],
      answerIndex: 0,
      explanation: "21 ÷ 3 = 7."
    },
    { id: "e12", type: "number", prompt: "What is 42 ÷ 6?", answer: 7, explanation: "42 ÷ 6 = 7." },
    { id: "e13", type: "boolean", prompt: "36 ÷ 4 equals 9.", answer: true, explanation: "36 ÷ 4 = 9." },
    { id: "e14", type: "number", prompt: "What is 48 ÷ 8?", answer: 6, explanation: "48 ÷ 8 = 6." },
    {
      id: "e15", type: "mcq",
      prompt: "There are 24 candies shared equally among 4 children. How many candies does each child get?",
      options: ["4", "5", "6", "8"],
      answerIndex: 2,
      explanation: "24 ÷ 4 = 6 candies for each child."
    }
  ],
}
