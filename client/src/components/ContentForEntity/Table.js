import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import constants from '../../constants'
import { setView } from '../../redux/entitySlice'
const { colors, shadows, breakpoints } = constants.css

const ButtonsPanel = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;

  & button {
    margin: 0.5rem;
  }
`

const StyledTable = styled.table`
  width: 100%;
  background-color: ${colors.EGGPLANT};
  border-collapse: collapse;
  box-shadow: ${shadows.MATERIAL_1};

  & thead {
    color: ${colors.GHOST_WHITE};
  }

  & tbody {
    min-height: 10rem;
    background-color: white;
  }

  & th {
    padding: 0.5rem 0.3rem;
  }

  & td {
    padding: 0.5rem 0.3rem;
  }
`

const formatDataFromDBToString = (data, fieldSchema) => {
  return fieldSchema.source.fields.reduce((acc, field) => {
    return `${acc} ${data[field]}`
  }, '')
}

export default function Table({ name, fields, data, title }) {
  const dispatch = useDispatch()

  return (
    <>
      <StyledTable>
        <caption>{name}</caption>
        <thead>
          <tr>
            {fields.map((f, index) => (
              <th key={index}>{f.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((entity, index) => (
            <tr key={index}>
              {fields.map((field, index) => {
                let candidate = entity[field.field]

                if (candidate instanceof Array) {
                  candidate = candidate.reduce((acc, item) => {
                    if (item instanceof Object) {
                      const text = formatDataFromDBToString(item, field)
                      return acc !== '' ? `${acc}, ${text}` : text
                    } else {
                      return `${acc}, ${item}`
                    }
                  }, '')
                }

                if (candidate instanceof Object) {
                  candidate = formatDataFromDBToString(candidate, field)
                }

                return <td key={index}>{candidate}</td>
              })}
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <ButtonsPanel>
        <button onClick={() => dispatch(setView(`form adding ${title}`))}>
          Add new
        </button>
        <button>Edit</button>
        <button>Delete</button>
      </ButtonsPanel>
    </>
  )
}
