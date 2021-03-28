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

const getAllEntities = createAsyncThunk(
  'entity/get-all',
  async (data, thunkAPI) => {
    const { email, token } = thunkAPI.getState().authenticationReducer
    const { entity } = thunkAPI.getState().entityReducer
    const response = await APIService.getAllEntities({
      email,
      token,
      entity,
    })
    return response
  }
)

const getAllSubentities = createAsyncThunk(
  'entity/get-all-subentities',
  async (data, thunkAPI) => {
    const { email, token } = thunkAPI.getState().authenticationReducer
    const { subentities } = thunkAPI.getState().entityReducer

    const subentitiesKeys = Object.keys(subentities)

    const response = await Promise.all(
      subentitiesKeys.map(async (entity) => {
        const response = await APIService.getAllEntities({
          email,
          token,
          entity,
        })

        return [entity, response.data]
      })
    )

    return Object.fromEntries(response)
  }
)

export const entitySlice = createSlice({
  name: 'entity',
  initialState: {
    entity: null,
    view: null,
    data: [],
    subentities: {},
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
    setData: (state, action) => {
      for (const field in action.payload) {
        if (field in state) {
          state[field] = action.payload[field]
        }
      }
    },
    clear: (state) => {
      state.entity = null
      state.view = null
      state.data = []
      state.subentities = {}
    },
  },
  extraReducers: {
    [addNewEntity.fulfilled]: (state, action) => {
      state.view = `table ${state.entity}`
      const data = action.meta.arg
      const { id } = action.payload
      state.data.push({ ...data, id })
    },
    [addNewEntity.rejected]: (_, action) => alert(action.error.message),
    [getAllEntities.fulfilled]: (state, action) => {
      const { data } = action.payload
      state.data = state.data.concat(data)
    },
    [getAllEntities.rejected]: (_, action) => alert(action.error.message),
    [getAllSubentities.fulfilled]: (state, action) => {
      state.subentities = action.payload
    },
    [getAllSubentities.rejected]: (_, action) => alert(action.error.message),
  },
})

const { actions, reducer } = entitySlice

export const {
  setEntity,
  clearEntity,
  setView,
  clearView,
  clear,
  setData,
} = actions

export { addNewEntity, getAllEntities, getAllSubentities }

export default reducer
