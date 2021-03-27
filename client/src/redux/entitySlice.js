import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import APIService from '../utils/APIService'

const addNewEntity = createAsyncThunk(
  'entity/add-new',
  async (data, thunkAPI) => {
    const { email, token } = thunkAPI.getState().authenticationReducer
    const { entity } = thunkAPI.getState().entityReducer
    const response = await APIService.addNewEntity({
      data,
      email,
      token,
      entity,
    })
    return response
  }
)

export const entitySlice = createSlice({
  name: 'entity',
  initialState: {
    entity: null,
    view: null,
    data: [],
  },
  reducers: {
    setEntity: (state, action) => {
      state.entity = action.payload
    },
    clearEntity: (state) => {
      state.entity = null
    },
    setView: (state, action) => {
      state.view = action.payload
    },
    clearView: (state) => {
      state.view = null
    },
  },
  extraReducers: {
    [addNewEntity.fulfilled]: (state, action) => {
      state.view = 'table'
      const data = action.meta.arg
      const { id } = action.payload
      state.data.push({ ...data, id })
    },
    [addNewEntity.rejected]: (_, action) => alert(action.error.message),
  },
})

const { actions, reducer } = entitySlice

export const { setEntity, clearEntity, setView, clearView } = actions

export { addNewEntity }

export default reducer
