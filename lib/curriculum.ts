// Educational content kept fully separate from the UI.
// Shape: Grade -> Subject -> Topic -> Lesson + Questions
// Add more grades/subjects/topics here without touching the UI.

export type QuestionType = "mcq" | "boolean" | "number"

export interface BaseQuestion {
  id: string
  prompt: string
  explanation: string
}

export interface McqQuestion extends BaseQuestion {
  type: "mcq"
  options: string[]
  answerIndex: number
}

export interface BooleanQuestion extends BaseQuestion {
  type: "boolean"
  answer: boolean
}

export interface NumberQuestion extends BaseQuestion {
  type: "number"
  answer: number
}

export type Question = McqQuestion | BooleanQuestion | NumberQuestion

export interface Lesson {
  // Short, simple points. Avoid long paragraphs.
  concept: string[]
  // A worked example or visual description.
  example: string
}

export interface Topic {
  id: string
  title: string
  lesson: Lesson
  questions: Question[]
}

export interface Subject {
  id: string
  title: string
  icon: string // emoji used only in data (UI maps it to a friendly badge)
  color: SubjectColor
  topics: Topic[]
}

export interface Grade {
  id: string
  title: string
  subjects: Subject[]
}

export type SubjectColor = "math" | "science" | "geography"

// ----------------------------------------------------------------------------
// GRADE 3
// ----------------------------------------------------------------------------

const grade3Math: Subject = {
  id: "math",
  title: "Math",
  icon: "🔢",
  color: "math",
  topics: [
    {
      id: "numbers",
      title: "Numbers",
      lesson: {
        concept: [
          "Numbers help us count and measure things.",
          "Each digit sits in a place: ones, tens, and hundreds.",
          "In 347: 3 is hundreds, 4 is tens, 7 is ones.",
        ],
        example: "347 = 300 + 40 + 7. The 4 means 4 tens, which is 40.",
      },
      questions: [
        {
          id: "q1",
          type: "mcq",
          prompt: "What is the value of the digit 5 in the number 253?",
          options: ["5", "50", "500", "25"],
          answerIndex: 1,
          explanation: "The 5 is in the tens place, so its value is 50.",
        },
        {
          id: "q2",
          type: "number",
          prompt: "What number comes right after 199?",
          answer: 200,
          explanation: "After 199 we count one more to get 200.",
        },
        {
          id: "q3",
          type: "mcq",
          prompt: "Which number is the largest?",
          options: ["308", "83", "380", "138"],
          answerIndex: 2,
          explanation: "380 has 3 hundreds and the most tens, so it is largest.",
        },
        {
          id: "q4",
          type: "boolean",
          prompt: "The number 40 has a 4 in the tens place.",
          answer: true,
          explanation: "40 is 4 tens and 0 ones, so 4 is in the tens place.",
        },
        {
          id: "q5",
          type: "number",
          prompt: "What is 200 + 30 + 6?",
          answer: 236,
          explanation: "Add the place values: 200 + 30 + 6 = 236.",
        },
      ],
    },
    {
      id: "addition",
      title: "Addition",
      lesson: {
        concept: [
          "Addition means putting groups together to find the total.",
          "The + sign means add. The answer is called the sum.",
          "You can add in any order: 3 + 5 is the same as 5 + 3.",
        ],
        example: "If you have 6 apples and get 3 more: 6 + 3 = 9 apples.",
      },
      questions: [
        {
          id: "q1",
          type: "number",
          prompt: "What is 7 + 8?",
          answer: 15,
          explanation: "7 + 8 = 15.",
        },
        {
          id: "q2",
          type: "number",
          prompt: "What is 24 + 15?",
          answer: 39,
          explanation: "20 + 10 = 30, and 4 + 5 = 9, so 30 + 9 = 39.",
        },
        {
          id: "q3",
          type: "mcq",
          prompt: "Which sum equals 20?",
          options: ["12 + 6", "11 + 9", "15 + 4", "13 + 5"],
          answerIndex: 1,
          explanation: "11 + 9 = 20.",
        },
        {
          id: "q4",
          type: "boolean",
          prompt: "5 + 4 gives the same answer as 4 + 5.",
          answer: true,
          explanation: "Order does not change the sum. Both equal 9.",
        },
        {
          id: "q5",
          type: "number",
          prompt: "A box has 30 crayons. You add 12 more. How many now?",
          answer: 42,
          explanation: "30 + 12 = 42 crayons.",
        },
      ],
    },
    {
      id: "subtraction",
      title: "Subtraction",
      lesson: {
        concept: [
          "Subtraction means taking away to find how many are left.",
          "The - sign means subtract. The answer is the difference.",
          "Order matters: 9 - 4 is not the same as 4 - 9.",
        ],
        example: "You have 10 balloons and 3 pop: 10 - 3 = 7 balloons left.",
      },
      questions: [
        {
          id: "q1",
          type: "number",
          prompt: "What is 15 - 6?",
          answer: 9,
          explanation: "15 - 6 = 9.",
        },
        {
          id: "q2",
          type: "number",
          prompt: "What is 50 - 20?",
          answer: 30,
          explanation: "5 tens minus 2 tens = 3 tens = 30.",
        },
        {
          id: "q3",
          type: "mcq",
          prompt: "You had 18 stickers and gave away 7. How many are left?",
          options: ["9", "10", "11", "25"],
          answerIndex: 2,
          explanation: "18 - 7 = 11 stickers left.",
        },
        {
          id: "q4",
          type: "boolean",
          prompt: "8 - 3 is the same as 3 - 8.",
          answer: false,
          explanation: "Order matters in subtraction. 8 - 3 = 5, but 3 - 8 is different.",
        },
        {
          id: "q5",
          type: "number",
          prompt: "What is 100 - 45?",
          answer: 55,
          explanation: "100 - 45 = 55.",
        },
      ],
    },
    {
      id: "multiplication",
      title: "Multiplication",
      lesson: {
        concept: [
          "Multiplication is fast adding of equal groups.",
          "3 × 4 means 3 groups of 4, which is 4 + 4 + 4.",
          "The × sign means times. The answer is the product.",
        ],
        example: "4 bags with 5 marbles each: 4 × 5 = 20 marbles.",
      },
      questions: [
        {
          id: "q1",
          type: "number",
          prompt: "What is 3 × 4?",
          answer: 12,
          explanation: "3 groups of 4 = 4 + 4 + 4 = 12.",
        },
        {
          id: "q2",
          type: "number",
          prompt: "What is 6 × 5?",
          answer: 30,
          explanation: "6 × 5 = 30.",
        },
        {
          id: "q3",
          type: "mcq",
          prompt: "Which one equals 2 + 2 + 2 + 2?",
          options: ["4 × 2", "2 × 3", "4 × 4", "2 + 4"],
          answerIndex: 0,
          explanation: "Four 2s is 4 × 2 = 8.",
        },
        {
          id: "q4",
          type: "boolean",
          prompt: "Any number multiplied by 1 stays the same.",
          answer: true,
          explanation: "7 × 1 = 7. Multiplying by 1 does not change a number.",
        },
        {
          id: "q5",
          type: "number",
          prompt: "What is 7 × 2?",
          answer: 14,
          explanation: "7 × 2 = 14.",
        },
      ],
    },
    {
      id: "division",
      title: "Division",
      lesson: {
        concept: [
          "Division means sharing into equal groups.",
          "12 ÷ 3 asks: how many are in each of 3 equal groups?",
          "Division is the opposite of multiplication.",
        ],
        example: "Share 12 cookies among 4 friends: 12 ÷ 4 = 3 each.",
      },
      questions: [
        {
          id: "q1",
          type: "number",
          prompt: "What is 12 ÷ 3?",
          answer: 4,
          explanation: "12 shared into 3 groups = 4 in each group.",
        },
        {
          id: "q2",
          type: "number",
          prompt: "What is 20 ÷ 5?",
          answer: 4,
          explanation: "20 ÷ 5 = 4.",
        },
        {
          id: "q3",
          type: "mcq",
          prompt: "8 candies shared equally by 2 kids. Each kid gets?",
          options: ["2", "4", "6", "8"],
          answerIndex: 1,
          explanation: "8 ÷ 2 = 4 candies each.",
        },
        {
          id: "q4",
          type: "boolean",
          prompt: "Division is the opposite of multiplication.",
          answer: true,
          explanation: "If 3 × 4 = 12, then 12 ÷ 4 = 3.",
        },
        {
          id: "q5",
          type: "number",
          prompt: "What is 15 ÷ 3?",
          answer: 5,
          explanation: "15 ÷ 3 = 5.",
        },
      ],
    },
    {
      id: "fractions",
      title: "Fractions",
      lesson: {
        concept: [
          "A fraction shows part of a whole.",
          "In 1/2, the bottom (2) is how many equal parts in total.",
          "The top (1) is how many parts we have.",
        ],
        example: "A pizza cut into 4 equal slices: 1 slice is 1/4 of the pizza.",
      },
      questions: [
        {
          id: "q1",
          type: "mcq",
          prompt: "A cake is cut into 4 equal pieces. One piece is:",
          options: ["1/2", "1/3", "1/4", "1/8"],
          answerIndex: 2,
          explanation: "One of 4 equal parts is 1/4.",
        },
        {
          id: "q2",
          type: "boolean",
          prompt: "1/2 is bigger than 1/4.",
          answer: true,
          explanation: "Halves are bigger than quarters, so 1/2 > 1/4.",
        },
        {
          id: "q3",
          type: "mcq",
          prompt: "How many quarters make one whole?",
          options: ["2", "3", "4", "8"],
          answerIndex: 2,
          explanation: "Four quarters (4/4) make one whole.",
        },
        {
          id: "q4",
          type: "boolean",
          prompt: "In the fraction 3/5, the number 5 is the total parts.",
          answer: true,
          explanation: "The bottom number (denominator) is the total parts.",
        },
        {
          id: "q5",
          type: "number",
          prompt: "How many halves are in one whole? Type the number.",
          answer: 2,
          explanation: "Two halves (2/2) make one whole.",
        },
      ],
    },
    {
      id: "geometry",
      title: "Geometry",
      lesson: {
        concept: [
          "Shapes are all around us.",
          "A triangle has 3 sides, a square has 4 equal sides.",
          "A circle is perfectly round with no corners.",
        ],
        example: "A stop sign has 8 sides. A window is often a square or rectangle.",
      },
      questions: [
        {
          id: "q1",
          type: "number",
          prompt: "How many sides does a triangle have?",
          answer: 3,
          explanation: "A triangle always has 3 sides.",
        },
        {
          id: "q2",
          type: "mcq",
          prompt: "Which shape has 4 equal sides?",
          options: ["Triangle", "Square", "Circle", "Oval"],
          answerIndex: 1,
          explanation: "A square has 4 equal sides.",
        },
        {
          id: "q3",
          type: "boolean",
          prompt: "A circle has corners.",
          answer: false,
          explanation: "A circle is round and has no corners.",
        },
        {
          id: "q4",
          type: "number",
          prompt: "How many corners does a square have?",
          answer: 4,
          explanation: "A square has 4 corners (also called vertices).",
        },
        {
          id: "q5",
          type: "mcq",
          prompt: "A shape with 5 sides is called a:",
          options: ["Pentagon", "Hexagon", "Square", "Triangle"],
          answerIndex: 0,
          explanation: "A 5-sided shape is a pentagon.",
        },
      ],
    },
  ],
}

const grade3Science: Subject = {
  id: "science",
  title: "Science",
  icon: "🔬",
  color: "science",
  topics: [
    {
      id: "living-things",
      title: "Living & Non-Living",
      lesson: {
        concept: [
          "Living things grow, need food and water, and can move or change.",
          "Non-living things do not grow, eat, or breathe.",
          "Plants, animals, and people are living things.",
        ],
        example: "A dog is living (it eats and grows). A rock is non-living.",
      },
      questions: [
        {
          id: "q1",
          type: "mcq",
          prompt: "Which of these is a living thing?",
          options: ["Rock", "Tree", "Chair", "Spoon"],
          answerIndex: 1,
          explanation: "A tree grows and needs water, so it is living.",
        },
        {
          id: "q2",
          type: "boolean",
          prompt: "A car is a living thing because it moves.",
          answer: false,
          explanation: "A car moves but does not grow or eat, so it is non-living.",
        },
        {
          id: "q3",
          type: "mcq",
          prompt: "All living things need:",
          options: ["Toys", "Food and water", "Money", "Phones"],
          answerIndex: 1,
          explanation: "Living things need food and water to survive.",
        },
        {
          id: "q4",
          type: "boolean",
          prompt: "Plants are living things.",
          answer: true,
          explanation: "Plants grow, need water and sunlight, so they are living.",
        },
        {
          id: "q5",
          type: "mcq",
          prompt: "Which is NOT something living things do?",
          options: ["Grow", "Need food", "Rust", "Breathe"],
          answerIndex: 2,
          explanation: "Rusting happens to metal, a non-living material.",
        },
      ],
    },
    {
      id: "plants",
      title: "Plants",
      lesson: {
        concept: [
          "Plants make their own food using sunlight.",
          "Roots take in water. Leaves catch sunlight.",
          "The stem holds the plant up and carries water.",
        ],
        example: "A sunflower turns to face the sun to catch more light.",
      },
      questions: [
        {
          id: "q1",
          type: "mcq",
          prompt: "Which part of a plant takes in water from the soil?",
          options: ["Leaf", "Flower", "Roots", "Petal"],
          answerIndex: 2,
          explanation: "Roots absorb water and nutrients from the soil.",
        },
        {
          id: "q2",
          type: "boolean",
          prompt: "Plants need sunlight to make food.",
          answer: true,
          explanation: "Plants use sunlight to make their own food.",
        },
        {
          id: "q3",
          type: "mcq",
          prompt: "Which part catches sunlight?",
          options: ["Roots", "Leaves", "Seeds", "Stem"],
          answerIndex: 1,
          explanation: "Leaves catch sunlight to help the plant make food.",
        },
        {
          id: "q4",
          type: "boolean",
          prompt: "A plant can grow without any water.",
          answer: false,
          explanation: "Plants need water to grow and stay healthy.",
        },
        {
          id: "q5",
          type: "mcq",
          prompt: "What holds the plant up and carries water to the leaves?",
          options: ["Stem", "Flower", "Fruit", "Root hair"],
          answerIndex: 0,
          explanation: "The stem supports the plant and moves water upward.",
        },
      ],
    },
    {
      id: "five-senses",
      title: "The Five Senses",
      lesson: {
        concept: [
          "We learn about the world using five senses.",
          "Sight (eyes), hearing (ears), smell (nose), taste (tongue), touch (skin).",
          "Each sense uses a different body part.",
        ],
        example: "You smell a flower with your nose and see its color with your eyes.",
      },
      questions: [
        {
          id: "q1",
          type: "number",
          prompt: "How many senses do we have?",
          answer: 5,
          explanation: "We have 5 senses: sight, hearing, smell, taste, touch.",
        },
        {
          id: "q2",
          type: "mcq",
          prompt: "Which body part do you use to taste?",
          options: ["Nose", "Tongue", "Ears", "Eyes"],
          answerIndex: 1,
          explanation: "You taste with your tongue.",
        },
        {
          id: "q3",
          type: "boolean",
          prompt: "You hear sounds with your ears.",
          answer: true,
          explanation: "Ears are the body part for hearing.",
        },
        {
          id: "q4",
          type: "mcq",
          prompt: "Which sense uses your skin?",
          options: ["Touch", "Smell", "Sight", "Taste"],
          answerIndex: 0,
          explanation: "Touch uses the skin to feel things.",
        },
        {
          id: "q5",
          type: "mcq",
          prompt: "You use your nose for the sense of:",
          options: ["Hearing", "Smell", "Taste", "Sight"],
          answerIndex: 1,
          explanation: "The nose is used for smelling.",
        },
      ],
    },
    {
      id: "weather",
      title: "Weather",
      lesson: {
        concept: [
          "Weather is what the sky and air are like each day.",
          "It can be sunny, rainy, cloudy, windy, or snowy.",
          "The Sun warms the Earth and helps make weather.",
        ],
        example: "On a rainy day we use an umbrella. On a sunny day it feels warm.",
      },
      questions: [
        {
          id: "q1",
          type: "mcq",
          prompt: "What do you use to stay dry in the rain?",
          options: ["Sunglasses", "Umbrella", "Fan", "Gloves"],
          answerIndex: 1,
          explanation: "An umbrella keeps the rain off you.",
        },
        {
          id: "q2",
          type: "boolean",
          prompt: "The Sun helps make weather warm.",
          answer: true,
          explanation: "The Sun warms the Earth and the air.",
        },
        {
          id: "q3",
          type: "mcq",
          prompt: "Which is a type of weather?",
          options: ["Snowy", "Happy", "Tall", "Loud"],
          answerIndex: 0,
          explanation: "Snowy describes weather; the others do not.",
        },
        {
          id: "q4",
          type: "boolean",
          prompt: "Wind is moving air.",
          answer: true,
          explanation: "Wind happens when air moves from place to place.",
        },
        {
          id: "q5",
          type: "mcq",
          prompt: "Clouds are made of:",
          options: ["Cotton", "Tiny water drops", "Smoke", "Dust only"],
          answerIndex: 1,
          explanation: "Clouds are made of many tiny drops of water.",
        },
      ],
    },
    {
      id: "matter",
      title: "States of Matter",
      lesson: {
        concept: [
          "Matter is anything that takes up space.",
          "The three states are solid, liquid, and gas.",
          "Ice is solid, water is liquid, and steam is gas.",
        ],
        example: "Heat ice and it melts into water. Heat water and it becomes steam.",
      },
      questions: [
        {
          id: "q1",
          type: "mcq",
          prompt: "Which one is a liquid?",
          options: ["Ice", "Water", "Rock", "Wood"],
          answerIndex: 1,
          explanation: "Water is a liquid; it flows and takes the shape of its cup.",
        },
        {
          id: "q2",
          type: "boolean",
          prompt: "Ice is the solid form of water.",
          answer: true,
          explanation: "When water freezes it becomes solid ice.",
        },
        {
          id: "q3",
          type: "number",
          prompt: "How many main states of matter did we learn?",
          answer: 3,
          explanation: "Solid, liquid, and gas make 3 states.",
        },
        {
          id: "q4",
          type: "mcq",
          prompt: "What happens to ice when it gets warm?",
          options: ["It melts", "It grows", "It freezes", "It disappears"],
          answerIndex: 0,
          explanation: "Warm ice melts and turns into liquid water.",
        },
        {
          id: "q5",
          type: "boolean",
          prompt: "A rock is a solid.",
          answer: true,
          explanation: "A rock keeps its shape, so it is a solid.",
        },
      ],
    },
  ],
}

const grade3Geography: Subject = {
  id: "geography",
  title: "Geography",
  icon: "🌍",
  color: "geography",
  topics: [
    {
      id: "land-water",
      title: "Land & Water",
      lesson: {
        concept: [
          "Earth has both land and water.",
          "Big areas of land are called continents.",
          "Large bodies of salty water are called oceans.",
        ],
        example: "Most of the Earth is covered by water, mostly oceans.",
      },
      questions: [
        {
          id: "q1",
          type: "mcq",
          prompt: "A very large body of salt water is called a:",
          options: ["Lake", "Pond", "Ocean", "River"],
          answerIndex: 2,
          explanation: "Oceans are the largest bodies of salt water.",
        },
        {
          id: "q2",
          type: "boolean",
          prompt: "More of Earth is covered by water than by land.",
          answer: true,
          explanation: "About three-quarters of Earth is water.",
        },
        {
          id: "q3",
          type: "mcq",
          prompt: "A large area of land is called a:",
          options: ["Continent", "Cloud", "Star", "Wave"],
          answerIndex: 0,
          explanation: "Continents are the large land areas on Earth.",
        },
        {
          id: "q4",
          type: "boolean",
          prompt: "A river is smaller than an ocean.",
          answer: true,
          explanation: "Rivers are much smaller than oceans.",
        },
        {
          id: "q5",
          type: "mcq",
          prompt: "Which one is water we can drink (fresh water)?",
          options: ["Ocean", "Sea", "River", "None of these"],
          answerIndex: 2,
          explanation: "Rivers carry fresh water; oceans and seas are salty.",
        },
      ],
    },
    {
      id: "continents",
      title: "Continents",
      lesson: {
        concept: [
          "There are 7 continents on Earth.",
          "They are Asia, Africa, North America, South America, Antarctica, Europe, and Australia.",
          "Asia is the largest continent.",
        ],
        example: "Antarctica is the coldest continent, covered in ice.",
      },
      questions: [
        {
          id: "q1",
          type: "number",
          prompt: "How many continents are there?",
          answer: 7,
          explanation: "Earth has 7 continents.",
        },
        {
          id: "q2",
          type: "mcq",
          prompt: "Which is the largest continent?",
          options: ["Africa", "Asia", "Europe", "Australia"],
          answerIndex: 1,
          explanation: "Asia is the biggest continent.",
        },
        {
          id: "q3",
          type: "boolean",
          prompt: "Antarctica is very cold and covered in ice.",
          answer: true,
          explanation: "Antarctica is the coldest continent.",
        },
        {
          id: "q4",
          type: "mcq",
          prompt: "Which of these is a continent?",
          options: ["France", "Africa", "Canada", "Egypt"],
          answerIndex: 1,
          explanation: "Africa is a continent; the others are countries.",
        },
        {
          id: "q5",
          type: "boolean",
          prompt: "Australia is both a country and a continent.",
          answer: true,
          explanation: "Australia is a country that is also its own continent.",
        },
      ],
    },
    {
      id: "maps",
      title: "Maps & Directions",
      lesson: {
        concept: [
          "A map is a drawing of a place from above.",
          "The four main directions are North, South, East, and West.",
          "On most maps, North points up.",
        ],
        example: "A compass helps you find North so you know which way to go.",
      },
      questions: [
        {
          id: "q1",
          type: "mcq",
          prompt: "On most maps, which direction is at the top?",
          options: ["South", "North", "East", "West"],
          answerIndex: 1,
          explanation: "North is usually at the top of a map.",
        },
        {
          id: "q2",
          type: "number",
          prompt: "How many main directions are there?",
          answer: 4,
          explanation: "North, South, East, and West make 4 main directions.",
        },
        {
          id: "q3",
          type: "boolean",
          prompt: "A map shows a place from above.",
          answer: true,
          explanation: "Maps are like a bird's-eye view from the sky.",
        },
        {
          id: "q4",
          type: "mcq",
          prompt: "Which tool helps you find directions?",
          options: ["Compass", "Spoon", "Clock", "Ruler"],
          answerIndex: 0,
          explanation: "A compass points North and helps with directions.",
        },
        {
          id: "q5",
          type: "mcq",
          prompt: "The opposite of North is:",
          options: ["East", "West", "South", "Up"],
          answerIndex: 2,
          explanation: "South is the opposite of North.",
        },
      ],
    },
    {
      id: "my-country",
      title: "Countries & Cities",
      lesson: {
        concept: [
          "A country is a large area with its own government and flag.",
          "A city is a busy place inside a country where many people live.",
          "The capital city is where a country's leaders work.",
        ],
        example: "A country has many cities. One special city is the capital.",
      },
      questions: [
        {
          id: "q1",
          type: "mcq",
          prompt: "The city where a country's leaders work is called the:",
          options: ["Village", "Capital", "Farm", "Island"],
          answerIndex: 1,
          explanation: "The capital is where the country is governed.",
        },
        {
          id: "q2",
          type: "boolean",
          prompt: "A country can have many cities.",
          answer: true,
          explanation: "Countries are large and contain many cities.",
        },
        {
          id: "q3",
          type: "mcq",
          prompt: "Which of these usually represents a country?",
          options: ["A flag", "A toy", "A cloud", "A song only"],
          answerIndex: 0,
          explanation: "Each country has its own flag.",
        },
        {
          id: "q4",
          type: "boolean",
          prompt: "A city is bigger than a whole country.",
          answer: false,
          explanation: "A city is a part of a country, so it is smaller.",
        },
        {
          id: "q5",
          type: "mcq",
          prompt: "A place with a small number of people, smaller than a city, is a:",
          options: ["Village", "Continent", "Ocean", "Planet"],
          answerIndex: 0,
          explanation: "A village is smaller than a city.",
        },
      ],
    },
  ],
}

// ----------------------------------------------------------------------------
// GRADE 7
// ----------------------------------------------------------------------------

const grade7Math: Subject = {
  id: "math",
  title: "Math",
  icon: "🔢",
  color: "math",
  topics: [
    {
      id: "integers",
      title: "Integers",
      lesson: {
        concept: [
          "Integers are whole numbers that can be positive, negative, or zero.",
          "Negative numbers are less than zero, like -3.",
          "On a number line, numbers get smaller going left.",
        ],
        example: "Adding a negative is like subtracting: 5 + (-3) = 2.",
      },
      questions: [
        {
          id: "q1",
          type: "number",
          prompt: "What is -4 + 9?",
          answer: 5,
          explanation: "Start at -4 and move up 9: you reach 5.",
        },
        {
          id: "q2",
          type: "number",
          prompt: "What is -6 + (-3)?",
          answer: -9,
          explanation: "Two negatives add up: -6 + -3 = -9.",
        },
        {
          id: "q3",
          type: "mcq",
          prompt: "Which number is the smallest?",
          options: ["-5", "0", "2", "-8"],
          answerIndex: 3,
          explanation: "-8 is farthest left on the number line, so it is smallest.",
        },
        {
          id: "q4",
          type: "boolean",
          prompt: "Zero is an integer.",
          answer: true,
          explanation: "Zero is a whole number and counts as an integer.",
        },
        {
          id: "q5",
          type: "number",
          prompt: "What is 7 - 10?",
          answer: -3,
          explanation: "7 - 10 goes below zero to -3.",
        },
      ],
    },
    {
      id: "fractions",
      title: "Fractions",
      lesson: {
        concept: [
          "A fraction shows part of a whole, like 3/4.",
          "To add fractions with the same bottom, add the tops.",
          "Simplify by dividing top and bottom by the same number.",
        ],
        example: "1/4 + 2/4 = 3/4. And 2/4 simplifies to 1/2.",
      },
      questions: [
        {
          id: "q1",
          type: "mcq",
          prompt: "What is 1/5 + 2/5?",
          options: ["3/10", "3/5", "2/5", "1/2"],
          answerIndex: 1,
          explanation: "Same denominator: add tops. 1 + 2 = 3, so 3/5.",
        },
        {
          id: "q2",
          type: "mcq",
          prompt: "Which fraction is equal to 1/2?",
          options: ["2/3", "3/6", "1/4", "5/8"],
          answerIndex: 1,
          explanation: "3/6 simplifies to 1/2.",
        },
        {
          id: "q3",
          type: "boolean",
          prompt: "3/4 is greater than 1/2.",
          answer: true,
          explanation: "3/4 = 0.75 and 1/2 = 0.5, so 3/4 is greater.",
        },
        {
          id: "q4",
          type: "mcq",
          prompt: "Simplify 4/8.",
          options: ["1/2", "2/3", "1/4", "4/8"],
          answerIndex: 0,
          explanation: "Divide top and bottom by 4: 4/8 = 1/2.",
        },
        {
          id: "q5",
          type: "mcq",
          prompt: "What is 1/2 of 10?",
          options: ["2", "5", "10", "20"],
          answerIndex: 1,
          explanation: "Half of 10 is 5.",
        },
      ],
    },
    {
      id: "algebra",
      title: "Algebra",
      lesson: {
        concept: [
          "Algebra uses letters (variables) to stand for unknown numbers.",
          "In 3x, the 3 multiplies the variable x.",
          "You can combine like terms: 2x + 3x = 5x.",
        ],
        example: "If x = 4, then 3x = 3 × 4 = 12.",
      },
      questions: [
        {
          id: "q1",
          type: "number",
          prompt: "If x = 5, what is 2x?",
          answer: 10,
          explanation: "2x means 2 × x = 2 × 5 = 10.",
        },
        {
          id: "q2",
          type: "mcq",
          prompt: "Simplify: 4x + 3x.",
          options: ["7x", "12x", "7", "x7"],
          answerIndex: 0,
          explanation: "Combine like terms: 4x + 3x = 7x.",
        },
        {
          id: "q3",
          type: "number",
          prompt: "If y = 2, what is 5y + 1?",
          answer: 11,
          explanation: "5 × 2 = 10, then 10 + 1 = 11.",
        },
        {
          id: "q4",
          type: "boolean",
          prompt: "2x and 3y are like terms.",
          answer: false,
          explanation: "Like terms use the same variable. x and y are different.",
        },
        {
          id: "q5",
          type: "mcq",
          prompt: "Which expression means '5 more than a number n'?",
          options: ["5n", "n - 5", "n + 5", "5 - n"],
          answerIndex: 2,
          explanation: "'5 more than n' is n + 5.",
        },
      ],
    },
    {
      id: "equations",
      title: "Equations",
      lesson: {
        concept: [
          "An equation says two things are equal, using the = sign.",
          "To solve, do the same thing to both sides.",
          "Goal: get the variable alone on one side.",
        ],
        example: "x + 3 = 7. Subtract 3 from both sides: x = 4.",
      },
      questions: [
        {
          id: "q1",
          type: "number",
          prompt: "Solve: x + 6 = 10. What is x?",
          answer: 4,
          explanation: "Subtract 6 from both sides: x = 4.",
        },
        {
          id: "q2",
          type: "number",
          prompt: "Solve: 3x = 12. What is x?",
          answer: 4,
          explanation: "Divide both sides by 3: x = 4.",
        },
        {
          id: "q3",
          type: "number",
          prompt: "Solve: x - 5 = 9. What is x?",
          answer: 14,
          explanation: "Add 5 to both sides: x = 14.",
        },
        {
          id: "q4",
          type: "boolean",
          prompt: "To keep an equation balanced, you must do the same to both sides.",
          answer: true,
          explanation: "Whatever you do to one side, do to the other.",
        },
        {
          id: "q5",
          type: "number",
          prompt: "Solve: 2x + 1 = 9. What is x?",
          answer: 4,
          explanation: "Subtract 1 (2x = 8), then divide by 2: x = 4.",
        },
      ],
    },
    {
      id: "geometry",
      title: "Geometry",
      lesson: {
        concept: [
          "Angles are measured in degrees (°).",
          "A right angle is 90°. Angles in a triangle add up to 180°.",
          "Area of a rectangle = length × width.",
        ],
        example: "A rectangle 5 cm by 3 cm has area 5 × 3 = 15 cm².",
      },
      questions: [
        {
          id: "q1",
          type: "number",
          prompt: "How many degrees are in a right angle?",
          answer: 90,
          explanation: "A right angle is exactly 90 degrees.",
        },
        {
          id: "q2",
          type: "number",
          prompt: "The angles in a triangle add up to how many degrees?",
          answer: 180,
          explanation: "All triangle angles sum to 180°.",
        },
        {
          id: "q3",
          type: "number",
          prompt: "What is the area of a rectangle 6 by 4?",
          answer: 24,
          explanation: "Area = length × width = 6 × 4 = 24.",
        },
        {
          id: "q4",
          type: "mcq",
          prompt: "An angle greater than 90° but less than 180° is called:",
          options: ["Acute", "Right", "Obtuse", "Straight"],
          answerIndex: 2,
          explanation: "An obtuse angle is between 90° and 180°.",
        },
        {
          id: "q5",
          type: "boolean",
          prompt: "A straight line measures 180 degrees.",
          answer: true,
          explanation: "A straight angle is 180°.",
        },
      ],
    },
    {
      id: "percentages",
      title: "Percentages",
      lesson: {
        concept: [
          "Percent means 'out of 100'. The symbol is %.",
          "50% is the same as 1/2. 25% is 1/4.",
          "To find 10% of a number, divide it by 10.",
        ],
        example: "20% of 50 = 0.20 × 50 = 10.",
      },
      questions: [
        {
          id: "q1",
          type: "number",
          prompt: "What is 50% of 20?",
          answer: 10,
          explanation: "50% is half, and half of 20 is 10.",
        },
        {
          id: "q2",
          type: "number",
          prompt: "What is 10% of 90?",
          answer: 9,
          explanation: "10% means divide by 10: 90 ÷ 10 = 9.",
        },
        {
          id: "q3",
          type: "mcq",
          prompt: "25% is the same as which fraction?",
          options: ["1/2", "1/3", "1/4", "3/4"],
          answerIndex: 2,
          explanation: "25% = 25/100 = 1/4.",
        },
        {
          id: "q4",
          type: "number",
          prompt: "What is 100% of 42?",
          answer: 42,
          explanation: "100% means the whole amount, which is 42.",
        },
        {
          id: "q5",
          type: "boolean",
          prompt: "75% is more than half.",
          answer: true,
          explanation: "Half is 50%, and 75% is greater than that.",
        },
      ],
    },
  ],
}

const grade7Science: Subject = {
  id: "science",
  title: "Science",
  icon: "🔬",
  color: "science",
  topics: [
    {
      id: "cells",
      title: "Cells",
      lesson: {
        concept: [
          "Cells are the tiny building blocks of all living things.",
          "Plant and animal cells both have a nucleus that controls the cell.",
          "Plant cells also have a stiff cell wall and chloroplasts.",
        ],
        example: "Chloroplasts in plant cells capture sunlight to make food.",
      },
      questions: [
        {
          id: "q1",
          type: "mcq",
          prompt: "Which part controls the cell?",
          options: ["Cell wall", "Nucleus", "Membrane", "Vacuole"],
          answerIndex: 1,
          explanation: "The nucleus acts like the control center of the cell.",
        },
        {
          id: "q2",
          type: "boolean",
          prompt: "Plant cells have a cell wall but animal cells do not.",
          answer: true,
          explanation: "Only plant cells have a stiff cell wall.",
        },
        {
          id: "q3",
          type: "mcq",
          prompt: "What do chloroplasts help a plant cell do?",
          options: ["Make food", "Store water only", "Move", "Sleep"],
          answerIndex: 0,
          explanation: "Chloroplasts capture sunlight to make food.",
        },
        {
          id: "q4",
          type: "boolean",
          prompt: "Cells are the building blocks of living things.",
          answer: true,
          explanation: "All living things are made of one or more cells.",
        },
        {
          id: "q5",
          type: "mcq",
          prompt: "The thin layer around a cell that controls what goes in and out is the:",
          options: ["Nucleus", "Cell membrane", "Chloroplast", "Root"],
          answerIndex: 1,
          explanation: "The cell membrane controls what enters and leaves.",
        },
      ],
    },
    {
      id: "photosynthesis",
      title: "Photosynthesis",
      lesson: {
        concept: [
          "Photosynthesis is how plants make their own food.",
          "Plants use sunlight, water, and carbon dioxide.",
          "They produce sugar (food) and release oxygen.",
        ],
        example: "Leaves take in carbon dioxide and give out oxygen we breathe.",
      },
      questions: [
        {
          id: "q1",
          type: "mcq",
          prompt: "What gas do plants release during photosynthesis?",
          options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Steam"],
          answerIndex: 1,
          explanation: "Plants release oxygen during photosynthesis.",
        },
        {
          id: "q2",
          type: "boolean",
          prompt: "Plants need sunlight for photosynthesis.",
          answer: true,
          explanation: "Sunlight provides the energy for photosynthesis.",
        },
        {
          id: "q3",
          type: "mcq",
          prompt: "Which gas do plants take IN for photosynthesis?",
          options: ["Oxygen", "Carbon dioxide", "Helium", "Hydrogen"],
          answerIndex: 1,
          explanation: "Plants take in carbon dioxide.",
        },
        {
          id: "q4",
          type: "mcq",
          prompt: "Photosynthesis mainly happens in the plant's:",
          options: ["Roots", "Leaves", "Flowers", "Seeds"],
          answerIndex: 1,
          explanation: "Leaves are the main place photosynthesis happens.",
        },
        {
          id: "q5",
          type: "boolean",
          prompt: "Plants make sugar as food during photosynthesis.",
          answer: true,
          explanation: "The food plants make is a sugar called glucose.",
        },
      ],
    },
    {
      id: "forces",
      title: "Forces & Motion",
      lesson: {
        concept: [
          "A force is a push or a pull.",
          "Gravity pulls objects toward the Earth.",
          "Friction is a force that slows things down.",
        ],
        example: "A ball rolls to a stop because friction slows it down.",
      },
      questions: [
        {
          id: "q1",
          type: "mcq",
          prompt: "A force is best described as a:",
          options: ["Color", "Push or pull", "Sound", "Smell"],
          answerIndex: 1,
          explanation: "A force is a push or a pull on an object.",
        },
        {
          id: "q2",
          type: "boolean",
          prompt: "Gravity pulls objects toward the Earth.",
          answer: true,
          explanation: "Gravity is the pull toward the center of the Earth.",
        },
        {
          id: "q3",
          type: "mcq",
          prompt: "Which force slows a sliding object down?",
          options: ["Gravity", "Friction", "Magnetism", "Light"],
          answerIndex: 1,
          explanation: "Friction acts against motion and slows things down.",
        },
        {
          id: "q4",
          type: "boolean",
          prompt: "A heavier push can make an object move faster.",
          answer: true,
          explanation: "A bigger force can cause a bigger change in motion.",
        },
        {
          id: "q5",
          type: "mcq",
          prompt: "What makes a dropped ball fall down?",
          options: ["Friction", "Gravity", "Wind only", "Sound"],
          answerIndex: 1,
          explanation: "Gravity pulls the ball down toward the Earth.",
        },
      ],
    },
    {
      id: "solar-system",
      title: "The Solar System",
      lesson: {
        concept: [
          "The solar system has the Sun and 8 planets.",
          "The Sun is a star at the center; planets orbit around it.",
          "Earth is the third planet from the Sun.",
        ],
        example: "Order from the Sun: Mercury, Venus, Earth, Mars, then the big ones.",
      },
      questions: [
        {
          id: "q1",
          type: "number",
          prompt: "How many planets are in our solar system?",
          answer: 8,
          explanation: "There are 8 planets orbiting the Sun.",
        },
        {
          id: "q2",
          type: "mcq",
          prompt: "What is at the center of the solar system?",
          options: ["Earth", "The Moon", "The Sun", "Mars"],
          answerIndex: 2,
          explanation: "The Sun is at the center of the solar system.",
        },
        {
          id: "q3",
          type: "boolean",
          prompt: "The Sun is a star.",
          answer: true,
          explanation: "The Sun is the star at the center of our solar system.",
        },
        {
          id: "q4",
          type: "mcq",
          prompt: "Which planet do we live on?",
          options: ["Mars", "Venus", "Earth", "Jupiter"],
          answerIndex: 2,
          explanation: "We live on Earth, the third planet from the Sun.",
        },
        {
          id: "q5",
          type: "mcq",
          prompt: "Which is the closest planet to the Sun?",
          options: ["Mercury", "Earth", "Saturn", "Neptune"],
          answerIndex: 0,
          explanation: "Mercury is the closest planet to the Sun.",
        },
      ],
    },
    {
      id: "matter-changes",
      title: "Matter & Its Changes",
      lesson: {
        concept: [
          "Matter can change between solid, liquid, and gas.",
          "Melting: solid to liquid. Freezing: liquid to solid.",
          "Evaporation: liquid to gas. Condensation: gas to liquid.",
        ],
        example: "Water evaporates into vapor, then condenses into clouds.",
      },
      questions: [
        {
          id: "q1",
          type: "mcq",
          prompt: "Changing from solid to liquid is called:",
          options: ["Freezing", "Melting", "Boiling", "Condensing"],
          answerIndex: 1,
          explanation: "Melting is solid turning into liquid.",
        },
        {
          id: "q2",
          type: "mcq",
          prompt: "Water turning into vapor is called:",
          options: ["Evaporation", "Freezing", "Melting", "Condensation"],
          answerIndex: 0,
          explanation: "Evaporation is liquid changing into gas.",
        },
        {
          id: "q3",
          type: "boolean",
          prompt: "Freezing changes a liquid into a solid.",
          answer: true,
          explanation: "Freezing turns liquid water into solid ice.",
        },
        {
          id: "q4",
          type: "mcq",
          prompt: "Water droplets forming on a cold glass is called:",
          options: ["Condensation", "Melting", "Evaporation", "Freezing"],
          answerIndex: 0,
          explanation: "Condensation is gas (vapor) turning into liquid.",
        },
        {
          id: "q5",
          type: "boolean",
          prompt: "Matter can change from one state to another.",
          answer: true,
          explanation: "With heat or cooling, matter changes state.",
        },
      ],
    },
  ],
}

const grade7Geography: Subject = {
  id: "geography",
  title: "Geography",
  icon: "🌍",
  color: "geography",
  topics: [
    {
      id: "continents-oceans",
      title: "Continents & Oceans",
      lesson: {
        concept: [
          "Earth has 7 continents and 5 oceans.",
          "The oceans are Pacific, Atlantic, Indian, Southern, and Arctic.",
          "The Pacific is the largest and deepest ocean.",
        ],
        example: "The Pacific Ocean is bigger than all the land put together.",
      },
      questions: [
        {
          id: "q1",
          type: "number",
          prompt: "How many oceans are there on Earth?",
          answer: 5,
          explanation: "There are 5 oceans.",
        },
        {
          id: "q2",
          type: "mcq",
          prompt: "Which is the largest ocean?",
          options: ["Atlantic", "Indian", "Pacific", "Arctic"],
          answerIndex: 2,
          explanation: "The Pacific Ocean is the largest.",
        },
        {
          id: "q3",
          type: "boolean",
          prompt: "The Arctic Ocean is near the North Pole.",
          answer: true,
          explanation: "The Arctic Ocean surrounds the North Pole.",
        },
        {
          id: "q4",
          type: "number",
          prompt: "How many continents are there?",
          answer: 7,
          explanation: "Earth has 7 continents.",
        },
        {
          id: "q5",
          type: "mcq",
          prompt: "Which ocean is off the east coast of North America?",
          options: ["Pacific", "Atlantic", "Indian", "Southern"],
          answerIndex: 1,
          explanation: "The Atlantic Ocean is to the east of North America.",
        },
      ],
    },
    {
      id: "climate",
      title: "Climate Zones",
      lesson: {
        concept: [
          "Climate is the usual weather of a place over many years.",
          "The equator is hot; the poles are cold.",
          "Three broad zones: tropical, temperate, and polar.",
        ],
        example: "Rainforests near the equator are warm and wet all year.",
      },
      questions: [
        {
          id: "q1",
          type: "mcq",
          prompt: "Places near the equator are usually:",
          options: ["Very cold", "Hot", "Frozen", "Dark all day"],
          answerIndex: 1,
          explanation: "The equator gets direct sunlight, so it is hot.",
        },
        {
          id: "q2",
          type: "boolean",
          prompt: "The poles have a cold, polar climate.",
          answer: true,
          explanation: "The North and South Poles are very cold.",
        },
        {
          id: "q3",
          type: "mcq",
          prompt: "Climate is best described as:",
          options: [
            "Today's weather",
            "Weather over many years",
            "A single storm",
            "The time of day",
          ],
          answerIndex: 1,
          explanation: "Climate is the average weather over a long time.",
        },
        {
          id: "q4",
          type: "mcq",
          prompt: "A warm, wet forest near the equator is a:",
          options: ["Desert", "Rainforest", "Glacier", "Tundra"],
          answerIndex: 1,
          explanation: "Tropical rainforests are warm and rainy.",
        },
        {
          id: "q5",
          type: "boolean",
          prompt: "Deserts are usually very dry.",
          answer: true,
          explanation: "Deserts get very little rain, so they are dry.",
        },
      ],
    },
    {
      id: "landforms",
      title: "Landforms",
      lesson: {
        concept: [
          "Landforms are natural features of the Earth's surface.",
          "Mountains are tall; valleys are low areas between them.",
          "Plateaus are high flat lands; plains are wide flat lowlands.",
        ],
        example: "A river often carves a valley as it flows between mountains.",
      },
      questions: [
        {
          id: "q1",
          type: "mcq",
          prompt: "A very tall landform with a peak is a:",
          options: ["Valley", "Mountain", "Plain", "Lake"],
          answerIndex: 1,
          explanation: "Mountains are tall landforms with high peaks.",
        },
        {
          id: "q2",
          type: "mcq",
          prompt: "A wide, flat, low area of land is a:",
          options: ["Plain", "Mountain", "Cliff", "Peak"],
          answerIndex: 0,
          explanation: "Plains are wide, flat lowlands.",
        },
        {
          id: "q3",
          type: "boolean",
          prompt: "A valley is a low area between hills or mountains.",
          answer: true,
          explanation: "Valleys are the low land between higher ground.",
        },
        {
          id: "q4",
          type: "mcq",
          prompt: "A high area of flat land is called a:",
          options: ["Plateau", "Valley", "River", "Bay"],
          answerIndex: 0,
          explanation: "A plateau is raised flat land.",
        },
        {
          id: "q5",
          type: "boolean",
          prompt: "Rivers can shape the land as they flow.",
          answer: true,
          explanation: "Flowing water slowly carves valleys and canyons.",
        },
      ],
    },
    {
      id: "maps-latitude",
      title: "Maps & Latitude",
      lesson: {
        concept: [
          "Lines of latitude run east-west and measure north or south.",
          "The equator is 0° latitude, halfway between the poles.",
          "Lines of longitude run north-south.",
        ],
        example: "The equator splits Earth into the Northern and Southern Hemispheres.",
      },
      questions: [
        {
          id: "q1",
          type: "number",
          prompt: "What is the latitude of the equator, in degrees?",
          answer: 0,
          explanation: "The equator is at 0° latitude.",
        },
        {
          id: "q2",
          type: "mcq",
          prompt: "Lines of latitude run in which direction?",
          options: ["East-west", "North-south", "Up-down only", "In circles around cities"],
          answerIndex: 0,
          explanation: "Latitude lines run east to west.",
        },
        {
          id: "q3",
          type: "boolean",
          prompt: "The equator divides Earth into North and South halves.",
          answer: true,
          explanation: "It splits Earth into Northern and Southern Hemispheres.",
        },
        {
          id: "q4",
          type: "mcq",
          prompt: "Lines that run north-south are lines of:",
          options: ["Latitude", "Longitude", "Weather", "Climate"],
          answerIndex: 1,
          explanation: "Longitude lines run north to south.",
        },
        {
          id: "q5",
          type: "mcq",
          prompt: "The imaginary line at 0° latitude is the:",
          options: ["Equator", "Prime Meridian", "Tropic", "Border"],
          answerIndex: 0,
          explanation: "0° latitude is the equator.",
        },
      ],
    },
  ],
}

// ----------------------------------------------------------------------------
// EXPORT
// ----------------------------------------------------------------------------

export const curriculum: Grade[] = [
  {
    id: "grade-3",
    title: "Grade 3",
    subjects: [grade3Math, grade3Science, grade3Geography],
  },
  {
    id: "grade-7",
    title: "Grade 7",
    subjects: [grade7Math, grade7Science, grade7Geography],
  },
]

// Helpers to look up content by id.
export function getGrade(gradeId: string): Grade | undefined {
  return curriculum.find((g) => g.id === gradeId)
}

export function getSubject(gradeId: string, subjectId: string): Subject | undefined {
  return getGrade(gradeId)?.subjects.find((s) => s.id === subjectId)
}

export function getTopic(gradeId: string, subjectId: string, topicId: string): Topic | undefined {
  return getSubject(gradeId, subjectId)?.topics.find((t) => t.id === topicId)
}
