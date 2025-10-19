import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Group {
  id: string;
  name: string;
  description?: string;
  studentIds: string[];
  createdAt: string;
}

interface GroupsState {
  groups: Group[];
}

const initialState: GroupsState = {
  groups: [],
};

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<Omit<Group, 'id' | 'createdAt'>>) => {
      const newGroup: Group = {
        ...action.payload,
        id: `group-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      state.groups.push(newGroup);
    },
    removeGroup: (state, action: PayloadAction<string>) => {
      state.groups = state.groups.filter(group => group.id !== action.payload);
    },
    updateGroup: (state, action: PayloadAction<Group>) => {
      const index = state.groups.findIndex(group => group.id === action.payload.id);
      if (index !== -1) {
        state.groups[index] = action.payload;
      }
    },
    addStudentToGroup: (state, action: PayloadAction<{ groupId: string; studentId: string }>) => {
      const group = state.groups.find(g => g.id === action.payload.groupId);
      if (group && !group.studentIds.includes(action.payload.studentId)) {
        group.studentIds.push(action.payload.studentId);
      }
    },
  },
});

export const { addGroup, removeGroup, updateGroup, addStudentToGroup } = groupsSlice.actions;
export default groupsSlice.reducer;
