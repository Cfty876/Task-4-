import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import * as schema from "@shared/schema";

async function seed() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool, { schema });

  console.log("Seeding database...");

  const courses = [
    {
      title: "Дискретная математика",
      description: "Дискретная математика и математическая логика",
      imageUrl: "/course1.jpg",
      difficulty: "1",
    },
    {
      title: "Теория вероятности",
      description: "Теория вероятности и математическая статистика",
      imageUrl: "/course2.jpg",
      difficulty: "2",
    },
    {
      title: "Линейная алгебра",
      description: "Матрицы, векторы и линейные преобразования",
      imageUrl: "/course3.jpg",
      difficulty: "3",
    },
    {
      title: "Математический анализ",
      description: "Дифференциальное и интегральное исчисление",
      imageUrl: "/course4.jpg",
      difficulty: "4",
    },
    {
      title: "Аналитическая геометрия",
      description: "Геометрия на плоскости и в пространстве",
      imageUrl: "/course5.jpg",
      difficulty: "5",
    },
    {
      title: "Теория графов",
      description: "Основы теории графов и их применение",
      imageUrl: "/course6.jpg",
      difficulty: "6",
    },
  ];

  console.log("Inserting courses...");
  const insertedCourses = await db.insert(schema.courses).values(courses).returning();
  console.log(`Inserted ${insertedCourses.length} courses`);

  const quizzes = insertedCourses.map((course, index) => ({
    courseId: course.id,
    title: course.title,
    totalQuestions: 5,
  }));

  console.log("Inserting quizzes...");
  const insertedQuizzes = await db.insert(schema.quizzes).values(quizzes).returning();
  console.log(`Inserted ${insertedQuizzes.length} quizzes`);

  const questions = [
    {
      quizId: insertedQuizzes[0].id,
      questionText: "В новом посёлке 7 домиков. Они уже стоят, а дорожки надо проложить. Нужно выбрать план, при котором бульдозер сможет расчистить все дорожки по каждой из одному разу и вернуться в начальную точку, всё варианты",
      options: null,
      correctAnswer: "720",
      order: 1,
    },
    {
      quizId: insertedQuizzes[0].id,
      questionText: "Есть четырехзначный код, состоящий из цифр, найдите вероятность, что все цифры разные",
      options: null,
      correctAnswer: "0.504",
      order: 2,
    },
    {
      quizId: insertedQuizzes[0].id,
      questionText: "Сколькими способами можно взять 4 детали из ящика, где находится 15 деталей?",
      options: null,
      correctAnswer: "1365",
      order: 3,
    },
    {
      quizId: insertedQuizzes[0].id,
      questionText: "В ящике находятся 15 деталей. Сколькими способами можно взять 4 детали из разных ящиков, если ящиков 2 и они одинаковые?",
      options: null,
      correctAnswer: "2730",
      order: 4,
    },
    {
      quizId: insertedQuizzes[0].id,
      questionText: "Сколько различных перестановок можно сделать из букв слова 'МАТЕМАТИКА'?",
      options: ["151200", "252000", "302400", "453600"],
      correctAnswer: "151200",
      order: 5,
    },
    {
      quizId: insertedQuizzes[1].id,
      questionText: "В коробке 5 красных и 7 синих шаров. Какова вероятность вытащить красный шар?",
      options: null,
      correctAnswer: "0.417",
      order: 1,
    },
    {
      quizId: insertedQuizzes[1].id,
      questionText: "Монету подбрасывают 3 раза. Какова вероятность выпадения орла ровно 2 раза?",
      options: null,
      correctAnswer: "0.375",
      order: 2,
    },
    {
      quizId: insertedQuizzes[1].id,
      questionText: "В урне 10 белых и 5 черных шаров. Вытаскивают 2 шара. Какова вероятность, что оба белые?",
      options: null,
      correctAnswer: "0.428",
      order: 3,
    },
    {
      quizId: insertedQuizzes[1].id,
      questionText: "Игральную кость бросают дважды. Какова вероятность, что сумма очков равна 7?",
      options: ["0.139", "0.167", "0.194", "0.222"],
      correctAnswer: "0.167",
      order: 4,
    },
    {
      quizId: insertedQuizzes[1].id,
      questionText: "Стрелок попадает в цель с вероятностью 0.8. Он делает 3 выстрела. Какова вероятность хотя бы одного попадания?",
      options: null,
      correctAnswer: "0.992",
      order: 5,
    },
    {
      quizId: insertedQuizzes[2].id,
      questionText: "Найдите определитель матрицы [[2, 3], [1, 4]]",
      options: null,
      correctAnswer: "5",
      order: 1,
    },
    {
      quizId: insertedQuizzes[2].id,
      questionText: "Какое из следующих утверждений верно для обратимой матрицы A?",
      options: ["det(A) = 0", "det(A) ≠ 0", "A имеет нулевую строку", "A = 0"],
      correctAnswer: "det(A) ≠ 0",
      order: 2,
    },
    {
      quizId: insertedQuizzes[2].id,
      questionText: "Найдите ранг матрицы [[1, 2, 3], [2, 4, 6], [1, 1, 1]]",
      options: null,
      correctAnswer: "2",
      order: 3,
    },
    {
      quizId: insertedQuizzes[2].id,
      questionText: "Чему равно скалярное произведение векторов (3, 4) и (1, 2)?",
      options: null,
      correctAnswer: "11",
      order: 4,
    },
    {
      quizId: insertedQuizzes[2].id,
      questionText: "Какова длина вектора (3, 4)?",
      options: null,
      correctAnswer: "5",
      order: 5,
    },
    {
      quizId: insertedQuizzes[3].id,
      questionText: "Найдите производную функции f(x) = x³",
      options: null,
      correctAnswer: "3x²",
      order: 1,
    },
    {
      quizId: insertedQuizzes[3].id,
      questionText: "Чему равен предел lim(x→0) (sin x)/x?",
      options: null,
      correctAnswer: "1",
      order: 2,
    },
    {
      quizId: insertedQuizzes[3].id,
      questionText: "Найдите интеграл ∫x dx",
      options: ["x", "x²", "x²/2", "2x"],
      correctAnswer: "x²/2",
      order: 3,
    },
    {
      quizId: insertedQuizzes[3].id,
      questionText: "Найдите производную функции f(x) = e^x",
      options: null,
      correctAnswer: "e^x",
      order: 4,
    },
    {
      quizId: insertedQuizzes[3].id,
      questionText: "Чему равна вторая производная функции f(x) = x⁴?",
      options: null,
      correctAnswer: "12x²",
      order: 5,
    },
    {
      quizId: insertedQuizzes[4].id,
      questionText: "Найдите расстояние между точками A(1, 2) и B(4, 6)",
      options: null,
      correctAnswer: "5",
      order: 1,
    },
    {
      quizId: insertedQuizzes[4].id,
      questionText: "Какое уравнение описывает окружность с центром в (0, 0) и радиусом 5?",
      options: null,
      correctAnswer: "x² + y² = 25",
      order: 2,
    },
    {
      quizId: insertedQuizzes[4].id,
      questionText: "Найдите уравнение прямой, проходящей через точки (0, 0) и (2, 4)",
      options: ["y = x", "y = 2x", "y = 3x", "y = 4x"],
      correctAnswer: "y = 2x",
      order: 3,
    },
    {
      quizId: insertedQuizzes[4].id,
      questionText: "Какой угол образуют векторы (1, 0) и (0, 1)?",
      options: null,
      correctAnswer: "90°",
      order: 4,
    },
    {
      quizId: insertedQuizzes[4].id,
      questionText: "Найдите координаты середины отрезка с концами в точках (2, 4) и (6, 8)",
      options: null,
      correctAnswer: "(4, 6)",
      order: 5,
    },
    {
      quizId: insertedQuizzes[5].id,
      questionText: "Сколько ребер в полном графе с 5 вершинами?",
      options: null,
      correctAnswer: "10",
      order: 1,
    },
    {
      quizId: insertedQuizzes[5].id,
      questionText: "Какой граф называется деревом?",
      options: ["Граф без циклов", "Связный граф без циклов", "Полный граф", "Граф с циклами"],
      correctAnswer: "Связный граф без циклов",
      order: 2,
    },
    {
      quizId: insertedQuizzes[5].id,
      questionText: "Сколько рёбер в дереве с 10 вершинами?",
      options: null,
      correctAnswer: "9",
      order: 3,
    },
    {
      quizId: insertedQuizzes[5].id,
      questionText: "Что такое степень вершины в графе?",
      options: null,
      correctAnswer: "Число инцидентных рёбер",
      order: 4,
    },
    {
      quizId: insertedQuizzes[5].id,
      questionText: "Какова сумма степеней всех вершин в графе с 6 рёбрами?",
      options: null,
      correctAnswer: "12",
      order: 5,
    },
  ];

  console.log("Inserting questions...");
  const insertedQuestions = await db.insert(schema.questions).values(questions).returning();
  console.log(`Inserted ${insertedQuestions.length} questions`);

  const locations = [
    {
      name: "УрФУ им. Ельцина",
      lat: "56.8435",
      lng: "60.6525",
      address: "ул. Мира, 19",
    },
    {
      name: "УрГПУ",
      lat: "56.8575",
      lng: "60.6113",
      address: "пр. Космонавтов, 26",
    },
    {
      name: "УрГЭУ",
      lat: "56.8398",
      lng: "60.5971",
      address: "ул. 8 Марта, 62",
    },
    {
      name: "УрГАХУ",
      lat: "56.8333",
      lng: "60.6089",
      address: "ул. Карла Либкнехта, 23",
    },
    {
      name: "УрГУПС",
      lat: "56.8457",
      lng: "60.6443",
      address: "ул. Колмогорова, 66",
    },
    {
      name: "УрГМУ",
      lat: "56.8289",
      lng: "60.6025",
      address: "ул. Репина, 3",
    },
    {
      name: "РГППУ",
      lat: "56.8445",
      lng: "60.6525",
      address: "ул. Машиностроителей, 11",
    },
    {
      name: "УрГАУ",
      lat: "56.8123",
      lng: "60.5543",
      address: "ул. Карла Маркса, 42",
    },
    {
      name: "УрЮИ МВД России",
      lat: "56.8610",
      lng: "60.6231",
      address: "ул. Корепина, 66",
    },
    {
      name: "УИ ГПС МЧС России",
      lat: "56.8567",
      lng: "60.5889",
      address: "ул. Мира, 22",
    },
  ];

  console.log("Inserting locations...");
  const insertedLocations = await db.insert(schema.locations).values(locations).returning();
  console.log(`Inserted ${insertedLocations.length} locations`);

  console.log("Seeding completed successfully!");
  await pool.end();
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
