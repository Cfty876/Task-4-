import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  createdAt: string;
}

interface StudentsState {
  students: Student[];
}

const initialState: StudentsState = {
  students: [],
};

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    addStudent: (state, action: PayloadAction<Omit<Student, 'createdAt'> & { id?: string }>) => {
      const newStudent: Student = {
        ...action.payload,
        id: action.payload.id || `student-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      state.students.push(newStudent);
    },
    removeStudent: (state, action: PayloadAction<string>) => {
      state.students = state.students.filter(student => student.id !== action.payload);
    },
    updateStudent: (state, action: PayloadAction<Student>) => {
      const index = state.students.findIndex(student => student.id === action.payload.id);
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    },
  },
});

export const { addStudent, removeStudent, updateStudent } = studentsSlice.actions;
export default studentsSlice.reducer;
