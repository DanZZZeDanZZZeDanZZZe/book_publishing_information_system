import PageWrapper from '../components/PageWrapper'
import ContentForEntity from '../components/ContentForEntity'

const commandSchema = {
  title: 'command',
  fields: [
    {
      title: 'date',
      field: 'date',
      container: 'input',
      type: 'date',
    },
    {
      title: 'projects',
      field: 'projects',
      container: 'multiselect',
      source: {
        entity: 'project',
        fields: ['id'],
      },
      options: [],
    },
  ],
}

function CommandsPage(props) {
  return (
    <PageWrapper>
      <ContentForEntity entitySchema={commandSchema} />
    </PageWrapper>
  )
}

export default CommandsPage
