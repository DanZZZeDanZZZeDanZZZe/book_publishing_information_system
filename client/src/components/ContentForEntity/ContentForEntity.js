import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import {
  setEntity,
  setView,
  clear,
  getAllEntities,
} from '../../redux/entitySlice'
import AddNewEntityForm from '../forms/AddNewEntityForm'
import Table from './Table'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin: 5rem 0;
`

export default function ContentForEntity({ entitySchema }) {
  const { title, fields } = entitySchema

  const dispatch = useDispatch()
  const view = useSelector((state) => state.entityReducer.view)
  const data = useSelector((state) => state.entityReducer.data)

  useEffect(() => {
    dispatch(setEntity(title))
    dispatch(setView('table'))
    return () => {
      dispatch(clear())
    }
  }, [dispatch, title])

  useEffect(() => {
    dispatch(getAllEntities())
  }, [dispatch])

  return (
    <Wrapper>
      {view === 'table' && <Table {...{ fields, title, data }} />}
      {view === 'form adding' && <AddNewEntityForm {...{ fields, title }} />}
    </Wrapper>
  )
}
