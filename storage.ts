import type { 
  User, 
  InsertUser, 
  Course, 
  InsertCourse,
  Quiz,
  InsertQuiz,
  Question,
  InsertQuestion,
  UserProgress,
  InsertUserProgress,
  Location,
  InsertLocation
} from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import * as schema from "@shared/schema";
import { eq } from "drizzle-orm";
import { WebSocket } from "ws";

neonConfig.webSocketConstructor = WebSocket;

export interface IStorage {
  getUser(phone: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getCourses(): Promise<Course[]>;
  getCourse(id: string): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  
  getQuizzesByCourse(courseId: string): Promise<Quiz[]>;
  getQuiz(id: string): Promise<Quiz | undefined>;
  createQuiz(quiz: InsertQuiz): Promise<Quiz>;
  
  getQuestionsByQuiz(quizId: string): Promise<Question[]>;
  createQuestion(question: InsertQuestion): Promise<Question>;
  
  getUserProgress(userId: string, quizId: string): Promise<UserProgress | undefined>;
  createUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  updateUserProgress(id: string, progress: Partial<UserProgress>): Promise<UserProgress>;
  
  getLocations(): Promise<Location[]>;
  getLocation(id: string): Promise<Location | undefined>;
  createLocation(location: InsertLocation): Promise<Location>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private courses: Map<string, Course> = new Map();
  private quizzes: Map<string, Quiz> = new Map();
  private questions: Map<string, Question> = new Map();
  private userProgress: Map<string, UserProgress> = new Map();
  private locations: Map<string, Location> = new Map();

  constructor() {
    this.seedData();
  }

  private seedData() {
    const courses: Course[] = [
      {
        id: "course-1",
        title: "Дискретная математика",
        description: "Дискретная математика и математическая логика",
        imageUrl: "/course1.jpg",
        difficulty: "1",
      },
      {
        id: "course-2",
        title: "Теория вероятности",
        description: "Теория вероятности и математическая статистика",
        imageUrl: "/course2.jpg",
        difficulty: "2",
      },
      {
        id: "course-3",
        title: "Линейная алгебра",
        description: "Матрицы, векторы и линейные преобразования",
        imageUrl: "/course3.jpg",
        difficulty: "3",
      },
      {
        id: "course-4",
        title: "Математический анализ",
        description: "Дифференциальное и интегральное исчисление",
        imageUrl: "/course4.jpg",
        difficulty: "4",
      },
      {
        id: "course-5",
        title: "Аналитическая геометрия",
        description: "Геометрия на плоскости и в пространстве",
        imageUrl: "/course5.jpg",
        difficulty: "5",
      },
      {
        id: "course-6",
        title: "Теория графов",
        description: "Основы теории графов и их применение",
        imageUrl: "/course6.jpg",
        difficulty: "6",
      },
    ];

    courses.forEach(course => this.courses.set(course.id, course));

    const quizzes: Quiz[] = [
      {
        id: "quiz-1",
        courseId: "course-1",
        title: "Дискретная математика",
        totalQuestions: 5,
      },
      {
        id: "quiz-2",
        courseId: "course-2",
        title: "Теория вероятности",
        totalQuestions: 5,
      },
      {
        id: "quiz-3",
        courseId: "course-3",
        title: "Линейная алгебра",
        totalQuestions: 5,
      },
      {
        id: "quiz-4",
        courseId: "course-4",
        title: "Математический анализ",
        totalQuestions: 5,
      },
      {
        id: "quiz-5",
        courseId: "course-5",
        title: "Аналитическая геометрия",
        totalQuestions: 5,
      },
      {
        id: "quiz-6",
        courseId: "course-6",
        title: "Теория графов",
        totalQuestions: 5,
      },
    ];

    quizzes.forEach(quiz => this.quizzes.set(quiz.id, quiz));

    const questions: Question[] = [
      {
        id: "q1-1",
        quizId: "quiz-1",
        questionText: "В новом посёлке 7 домиков. Они уже стоят, а дорожки надо проложить. Нужно выбрать план, при котором бульдозер сможет расчистить все дорожки по каждой из одному разу и вернуться в начальную точку, всё варианты",
        options: null,
        correctAnswer: "720",
        order: 1,
      },
      {
        id: "q1-2",
        quizId: "quiz-1",
        questionText: "Есть четырехзначный код, состоящий из цифр, найдите вероятность, что по всем разные",
        options: null,
        correctAnswer: "0.504",
        order: 2,
      },
      {
        id: "q1-3",
        quizId: "quiz-1",
        questionText: "Сколькими способами можно взять 4 детали из ящика, где находится 15 деталей?",
        options: ["1000", "1365", "1500", "2000"],
        correctAnswer: "1365",
        order: 3,
      },
      {
        id: "q1-4",
        quizId: "quiz-1",
        questionText: "В ящике находятся 15 деталей. Сколькими способами можно взять 4 детали из разных ящиков, если ящиков 2 и они одинаковые?",
        options: ["2730", "3000", "4095", "5000"],
        correctAnswer: "2730",
        order: 4,
      },
      {
        id: "q1-5",
        quizId: "quiz-1",
        questionText: "Сколько различных перестановок можно сделать из букв слова 'МАТЕМАТИКА'?",
        options: ["151200", "252000", "302400", "453600"],
        correctAnswer: "151200",
        order: 5,
      },
      {
        id: "q2-1",
        quizId: "quiz-2",
        questionText: "В коробке 5 красных и 7 синих шаров. Какова вероятность вытащить красный шар?",
        options: null,
        correctAnswer: "0.417",
        order: 1,
      },
      {
        id: "q2-2",
        quizId: "quiz-2",
        questionText: "Монету подбрасывают 3 раза. Какова вероятность выпадения орла ровно 2 раза?",
        options: null,
        correctAnswer: "0.375",
        order: 2,
      },
      {
        id: "q2-3",
        quizId: "quiz-2",
        questionText: "В урне 10 белых и 5 черных шаров. Вытаскивают 2 шара. Какова вероятность, что оба белые?",
        options: ["0.3", "0.428", "0.5", "0.6"],
        correctAnswer: "0.428",
        order: 3,
      },
      {
        id: "q2-4",
        quizId: "quiz-2",
        questionText: "Игральную кость бросают дважды. Какова вероятность, что сумма очков равна 7?",
        options: ["0.139", "0.167", "0.194", "0.222"],
        correctAnswer: "0.167",
        order: 4,
      },
      {
        id: "q2-5",
        quizId: "quiz-2",
        questionText: "Стрелок попадает в цель с вероятностью 0.8. Он делает 3 выстрела. Какова вероятность хотя бы одного попадания?",
        options: ["0.896", "0.912", "0.984", "0.992"],
        correctAnswer: "0.992",
        order: 5,
      },
      {
        id: "q3-1",
        quizId: "quiz-3",
        questionText: "Найдите определитель матрицы [[2, 3], [1, 4]]",
        options: ["3", "5", "7", "8"],
        correctAnswer: "5",
        order: 1,
      },
      {
        id: "q3-2",
        quizId: "quiz-3",
        questionText: "Какое из следующих утверждений верно для обратимой матрицы A?",
        options: ["det(A) = 0", "det(A) ≠ 0", "A имеет нулевую строку", "A = 0"],
        correctAnswer: "det(A) ≠ 0",
        order: 2,
      },
      {
        id: "q3-3",
        quizId: "quiz-3",
        questionText: "Найдите ранг матрицы [[1, 2, 3], [2, 4, 6], [1, 1, 1]]",
        options: ["1", "2", "3", "4"],
        correctAnswer: "2",
        order: 3,
      },
      {
        id: "q3-4",
        quizId: "quiz-3",
        questionText: "Чему равно скалярное произведение векторов (3, 4) и (1, 2)?",
        options: ["7", "9", "11", "13"],
        correctAnswer: "11",
        order: 4,
      },
      {
        id: "q3-5",
        quizId: "quiz-3",
        questionText: "Какова длина вектора (3, 4)?",
        options: ["5", "6", "7", "8"],
        correctAnswer: "5",
        order: 5,
      },
      {
        id: "q4-1",
        quizId: "quiz-4",
        questionText: "Найдите производную функции f(x) = x³",
        options: ["x²", "2x²", "3x²", "4x²"],
        correctAnswer: "3x²",
        order: 1,
      },
      {
        id: "q4-2",
        quizId: "quiz-4",
        questionText: "Чему равен предел lim(x→0) (sin x)/x?",
        options: ["0", "0.5", "1", "∞"],
        correctAnswer: "1",
        order: 2,
      },
      {
        id: "q4-3",
        quizId: "quiz-4",
        questionText: "Найдите интеграл ∫x dx",
        options: ["x", "x²", "x²/2", "2x"],
        correctAnswer: "x²/2",
        order: 3,
      },
      {
        id: "q4-4",
        quizId: "quiz-4",
        questionText: "Найдите производную функции f(x) = e^x",
        options: ["e^x", "xe^x", "e", "1"],
        correctAnswer: "e^x",
        order: 4,
      },
      {
        id: "q4-5",
        quizId: "quiz-4",
        questionText: "Чему равна вторая производная функции f(x) = x⁴?",
        options: ["4x³", "8x²", "12x²", "16x"],
        correctAnswer: "12x²",
        order: 5,
      },
      {
        id: "q5-1",
        quizId: "quiz-5",
        questionText: "Найдите расстояние между точками A(1, 2) и B(4, 6)",
        options: ["3", "4", "5", "6"],
        correctAnswer: "5",
        order: 1,
      },
      {
        id: "q5-2",
        quizId: "quiz-5",
        questionText: "Какое уравнение описывает окружность с центром в (0, 0) и радиусом 5?",
        options: ["x² + y² = 5", "x² + y² = 10", "x² + y² = 25", "x + y = 5"],
        correctAnswer: "x² + y² = 25",
        order: 2,
      },
      {
        id: "q5-3",
        quizId: "quiz-5",
        questionText: "Найдите уравнение прямой, проходящей через точки (0, 0) и (2, 4)",
        options: ["y = x", "y = 2x", "y = 3x", "y = 4x"],
        correctAnswer: "y = 2x",
        order: 3,
      },
      {
        id: "q5-4",
        quizId: "quiz-5",
        questionText: "Какой угол образуют векторы (1, 0) и (0, 1)?",
        options: ["45°", "60°", "90°", "180°"],
        correctAnswer: "90°",
        order: 4,
      },
      {
        id: "q5-5",
        quizId: "quiz-5",
        questionText: "Найдите координаты середины отрезка с концами в точках (2, 4) и (6, 8)",
        options: ["(4, 6)", "(4, 8)", "(6, 6)", "(8, 12)"],
        correctAnswer: "(4, 6)",
        order: 5,
      },
      {
        id: "q6-1",
        quizId: "quiz-6",
        questionText: "Сколько ребер в полном графе с 5 вершинами?",
        options: ["8", "10", "12", "15"],
        correctAnswer: "10",
        order: 1,
      },
      {
        id: "q6-2",
        quizId: "quiz-6",
        questionText: "Какой граф называется деревом?",
        options: ["Граф без циклов", "Связный граф без циклов", "Полный граф", "Граф с циклами"],
        correctAnswer: "Связный граф без циклов",
        order: 2,
      },
      {
        id: "q6-3",
        quizId: "quiz-6",
        questionText: "Сколько рёбер в дереве с 10 вершинами?",
        options: ["8", "9", "10", "11"],
        correctAnswer: "9",
        order: 3,
      },
      {
        id: "q6-4",
        quizId: "quiz-6",
        questionText: "Что такое степень вершины в графе?",
        options: ["Число вершин", "Число рёбер", "Число инцидентных рёбер", "Число циклов"],
        correctAnswer: "Число инцидентных рёбер",
        order: 4,
      },
      {
        id: "q6-5",
        quizId: "quiz-6",
        questionText: "Какова сумма степеней всех вершин в графе с 6 рёбрами?",
        options: ["6", "8", "10", "12"],
        correctAnswer: "12",
        order: 5,
      },
    ];

    questions.forEach(q => this.questions.set(q.id, q));

    const locations: Location[] = [
      {
        id: "loc-1",
        name: "УрФУ имени Б.Н. Ельцина",
        lat: "56.8449",
        lng: "60.6515",
        address: "ул. Мира, 19, Екатеринбург",
        description: "Ведущий университет Урала, предлагающий широкий спектр образовательных программ в области естественных наук, инженерии и гуманитарных дисциплин",
      },
      {
        id: "loc-2",
        name: "УрГПУ",
        lat: "56.8571",
        lng: "60.6121",
        address: "пр. Космонавтов, 26, Екатеринбург",
        description: "Педагогический университет с богатой историей подготовки квалифицированных специалистов в области образования и воспитания",
      },
      {
        id: "loc-3",
        name: "УрГЭУ",
        lat: "56.8389",
        lng: "60.6057",
        address: "ул. 8 Марта, 62, Екатеринбург",
        description: "Экономический университет, специализирующийся на подготовке специалистов в области экономики, финансов и управления",
      },
      {
        id: "loc-4",
        name: "УрГУПС",
        lat: "56.8144",
        lng: "60.6437",
        address: "ул. Колмогорова, 66, Екатеринбург",
        description: "Университет путей сообщения, готовящий инженеров и специалистов для железнодорожного транспорта и логистики",
      },
      {
        id: "loc-5",
        name: "УрГАХУ",
        lat: "56.8279",
        lng: "60.5971",
        address: "ул. Карла Либкнехта, 23, Екатеринбург",
        description: "Архитектурно-художественный университет, воспитывающий талантливых архитекторов и дизайнеров",
      },
      {
        id: "loc-6",
        name: "РГППУ",
        lat: "56.8501",
        lng: "60.6282",
        address: "ул. Машиностроителей, 11, Екатеринбург",
        description: "Профессионально-педагогический университет, сочетающий техническое и педагогическое образование",
      },
    ];

    locations.forEach(loc => this.locations.set(loc.id, loc));
  }

  async getUser(phone: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.phone === phone);
  }

  async createUser(user: InsertUser): Promise<User> {
    const newUser: User = {
      id: `user-${Date.now()}`,
      ...user,
    };
    this.users.set(newUser.id, newUser);
    return newUser;
  }

  async getCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCourse(id: string): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    const newCourse: Course = {
      ...course,
      id: `course-${Date.now()}`,
      description: course.description ?? null,
      imageUrl: course.imageUrl ?? null,
      difficulty: course.difficulty ?? null,
    };
    this.courses.set(newCourse.id, newCourse);
    return newCourse;
  }

  async getQuizzesByCourse(courseId: string): Promise<Quiz[]> {
    return Array.from(this.quizzes.values()).filter(q => q.courseId === courseId);
  }

  async getQuiz(id: string): Promise<Quiz | undefined> {
    return this.quizzes.get(id);
  }

  async createQuiz(quiz: InsertQuiz): Promise<Quiz> {
    const newQuiz: Quiz = {
      id: `quiz-${Date.now()}`,
      ...quiz,
    };
    this.quizzes.set(newQuiz.id, newQuiz);
    return newQuiz;
  }

  async getQuestionsByQuiz(quizId: string): Promise<Question[]> {
    return Array.from(this.questions.values())
      .filter(q => q.quizId === quizId)
      .sort((a, b) => a.order - b.order);
  }

  async createQuestion(question: InsertQuestion): Promise<Question> {
    const newQuestion: Question = {
      id: `question-${Date.now()}`,
      ...question,
      options: question.options ?? null,
    };
    this.questions.set(newQuestion.id, newQuestion);
    return newQuestion;
  }

  async getUserProgress(userId: string, quizId: string): Promise<UserProgress | undefined> {
    return Array.from(this.userProgress.values())
      .find(p => p.userId === userId && p.quizId === quizId);
  }

  async createUserProgress(progress: InsertUserProgress): Promise<UserProgress> {
    const newProgress: UserProgress = {
      ...progress,
      id: `progress-${Date.now()}`,
      completed: progress.completed ?? false,
      completionCode: progress.completionCode ?? null,
    };
    this.userProgress.set(newProgress.id, newProgress);
    return newProgress;
  }

  async updateUserProgress(id: string, progress: Partial<UserProgress>): Promise<UserProgress> {
    const existing = this.userProgress.get(id);
    if (!existing) {
      throw new Error("Progress not found");
    }
    const updated = { ...existing, ...progress };
    this.userProgress.set(id, updated);
    return updated;
  }

  async getLocations(): Promise<Location[]> {
    return Array.from(this.locations.values());
  }

  async getLocation(id: string): Promise<Location | undefined> {
    return this.locations.get(id);
  }

  async createLocation(location: InsertLocation): Promise<Location> {
    const newLocation: Location = {
      id: `location-${Date.now()}`,
      ...location,
      description: location.description ?? null,
    };
    this.locations.set(newLocation.id, newLocation);
    return newLocation;
  }
}

export class DbStorage implements IStorage {
  private db;

  constructor() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    this.db = drizzle(pool, { schema });
  }

  async getUser(phone: string): Promise<User | undefined> {
    const users = await this.db.select().from(schema.users).where(eq(schema.users.phone, phone));
    return users[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await this.db.insert(schema.users).values(user).returning();
    return newUser;
  }

  async getCourses(): Promise<Course[]> {
    return await this.db.select().from(schema.courses);
  }

  async getCourse(id: string): Promise<Course | undefined> {
    const courses = await this.db.select().from(schema.courses).where(eq(schema.courses.id, id));
    return courses[0];
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    const [newCourse] = await this.db.insert(schema.courses).values(course).returning();
    return newCourse;
  }

  async getQuizzesByCourse(courseId: string): Promise<Quiz[]> {
    return await this.db.select().from(schema.quizzes).where(eq(schema.quizzes.courseId, courseId));
  }

  async getQuiz(id: string): Promise<Quiz | undefined> {
    const quizzes = await this.db.select().from(schema.quizzes).where(eq(schema.quizzes.id, id));
    return quizzes[0];
  }

  async createQuiz(quiz: InsertQuiz): Promise<Quiz> {
    const [newQuiz] = await this.db.insert(schema.quizzes).values(quiz).returning();
    return newQuiz;
  }

  async getQuestionsByQuiz(quizId: string): Promise<Question[]> {
    const questions = await this.db.select().from(schema.questions).where(eq(schema.questions.quizId, quizId));
    return questions.sort((a, b) => a.order - b.order);
  }

  async createQuestion(question: InsertQuestion): Promise<Question> {
    const [newQuestion] = await this.db.insert(schema.questions).values(question).returning();
    return newQuestion;
  }

  async getUserProgress(userId: string, quizId: string): Promise<UserProgress | undefined> {
    const progress = await this.db.select().from(schema.userProgress)
      .where(eq(schema.userProgress.userId, userId));
    return progress.find(p => p.quizId === quizId);
  }

  async createUserProgress(progress: InsertUserProgress): Promise<UserProgress> {
    const [newProgress] = await this.db.insert(schema.userProgress).values(progress).returning();
    return newProgress;
  }

  async updateUserProgress(id: string, progress: Partial<UserProgress>): Promise<UserProgress> {
    const [updated] = await this.db.update(schema.userProgress)
      .set(progress)
      .where(eq(schema.userProgress.id, id))
      .returning();
    return updated;
  }

  async getLocations(): Promise<Location[]> {
    return await this.db.select().from(schema.locations);
  }

  async getLocation(id: string): Promise<Location | undefined> {
    const locations = await this.db.select().from(schema.locations).where(eq(schema.locations.id, id));
    return locations[0];
  }

  async createLocation(location: InsertLocation): Promise<Location> {
    const [newLocation] = await this.db.insert(schema.locations).values(location).returning();
    return newLocation;
  }
}

// Используем MemStorage для работы в памяти (как раньше)
// Если понадобится база данных, раскомментируйте следующую строку:
// export const storage = new DbStorage();
export const storage = new MemStorage();
