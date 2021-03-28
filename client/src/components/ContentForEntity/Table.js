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

export default function Table({ name, fields, data }) {
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
              {fields.map((field, index) => (
                <td key={index}>{entity[field.field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <ButtonsPanel>
        <button onClick={() => dispatch(setView('form adding'))}>
          Add new
        </button>
        <button>Edit</button>
        <button>Delete</button>
      </ButtonsPanel>
    </>
  )
}
