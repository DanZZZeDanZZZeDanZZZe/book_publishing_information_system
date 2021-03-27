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
  & tbody {
    min-height: 10rem;
    background-color: ${colors.BISQUE};
  }
`

export default function Table({ name, fields }) {
  const dispatch = useDispatch()

  return (
    <>
      <StyledTable>
        <caption>{name}</caption>
        <thead>
          <tr>
            {fields.map((f) => (
              <th>{f.title}</th>
            ))}
          </tr>
        </thead>
        <tbody></tbody>
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
