import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import {
  setData,
  clear,
  getAllEntities,
  getAllSubentities,
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

const extractSubentities = (fields) => {
  let subentities = {}
  fields.forEach((field) => {
    const entity = field?.source?.entity
    if (entity) {
      Object.assign(subentities, { [entity]: null })
    }
  })
  return subentities
}

export default function ContentForEntity({ entitySchema }) {
  const { title, fields } = entitySchema

  const dispatch = useDispatch()
  const view = useSelector((state) => state.entityReducer.view)
  const data = useSelector((state) => state.entityReducer.data)

  useEffect(() => {
    dispatch(
      setData({
        entity: title,
        view: Table,
        subentities: extractSubentities(fields),
      })
    )
    return () => {
      dispatch(clear())
    }
  }, [dispatch, title, fields])

  useEffect(() => {
    dispatch(getAllEntities())
    dispatch(getAllSubentities())
  }, [dispatch])

  return (
    <Wrapper>
      {view === 'table' && <Table {...{ fields, title, data }} />}
      {view === 'form adding' && <AddNewEntityForm {...{ fields, title }} />}
    </Wrapper>
  )
}
