import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import {
  setEntity,
  clearEntity,
  setView,
  clearView,
} from '../../redux/entitySlice'
import AddNewEntityForm from '../forms/AddNewEntityForm'
import Table from './Table'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin-top: 5rem;
`

export default function ContentForEntity({ entitySchema }) {
  const { title, fields } = entitySchema

  const dispatch = useDispatch()
  const view = useSelector((state) => state.entityReducer.view)

  useEffect(() => {
    dispatch(setEntity(title))
    dispatch(setView('table'))
    return () => {
      dispatch(clearEntity())
      dispatch(clearView())
    }
  }, [dispatch, title])

  return (
    <Wrapper>
      {view === 'table' && <Table {...{ fields, title }} />}
      {view === 'form adding' && <AddNewEntityForm {...{ fields, title }} />}
    </Wrapper>
  )
}
